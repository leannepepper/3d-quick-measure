import * as THREE from "three";
import * as React from "react";
import {
  useRef,
  useMemo,
  useEffect,
  useState,
  createContext,
  useContext,
  useCallback,
} from "react";
import {
  ReactThreeFiber,
  useFrame,
  extend,
  useThree,
} from "@react-three/fiber";

import {
  findXAxisImplicitLineStart,
  findXAxisImplicitLineEnd,
  findYAxisImplicitLineStart,
  findYAxisImplicitLineEnd,
  findXAxisExplicitLineStart,
  findXAxisExplicitLineEnd,
  findYAxisExplicitLineStart,
  findYAxisExplicitLineEnd,
} from "./measure";
import { convertToScreenCoordinates } from "./utils";
import { Measure } from "./Effects";

const createText = function (id: string, startPoint: number, endPoint: number) {
  const previousText = document.getElementById(id);
  if (previousText) {
    document.body.removeChild(previousText);
  }

  const text = Math.abs(startPoint - endPoint);

  // const x = (startPoint.x + endPoint.x) / 2;
  // const y = (startPoint.y + endPoint.y) / 2;

  const distanceText = document.createElement("div");
  distanceText.style.position = "absolute";
  distanceText.style.color = "white";
  distanceText.style.width = "100";
  distanceText.style.height = "100";
  distanceText.style.borderRadius = "10px";
  distanceText.style.padding = "3px";
  distanceText.style.backgroundColor = "#FFA500";
  distanceText.innerHTML = text.toString();
  distanceText.style.top = 0 + "px";
  distanceText.style.left = 0 + "px";
  distanceText.id = id;

  return distanceText;
};

const positionDistanceText = function (
  distanceText: HTMLDivElement,
  axisStart: any,
  axisEnd: any
) {
  let midPoint = new THREE.Vector3();

  midPoint.x = (axisEnd.x + axisStart.x) / 2;
  midPoint.y = (axisEnd.y + axisStart.y) / 2;
  midPoint.z = 0;

  const midPointScreenCoordinates = convertToScreenCoordinates(midPoint);
  distanceText.style.transform = `translate(-50%, -50%) translate(${midPointScreenCoordinates.x}px,${midPointScreenCoordinates.y}px)`;

  document.body.appendChild(distanceText);
};

function removeLines(scene: THREE.Scene) {
  scene.remove(scene.getObjectByName("x-axis"));
  scene.remove(scene.getObjectByName("y-axis"));
  scene.remove(scene.getObjectByName("x-axis-explicit"));
  scene.remove(scene.getObjectByName("y-axis-explicit"));
}

function findFaceVertex(intersect: any) {
  //console.log({ intersect });
  const vA = new THREE.Vector3();
  const vB = new THREE.Vector3();
  const vC = new THREE.Vector3();

  const geometry = intersect.object.geometry;
  const position = geometry.attributes.position;

  vA.fromBufferAttribute(position, intersect.face.a);
  vB.fromBufferAttribute(position, intersect.face.b);
  vC.fromBufferAttribute(position, intersect.face.c);

  vA.applyMatrix4(intersect.object.matrixWorld);
  vB.applyMatrix4(intersect.object.matrixWorld);
  vC.applyMatrix4(intersect.object.matrixWorld);

  // console.log({ vA, vB, vC });

  const faceVertex = new THREE.Vector3(vA.x, vA.y, vA.z);
  return faceVertex;
}

export function Measurements(props: Measure) {
  //console.log({ ...props });
  if (props.hovered.length === 0 || props.selected.length === 0) {
    return null;
  }

  // const xAxisStartPoint = findXAxisImplicitLineStart(
  //   selectedIntersect[0],
  //   intersects[0]
  // );

  // const xAxisEndPoint = findXAxisImplicitLineEnd(
  //   selectedIntersect[0],
  //   intersects[0]
  // );

  const points = useMemo(
    () => [new THREE.Vector3(0, 4, 0), new THREE.Vector3(6, 4, 0)],
    []
  );
  const onUpdate = useCallback((line) => line.setFromPoints(points), [points]);

  return (
    <line>
      <bufferGeometry attach="geometry" onUpdate={onUpdate} />
      <lineBasicMaterial color={"hotpink"} linewidth={2} />
    </line>
  );
}

// export const maybeDrawMeasurements = function (
//   selectedIntersect: any[],
//   intersectObject: {},
//   intersects: any[]
// ) {
//   const { scene } = useThree();
//   if (
//     selectedIntersect.length !== 0 &&
//     intersectObject !== selectedIntersect[0].object
//   ) {
//     let xAxisImplicitLine = null;
//     let yAxisImplicitLine = null;
//     let xAxisExplicitLine = null;
//     let yAxisExplicitLine = null;

//     removeLines(scene);

//     const xAxisStartPoint = findXAxisImplicitLineStart(
//       selectedIntersect[0],
//       intersects[0]
//     );

//     const xAxisEndPoint = findXAxisImplicitLineEnd(
//       selectedIntersect[0],
//       intersects[0]
//     );

//     const yAxisStartPoint = findYAxisImplicitLineStart(
//       selectedIntersect[0],
//       intersects[0]
//     );

//     const yAxisEndPoint = findYAxisImplicitLineEnd(
//       selectedIntersect[0],
//       intersects[0]
//     );

//     const xAxisExplicitStartPoint = findXAxisExplicitLineStart(
//       selectedIntersect[0],
//       intersects[0]
//     );

//     const xAxisExplicitEndPoint = findXAxisExplicitLineEnd(
//       selectedIntersect[0]
//     );

//     const yAxisExplicitStartPoint = findYAxisExplicitLineStart(
//       selectedIntersect[0],
//       intersects[0]
//     );

//     const yAxisExplicitEndPoint = findYAxisExplicitLineEnd(
//       selectedIntersect[0]
//     );

//     xAxisImplicitLine = createLine(
//       xAxisStartPoint,
//       xAxisEndPoint,
//       "x-axis",
//       new THREE.Color(0xff0000)
//     );
//     yAxisImplicitLine = createLine(
//       yAxisStartPoint,
//       yAxisEndPoint,
//       "y-axis",
//       new THREE.Color(0xff0000)
//     );
//     xAxisExplicitLine = createLine(
//       xAxisExplicitStartPoint,
//       xAxisExplicitEndPoint,
//       "x-axis-explicit",
//       new THREE.Color(0xff00ff)
//     );
//     yAxisExplicitLine = createLine(
//       yAxisExplicitStartPoint,
//       yAxisExplicitEndPoint,
//       "y-axis-explicit",
//       new THREE.Color(0xff00ff)
//     );

//     const xDistanceText = createText(
//       "distanceTextX",
//       xAxisExplicitStartPoint.x,
//       xAxisExplicitEndPoint.x
//     );

//     positionDistanceText(
//       xDistanceText,
//       xAxisExplicitStartPoint,
//       xAxisExplicitEndPoint
//     );
//     const yDistanceText = createText(
//       "distanceTextY",
//       yAxisExplicitStartPoint.y,
//       yAxisExplicitEndPoint.y
//     );

//     positionDistanceText(
//       yDistanceText,
//       yAxisExplicitStartPoint,
//       yAxisExplicitEndPoint
//     );

//     scene.add(xAxisImplicitLine);
//     scene.add(yAxisImplicitLine);
//     scene.add(xAxisExplicitLine);
//     scene.add(yAxisExplicitLine);
//   }
// };
