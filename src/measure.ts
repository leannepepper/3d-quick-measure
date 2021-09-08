const THREE = require("three/build/three.module");

export const findFaceVertex = function (intersect: any) {
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

  // console.log({ vA, vB, vC });

  const faceVertex = new THREE.Vector3(vA.x, vA.y, vA.z);
  return faceVertex;
};

export const findXAxisImplicitLineStart = function (
  selectedIntersect: any,
  hoverIntersect: any
) {
  // SelectedObj will provide the end point for implicit lines
  // HoverIntersect will provide the start point

  return findFaceVertex(hoverIntersect);
};

export const findXAxisImplicitLineEnd = function (
  selectedIntersect: any,
  hoverIntersect: any
) {
  // SelectedObj will provide the end point for implicit lines
  // HoverIntersect will provide the start point
  const hoverIntersectFaceVertex = findFaceVertex(hoverIntersect);
  const selectedIntersectFaceVertex = findFaceVertex(selectedIntersect);

  const endPoint = new THREE.Vector3(
    selectedIntersectFaceVertex.x,
    hoverIntersectFaceVertex.y,
    hoverIntersectFaceVertex.z
  );
  return endPoint;
};

export const findYAxisImplicitLineStart = function (
  selectedIntersect: any,
  hoverIntersect: any
) {
  // SelectedObj will provide the end point for implicit lines
  // HoverIntersect will provide the start point

  return findFaceVertex(hoverIntersect);
};

export const findYAxisImplicitLineEnd = function (
  selectedIntersect: any,
  hoverIntersect: any
) {
  // SelectedObj will provide the end point for implicit lines
  // HoverIntersect will provide the start point
  const hoverIntersectFaceVertex = findFaceVertex(hoverIntersect);
  const selectedIntersectFaceVertex = findFaceVertex(selectedIntersect);

  const endPoint = new THREE.Vector3(
    hoverIntersectFaceVertex.x,
    selectedIntersectFaceVertex.y,
    hoverIntersectFaceVertex.z
  );
  return endPoint;
};
