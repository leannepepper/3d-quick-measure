import * as React from "react";
import * as THREE from "three";
import { Line } from "@react-three/drei";
import { useThree } from "@react-three/fiber";

export function GridLines() {
  const { viewport } = useThree();

  const gridWidth = viewport.width;
  const gridHeight = viewport.height;

  const columnSize = gridWidth / 6;
  const rowSize = gridHeight / 6;

  const yAxisLine1 = [
    new THREE.Vector3(columnSize, rowSize * 3, 0),
    new THREE.Vector3(gridWidth / 6, -rowSize, 0),
  ];

  const yAxisLine2 = [
    new THREE.Vector3(-columnSize, rowSize * 3, 0),
    new THREE.Vector3(-columnSize, -rowSize, 0),
  ];

  const xAxisLine3 = [
    new THREE.Vector3(-columnSize, -rowSize, 0),
    new THREE.Vector3(columnSize * 3, -rowSize, 0),
  ];

  return (
    <>
      <Line
        points={yAxisLine1}
        color={"#000000"}
        lineWidth={2.0}
        alphaWrite={undefined}
      ></Line>
      <Line
        points={yAxisLine2}
        color={"#000000"}
        lineWidth={2.0}
        alphaWrite={undefined}
      ></Line>

      <Line
        points={xAxisLine3}
        color={"#000000"}
        lineWidth={2.0}
        alphaWrite={undefined}
      ></Line>
    </>
  );
}
