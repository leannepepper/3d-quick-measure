import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import * as React from "react";
import { QuickMeasureEffect } from "./QuickMeasureEffects";
import { MeasuredMesh } from "./ExampleMesh";
import { MeasureText } from "./MeasureText";
import { Suspense } from "react";
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
      <QuickMeasureEffect>
        <Suspense fallback={null}>
          <MeasureText text="Q" position={[-5, 5, 0]} />
          <MeasureText text="u" position={[-1.65, 4.5, 0]} />
          <MeasureText text="i" position={[0.65, 5, 0]} />
          <MeasureText text="c" position={[2.65, 4.5, 0]} />
          <MeasureText text="k" position={[5.65, 5, 0]} />

          <MeasureText text="M" position={[-8, 0, 0]} />
          <MeasureText text="e" position={[-4.5, -0.5, 0]} />
          <MeasureText text="a" position={[-1.65, -0.5, 0]} />
          <MeasureText text="s" position={[1.0, -0.5, 0]} />
          <MeasureText text="u" position={[3.85, -0.5, 0]} />
          <MeasureText text="r" position={[6.45, -0.5, 0]} />
          <MeasureText text="e" position={[8.65, -0.5, 0]} />
        </Suspense>
        {/* <MeasuredMesh
          position={[-3, 0, -10]}
          color={"#eee"}
          animate={false}
          boxSize={[3, 2, 2]}
        />
        <MeasuredMesh
          position={[1, 3, 0]}
          color={"#eee"}
          animate={true}
          boxSize={[3, 1, 2]}
        />
        <MeasuredMesh
          position={[8, -4, 0]}
          color={"#eee"}
          animate={false}
          boxSize={[3, 3, 3]}
        /> */}
      </QuickMeasureEffect>
    </Canvas>
  );
}
