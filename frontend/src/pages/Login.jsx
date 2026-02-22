import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AnimatedButton from "../components/AnimatedButton";
export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (email && senha) {
      localStorage.setItem("token", "logado");
      navigate("/dashboard");
    }
  };

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      background: "#0f172a",
      color: "white"
    }}>
      <form onSubmit={handleLogin} style={{
        background: "#1e293b",
        padding: "40px",
        borderRadius: "12px",
        display: "flex",
        flexDirection: "column",
        gap: "15px"
      }}>
        <h2>Login</h2>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          onChange={(e) => setSenha(e.target.value)}
        />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}


