import TodosContainer from "./components/TodosContainer";
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
      <h1>TO-DO</h1>
      <TodosContainer />
    </div>
  );
}
