import { useNavigate } from "react-router-dom";
import AddTodo from "./AddTodo";
import TodoList from "./TodoList";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import RemoveCompletedTodos from "./RemoveCompletedTodos";

export default function TodosContainer() {
  const [existsCompleted, setExistsCompleted] = useState(false);
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
      if (checkSomeCompleted(result)) {
        setExistsCompleted(true);
      } else {
        setExistsCompleted(false);
      }
      return result;
    },
  });

  return (
    <>
      <RemoveCompletedTodos existsCompleted={existsCompleted} />
      <AddTodo />
      {todoListQuery.isLoading
        ? null
        : todoListQuery.isError
        ? null
        : <TodoList todosList={todoListQuery.data} />}
    </>
  );
}

function checkSomeCompleted(todos: any[]) {
  const existsCompleted = todos.some((todo) => todo.isCompleted);
  return existsCompleted;
}
