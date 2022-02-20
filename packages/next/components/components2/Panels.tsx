import { Plane } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import * as React from "react";

export const Panels = ({ ...props }) => {
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
    </>
  );
};
