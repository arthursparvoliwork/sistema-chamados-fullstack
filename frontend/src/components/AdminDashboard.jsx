import React, { useState } from "react";
import Background3D from "./Background3D";
import { motion } from "framer-motion";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import { Doughnut, Bar } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

export default function AdminDashboard() {
  const [section, setSection] = useState("dashboard");
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  const particlesInit = async (main) => {
    await loadFull(main);
  };

  const doughnutData = {
    labels: ["Resolvidos", "Pendentes", "Em andamento"],
    datasets: [
      {
        data: [12, 7, 5],
        backgroundColor: ["#00f2ff", "#ff00c8", "#00ff88"],
        borderWidth: 0,
      },
    ],
  };

  const barData = {
    labels: ["Jan", "Fev", "Mar", "Abr"],
    datasets: [
      {
        label: "Chamados",
        data: [5, 9, 6, 11],
        backgroundColor: "#00f2ff",
      },
    ],
  };

  return (
    <div
      onMouseMove={(e) =>
        setMouse({ x: e.clientX, y: e.clientY })
      }
      style={{
        height: "100vh",
        overflow: "hidden",
        background: "#0f172a",
        color: "white",
        position: "relative",
      }}
    >
      <Background3D />

      <Particles
        init={particlesInit}
        options={{
          particles: {
            number: { value: 60 },
            color: { value: "#00f2ff" },
            links: { enable: true, color: "#00f2ff" },
            move: { enable: true, speed: 1 },
          },
        }}
        style={{ position: "absolute", zIndex: 1 }}
      />

      {/* Glow interativo */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          background: `radial-gradient(circle at ${mouse.x}px ${mouse.y}px, rgba(0,242,255,0.15), transparent 250px)`,
          zIndex: 1,
        }}
      />

      <div style={{ display: "flex", position: "relative", zIndex: 2 }}>

        {/* SIDEBAR */}
        <div style={{
          width: "220px",
          background: "rgba(17,24,39,0.8)",
          backdropFilter: "blur(10px)",
          padding: "20px",
          height: "100vh"
        }}>
          <h2 style={{ marginBottom: "30px" }}>Sistema</h2>
          <SidebarButton text="Dashboard" onClick={() => setSection("dashboard")} />
          <SidebarButton text="Chamados" onClick={() => setSection("chamados")} />
        </div>

        {/* CONTEÚDO */}
        <div style={{ flex: 1, padding: "40px" }}>
          {section === "dashboard" && (
            <>
              <HoloCard>
                <h1>📊 Dashboard</h1>
                <p>Visão geral do sistema</p>
              </HoloCard>

              <div style={{ display: "flex", gap: "40px", marginTop: "40px" }}>
                <div style={{ width: "300px" }}>
                  <Doughnut data={doughnutData} />
                </div>
                <div style={{ width: "400px" }}>
                  <Bar data={barData} />
                </div>
              </div>
            </>
          )}

          {section === "chamados" && (
            <HoloCard>
              <h1>📂 Chamados</h1>
              <p>Lista dinâmica de chamados</p>
            </HoloCard>
          )}
        </div>
      </div>
    </div>
  );
}

function SidebarButton({ text, onClick }) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      style={{
        width: "100%",
        padding: "12px",
        marginBottom: "15px",
        background: "#1f2937",
        color: "white",
        border: "none",
        borderRadius: "10px",
        cursor: "pointer",
      }}
    >
      {text}
    </motion.button>
  );
}

function HoloCard({ children }) {
  return (
    <motion.div
      whileHover={{ rotateX: 5, rotateY: -5 }}
      style={{
        padding: "30px",
        borderRadius: "20px",
        background: "rgba(255,255,255,0.05)",
        backdropFilter: "blur(20px)",
        boxShadow: "0 0 30px #00f2ff",
      }}
    >
      {children}
    </motion.div>
  );
}