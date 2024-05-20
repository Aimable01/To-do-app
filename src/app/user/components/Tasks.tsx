import { Loader } from "@/app/ui/buttons/guest";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { TiTick } from "react-icons/ti";

type Input = {
  content: string;
};

type Task = {
  id: string;
  content: string;
  createdAt: string;
  status: string;
  completed: boolean;
};

export default function Tasks() {
  const [taskItems, setTaskItems] = useState<Task[]>([]);

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<Input>();

  const onSubmit = async (data: Input) => {
    const res = await fetch("/api/tasks/addTask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const d = await res.json();

    const newTask: Task = d.res;
    setTaskItems((prevTasks) => [...prevTasks, newTask]);
  };

  //--- fetch all tasks
  useEffect(() => {
    fetch("/api/tasks/addTask")
      .then((res) => res.json())
      .then((d) => {
        console.log(d);
        const tasks = d.tasks;
        setTaskItems(tasks);
      });
  }, []);

  // the function to handle completion of task

  const toggleCompleted = async (id: string) => {
    const taskToUpdate = taskItems.find((task) => task.id === id);
    if (!taskToUpdate) {
      return;
    }

    const updatedTask: Task = {
      ...taskToUpdate,
      completed: !taskToUpdate.completed,
    };

    const response = await fetch(`/api/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTask),
    });

    if (response.ok) {
      const updatedTaskFromServer = await response.json();
      setTaskItems((prevTasks) =>
        prevTasks.map((task) => (task.id === id ? updatedTaskFromServer : task))
      );
    }
  };

  return (
    <div className="md:mx-32 ">
      <div>
        <div className="h-[450px] flex flex-col justify-between">
          <div className="overflow-auto">
            {taskItems.map((task, i) => (
              <div
                key={i}
                className="flex gap-2 text-white bg-blue-600 my-2 py-2 px-3 rounded"
              >
                <div
                  onClick={() => toggleCompleted(task.id)}
                  className={`w-5 h-5 border border-white rounded-full pl-0.5 cursor-pointer`}
                >
                  {task.completed ? <TiTick /> : ""}
                </div>
                <h1> {task.content} </h1>
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit(onSubmit)} action="">
            <div>
              {" "}
              <input
                className="px-3 py-1 rounded focus:outline-none w-[350px]"
                placeholder="Enter task..."
                type="text"
                {...register("content")}
              />
              <button
                disabled={isSubmitting}
                className="bg-blue-600 text-white px-3 py-1 rounded mx-3"
              >
                {" "}
                {isSubmitting ? <Loader /> : ""} Add
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
