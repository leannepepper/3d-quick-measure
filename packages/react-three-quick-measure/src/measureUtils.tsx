import * as THREE from "three";
import * as React from "react";

export function getMidPoint(points: THREE.Vector3[]) {
  const midPoint = new THREE.Vector3();
  midPoint.x = (points[1].x + points[0].x) / 2;
  midPoint.y = (points[1].y + points[0].y) / 2;
  midPoint.z = (points[1].z + points[0].z) / 2;
  return midPoint;
}

export function getBoundingBox(selected: THREE.Mesh[]): THREE.Box3 {
  const boundingBox = new THREE.Box3();

  selected.forEach((obj3D: THREE.Mesh) => {
    obj3D.geometry.computeBoundingBox();
    const cloneBoundingBox = obj3D.geometry.boundingBox.clone();
    cloneBoundingBox.applyMatrix4(obj3D.matrixWorld);

    boundingBox.union(cloneBoundingBox);
  });
  return boundingBox;
}

export function MultiObjectBoundingBox({ ...props }) {
  const { multiSelected } = props;
  if (multiSelected.length < 2) {
    return null;
  }

  const boundingBox = getBoundingBox(multiSelected);

  return (
    <box3Helper
      box={boundingBox}
      args={[boundingBox, new THREE.Color(0xffffff)]}
    />
  );
}

export type Axis = "x" | "y" | "z";

export function getMainAxisStartAndEndPoints(
  selectedBoundingBox: THREE.Box3,
  hoveredBoundingBox: THREE.Box3,
  axis: Axis
) {
  if (selectedBoundingBox.min[axis] > hoveredBoundingBox.min[axis]) {
    return [hoveredBoundingBox.max[axis], selectedBoundingBox.max[axis]];
  } else if (selectedBoundingBox.min[axis] < hoveredBoundingBox.min[axis]) {
    return [hoveredBoundingBox.min[axis], selectedBoundingBox.min[axis]];
  } else {
    return [hoveredBoundingBox.max[axis], selectedBoundingBox.max[axis]];
  }
}

export function getClosestPointToSelected(
  selectedBoundingBox: THREE.Box3,
  hoveredBoundingBox: THREE.Box3,
  axis: Axis
): number {
  const goal = selectedBoundingBox.min[axis];

  const closestPoint = [
    hoveredBoundingBox.min[axis],
    hoveredBoundingBox.max[axis],
  ].reduce(function (prev, curr) {
    return Math.abs(curr - goal) < Math.abs(prev - goal) ? curr : prev;
  });
  return closestPoint;
}

export function getClosestPointToHovered(
  selectedBoundingBox: THREE.Box3,
  hoveredBoundingBox: THREE.Box3,
  axis: Axis
): number {
  const goal = hoveredBoundingBox.min[axis];

  const closestPoint = [
    selectedBoundingBox.min[axis],
    selectedBoundingBox.max[axis],
  ].reduce(function (prev, curr) {
    return Math.abs(curr - goal) < Math.abs(prev - goal) ? curr : prev;
  });
  return closestPoint;
}
