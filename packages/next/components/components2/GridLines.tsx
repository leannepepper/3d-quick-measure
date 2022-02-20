import * as React from "react";
import * as THREE from "three";
import { Line } from "@react-three/drei";
import { useThree } from "@react-three/fiber";

export function GridLines() {
  const { viewport, camera } = useThree();
  const gridWidth = viewport.width;
  const gridHeight = viewport.height;

  const yAxisLine1 = [
    new THREE.Vector3(gridWidth / 6, gridHeight, 0),
    new THREE.Vector3(gridWidth / 6, 0, 0),
    new THREE.Vector3(gridWidth / 6, -gridHeight / 6, 0),
  ];

  const yAxisLine2 = [
    new THREE.Vector3(-gridWidth / 6, gridHeight, 0),
    new THREE.Vector3(-gridWidth / 6, 0, 0),
    new THREE.Vector3(-gridWidth / 6, -gridHeight, 0),
  ];

  const xAxisLine1 = [
    new THREE.Vector3(-gridWidth, gridHeight / 6, 0),
    new THREE.Vector3(-gridWidth / 6, gridHeight / 6, 0),
  ];

  const xAxisLine2 = [
    new THREE.Vector3(gridWidth / 6, gridHeight / 6, 0),
    new THREE.Vector3(gridWidth, gridHeight / 6, 0),
  ];

  const xAxisLine3 = [
    new THREE.Vector3(-gridWidth, -gridHeight / 6, 0),
    new THREE.Vector3(0, -gridHeight / 6, 0),
    new THREE.Vector3(gridWidth, -gridHeight / 6, 0),
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
        points={xAxisLine1}
        color={"#000000"}
        lineWidth={2.0}
        alphaWrite={undefined}
      ></Line>
      <Line
        points={xAxisLine2}
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
