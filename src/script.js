import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import * as THREE from '../node_modules/three/build/three.module.js'

import { maybeDrawMeasurements } from './line.ts'
import './style.css'

export const canvas = document.querySelector('canvas.webgl')

const scene = new THREE.Scene()

const mesh1Geometry = new THREE.BoxGeometry(1, 1, 1)
const mesh1 = new THREE.Mesh(
  mesh1Geometry,
  new THREE.MeshBasicMaterial({
    color: 0x2c3e4c,
    side: THREE.DoubleSide
  })
)
const mesh2 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({
    color: 0x48aaad,
    side: THREE.DoubleSide
  })
)

const mesh3 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({
    color: 0xff00f0,
    side: THREE.DoubleSide
  })
)

mesh1.translateX(-1)
mesh2.translateX(1)
mesh2.translateY(3)
mesh3.translateY(4)
mesh3.translateX(-4)

scene.add(mesh1, mesh2, mesh3)

scene.updateMatrixWorld(true)

/*
 ** Boilerplate
 */

const raycaster = new THREE.Raycaster()

export const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

export const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
)

camera.position.z = 5
camera.position.x = 5
camera.position.y = 5

scene.add(camera)

// Mouse
const mouse = new THREE.Vector2()
let hoveredObjects = []
let selectedIntersect = []

// Events
window.addEventListener('pointermove', event => {
  mouse.x = (event.clientX / sizes.width) * 2 - 1
  mouse.y = -(event.clientY / sizes.height) * 2 + 1

  checkIntersection('pointermove')
})

window.addEventListener('click', () => {
  checkIntersection('click')
})

function addSelectedObject (intersect) {
  selectedIntersect = []
  selectedIntersect.push(intersect)
}

function addHoveredObject (object) {
  hoveredObjects = []
  hoveredObjects.push(object)
}

function checkIntersection (eventName) {
  // Raycast
  raycaster.setFromCamera(mouse, camera)

  const objectsToTest = [mesh1, mesh2, mesh3]
  const intersects = raycaster.intersectObjects(objectsToTest, true)

  if (intersects.length > 0) {
    const intersectObject = intersects[0].object
    const intersect = intersects[0]

    maybeDrawMeasurements(scene, selectedIntersect, intersectObject, intersects)

    if (
      eventName === 'pointermove' &&
      (selectedIntersect.length === 0 ||
        intersectObject !== selectedIntersect[0].object)
    ) {
      addHoveredObject(intersectObject)
      hoverOutlinePass.selectedObjects = hoveredObjects
    } else if (eventName === 'click') {
      // remove hovered objects
      hoverOutlinePass.selectedObjects = []
      hoveredObjects = []

      addSelectedObject(intersect)
      selectedOutlinePass.selectedObjects = [selectedIntersect[0].object]
    }
  } else {
    hoverOutlinePass.selectedObjects = []
    const xAxisImplicitMeasureLine = scene.getObjectByName('x-axis')
    const yAxisImplicitMeasureLine = scene.getObjectByName('y-axis')
    const xAxisExplicitMeasureLine = scene.getObjectByName('x-axis-explicit')

    const previousText = document.getElementById('distanceText')
    if (previousText) {
      document.body.removeChild(previousText)
    }

    scene.remove(xAxisImplicitMeasureLine)
    scene.remove(yAxisImplicitMeasureLine)
    scene.remove(xAxisExplicitMeasureLine)
  }
}

window.addEventListener('resize', () => {
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// Render

const renderer = new THREE.WebGLRenderer({
  canvas: canvas
})

renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// Post processing

const effectComposer = new EffectComposer(renderer)
effectComposer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
effectComposer.setSize(sizes.width, sizes.height)

const renderPass = new RenderPass(scene, camera)
effectComposer.addPass(renderPass)

const hoverOutlinePass = new OutlinePass(
  new THREE.Vector2(sizes.width, sizes.height),
  scene,
  camera
)

hoverOutlinePass.visibleEdgeColor = new THREE.Color(0x7a0606)
hoverOutlinePass.hiddenEdgeColor = new THREE.Color(0x000000)
hoverOutlinePass.edgeThickness = 2
hoverOutlinePass.edgeStrength = 10

effectComposer.addPass(hoverOutlinePass)

const selectedOutlinePass = new OutlinePass(
  new THREE.Vector2(sizes.width, sizes.height),
  scene,
  camera
)

selectedOutlinePass.visibleEdgeColor = new THREE.Color(0xffffff)
selectedOutlinePass.hiddenEdgeColor = new THREE.Color(0x000000)
selectedOutlinePass.edgeThickness = 2
selectedOutlinePass.edgeStrength = 10

effectComposer.addPass(selectedOutlinePass)

const clock = new THREE.Clock()

const tick = () => {
  const elapsedTime = clock.getElapsedTime()

  mesh2.position.y = Math.sin(elapsedTime * 0.8) * 1.5
  checkIntersection('pointermove')

  controls.update()

  //renderer.render(scene, camera)
  effectComposer.render()

  window.requestAnimationFrame(tick)
}

tick()
