import * as THREE from '../node_modules/three/build/three.module.js'

export const createLine = function (startPoint, endPoint) {
  const lineMaterial = new THREE.LineBasicMaterial({ color: 0x0000ff })
  const points = []
  const lineGeometry = new THREE.BufferGeometry()

  points.push(startPoint)
  points.push(endPoint)

  lineGeometry.setFromPoints(points)
  const line = new THREE.Line(lineGeometry, lineMaterial)
  line.name = 'x-axis'
  return line
}

// export const destroyLine = function (){

// }
