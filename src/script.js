import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import * as THREE from '../node_modules/three/build/three.module.js'
import './style.css'
import { faceVertex } from './measure'

const canvas = document.querySelector('canvas.webgl')

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

mesh1.translateX(-1)
mesh2.translateX(3)

scene.add(mesh1)
scene.add(mesh2)
scene.updateMatrixWorld(true)

/*
 ** Measure
 */

const position1 = new THREE.Vector3()
const position2 = new THREE.Vector3()

position1.setFromMatrixPosition(mesh1.matrixWorld)
position2.setFromMatrixPosition(mesh2.matrixWorld)

// Create Line
const lineMaterial = new THREE.LineBasicMaterial({ color: 0x0000ff })

const points = []
points.push(new THREE.Vector3(position1.x, position1.y, position1.z))
//points.push(new THREE.Vector3(position2.x, position2.y, position2.z))
const lineGeometry = new THREE.BufferGeometry().setFromPoints(points)

const line = new THREE.Line(lineGeometry, lineMaterial)

//scene.add(line)

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

window.addEventListener('click', () => {
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
    const intersectObject = intersects[0].object
    // find the face that was selected

    const vertex = faceVertex(intersects[0])
    points.push(vertex)
    lineGeometry.setFromPoints(points)
    scene.add(line)

    if (eventName === 'pointermove' && intersectObject !== selectedObjects[0]) {
      addHoveredObject(intersectObject)
      hoverOutlinePass.selectedObjects = hoveredObjects
    } else if (eventName === 'click') {
      // remove hovered objects
      hoverOutlinePass.selectedObjects = []
      hoveredObjects = []

      addSelectedObject(intersectObject)
      selectedOutlinePass.selectedObjects = selectedObjects
    }
    //console.log(selectedObjects, hoveredObjects)
  } else {
    hoverOutlinePass.selectedObjects = []
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

  controls.update()

  //renderer.render(scene, camera)
  effectComposer.render()

  window.requestAnimationFrame(tick)
}

tick()
