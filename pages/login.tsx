import React, { useState, ChangeEvent } from "react";

interface User {
  id: number;
  name: string;
  email: string;
}

interface LoginFormProps {
  onLogin: (user: User) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const response = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      const { id, name, email } = data.user;
      onLogin({ id, name, email });
    } else {
      alert(data.error || "Erro desconhecido ao efetuar login.");
    }
  };

  return (
    <div>
      <label>
        Email:
        <input
          type="text"
          value={email}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
        />
      </label>
      <br />
      <label>
        Senha:
        <input
          type="password"
          value={password}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
        />
      </label>
      <br />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default LoginForm;
