import { Sphere } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import * as React from "react";
import { Suspense, useState } from "react";
import * as THREE from "three";
import { Cube } from "./Cube";
import { Triangle } from "./TriangleFracture";

export const ExampleShapes = ({ ...props }) => {
  const { viewport, scene } = useThree();
  const gridWidth = viewport.width;
  const gridHeight = viewport.height;

  const [clicked, setClicked] = useState(false);

  return (
    <>
      <Suspense fallback={null}>
        <Cube />
      </Suspense>
      <Sphere
        position={[-gridWidth / 2, -gridHeight / 6, 0]}
        rotation={[0.0, -2.76, 1.58]}
        args={[5, 60, 30, 0, 2 * Math.PI, 0, 0.5 * Math.PI]}
      >
        <meshStandardMaterial
          attach="material"
          color="#fac407"
          roughness={0.9}
        />
      </Sphere>
      <Suspense fallback={null}>
        <Triangle
          visible={clicked}
          onClick={() => setClicked(true)}
          position={[gridWidth / 3, 1, -0.5]}
          rotation={[0.24, 0.0, 0.0]}
        />
      </Suspense>
    </>
  );
};
