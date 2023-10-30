import { useQuery } from "@tanstack/react-query";

export default function () {
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
  console.log(todoListQuery.data);
  return <div>loaded</div>;
}
