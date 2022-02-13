import "./style.css";
import { OrbitControls } from "@react-three/drei";
import {
  Canvas,
  extend,
  useThree,
  useFrame,
  ReactThreeFiber,
} from "@react-three/fiber";
import * as React from "react";
import { Suspense, useRef } from "react";
import { ExampleShapes } from "./Shapes";
import { MeasureText } from "./MeasureText";
import { QuickMeasureEffect } from "./QuickMeasureEffects";
import { GridLines } from "./GridLines";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// extend({ OrbitControls });

// declare global {
//   namespace JSX {
//     interface IntrinsicElements {
//       orbitControls: ReactThreeFiber.Object3DNode<
//         OrbitControls,
//         typeof OrbitControls
//       >;
//     }
//   }
// }

// function Controls() {
//   const controls = useRef(null);
//   const { camera, gl } = useThree();
//   useFrame(() => controls.current.update());

//   return (
//     <orbitControls
//       ref={controls}
//       args={[camera, gl.domElement]}
//       enableDamping
//       dampingFactor={0.1}
//       rotateSpeed={0.5}
//     />
//   );
// }

export default function App() {
  const controlsRef = useRef();
  return (
    <Canvas camera={{ position: [0, 0, 20], near: 0.1, far: 100, fov: 50 }}>
      <pointLight position={[5, 15, 10]} intensity={1.0} />
      <ambientLight intensity={0.7} />
      <OrbitControls
        ref={controlsRef}
        autoRotate={false}
        enableZoom={true}
        enablePan={false}
      />
      {/* <Controls /> */}
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
