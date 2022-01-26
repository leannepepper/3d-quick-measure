import { Html, Line } from "@react-three/drei";
import * as React from "react";
import { useMemo } from "react";
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

  return (
    <>
      <Line
        points={pointsIX}
        color={"red"}
        lineWidth={2}
        dashed={true}
        dashScale={2}
      />
      <Line
        points={pointsIY}
        color={"red"}
        lineWidth={2}
        dashed={true}
        dashScale={2}
      />
      <Line points={pointsEY} color={"blue"} lineWidth={2} dashed={false}>
        <Html
          as="div"
          wrapperClass="measure-text"
          center
          distanceFactor={10}
          zIndexRange={[100, 0]}
          transform={false}
          sprite={true}
          onOcclude={(visible) => null}
        >
          <h1>{Math.abs(pointsEY[0].y - pointsEY[1].y)}</h1>
        </Html>
      </Line>
      <Line points={pointsEX} color={"blue"} lineWidth={2} dashed={false}>
        <Html
          as="div"
          wrapperClass="measure-text"
          distanceFactor={10}
          zIndexRange={[100, 0]}
          transform={false}
          sprite={true}
          onOcclude={(visible) => null}
        >
          <h1>{Math.abs(pointsEX[0].x - pointsEX[1].x)}</h1>
        </Html>
      </Line>
    </>
  );
}
