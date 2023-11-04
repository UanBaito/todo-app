import { useMutation } from "@tanstack/react-query";
import { useRef, useState } from "react";
import styles from "./styles/Register.module.scss";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [credentials, setCredentials] = useState({
    username: "",
    newPassword: "",
  });
  const messageRef = useRef<HTMLParagraphElement>(null);
  const navigate = useNavigate();

  const registerMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        credentials: "include",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          name: credentials.username,
          pwd: credentials.newPassword,
        }),
      });

      if (res.status === 409) {
        messageRef.current!.setAttribute("data-visible", "true");
        messageRef.current!.children[0].textContent =
          "This username is already occupied. Please try with another username";
        throw new Error();
      } else if (!res.ok) {
        messageRef.current!.setAttribute("data-visible", "true");
        messageRef.current!.children[0].textContent = "Something went wrong";
        throw new Error();
      }
      const user = res.json();
      return user;
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
    <main className={styles.main}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          registerMutation.mutate();
        }}
      >
        <p ref={messageRef} data-visible={false}>
          <strong></strong>
        </p>
        <fieldset disabled={registerMutation.isPending}>
          <section aria-describedby="username-label">
            <label id="username-label" htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              autoComplete="username"
              value={credentials.username}
              onChange={handleChange}
              required
            />
          </section>

          <section aria-describedby="password-label">
            <label id="password-label" htmlFor="newPassword">Password</label>
            <input
              type="password"
              name="newPassword"
              id="newPassword"
              autoComplete="new-password"
              value={credentials.newPassword}
              onChange={handleChange}
              minLength={8}
              aria-describedby="min-length"
              required
            />
            <span id="min-length">Enter at least 8 characters</span>
          </section>
          <button>
            Register
          </button>
          <a href="/login">Already have an account? Sign in</a>
        </fieldset>
      </form>
    </main>
  );
}
