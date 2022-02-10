import { Plane, Sphere, Cone } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import * as React from "react";

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
      <Cone
        position={[gridWidth / 3, gridHeight / 3, 0]}
        rotation={[0.22, 1.0, 0]}
        args={[2, 3, 3, 1]}
      >
        <meshStandardMaterial
          attach="material"
          color="#fac407"
          roughness={0.9}
        />
      </Cone>
      <Sphere
        position={[-gridWidth / 3, -gridHeight / 2.1, 0]}
        rotation={[-2.0, -1.0, 0.0]}
        args={[3.5, 60, 30, 0]}
        castShadow
      >
        <meshStandardMaterial
          attach="material"
          color="#fac407"
          roughness={0.9}
        />
      </Sphere>
    </>
  );
};
