import { useMutation, useQueryClient } from "@tanstack/react-query";
import styles from "./styles/RemoveCompletedTodos.module.scss";

export default function RemoveCompletedTodos(
  { existsCompleted }: { existsCompleted: boolean },
) {
  const queryClient = useQueryClient();
  const removeCompletedTodosMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch("http://localhost:3000/api/todos", {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) {
        throw new Error();
      }
      return "ok";
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todosList"] });
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
