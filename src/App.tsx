import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import * as React from "react";
import { Effects } from "./Effects";
import "./style.css";

export default function App() {
  return (
    <Canvas
      camera={{
        position: [0, 0, 60],
        fov: 27,
        aspect: window.innerWidth / 2 / (window.innerHeight / 2),
        near: 1,
        far: 1500,
      }}
    >
      <color attach="background" args={["#151515"]} />
      <ambientLight intensity={1.5} color={0x444444} />
      <OrbitControls autoRotate={false} enableZoom={false} enablePan={false} />
      <Effects />
    </Canvas>
  );
}
