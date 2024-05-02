"use client";
import { useState } from "react";
import { useEffect } from "react";
import { useTaskStore } from "./todoStore";
import { TiTick } from "react-icons/ti";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { FaRegStickyNote } from "react-icons/fa";

export default function Todo() {
  const { tasks, addTask, removeTask, updateTask, toggleCompleted } =
    useTaskStore();
  const [taskName, setTaskName] = useState("");
  const [editId, setEditId] = useState<number | null>(null);
  const [editName, setEditName] = useState("");

  const handleAddTask = () => {
    if (taskName) {
      const newTask = { id: Date.now(), name: taskName, completed: false };
      addTask(newTask);
      setTaskName("");
    }
  };

  const handleUpdateTask = (_id: number) => {
    if (editName && editId) {
      updateTask(editId, {
        id: editId,
        name: editName,
        completed: false,
      });
      setEditId(null);
      setEditName("");
    }
  };

  let date = new Date().toUTCString().split(" ");
  let newDate = [date[1], date[2], date[3]];

  useEffect(() => {
    const handlePress = (event: { key: string }) => {
      if (event.key === "Enter") {
        handleAddTask();
      }
    };

    document.addEventListener("keydown", handlePress);

    return () => document.removeEventListener("keydown", handlePress);
  }, [handleAddTask]);

  return (
    <div className="h-[450px] flex flex-col justify-between">
      <div className=" overflow-auto">
        {tasks.length === 0 ? (
          <>
            <div className="text-white bg-blue-700 p-5 rounded-md lg:mx-28 flex flex-col items-center">
              <h2 className="text-xl">Your tasks will appear here</h2>
              <div className="text-[90px] my-14 mx-32">
                <FaRegStickyNote />
              </div>
            </div>
          </>
        ) : (
          <ul>
            {tasks.map((task) => (
              <li
                key={task.id}
                className="bg-blue-700 px-3 py-1 rounded-md m-2"
              >
                {editId === task.id ? (
                  <>
                    <input
                      type="text"
                      className="focus:outline-none px-1 py-0.5 rounded-md"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                    />
                    <button
                      className="px-2 py-1 bg-blue-950 m-1 text-sm rounded-md text-white"
                      onClick={() => handleUpdateTask(task.id)}
                    >
                      Save
                    </button>
                  </>
                ) : (
                  <div className="flex justify-between text-white">
                    <div className="flex items-center gap-4">
                      <div
                        onClick={() => toggleCompleted(task.id)}
                        className={`w-5 h-5 border border-white rounded-full pl-0.5 cursor-pointer`}
                      >
                        {task.completed ? <TiTick /> : ""}
                      </div>
                      <div>
                        <h2
                          className={`${
                            task.completed ? "line-through" : ""
                          } text-lg `}
                        >
                          {task.name}
                        </h2>
                        <h2 className="text-[10px]">{newDate.join(" ")}</h2>
                      </div>
                    </div>
                    <div>
                      <button
                        className="text-2xl"
                        onClick={() => {
                          setEditId(task.id);
                          setEditName(task.name);
                        }}
                      >
                        <h2>
                          <CiEdit />
                        </h2>
                      </button>
                      <button
                        className="text-2xl text-red-600"
                        onClick={() => removeTask(task.id)}
                      >
                        <h2>
                          <MdDeleteOutline />
                        </h2>
                      </button>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div>
        <div className="flex items-center gap-2">
          <input
            type="text"
            className="focus:outline-none px-3 py-2 w-full rounded-md"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            placeholder="Enter task..."
          />
          <button
            className="bg-blue-600 text-2xl rounded-md px-3 py-1 text-white"
            onClick={handleAddTask}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}
