import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef, useState } from "react";
import styles from "./styles/AddTodo.module.scss";
import { useNavigate } from "react-router-dom";

export default function AddTodo() {
  const [todoName, setTodoName] = useState("");
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const messageRef = useRef<HTMLSpanElement>(null);
  const addTodoMutation = useMutation({
    mutationFn: async () => {
      if (todoName === "") {
        //Select children to target <strong/> element, otherwise assigning the text content to the span element
        //directly would override it.
        messageRef.current!.children[0].textContent = "TO-DO cannot be empty";
        throw new Error();
      }
      const res = await fetch("http://localhost:3000/api/todos", {
        method: "POST",
        credentials: "include",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          name: todoName,
        }),
      });
      if (res.status === 401) {
        navigate("/login");
      } else if (!res.ok) {
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
      <span ref={messageRef} className={styles.message}>
        <strong></strong>
      </span>
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
