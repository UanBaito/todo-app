import styles from "./styles/Home.module.scss";
export default function Home() {
  return (
    <main>
      <section className={styles.container}>
        <h1>TO-DO APP</h1>
        <button className={styles.login}>Login</button>
        <button className={styles.register}>Register</button>
      </section>
    </main>
  );
}
