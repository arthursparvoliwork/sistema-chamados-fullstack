import { useNavigate } from "react-router-dom";

export default function Topbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div style={{
      background: "#1e293b",
      padding: "15px 30px",
      display: "flex",
      justifyContent: "space-between",
      color: "white"
    }}>
      <h3>Painel Administrativo</h3>
      <button onClick={logout} style={{
        background: "#ef4444",
        border: "none",
        padding: "8px 15px",
        borderRadius: "6px",
        color: "white",
        cursor: "pointer"
      }}>
        Sair
      </button>
    </div>
  );
}
