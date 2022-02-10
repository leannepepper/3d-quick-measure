import { Sphere } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import * as React from "react";

export const ExampleShapes = ({ ...props }) => {
  const { camera, gl } = useThree();

  return (
    <Sphere
      position={[0, 2, -10]}
      rotation={[-2.0, -1.0, 0.0]}
      args={[5, 30, 30, 0]}
      castShadow
    >
      <meshStandardMaterial attach="material" color="#fac407" roughness={0} />
    </Sphere>
  );
};
