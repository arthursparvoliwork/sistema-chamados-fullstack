import { motion } from "framer-motion";

export default function AnimatedButton({
  children,
  onClick,
  type = "button",
  variant = "primary",
  style = {},
}) {
  const variants = {
    primary: {
      background: "linear-gradient(90deg,#00f2ff,#007cf0)",
      color: "#fff",
    },
    neon: {
      background: "#0f172a",
      color: "#00f2ff",
      border: "1px solid #00f2ff",
      boxShadow: "0 0 10px #00f2ff55",
    },
    danger: {
      background: "#ff0040",
      color: "#fff",
    },
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400 }}
      style={{
        padding: "12px 24px",
        borderRadius: "12px",
        border: "none",
        fontWeight: "600",
        cursor: "pointer",
        transition: "all 0.3s ease",
        ...variants[variant],
        ...style,
      }}
    >
      {children}
    </motion.button>
  );
}