import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

export default function Login() {
  const [credentials, setCredentials] = useState({
    name: "",
    pwd: "",
  });

  const loginMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        body: JSON.stringify({
          name: credentials.name,
          pwd: credentials.pwd,
        }),
      });
      if (!res.ok) {
        throw new Error();
      }
      const result = await res.json();
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
    <form
      onSubmit={(e) => {
        e.preventDefault()
        loginMutation.mutate();
      }}
    >
      <input
        name="name"
        type="text"
        placeholder="Username"
        value={credentials.name}
        onChange={handleChange}
      />
      <input
        name="pwd"
        type="password"
        placeholder="password"
        value={credentials.pwd}
        onChange={handleChange}
      />
      <button>Submit</button>
    </form>
  );
}
