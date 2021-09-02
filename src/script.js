import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import * as THREE from '../node_modules/three/build/three.module.js'
import './style.css'

const canvas = document.querySelector('canvas.webgl')

const scene = new THREE.Scene()

const mesh1 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({
    color: 0xff0000,
    side: THREE.DoubleSide
  })
)
const mesh2 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({
    color: 0xffff00,
    side: THREE.DoubleSide
  })
)

mesh1.translateX(-1)
mesh2.translateX(1)

scene.add(mesh1)
scene.add(mesh2)

/*
 ** Boilerplate
 */

const raycaster = new THREE.Raycaster()

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
)

camera.position.z = 5
scene.add(camera)

// Mouse
const mouse = new THREE.Vector2()
let hoveredObjects = []
let selectedObjects = []

// Events
window.addEventListener('pointermove', event => {
  mouse.x = (event.clientX / sizes.width) * 2 - 1
  mouse.y = -(event.clientY / sizes.height) * 2 + 1

  checkIntersection('pointermove')
})

window.addEventListener('click', event => {
  checkIntersection('click')
})

function addSelectedObject (object) {
  selectedObjects = []
  selectedObjects.push(object)
}

function addHoveredObject (object) {
  hoveredObjects = []
  hoveredObjects.push(object)
}

function checkIntersection (eventName) {
  // Raycast
  raycaster.setFromCamera(mouse, camera)

  const objectsToTest = [mesh1, mesh2]
  const intersects = raycaster.intersectObjects(objectsToTest, true)

  if (intersects.length > 0) {
    const selectedObject = intersects[0].object
    if (eventName === 'pointermove') {
      addSelectedObject(selectedObject)
      outlinePass.selectedObjects = selectedObjects
    } else if (eventName === 'click') {
      addHoveredObject(selectedObject)
      //outlinePass.selectedObjects = selectedObjects
    }
  } else {
    outlinePass.selectedObjects = []
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

const outlinePass = new OutlinePass(
  new THREE.Vector2(sizes.width, sizes.height),
  scene,
  camera
)

outlinePass.visibleEdgeColor = new THREE.Color(0xffffff)
outlinePass.hiddenEdgeColor = new THREE.Color(0x000000)
outlinePass.edgeThickness = 1
outlinePass.edgeStrength = 3

effectComposer.addPass(outlinePass)

const clock = new THREE.Clock()

const tick = () => {
  const elapsedTime = clock.getElapsedTime()

  mesh1.position.y = Math.sin(elapsedTime * 0.1) * 1.5
  mesh2.position.y = Math.sin(elapsedTime * 0.8) * 1.5

  controls.update()

  //renderer.render(scene, camera)
  effectComposer.render()

  window.requestAnimationFrame(tick)
}

tick()
