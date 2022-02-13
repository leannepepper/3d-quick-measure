import { Plane, Sphere, Cone } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import * as React from "react";
import { Suspense } from "react";
import { CubeOutline } from "./RoundedThinCubeOutline";
import { TriangleAnimation } from "./OutlineTriangleAnimation";

export const ExampleShapes = ({ ...props }) => {
  const { viewport } = useThree();
  const gridWidth = viewport.width;
  const gridHeight = viewport.height;

  return (
    <>
      <Plane
        position={[-gridWidth / 3, -gridHeight / 3, -0.01]}
        args={[gridWidth / 3, gridHeight / 3]}
      >
        <meshStandardMaterial
          attach="material"
          color="#000000"
          roughness={0.9}
        />
      </Plane>
      <Plane
        position={[-gridWidth / 3, gridHeight / 12, -0.01]}
        args={[gridWidth / 3, gridHeight / 6]}
      >
        <meshStandardMaterial
          attach="material"
          color="#000000"
          roughness={0.9}
        />
      </Plane>
      <Plane
        position={[-gridWidth / 3, -gridHeight / 12, -0.01]}
        args={[gridWidth / 3, gridHeight / 6]}
      >
        <meshStandardMaterial
          attach="material"
          color="#000000"
          roughness={0.9}
        />
      </Plane>
      <Plane
        position={[gridWidth / 3, gridHeight / 3, -0.01]}
        args={[gridWidth / 3, gridHeight / 3]}
      >
        <meshStandardMaterial
          attach="material"
          color="#000000"
          roughness={0.9}
        />
      </Plane>
      <Suspense fallback={null}>
        <CubeOutline position={[0, gridHeight / 3, 0]} rotation={[0.3, 0, 0]} />
      </Suspense>
      <Sphere
        position={[-gridWidth / 2, -gridHeight / 6, 0]}
        rotation={[-2.0, -1.0, 0.0]}
        args={[gridWidth / 3.8, 60, 30, 0]}
        castShadow
      >
        <meshStandardMaterial
          attach="material"
          color="#fac407"
          roughness={0.9}
        />
      </Sphere>
      <Suspense fallback={null}>
        <TriangleAnimation position={[gridWidth / 3, gridHeight / 6, 1]} />
      </Suspense>
    </>
  );
};
