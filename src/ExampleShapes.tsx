import { Sphere, Torus, TorusKnot, Tube } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import * as React from "react";
import { Suspense } from "react";
import * as THREE from "three";
import { GlitterMaterial } from "three-glitter-material";
import { Star } from "./Models/Star";
import "./style.css";
import { DragControls } from "three/examples/jsm/controls/DragControls";
import { useEffect } from "react";

export const ExampleShapes = ({ ...props }) => {
  const { camera, gl } = useThree();
  const sphereRef = React.useRef();
  const torusRef = React.useRef();
  const noodleRef = React.useRef();
  const donutRef = React.useRef();
  const ringsRef = React.useRef();

  const path = [
    new THREE.Vector3(-3.5, 0.8, 0),
    new THREE.Vector3(-2, 1.2, 0),
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(2, 1.2, 0),
  ];
  const tubeCurve = new THREE.CatmullRomCurve3(path);

  const customUniforms = {
    uGlitterSize: { value: 30.0 },
    uGlitterDensity: { value: 1.0 },
  };

  const glitterMaterial = new GlitterMaterial(customUniforms, {
    color: "#1129f5",
    side: THREE.DoubleSide,
  });

  useEffect(() => {
    const controls = new DragControls(
      [
        sphereRef.current,
        torusRef.current,
        noodleRef.current,
        donutRef.current,
        ringsRef.current,
      ],
      camera,
      gl.domElement
    );
  }, []);

  return (
    <>
      <Sphere
        ref={sphereRef}
        position={[0, 2, -10]}
        rotation={[-2.0, -1.0, 0.0]}
        args={[5, 30, 30, 0, Math.PI]}
        castShadow
        material={glitterMaterial}
      ></Sphere>

      <Torus
        ref={donutRef}
        position={[7, 5.5, -15]}
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

      <group ref={noodleRef} rotation={[0.05, 0.17, 0.3]}>
        <Tube
          position={[-5, -2.5, -5]}
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
        <Tube
          position={[-5, -1.5, -5]}
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
        <Tube
          position={[-5, -0.5, -5]}
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
      </group>
      <TorusKnot
        ref={torusRef}
        position={[-12, 5.5, -20]}
        rotation={[0, 0.45, 0.0]}
        args={[5, 0.633, 280, 20, 3, 18]}
        castShadow
      >
        <meshStandardMaterial
          attach="material"
          color="#00a04e"
          roughness={0.9}
        />
      </TorusKnot>
      <group ref={ringsRef} rotation={[2.18, 0.2, 0.8]}>
        <Torus
          position={[6, -2, 2]}
          rotation={[1.5, 0, 0.0]}
          args={[1.5, 0.24, 16, 100]}
          castShadow
        >
          <meshStandardMaterial
            attach="material"
            color="#ffc72a"
            roughness={0.9}
          />
        </Torus>
        <Torus
          position={[6, -1.5, 2]}
          rotation={[1.5, 0, 0.0]}
          args={[1.5, 0.24, 16, 100]}
          castShadow
        >
          <meshStandardMaterial
            attach="material"
            color="#ffc72a"
            roughness={0.9}
          />
        </Torus>
        <Torus
          position={[6, -1, 2]}
          rotation={[1.5, 0, 0.0]}
          args={[1.5, 0.24, 16, 100]}
          castShadow
        >
          <meshStandardMaterial
            attach="material"
            color="#ffc72a"
            roughness={0.9}
          />
        </Torus>
        <Torus
          position={[6, -0.5, 2]}
          rotation={[1.5, 0, 0.0]}
          args={[1.5, 0.24, 16, 100]}
          castShadow
        >
          <meshStandardMaterial
            attach="material"
            color="#ffc72a"
            roughness={0.9}
          />
        </Torus>
        <Torus
          position={[6, 0, 2]}
          rotation={[1.5, 0, 0.0]}
          args={[1.5, 0.24, 16, 100]}
          castShadow
        >
          <meshStandardMaterial
            attach="material"
            color="#ffc72a"
            roughness={0.9}
          />
        </Torus>
        <Torus
          position={[6, 0.5, 2]}
          rotation={[1.5, 0, 0.0]}
          args={[1.5, 0.24, 16, 100]}
          castShadow
        >
          <meshStandardMaterial
            attach="material"
            color="#ffc72a"
            roughness={0.9}
          />
        </Torus>
        <Torus
          position={[6, 1.0, 2]}
          rotation={[1.5, 0, 0.0]}
          args={[1.5, 0.24, 16, 100]}
          castShadow
        >
          <meshStandardMaterial
            attach="material"
            color="#ffc72a"
            roughness={0.9}
          />
        </Torus>
      </group>
      <Suspense fallback={null}>
        <Star
          position={[5.0, -2.0, -2.2]}
          scale={[1.5, 1.5, 1.5]}
          rotation={[-0.2, 1.35, 0.0]}
        />
      </Suspense>
    </>
  );
};
