import * as React from "react";
import { useCallback, useMemo } from "react";
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
import { convertToScreenCoordinates } from "./utils";

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

  const points = useMemo(() => [xAxisStartPoint, xAxisEndPoint], []);
  const onUpdateX = useCallback((line) => line.setFromPoints(points), [points]);

  // Line 2
  const yAxisStartPoint = findYAxisImplicitLineStart(
    props.selected[0],
    props.hovered[0]
  );
  const yAxisEndPoint = findYAxisImplicitLineEnd(
    props.selected[0],
    props.hovered[0]
  );

  const pointsY = useMemo(() => [yAxisStartPoint, yAxisEndPoint], []);
  const onUpdateY = useCallback(
    (line) => line.setFromPoints(pointsY),
    [pointsY]
  );

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
  const onUpdateEX = useCallback(
    (line) => line.setFromPoints(pointsEX),
    [pointsEX]
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
  const onUpdateEY = useCallback(
    (line) => line.setFromPoints(pointsEY),
    [pointsEY]
  );

  return (
    <>
      <line>
        <bufferGeometry attach="geometry" onUpdate={onUpdateX} />
        <lineBasicMaterial color={"hotpink"} linewidth={2} />
      </line>
      <line>
        <bufferGeometry attach="geometry" onUpdate={onUpdateY} />
        <lineBasicMaterial color={"hotpink"} linewidth={2} />
      </line>
      <line>
        <bufferGeometry attach="geometry" onUpdate={onUpdateEX} />
        <lineBasicMaterial color={"blue"} linewidth={2} />
      </line>
      <line>
        <bufferGeometry attach="geometry" onUpdate={onUpdateEY} />
        <lineBasicMaterial color={"blue"} linewidth={2} />
      </line>
    </>
  );
}
