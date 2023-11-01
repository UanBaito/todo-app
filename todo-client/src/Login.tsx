import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import styles from "./styles/Login.module.scss";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [credentials, setCredentials] = useState({
    name: "",
    pwd: "",
  });
  const navigate = useNavigate()

  const loginMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        credentials: "include",
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
    onSuccess: () => {
      navigate("/dashboard")
    }
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [e.target.name]: e.target.value,
    }));
  }

  return (
    <div className={styles.container}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          loginMutation.mutate();
        }}
        className={styles.form}
      >
        <input
          name="name"
          type="text"
          placeholder="  Username"
          value={credentials.name}
          onChange={handleChange}
        />
        <input
          name="pwd"
          type="password"
          placeholder="  Password"
          value={credentials.pwd}
          onChange={handleChange}
        />
        <button>Sign in</button>
      </form>
    </div>
  );
}
