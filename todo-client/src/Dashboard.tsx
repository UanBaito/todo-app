import TodoList from "./components/TodoList";
import getUserData from "./hooks/getUserData";

export default function Dashboard() {
  const queryState = getUserData();

  if (queryState.isLoading) {
    return <div>Loading...</div>;
  }
  if (queryState.isError) {
    return <div>error</div>;
  }
  return (
    <div>
      <TodoList />
      {queryState.data.name}
    </div>
  );
}
