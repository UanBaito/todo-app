import { useNavigate } from "react-router-dom";
import styles from "./styles/Home.module.scss";
export default function Home() {
  const navigate = useNavigate();
  return (
    <main>
      <section className={styles.container}>
        <h1>TO-DO APP</h1>
        <button
          className={styles.login}
          onClick={() => {
            navigate("/login");
          }}
        >
          Login
        </button>
        <button
          className={styles.register}
          onClick={() => {
            navigate("/register");
          }}
        >
          Register
        </button>
      </section>
    </main>
  );
}
