import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import * as React from "react";
import { Effects } from "./Effects";
import "./style.css";

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
      <Effects />
    </Canvas>
  );
}

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
