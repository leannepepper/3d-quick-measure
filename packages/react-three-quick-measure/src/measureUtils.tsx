import * as THREE from "three";
import * as React from "react";

export function getMidPoint(points: THREE.Vector3[]) {
  const midPoint = new THREE.Vector3();
  midPoint.x = (points[1].x + points[0].x) / 2;
  midPoint.y = (points[1].y + points[0].y) / 2;
  midPoint.z = (points[1].z + points[0].z) / 2;
  return midPoint;
}

export function getBoundingBox(selected: any[]): THREE.Box3 {
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

export function getClosestMainAxisPoint(
  selected: THREE.Mesh[],
  hovered: THREE.Mesh[],
  selectedBoundingBox: THREE.Box3,
  hoveredBoundingBox: THREE.Box3,
  axis: Axis
) {
  if (selected[0].position[axis] > hovered[0].position[axis]) {
    return [hoveredBoundingBox.max[axis], selectedBoundingBox.max[axis]];
  } else if (selected[0].position[axis] < hovered[0].position[axis]) {
    return [hoveredBoundingBox.min[axis], selectedBoundingBox.min[axis]];
  } else {
    return [hoveredBoundingBox.max[axis], selectedBoundingBox.max[axis]];
  }
}

export function getClosestPointToSelected(
  multiSelectBoundingBox: THREE.Box3,
  hoveredBoundingBox: THREE.Box3,
  axis: Axis
): number {
  const goal = multiSelectBoundingBox.min[axis];

  const closestPoint = [
    hoveredBoundingBox.min[axis],
    hoveredBoundingBox.max[axis],
  ].reduce(function (prev, curr) {
    return Math.abs(curr - goal) < Math.abs(prev - goal) ? curr : prev;
  });
  return closestPoint;
}

export function getClosestPointToHovered(
  multiSelectBoundingBox: THREE.Box3,
  hoveredBoundingBox: THREE.Box3,
  axis: Axis
): number {
  const goal = hoveredBoundingBox.min[axis];

  const closestPoint = [
    multiSelectBoundingBox.min[axis],
    multiSelectBoundingBox.max[axis],
  ].reduce(function (prev, curr) {
    return Math.abs(curr - goal) < Math.abs(prev - goal) ? curr : prev;
  });
  return closestPoint;
}
