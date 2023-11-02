import { useNavigate } from "react-router-dom";
import AddTodo from "./AddTodo";
import TodoList from "./TodoList";
import { useQuery } from "@tanstack/react-query";

export default function TodosContainer() {
  const navigate = useNavigate();
  const todoListQuery = useQuery({
    queryKey: ["todosList"],
    queryFn: async () => {
      const res = await fetch("http://localhost:3000/api/todos", {
        credentials: "include",
      });
      if (res.status === 401) {
        navigate("/login");
      } else if (!res.ok) {
        throw new Error();
      }
      const result = await res.json();
      return result;
    },
  });

  return (
    <section>
      <AddTodo />
      {todoListQuery.isLoading
        ? null
        : todoListQuery.isError
        ? null
        : <TodoList todosList={todoListQuery.data} />}
    </section>
  );
}
