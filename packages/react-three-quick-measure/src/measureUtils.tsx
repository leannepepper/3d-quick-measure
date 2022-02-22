import * as THREE from "three";
import * as React from "react";

export const quickMeasureTheme = {
  colors: {
    mainAxis: "#41a5f5",
    crossAxis: "#f17720",
  },
};

export function getMidPoint(points: THREE.Vector3[]) {
  const midPoint = new THREE.Vector3();
  midPoint.x = (points[1].x + points[0].x) / 2;
  midPoint.y = (points[1].y + points[0].y) / 2;
  midPoint.z = (points[1].z + points[0].z) / 2;
  return midPoint;
}

export function getBoundingBox(multiSelected: any[]): THREE.Box3 {
  const boundingBox = new THREE.Box3();
  const group = new THREE.Group();
  const clones: any[] = [];

  multiSelected.forEach((obj3D: THREE.Mesh) => {
    const clone = obj3D.clone();
    clones.push(clone);
  });

  group.add(...clones);
  boundingBox.setFromObject(group);
  return boundingBox;
}

export function MultiObjectBoundingBox({ ...props }) {
  const { multiSelected } = props;
  if (multiSelected.length < 1) {
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
export type Boundary = "min" | "max";

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
  axis: Axis,
  boundary: Boundary
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

export function getCrossAxisEndPoint(
  selected: THREE.Mesh[],
  hovered: THREE.Mesh[],
  multiSelectBoundingBox: THREE.Box3,
  axis: Axis
) {
  if (selected[0].position[axis] > hovered[0].position[axis]) {
    return multiSelectBoundingBox.min[axis];
  } else if (selected[0].position[axis] < hovered[0].position[axis]) {
    return multiSelectBoundingBox.max[axis];
  } else {
    return multiSelectBoundingBox.min[axis];
  }
}
