import { Loader } from "@/app/ui/buttons/guest";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

type Input = {
  content: string;
};

export default function Tasks() {
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
    console.log(d);
  };

  //--- fetch all tasks
  useEffect(() => {
    fetch("/api/tasks/addTask")
      .then((res) => res.json())
      .then((d) => console.log(d));
  }, []);

  return (
    <div>
      <div>
        <div>
          <form onSubmit={handleSubmit(onSubmit)} action="">
            <div>
              {" "}
              <input
                className="px-3 py-1 rounded focus:outline-none"
                placeholder="Enter task..."
                type="text"
                {...register("content")}
              />
              <button disabled={isSubmitting}>
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
