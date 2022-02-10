import { MeshReflectorMaterial, OrbitControls, Plane } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import * as React from "react";
import { Suspense } from "react";
import { ExampleShapes } from "./Shapes";
import { MeasureText } from "./MeasureText";
import { QuickMeasureEffect } from "./QuickMeasureEffects";
import { GridLines } from "./GridLines";
import "./style.css";

export default function App() {
  return (
    <Canvas camera={{ position: [0, 0, 20], near: 0.1, far: 100, fov: 50 }}>
      <pointLight position={[5, 15, 10]} intensity={1.0} />
      <ambientLight intensity={0.7} />
      <OrbitControls autoRotate={false} enableZoom={true} enablePan={false} />
      <QuickMeasureEffect>
        <GridLines />
        <Suspense fallback={null}>
          <MeasureText text="Quick" position={[0.5, -4.8, 0]} />
          <MeasureText text="Measure" position={[2.5, -7.8, 0]} />
        </Suspense>
        <ExampleShapes />
      </QuickMeasureEffect>
    </Canvas>
  );
}
