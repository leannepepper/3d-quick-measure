import { Html, Line } from "@react-three/drei";
import * as React from "react";
import { useMemo } from "react";
import * as THREE from "three";
import { Measure } from "./Effects";
import {
  findXAxisExplicitLineEnd,
  findXAxisExplicitLineStart,
  findXAxisImplicitLineEnd,
  findXAxisImplicitLineStart,
  findYAxisExplicitLineEnd,
  findYAxisExplicitLineStart,
  findYAxisImplicitLineEnd,
  findYAxisImplicitLineStart,
} from "./measure";

export function Measurements(props: Measure) {
  if (props.hovered.length === 0 || props.selected.length === 0) {
    return null;
  }

  // Line 1
  const xAxisStartPoint = findXAxisImplicitLineStart(
    props.selected[0],
    props.hovered[0]
  );
  const xAxisEndPoint = findXAxisImplicitLineEnd(
    props.selected[0],
    props.hovered[0]
  );

  const pointsIX = useMemo(() => [xAxisStartPoint, xAxisEndPoint], []);

  // Line 2
  const yAxisStartPoint = findYAxisImplicitLineStart(
    props.selected[0],
    props.hovered[0]
  );
  const yAxisEndPoint = findYAxisImplicitLineEnd(
    props.selected[0],
    props.hovered[0]
  );

  const pointsIY = useMemo(() => [yAxisStartPoint, yAxisEndPoint], []);

  // Line 3
  const xAxisExplicitStartPoint = findXAxisExplicitLineStart(
    props.selected[0],
    props.hovered[0]
  );

  const xAxisExplicitEndPoint = findXAxisExplicitLineEnd(props.selected[0]);

  const pointsEX = useMemo(
    () => [xAxisExplicitStartPoint, xAxisExplicitEndPoint],
    []
  );

  // Line 4
  const yAxisExplicitStartPoint = findYAxisExplicitLineStart(
    props.selected[0],
    props.hovered[0]
  );

  const yAxisExplicitEndPoint = findYAxisExplicitLineEnd(props.selected[0]);

  const pointsEY = useMemo(
    () => [yAxisExplicitStartPoint, yAxisExplicitEndPoint],
    []
  );

  function midPoint(points: THREE.Vector3[]) {
    const midPoint = new THREE.Vector3();
    midPoint.x = (points[1].x + points[0].x) / 2;
    midPoint.y = (points[1].y + points[0].y) / 2;
    midPoint.z = 0;
    return midPoint;
  }

  return (
    <>
      <Line
        points={pointsIX}
        color={"red"}
        lineWidth={1}
        dashed={true}
        dashScale={2}
      />
      <Line
        points={pointsIY}
        color={"red"}
        lineWidth={1}
        dashed={true}
        dashScale={2}
      />
      <Line points={pointsEY} color={"blue"} lineWidth={1} dashed={false}>
        <group position={midPoint(pointsEY)}>
          <Html
            as="div"
            wrapperClass="measure-text"
            zIndexRange={[100, 0]}
            center
            transform={false}
            sprite={true}
          >
            <p>{Math.round(Math.abs(pointsEY[0].y - pointsEY[1].y))}</p>
          </Html>
        </group>
      </Line>
      <Line points={pointsEX} color={"blue"} lineWidth={1} dashed={false}>
        <group position={midPoint(pointsEX)}>
          <Html
            as="div"
            wrapperClass="measure-text"
            zIndexRange={[100, 0]}
            center
            transform={false}
            sprite={true}
          >
            <p>{Math.round(Math.abs(pointsEX[0].x - pointsEX[1].x))}</p>
          </Html>
        </group>
      </Line>
    </>
  );
}
