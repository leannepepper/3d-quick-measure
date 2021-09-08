const THREE = require("three/build/three.module");

import { findFaceVertex } from "./measure";
import { convertToScreenCoordinates } from "./utils";

const createLine = function (
  startPoint: THREE.Vector3,
  endPoint: THREE.Vector3
) {
  const lineMaterial = new THREE.LineBasicMaterial({ color: 0x00ff00 });
  const points = [];
  const lineGeometry = new THREE.BufferGeometry();

  points.push(startPoint);
  points.push(endPoint);

  lineGeometry.setFromPoints(points);
  const line = new THREE.Line(lineGeometry, lineMaterial);
  line.name = "x-axis";
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

  const text = Math.abs(startPoint.y - endPoint.y);

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
    let line = null;
    const tempV = new THREE.Vector3();

    const measureLine = scene.getObjectByName("x-axis");
    if (measureLine) {
      scene.remove(measureLine);
    }

    const startPoint = findFaceVertex(selectedIntersect[0]);
    const endPoint = findFaceVertex(intersects[0]);
    line = createLine(startPoint, endPoint);
    const distanceText = createText(startPoint, endPoint);

    let midPoint = new THREE.Vector3();

    midPoint.x = (endPoint.x + startPoint.x) / 2;
    midPoint.y = (endPoint.y + startPoint.y) / 2;
    midPoint.z = 0;

    const midPointScreenCoordinates = convertToScreenCoordinates(midPoint);

    distanceText.style.transform = `translate(-50%, -50%) translate(${midPointScreenCoordinates.x}px,${midPointScreenCoordinates.y}px)`;

    scene.add(line);
    document.body.appendChild(distanceText);
  }
};