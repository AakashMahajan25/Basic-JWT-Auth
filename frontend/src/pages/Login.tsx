import React, { useState } from "react";
import useLogin from "../hooks/useLogin";
import { useAuthStore } from "../context/store";

export default function Login() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { user } = useAuthStore();
  console.log(user);

  const { loginHook } = useLogin();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    loginHook({
      username,
      password,
    });
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />{" "}
        <br />
        <input
          type="text"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />{" "}
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
