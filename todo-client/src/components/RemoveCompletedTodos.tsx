import { useMutation } from "@tanstack/react-query";
import styles from "./styles/RemoveCompletedTodos.module.scss";

export default function RemoveCompletedTodos(
  { existsCompleted }: { existsCompleted: boolean },
) {
  const removeCompletedTodosMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch("http://localhost:3000/api/todos", {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) {
        throw new Error();
      }
      const result = await res.json();
      return result;
    },
  });

  return (
    <button
      onClick={() => {
        removeCompletedTodosMutation.mutate();
      }}
      disabled={!existsCompleted}
      className={styles.button}
    >
      Remove completed todos
    </button>
  );
}
