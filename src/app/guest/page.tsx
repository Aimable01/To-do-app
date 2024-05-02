import SideBar from "./components/navbar";
import Todo from "./todo/todo";

export default function GuestPage() {
  return (
    <div className="mx-10 lg:mx-36">
      <div>
        <SideBar />
      </div>
      <Todo />
    </div>
  );
}
