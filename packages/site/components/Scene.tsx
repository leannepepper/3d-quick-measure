import * as THREE from "three";
import { Line, OrbitControls } from "@react-three/drei";
import {
  Canvas,
  extend,
  useThree,
  useFrame,
  ReactThreeFiber,
} from "@react-three/fiber";
import * as React from "react";
import { Suspense, useRef, useEffect, useMemo, useState } from "react";
import { QuickMeasure } from "react-three-quick-measure";
import { ExampleShapes } from "./Shapes";
import { MeasureText } from "./MeasureText";
import { GridLines } from "./GridLines";
import { Panels } from "./Panels";
import { ExampleText } from "./ExampleText";
import { Cube } from "./Cube";

export default function Scene() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    function handleResize(event) {
      setWindowSize({
        width: event.target.innerWidth,
        height: event.target.innerHeight,
      });
    }
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // return (
  //   <Canvas camera={{ position: [0, 0, 20], near: 0.1, far: 100, fov: 50 }}>
  //     <pointLight position={[5, 15, 10]} intensity={1.0} />
  //     <ambientLight intensity={0.7} />
  //     <OrbitControls autoRotate={false} enableZoom={true} enablePan={false} />
  //     <QuickMeasure>
  //       {/* <Cube /> */}
  //       <mesh position={[0, 7, 1]}>
  //         <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
  //         <meshStandardMaterial attach="material" color="pink" />
  //       </mesh>
  //       <mesh position={[6, 4, 1]}>
  //         <boxBufferGeometry attach="geometry" args={[2, 2, 2]} />
  //         <meshStandardMaterial attach="material" color="red" />
  //       </mesh>
  //       <mesh position={[-6, 2, 0]}>
  //         <boxBufferGeometry attach="geometry" args={[3, 10, 2]} />
  //         <meshStandardMaterial attach="material" color="darkgreen" />
  //       </mesh>
  //     </QuickMeasure>
  //   </Canvas>
  // );

  if (windowSize.width < 768) {
    return (
      <Canvas camera={{ position: [0, 0, 20], near: 0.1, far: 100, fov: 50 }}>
        <pointLight position={[5, 15, 10]} intensity={1.0} />
        <ambientLight intensity={0.7} />
        <OrbitControls autoRotate={false} enableZoom={true} enablePan={false} />
        <Line
          points={[
            new THREE.Vector3(-windowSize.width, -3, 0),
            new THREE.Vector3(windowSize.width, -3, 0),
          ]}
          color={"#000000"}
          lineWidth={2.0}
          alphaWrite={undefined}
        ></Line>
        <QuickMeasure>
          <Cube />
          <Suspense fallback={null}>
            <MeasureText text="Quick" position={[-1.5, -4.8, 0]} size={1.5} />
            <MeasureText text="Measure" position={[0, -7.8, 0]} size={1.5} />
          </Suspense>
        </QuickMeasure>
      </Canvas>
    );
  } else if (windowSize.width >= 768) {
    return (
      <Canvas camera={{ position: [0, 0, 20], near: 0.1, far: 100, fov: 50 }}>
        <pointLight position={[5, 15, 10]} intensity={1.0} />
        <ambientLight intensity={0.7} />
        <OrbitControls autoRotate={false} enableZoom={true} enablePan={false} />
        <GridLines />
        <Panels />
        <ExampleText />
        <QuickMeasure>
          <Suspense fallback={null}>
            <MeasureText text="Quick" position={[0.5, -4.8, 0]} />
            <MeasureText text="Measure" position={[2.5, -7.8, 0]} />
          </Suspense>
          <ExampleShapes />
        </QuickMeasure>
      </Canvas>
    );
  }
}
