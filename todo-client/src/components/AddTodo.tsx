import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import styles from "./styles/AddTodo.module.scss";

export default function AddTodo() {
  const [todoName, setTodoName] = useState("");
  const queryClient = useQueryClient();
  const addTodoMutation = useMutation({
    mutationFn: async () => {
      if(todoName === "") {
        throw new Error()
      }
      const res = await fetch("http://localhost:3000/api/todos", {
        method: "POST",
        credentials: "include",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          name: todoName,
        }),
      });
      if (!res.ok) {
        throw new Error();
      }
      const result = await res.json();
      return result;
    },
    onSuccess: () => {
      setTodoName("");
      queryClient.invalidateQueries({ queryKey: ["todosList"] });
    },
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setTodoName(e.target.value);
  }

  return (
    <div className={styles.container}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addTodoMutation.mutate();
        }}
      >
        <input
          name="add todo"
          type="text"
          value={todoName}
          onChange={handleChange}
        />
        <button>Add</button>
      </form>
    </div>
  );
}
