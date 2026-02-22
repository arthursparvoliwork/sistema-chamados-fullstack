import { motion } from "framer-motion";

export default function LoadingScreen() {
  return (
    <div
      style={{
        height: "100vh",
        background: "#0f172a",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        color: "white",
      }}
    >
      <motion.div
        animate={{
          rotate: 360,
          boxShadow: [
            "0 0 10px #00f2ff",
            "0 0 30px #00f2ff",
            "0 0 10px #00f2ff",
          ],
        }}
        transition={{
          repeat: Infinity,
          duration: 1.2,
          ease: "linear",
        }}
        style={{
          width: 70,
          height: 70,
          border: "4px solid rgba(255,255,255,0.1)",
          borderTop: "4px solid #00f2ff",
          borderRadius: "50%",
        }}
      />
      <p style={{ marginTop: 20, opacity: 0.7 }}>
        Inicializando sistema...
      </p>
    </div>
  );
}