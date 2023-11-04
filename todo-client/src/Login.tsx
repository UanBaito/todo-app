import { useMutation } from "@tanstack/react-query";
import { useRef, useState } from "react";
import styles from "./styles/Login.module.scss";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const messageRef = useRef<HTMLParagraphElement>(null);

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
      if (res.status === 401) {
        messageRef.current!.children[0].textContent =
          "Invalid username or password";
        messageRef.current!.setAttribute("data-visible", "true");
        throw new Error();
      } else if (!res.ok) {
        messageRef.current!.children[0].textContent = "Something went wrong";
        messageRef.current!.setAttribute("data-visible", "true");
        throw new Error();
      }
      const result = await res.json();
      return result;
    },
    onMutate: () => {
      messageRef.current!.setAttribute("data-visible", "false");
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
          <p ref={messageRef} className={styles.message} data-visible={false}>
            <strong></strong>
          </p>
          <fieldset disabled={loginMutation.isPending}>
            <section>
              <label htmlFor="username">Username</label>
              <input
                required
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
                required
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                value={credentials.password}
                onChange={handleChange}
              />
            </section>
            <button>Log in</button>
            <a href="/register">Don't have and account? Register</a>
          </fieldset>
          
        </form>
      </div>
    </main>
  );
}
