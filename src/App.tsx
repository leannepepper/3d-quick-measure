import "./style.css";
import * as THREE from "three";
// import React, { useEffect, useMemo, useRef } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
// import { OutlinePass } from "three/examples/jsm/postprocessing/OutlinePass";
// import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
// import { maybeDrawMeasurements } from "./line";
import * as React from "react";

import { Effects } from "./Effects";

function Measure(): any {
  const { size } = useThree();

  return null;
}

export default function App() {
  return (
    <Canvas
      camera={{
        position: [0, 0, 60],
        fov: 27,
        aspect: window.innerWidth / 2 / (window.innerHeight / 2),
        near: 1,
        far: 800,
      }}
    >
      <color attach="background" args={["#151515"]} />
      <ambientLight intensity={1.5} color={0x444444} />
      <OrbitControls autoRotate={false} enableZoom={false} enablePan={false} />
      <Measure />

      <Effects />
    </Canvas>
  );
}

// scene.updateMatrixWorld(true);

// /*
//  ** Boilerplate
//  */

// const raycaster = new THREE.Raycaster();

// // Mouse
// const mouse = new THREE.Vector2();
// let hoveredObjects:any = [];
// let selectedIntersect:any = [];

// // Events
// window.addEventListener("pointermove", (event) => {
//   mouse.x = (event.clientX / sizes.width) * 2 - 1;
//   mouse.y = -(event.clientY / sizes.height) * 2 + 1;

//   checkIntersection("pointermove");
// });

// window.addEventListener("click", () => {
//   checkIntersection("click");
// });

// function addSelectedObject(intersect:any) {
//   selectedIntersect = [];
//   selectedIntersect.push(intersect);
// }

// function addHoveredObject(object:any) {
//   hoveredObjects = [];
//   hoveredObjects.push(object);
// }

// function checkIntersection(eventName:any) {
//   // Raycast
//   raycaster.setFromCamera(mouse, camera);

//   const objectsToTest = [mesh1, mesh2, mesh3];
//   const intersects = raycaster.intersectObjects(objectsToTest, true);

//   if (intersects.length > 0) {
//     const intersectObject = intersects[0].object;
//     const intersect = intersects[0];

//     maybeDrawMeasurements(
//       scene,
//       selectedIntersect,
//       intersectObject,
//       intersects
//     );

//     if (
//       eventName === "pointermove" &&
//       (selectedIntersect.length === 0 ||
//         intersectObject !== selectedIntersect[0].object)
//     ) {
//       addHoveredObject(intersectObject);
//       hoverOutlinePass.selectedObjects = hoveredObjects;
//     } else if (eventName === "click") {
//       // remove hovered objects
//       hoverOutlinePass.selectedObjects = [];
//       hoveredObjects = [];

//       addSelectedObject(intersect);
//       selectedOutlinePass.selectedObjects = [selectedIntersect[0].object];
//     }
//   } else {
//     hoverOutlinePass.selectedObjects = [];
//     const xAxisImplicitMeasureLine = scene.getObjectByName("x-axis");
//     const yAxisImplicitMeasureLine = scene.getObjectByName("y-axis");
//     const xAxisExplicitMeasureLine = scene.getObjectByName("x-axis-explicit");
//     const yAxisExplicitMeasureLine = scene.getObjectByName("y-axis-explicit");

//     const previousXAxisText = document.getElementById("distanceTextY");
//     if (previousXAxisText) {
//       document.body.removeChild(previousXAxisText);
//     }
//     const previousYAxisText = document.getElementById("distanceTextX");
//     if (previousYAxisText) {
//       document.body.removeChild(previousYAxisText);
//     }

//     scene.remove(xAxisImplicitMeasureLine);
//     scene.remove(yAxisImplicitMeasureLine);
//     scene.remove(xAxisExplicitMeasureLine);
//     scene.remove(yAxisExplicitMeasureLine);
//   }
// }

// // Post processing

// const effectComposer = new EffectComposer(renderer);
// effectComposer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
// effectComposer.setSize(sizes.width, sizes.height);

// const renderPass = new RenderPass(scene, camera);
// effectComposer.addPass(renderPass);

// const hoverOutlinePass = new OutlinePass(
//   new THREE.Vector2(sizes.width, sizes.height),
//   scene,
//   camera
// );

// hoverOutlinePass.visibleEdgeColor = new THREE.Color(0x7a0606);
// hoverOutlinePass.hiddenEdgeColor = new THREE.Color(0x000000);
// hoverOutlinePass.edgeThickness = 2;
// hoverOutlinePass.edgeStrength = 10;

// effectComposer.addPass(hoverOutlinePass);

// const selectedOutlinePass = new OutlinePass(
//   new THREE.Vector2(sizes.width, sizes.height),
//   scene,
//   camera
// );

// selectedOutlinePass.visibleEdgeColor = new THREE.Color(0xffffff);
// selectedOutlinePass.hiddenEdgeColor = new THREE.Color(0x000000);
// selectedOutlinePass.edgeThickness = 2;
// selectedOutlinePass.edgeStrength = 10;

// effectComposer.addPass(selectedOutlinePass);

// const clock = new THREE.Clock();

// const tick = () => {

//   checkIntersection("pointermove");

//   controls.update();

//   //renderer.render(scene, camera)
//   effectComposer.render();

//   window.requestAnimationFrame(tick);
// };

// tick();
