//import "./style.css";
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
import { ExampleShapes } from "../../next/components/components2/Shapes";
import { MeasureText } from "../../next/components/components2/MeasureText";
//import { QuickMeasure } from "../../react-three-quick-measure/QuickMeasure";
import { GridLines } from "../../next/components/components2/GridLines";
import { Panels } from "../../next/components/components2/Panels";
import { ExampleText } from "../../next/components/components2/ExampleText";
import { Cube } from "../../next/components/components2/Cube";

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
        {/* <QuickMeasure> */}
        <Cube />
        <Suspense fallback={null}>
          <MeasureText text="Quick" position={[-1.5, -4.8, 0]} size={1.5} />
          <MeasureText text="Measure" position={[0, -7.8, 0]} size={1.5} />
        </Suspense>
        {/* </QuickMeasure> */}
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
        {/* <QuickMeasure> */}
        <Suspense fallback={null}>
          <MeasureText text="Quick" position={[0.5, -4.8, 0]} />
          <MeasureText text="Measure" position={[2.5, -7.8, 0]} />
        </Suspense>
        <ExampleShapes />
        {/* </QuickMeasure> */}
      </Canvas>
    );
  }
}
