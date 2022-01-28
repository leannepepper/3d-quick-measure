import { Html, Line } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as React from "react";
import { useMemo } from "react";
import { Measure } from "./Effects";
import {
  getYIntersect,
  getXIntersect,
  getFaceVertex,
  getMidPoint,
} from "./measureUtils";

export function Measurements(props: Measure) {
  if (props.hovered.length === 0 || props.selected.length === 0) {
    return null;
  }

  const implicitAxisStartPoint = getFaceVertex(props.hovered[0]);
  const explicitAxisEndPoint = getFaceVertex(props.selected[0]);
  const xIntersectPoint = getXIntersect(props.selected[0], props.hovered[0]);
  const yIntersectPoint = getYIntersect(props.selected[0], props.hovered[0]);

  const pointsIX = useMemo(
    () => [implicitAxisStartPoint, xIntersectPoint],
    [implicitAxisStartPoint, xIntersectPoint]
  );
  const pointsIY = useMemo(
    () => [implicitAxisStartPoint, yIntersectPoint],
    [implicitAxisStartPoint, yIntersectPoint]
  );
  const pointsEX = useMemo(
    () => [yIntersectPoint, explicitAxisEndPoint],
    [yIntersectPoint, explicitAxisEndPoint]
  );
  const pointsEY = useMemo(
    () => [xIntersectPoint, explicitAxisEndPoint],
    [xIntersectPoint, explicitAxisEndPoint]
  );

  return (
    <>
      <Line
        points={pointsIX}
        color={"#e17327"}
        lineWidth={1}
        dashed={true}
        dashScale={2}
      />
      <Line
        points={pointsIY}
        color={"#e17327"}
        lineWidth={1}
        dashed={true}
        dashScale={2}
      />
      <Line points={pointsEY} color={"#932191"} lineWidth={2} dashed={false}>
        <group position={getMidPoint(pointsEY)}>
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
      <Line points={pointsEX} color={"#932191"} lineWidth={2} dashed={false}>
        <group position={getMidPoint(pointsEX)}>
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
