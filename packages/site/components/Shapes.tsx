import { Sphere } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import * as React from "react";
import { Suspense, useState } from "react";
import { Cube } from "./Cube";
import { Triangle } from "./TriangleFractureBaked6";

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
        rotation={[-2.0, -1.0, 0.0]}
        args={[5, 60, 30, 0]}
        castShadow
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
          onClick={() => {
            setClicked(true);
          }}
          position={[gridWidth / 3, 1, -0.5]}
          rotation={[0.24, 0.0, 0.0]}
        />
      </Suspense>
    </>
  );
};
