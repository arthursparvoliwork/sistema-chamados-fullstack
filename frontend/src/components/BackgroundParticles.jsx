import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

export default function BackgroundParticles() {
  const particlesInit = async (main) => {
    await loadFull(main);
  };

  return (
    <Particles
      init={particlesInit}
      options={{
        background: { color: "transparent" },
        fpsLimit: 60,
        particles: {
          number: { value: 70 },
          color: { value: ["#38bdf8", "#9333ea"] },
          links: {
            enable: true,
            distance: 140,
            color: "#38bdf8",
            opacity: 0.3,
          },
          move: {
            enable: true,
            speed: 1,
          },
          size: { value: 2 },
          opacity: { value: 0.6 },
        },
      }}
      style={{
        position: "absolute",
        zIndex: 0,
      }}
    />
  );
}
