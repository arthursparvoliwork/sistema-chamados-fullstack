import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div style={{
      width: "220px",
      background: "#1e293b",
      padding: "20px",
      color: "white"
    }}>
      <h2>Sistema</h2>
      <nav style={{ display: "flex", flexDirection: "column", gap: "15px", marginTop: "30px" }}>
        <Link to="/dashboard" style={linkStyle}>Dashboard</Link>
        <Link to="/chamados" style={linkStyle}>Chamados</Link>
      </nav>
    </div>
  );
}

const linkStyle = {
  textDecoration: "none",
  color: "white",
  background: "#334155",
  padding: "10px",
  borderRadius: "8px"
};
