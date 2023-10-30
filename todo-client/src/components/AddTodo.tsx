import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

export default function AddTodo() {
  const [todoName, setTodoName] = useState("");
  const addTodoMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch("http://localhost:3000/api/todos", {
        method: "POST",
        credentials: "include",
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
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setTodoName(e.target.value);
  }

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addTodoMutation.mutate();
        }}
      >
        <input name="add todo" type="text" onChange={handleChange} />
        <button>Add</button>
      </form>
    </div>
  );
}
