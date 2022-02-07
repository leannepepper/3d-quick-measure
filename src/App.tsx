import {
  Backdrop,
  Circle,
  Cylinder,
  MeshReflectorMaterial,
  OrbitControls,
  Sphere,
  Stage,
  Plane,
  Torus,
  Tube,
  TorusKnot,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import * as React from "react";
import { QuickMeasureEffect } from "./QuickMeasureEffects";
import { MeasuredMesh } from "./ExampleMesh";
import { MeasureText } from "./MeasureText";
import { Suspense } from "react";
import "./style.css";
import * as THREE from "three";

export default function App() {
  var path = [
    new THREE.Vector3(-3.5, 0.8, 0),
    new THREE.Vector3(-2, 1.2, 0),
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(2, 1.2, 0),
  ];
  const tubeCurve = new THREE.CatmullRomCurve3(path);
  //const tubeCurve = new THREE.Curve();

  return (
    <Canvas camera={{ position: [0, 3, 20], near: 0.1, far: 100, fov: 50 }}>
      <pointLight position={[-5, 10, 5]} intensity={1.0} />
      <pointLight position={[5, 10, 10]} intensity={1.0} />
      <ambientLight />
      <OrbitControls autoRotate={false} enableZoom={true} enablePan={true} />
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
          <MeasureText text="Quick" position={[0, 2, 0]} />
          <MeasureText text="Measure" position={[0, 0, 0]} />
        </Suspense>
        <Sphere
          position={[0, 2, -15]}
          rotation={[-2.0, -1.0, 0.0]}
          args={[5, 30, 30, 0, Math.PI]}
          castShadow
        >
          <meshStandardMaterial
            attach="material"
            color="#3182f6"
            roughness={0.7}
            side={THREE.DoubleSide}
          />
        </Sphere>
        <Torus
          position={[5, 0.5, -5]}
          rotation={[-0.6, 0.2, 0.0]}
          args={[3, 1.2, 22, 115]}
          castShadow
        >
          <meshStandardMaterial
            attach="material"
            color="#fe833a"
            roughness={0.7}
          />
        </Torus>
        <Torus
          position={[5, 0.5, -5]}
          rotation={[-0.6, 0.2, 0.0]}
          args={[1.5, 1.4, 22, 115]}
          castShadow
        >
          <meshStandardMaterial
            attach="material"
            color="#fe833a"
            roughness={0.7}
          />
        </Torus>
        <Tube
          position={[-5, 2.5, -5]}
          args={[tubeCurve, 63, 0.5, 10, false]}
          castShadow
        >
          <meshStandardMaterial
            attach="material"
            color="#ff9e94"
            roughness={0.7}
            side={THREE.DoubleSide}
          />
        </Tube>
        <TorusKnot
          position={[15, 5.5, -25]}
          rotation={[0, -0.45, 0.0]}
          args={[5, 0.633, 260, 20, 3, 18]}
          castShadow
        >
          <meshPhongMaterial
            attach="material"
            color="#00a04e"
            // roughness={0.9}
          />
        </TorusKnot>
      </QuickMeasureEffect>
    </Canvas>
  );
}
