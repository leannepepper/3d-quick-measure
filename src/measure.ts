const THREE = require("three/build/three.module");

export const findFaceVertex = function (intersect: any) {
  const vA = new THREE.Vector3();
  // var vB = new THREE.Vector3()
  // var vC = new THREE.Vector3()

  const geometry = intersect.object.geometry;
  const position = geometry.attributes.position;

  vA.fromBufferAttribute(position, intersect.face.a);
  // vB.fromBufferAttribute(position, face.b)
  // vC.fromBufferAttribute(position, face.c)

  vA.applyMatrix4(intersect.object.matrixWorld);
  // vB.applyMatrix4(intersectObject.matrixWorld)
  // vC.applyMatrix4(intersectObject.matrixWorld)

  const faceVertex = new THREE.Vector3(vA.x, vA.y, vA.z);
  return faceVertex;
};
