import { MeshReflectorMaterial, OrbitControls, Plane } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import * as React from "react";
import { Suspense } from "react";
import { ExampleShapes } from "./ExampleShapes";
import { MeasureText } from "./MeasureText";
import { QuickMeasureEffect } from "./QuickMeasureEffects";
import "./style.css";

export default function App() {
  return (
    <Canvas camera={{ position: [0, 3, 20], near: 0.1, far: 100, fov: 50 }}>
      <pointLight position={[-5, 55, 5]} intensity={1.0} />
      <pointLight position={[5, 15, 10]} intensity={1.0} />
      <ambientLight intensity={0.7} />
      {/* <OrbitControls autoRotate={false} enableZoom={false} enablePan={false} /> */}
      <Plane
        receiveShadow
        args={[60, 60]}
        rotation-x={-Math.PI / 2}
        position={[0, -5, 0]}
      >
        <MeshReflectorMaterial
          mirror={0}
          blur={[400, 50]}
          mixBlur={2.2}
          mixStrength={1}
          mixContrast={2}
          metalness={0.9}
          roughness={0.3}
          opacity={0.05}
        />
      </Plane>
      <QuickMeasureEffect>
        <Suspense fallback={null}>
          <MeasureText text="Quick" position={[0, 2, -1]} />
          <MeasureText text="Measure" position={[0, 0, -1]} />
        </Suspense>
        <ExampleShapes />
      </QuickMeasureEffect>
    </Canvas>
  );
}
