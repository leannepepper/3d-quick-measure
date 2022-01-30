import { useHelper } from "@react-three/drei";
import * as React from "react";
import { useRef } from "react";
import * as THREE from "three";
import { Box3Helper } from "three";

export const getFaceVertex = function (intersect: any) {
  const vA = new THREE.Vector3();
  const vB = new THREE.Vector3();
  const vC = new THREE.Vector3();

  const geometry = intersect.object.geometry;
  const position = geometry.attributes.position;

  vA.fromBufferAttribute(position, intersect.face.a);
  vB.fromBufferAttribute(position, intersect.face.b);
  vC.fromBufferAttribute(position, intersect.face.c);

  vA.applyMatrix4(intersect.object.matrixWorld);
  vB.applyMatrix4(intersect.object.matrixWorld);
  vC.applyMatrix4(intersect.object.matrixWorld);

  const faceVertex = new THREE.Vector3(vA.x, vA.y, vA.z);
  return faceVertex;
};

export const getXIntersect = function (
  selectedIntersect: any,
  hoverIntersect: any
) {
  const hoverIntersectFaceVertex = getFaceVertex(hoverIntersect);
  const selectedIntersectFaceVertex = getFaceVertex(selectedIntersect);

  const endPoint = new THREE.Vector3(
    selectedIntersectFaceVertex.x,
    hoverIntersectFaceVertex.y,
    hoverIntersectFaceVertex.z
  );
  return endPoint;
};

export const getYIntersect = function (
  selectedIntersect: any,
  hoverIntersect: any
) {
  const hoverIntersectFaceVertex = getFaceVertex(hoverIntersect);
  const selectedIntersectFaceVertex = getFaceVertex(selectedIntersect);

  const endPoint = new THREE.Vector3(
    hoverIntersectFaceVertex.x,
    selectedIntersectFaceVertex.y,
    hoverIntersectFaceVertex.z
  );
  return endPoint;
};

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

  return <box3Helper box={boundingBox} />;
}
