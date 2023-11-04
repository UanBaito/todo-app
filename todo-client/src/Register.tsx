import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

export default function Register() {
  const [credentials, setCredentials] = useState({
    username: "",
    newPassword: "",
  });

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
      if (!res.ok) {
        throw new Error();
      }
      const result = res.json();
      return result;
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
      <form
        onSubmit={(e) => {
          e.preventDefault();
          registerMutation.mutate();
        }}
      >
        <fieldset>
          <section>
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              autoComplete="username"
              value={credentials.username}
              onChange={handleChange}
              required
            />
          </section>

          <section>
            <label htmlFor="newPassword">Password</label>
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
        </fieldset>
      </form>
    </main>
  );
}
