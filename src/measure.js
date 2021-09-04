import * as THREE from '../node_modules/three/build/three.module.js'

export const findFaceVertex = function (intersect) {
  var vA = new THREE.Vector3()
  // var vB = new THREE.Vector3()
  // var vC = new THREE.Vector3()

  var geometry = intersect.object.geometry
  var position = geometry.attributes.position

  vA.fromBufferAttribute(position, intersect.face.a)
  // vB.fromBufferAttribute(position, face.b)
  // vC.fromBufferAttribute(position, face.c)

  vA.applyMatrix4(intersect.object.matrixWorld)
  // vB.applyMatrix4(intersectObject.matrixWorld)
  // vC.applyMatrix4(intersectObject.matrixWorld)

  const faceVertex = new THREE.Vector3(vA.x, vA.y, vA.z)
  return faceVertex
}

export const findStartPoint = function (selectedObject) {
  const toPositions = new THREE.Vector3()
  toPositions.setFromMatrixPosition(selectedObject.matrixWorld)

  const startPoint = new THREE.Vector3(
    toPositions.x,
    toPositions.y,
    toPositions.z
  )
  return startPoint
}
