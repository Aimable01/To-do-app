"use client";
import { useState } from "react";
import { useTaskStore } from "./todoStore";
import { TiTick } from "react-icons/ti";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";

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
  let newDate = [date[1], " ", date[2], " ", date[3]];

  return (
    <div className="h-[450px] flex flex-col justify-between">
      <div>
        <div></div>
        <ul>
          {tasks.map((task) => (
            <li key={task.id} className="bg-blue-700 px-3 py-1 rounded-md m-2">
              {editId === task.id ? (
                <>
                  <input
                    type="text"
                    className="focus:outline-none px-1 py-0.5 rounded-md"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                  />
                  <button onClick={() => handleUpdateTask(task.id)}>
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
                      <h2 className="text-[10px]">{newDate}</h2>
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
