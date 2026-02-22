import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";

function AnimatedMesh() {
  const mesh = useRef();

  useFrame(({ mouse }) => {
    mesh.current.rotation.x = mouse.y * 0.3;
    mesh.current.rotation.y = mouse.x * 0.3;
  });

  return (
    <mesh ref={mesh}>
      <torusKnotGeometry args={[2, 0.6, 200, 32]} />
      <meshStandardMaterial color="#00f2ff" wireframe />
    </mesh>
  );
}

export default function Background3D() {
  return (
    <Canvas
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 0,
      }}
      camera={{ position: [0, 0, 8] }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Stars />
      <AnimatedMesh />
    </Canvas>
  );
}