import { Line, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import * as React from "react";
import { Suspense, useEffect, useState } from "react";
import { QuickMeasure } from "react-three-quick-measure";
import * as THREE from "three";
import { Cube } from "./Cube";
import { ExampleText } from "./ExampleText";
import { GridLines } from "./GridLines";
import { MeasureText } from "./MeasureText";
import { Panels } from "./Panels";
import { ExampleShapes } from "./Shapes";
import { GHLink } from "./GHLink";
import { A11yAnnouncer } from "@react-three/a11y";

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
      <>
        <Canvas camera={{ position: [0, 0, 20], near: 0.1, far: 100, fov: 50 }}>
          <pointLight position={[5, 15, 10]} intensity={1.0} />
          <ambientLight intensity={0.7} />

          <GHLink />
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
            <Cube includeHorizontalCube={true} />
            <Suspense fallback={null}>
              <MeasureText text="Quick" position={[-4, -5.5, 0]} size={1.5} />
              <MeasureText text="Measure" position={[-4, -7.8, 0]} size={1.5} />
            </Suspense>
          </QuickMeasure>
        </Canvas>
        <A11yAnnouncer />
      </>
    );
  } else if (windowSize.width >= 768) {
    return (
      <>
        <Canvas camera={{ position: [0, 0, 20], near: 0.1, far: 100, fov: 50 }}>
          <pointLight position={[5, 15, 10]} intensity={1.0} />
          <ambientLight intensity={0.7} />
          <OrbitControls
            autoRotate={false}
            enableZoom={true}
            enablePan={false}
          />
          <GridLines />
          <Panels />
          <ExampleText />
          <QuickMeasure>
            <Suspense fallback={null}>
              <MeasureText text="Quick" position={[-3, -5.8, 0]} />
              <MeasureText text="Measure" position={[-3, -8.8, 0]} />
            </Suspense>
            <ExampleShapes />
          </QuickMeasure>
        </Canvas>
        <A11yAnnouncer />
      </>
    );
  }
}
