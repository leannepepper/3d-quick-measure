import * as THREE from "three";
import * as React from "react";

export function getMidPoint(points: THREE.Vector3[]) {
  const midPoint = new THREE.Vector3();
  midPoint.x = (points[1].x + points[0].x) / 2;
  midPoint.y = (points[1].y + points[0].y) / 2;
  midPoint.z = 0;
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
