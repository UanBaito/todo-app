import TodosContainer from "./components/TodosContainer";
import getUserData from "./hooks/getUserData";
import styles from "./styles/Dashboard.module.scss"

export default function Dashboard() {
  const queryState = getUserData();

  if (queryState.isLoading) {
    return <div>Loading...</div>;
  }
  if (queryState.isError) {
    return <div>error</div>;
  }
  return (
    <main>
      <article className={styles.container}>
        <h1>TO-DO</h1>
        <TodosContainer />
      </article>
    </main>
  );
}
