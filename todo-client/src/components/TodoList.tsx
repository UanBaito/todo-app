import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import styles from "./styles/TodoList.module.scss";
import { FaPencil, FaXmark } from "react-icons/fa6";

export default function TodoList() {
  const todoListQuery = useQuery({
    queryKey: ["todosList"],
    queryFn: async () => {
      const res = await fetch("http://localhost:3000/api/todos", {
        credentials: "include",
      });
      if (!res.ok) {
        throw new Error();
      }
      const result = await res.json();
      return result;
    },
  });
  if (todoListQuery.isLoading) {
    return <div>Loading</div>;
  }
  if (todoListQuery.isError) {
    return <div>error</div>;
  }
  const mappedTodos = todoListQuery.data.map((todo: any) => {
    return <TodoItem todo={todo} key={todo.id} />;
  });
  return <ul className={styles.list}>{mappedTodos}</ul>;
}

export function TodoItem({ todo }: { todo: any }) {
  // const [isEditing, setIsEditing] = useState(false);
  // const [todoName, setTodoName] = useState(todo.name);
  const [isCompleted, setIsCompleted] = useState<boolean>(todo.isCompleted);
  const queryClient = useQueryClient();

  // const updateTodoMutation = useMutation({
  //   mutationFn: async () => {
  //     const res = await fetch("http://localhost:3000/api/todos", {
  //       method: "PUT",
  //       credentials: "include",
  //       headers: { "Content-type": "application/json" },
  //       body: JSON.stringify(
  //         {
  //           name: todoName,
  //           id: todo.id,
  //           isCompleted: todo.isCompleted,
  //         },
  //       ),
  //     });
  //     if (!res.ok) {
  //       throw new Error();
  //     }
  //     const result = await res.json();
  //     return result;
  //   },
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ["todosList"] });
  //   },
  // });

  const toggleCompleteMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch("http://localhost:3000/api/todos", {
        method: "PUT",
        credentials: "include",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          name: todo.name,
          id: todo.id,
          isCompleted: isCompleted,
        }),
      });
      if (!res.ok) {
        throw new Error();
      }
      const result = await res.json();
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todosList"] });
    },
  });

  const deleteTodoMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch(`http://localhost:3000/api/todos/${todo.id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) {
        throw new Error();
      }
      const result = await res.json();
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todosList"] });
    },
  });

  return (
    <>
      <li>
        <input
          className={styles.completed_checkbox}
          name="completed"
          type="checkbox"
          checked={isCompleted}
          onChange={() => {
            setIsCompleted((prevState) => !prevState);
            toggleCompleteMutation.mutate();
          }}
        />
        <h2>
          {todo.name}
        </h2>
        <button
          onClick={() => {
            deleteTodoMutation.mutate();
          }}
        >
          <FaXmark />
        </button>
      </li>
    </>
  );
}
