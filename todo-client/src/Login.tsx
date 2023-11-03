import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import styles from "./styles/Login.module.scss";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          name: credentials.username,
          pwd: credentials.password,
        }),
      });
      if (!res.ok) {
        throw new Error();
      }
      const result = await res.json();
      return result;
    },
    onSuccess: () => {
      navigate("/dashboard");
    },
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [e.target.name]: e.target.value,
    }));
  }

  return (
    <main>
      <div className={styles.container}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            loginMutation.mutate();
          }}
          className={styles.form}
        >
          <section>
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              value={credentials.username}
              autoComplete="username"
              onChange={handleChange}
            />
          </section>
          <section>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              value={credentials.password}
              onChange={handleChange}
            />
          </section>
          <button>Sign in</button>
        </form>
      </div>
    </main>
  );
}
