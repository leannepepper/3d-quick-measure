import * as THREE from '../node_modules/three/build/three.module.js'
import { findFaceVertex } from './measure'

const createLine = function (startPoint, endPoint) {
  const lineMaterial = new THREE.LineBasicMaterial({ color: 0x00ff00 })
  const points = []
  const lineGeometry = new THREE.BufferGeometry()

  points.push(startPoint)
  points.push(endPoint)

  lineGeometry.setFromPoints(points)
  const line = new THREE.Line(lineGeometry, lineMaterial)
  line.name = 'x-axis'
  return line
}

const createText = function (startPoint, endPoint) {
  console.log(startPoint, endPoint)
  const previousText = document.getElementById('distanceText')
  if (previousText) {
    document.body.removeChild(previousText)
  }

  const text = startPoint.y - endPoint.y

  const distanceText = document.createElement('div')
  distanceText.style.position = 'absolute'
  distanceText.style.color = 'white'
  distanceText.style.width = 100
  distanceText.style.height = 100
  distanceText.style.borderRadius = '10px'
  distanceText.style.padding = '3px'
  distanceText.style.backgroundColor = '#FFA500'
  distanceText.innerHTML = text.toString()
  distanceText.style.top = 200 + 'px'
  distanceText.style.left = 200 + 'px'
  distanceText.id = 'distanceText'

  document.body.appendChild(distanceText)
}

export const maybeDrawMeasurements = function (
  scene,
  selectedIntersect,
  intersectObject,
  intersects
) {
  if (
    selectedIntersect.length !== 0 &&
    intersectObject !== selectedIntersect[0].object
  ) {
    let line = null

    const measureLine = scene.getObjectByName('x-axis')
    if (measureLine) {
      scene.remove(measureLine)
    }

    const startPoint = findFaceVertex(selectedIntersect[0])
    const endPoint = findFaceVertex(intersects[0])
    line = createLine(startPoint, endPoint)
    createText(startPoint, endPoint)

    scene.add(line)
  }
}
