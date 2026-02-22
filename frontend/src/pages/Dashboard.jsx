import Layout from "../components/Layout";
import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function Dashboard() {
  const [stats, setStats] = useState({
    chamados: 0,
    usuarios: 0,
    abertos: 0,
    andamento: 0,
    fechados: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/dashboard")
      .then((res) => {
        setStats(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const chartData = [
    { name: "Abertos", value: stats.abertos },
    { name: "Andamento", value: stats.andamento },
    { name: "Fechados", value: stats.fechados },
  ];

  return (
    <Layout>
      <motion.h1
        className="page-title"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Dashboard BI
      </motion.h1>

      {loading ? (
        <div className="dashboard-loading">
          <div className="loader-glow"></div>
          <p>Carregando métricas...</p>
        </div>
      ) : (
        <>
          <div className="dashboard-grid">
            <AnimatedCard title="Total Chamados" value={stats.chamados} icon="📊" />
            <AnimatedCard title="Usuários" value={stats.usuarios} icon="👥" />
            <AnimatedCard title="Abertos" value={stats.abertos} icon="🟢" />
            <AnimatedCard title="Em Andamento" value={stats.andamento} icon="🟡" />
            <AnimatedCard title="Fechados" value={stats.fechados} icon="🔵" />
          </div>

          <motion.div
            className="saas-card"
            style={{ marginTop: "40px" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <h3 style={{ marginBottom: "20px" }}>
              Status dos Chamados
            </h3>

            <ResponsiveContainer width="100%" height={320}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="name" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{
                    background: "#0f172a",
                    border: "1px solid #334155",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#00f2ff"
                  strokeWidth={3}
                  dot={{ r: 6 }}
                  isAnimationActive={true}
                  animationDuration={800}
                />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>
        </>
      )}
    </Layout>
  );
}

function AnimatedCard({ title, value, icon }) {
  return (
    <motion.div
      className="saas-card"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div style={{ fontSize: "24px" }}>{icon}</div>
      <div className="card-title">{title}</div>
      <div className="card-value">{value}</div>
    </motion.div>
  );
}