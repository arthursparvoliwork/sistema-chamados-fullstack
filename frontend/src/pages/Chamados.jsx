import Layout from "../components/Layout";
import { useState } from "react";

export default function Chamados() {
  const [busca, setBusca] = useState("");

  const chamados = [
    { id: 1, titulo: "Erro no sistema", status: "Aberto", prioridade: "Alta" },
    { id: 2, titulo: "Impressora", status: "Em andamento", prioridade: "Média" },
    { id: 3, titulo: "Atualização", status: "Fechado", prioridade: "Baixa" },
  ];

  const filtrados = chamados.filter((c) =>
    c.titulo.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <Layout>
      <h1>Chamados</h1>

      <input
        type="text"
        placeholder="Buscar chamado..."
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
        style={{
          padding: "10px",
          margin: "20px 0",
          width: "300px",
          borderRadius: "8px",
          border: "none"
        }}
      />

      {filtrados.map((c) => (
        <div key={c.id} style={{
          background: "#1e293b",
          padding: "15px",
          marginBottom: "10px",
          borderRadius: "10px"
        }}>
          <h3>{c.titulo}</h3>
          <p>Status: {c.status}</p>
          <p>Prioridade: {c.prioridade}</p>
        </div>
      ))}
    </Layout>
  );
}
