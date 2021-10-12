const THREE = require("three/build/three.module");

import {
  findXAxisImplicitLineStart,
  findXAxisImplicitLineEnd,
  findYAxisImplicitLineStart,
  findYAxisImplicitLineEnd,
  findXAxisExplicitLineStart,
  findXAxisExplicitLineEnd,
} from "./measure";
import { convertToScreenCoordinates } from "./utils";

const createLine = function (
  startPoint: THREE.Vector3,
  endPoint: THREE.Vector3,
  name: string,
  color: THREE.Color
) {
  const lineMaterial = new THREE.LineBasicMaterial({
    color,
    linewidth: 1,
  });
  const points = [];
  const lineGeometry = new THREE.BufferGeometry();

  points.push(startPoint);
  points.push(endPoint);

  lineGeometry.setFromPoints(points);
  const line = new THREE.Line(lineGeometry, lineMaterial);
  line.name = name;
  return line;
};

const createText = function (
  startPoint: THREE.Vector3,
  endPoint: THREE.Vector3
) {
  const previousText = document.getElementById("distanceText");
  if (previousText) {
    document.body.removeChild(previousText);
  }

  const text = Math.abs(startPoint.x - endPoint.x);

  const x = (startPoint.x + endPoint.x) / 2;
  const y = (startPoint.y + endPoint.y) / 2;

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
  distanceText.id = "distanceText";

  return distanceText;
};

function removeLines(scene: THREE.Scene) {
  scene.remove(scene.getObjectByName("x-axis"));
  scene.remove(scene.getObjectByName("y-axis"));
  scene.remove(scene.getObjectByName("x-axis-explicit"));
}

export const maybeDrawMeasurements = function (
  scene: THREE.Scene,
  selectedIntersect: any[],
  intersectObject: {},
  intersects: any[]
) {
  if (
    selectedIntersect.length !== 0 &&
    intersectObject !== selectedIntersect[0].object
  ) {
    let xAxisImplicitLine = null;
    let yAxisImplicitLine = null;
    let xAxisExplicitLine = null;

    removeLines(scene);

    const xAxisStartPoint = findXAxisImplicitLineStart(
      selectedIntersect[0],
      intersects[0]
    );

    const xAxisEndPoint = findXAxisImplicitLineEnd(
      selectedIntersect[0],
      intersects[0]
    );

    const yAxisStartPoint = findYAxisImplicitLineStart(
      selectedIntersect[0],
      intersects[0]
    );

    const yAxisEndPoint = findYAxisImplicitLineEnd(
      selectedIntersect[0],
      intersects[0]
    );

    const xAxisExplicitStartPoint = findXAxisExplicitLineStart(
      selectedIntersect[0],
      intersects[0]
    );

    const xAxisExplicitEndPoint = findXAxisExplicitLineEnd(
      selectedIntersect[0]
    );

    xAxisImplicitLine = createLine(
      xAxisStartPoint,
      xAxisEndPoint,
      "x-axis",
      new THREE.Color(0xff0000)
    );
    yAxisImplicitLine = createLine(
      yAxisStartPoint,
      yAxisEndPoint,
      "y-axis",
      new THREE.Color(0xff0000)
    );
    xAxisExplicitLine = createLine(
      xAxisExplicitStartPoint,
      xAxisExplicitEndPoint,
      "x-axis-explicit",
      new THREE.Color(0xff00ff)
    );

    const distanceText = createText(xAxisStartPoint, xAxisEndPoint);
    let midPoint = new THREE.Vector3();

    midPoint.x = (xAxisEndPoint.x + xAxisStartPoint.x) / 2;
    midPoint.y = (xAxisEndPoint.y + xAxisStartPoint.y) / 2;
    midPoint.z = 0;

    const midPointScreenCoordinates = convertToScreenCoordinates(midPoint);
    distanceText.style.transform = `translate(-50%, -50%) translate(${midPointScreenCoordinates.x}px,${midPointScreenCoordinates.y}px)`;

    scene.add(xAxisImplicitLine);
    scene.add(yAxisImplicitLine);
    scene.add(xAxisExplicitLine);
    //document.body.appendChild(distanceText);
  }
};
