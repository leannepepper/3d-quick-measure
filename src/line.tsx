import { Html, Line } from "@react-three/drei";
import * as React from "react";
import * as THREE from "three";
import { Measure } from "./Effects";
import { getBoundingBox, getMidPoint } from "./measureUtils";

type Axis = "x" | "y" | "z";

function getClosestMainAxisPoint(
  selected: THREE.Mesh[],
  hovered: THREE.Mesh[],
  selectedBoundingBox: THREE.Box3,
  hoveredBoundingBox: THREE.Box3,
  axis: Axis
) {
  if (selected[0].position[axis] > hovered[0].position[axis]) {
    return [selectedBoundingBox.min[axis], hoveredBoundingBox.min[axis]];
  } else if (selected[0].position[axis] < hovered[0].position[axis]) {
    return [selectedBoundingBox.max[axis], hoveredBoundingBox.max[axis]];
  } else {
    return [selectedBoundingBox.min[axis], hoveredBoundingBox.min[axis]];
  }
}

function getClosestPointToHovered(
  multiSelectBoundingBox: THREE.Box3,
  hoveredBoundingBox: THREE.Box3,
  axis: Axis
): number {
  const goal = hoveredBoundingBox.min[axis];
  const closestPoint = [
    multiSelectBoundingBox.min[axis],
    multiSelectBoundingBox.max[axis],
  ].reduce(function (prev, curr) {
    return Math.abs(curr - goal) < Math.abs(prev - goal) ? curr : prev;
  });
  return closestPoint;
}

function getCrossAxisEndPoint(
  selected: THREE.Mesh[],
  hovered: THREE.Mesh[],
  hoveredBoundingBox: THREE.Box3,
  axis: Axis
) {
  if (selected[0].position[axis] < hovered[0].position[axis]) {
    return hoveredBoundingBox.min[axis];
  } else if (selected[0].position[axis] > hovered[0].position[axis]) {
    return hoveredBoundingBox.max[axis];
  } else {
    return hoveredBoundingBox.min[axis];
  }
}

export function MeasurementsFromBoundingBox(
  props: Measure
): null | JSX.Element {
  const { hovered, selected } = props;

  if (selected.length === 0 || hovered.length === 0) {
    return null;
  }

  const multiSelectBoundingBox = getBoundingBox(selected);
  hovered[0].geometry.computeBoundingBox();
  const hoveredBoundingBox = hovered[0].geometry.boundingBox.clone();
  hoveredBoundingBox.applyMatrix4(hovered[0].matrixWorld);

  const [mainXStart, mainXEnd] = getClosestMainAxisPoint(
    selected,
    hovered,
    multiSelectBoundingBox,
    hoveredBoundingBox,
    "x"
  );

  const [mainYStart, mainYEnd] = getClosestMainAxisPoint(
    selected,
    hovered,
    multiSelectBoundingBox,
    hoveredBoundingBox,
    "y"
  );

  const [mainZStart, mainZEnd] = getClosestMainAxisPoint(
    selected,
    hovered,
    multiSelectBoundingBox,
    hoveredBoundingBox,
    "z"
  );

  const mainX = [
    new THREE.Vector3(
      mainXStart,
      getClosestPointToHovered(multiSelectBoundingBox, hoveredBoundingBox, "y"),
      multiSelectBoundingBox.max.z
    ),
    new THREE.Vector3(
      mainXEnd,
      getClosestPointToHovered(multiSelectBoundingBox, hoveredBoundingBox, "y"),
      multiSelectBoundingBox.max.z
    ),
  ];

  const mainY = [
    new THREE.Vector3(
      getClosestPointToHovered(multiSelectBoundingBox, hoveredBoundingBox, "x"), //multiSelectBoundingBox.min.x, // this value should be dynamic, find the closest point to the hovered object
      mainYStart,
      multiSelectBoundingBox.max.z
    ),
    new THREE.Vector3(
      getClosestPointToHovered(multiSelectBoundingBox, hoveredBoundingBox, "x"), // multiSelectBoundingBox.min.x, // this value should be dynamic, find the closest point to the hovered object
      mainYEnd,
      multiSelectBoundingBox.max.z
    ),
  ];

  const mainZ = [
    new THREE.Vector3(
      getClosestPointToHovered(multiSelectBoundingBox, hoveredBoundingBox, "x"),
      getClosestPointToHovered(multiSelectBoundingBox, hoveredBoundingBox, "y"),
      mainZStart
    ),
    new THREE.Vector3(
      getClosestPointToHovered(multiSelectBoundingBox, hoveredBoundingBox, "x"),
      getClosestPointToHovered(multiSelectBoundingBox, hoveredBoundingBox, "y"),
      mainZEnd
    ),
  ];

  const crossX = [
    new THREE.Vector3(
      getClosestPointToHovered(multiSelectBoundingBox, hoveredBoundingBox, "x"),
      getMidPoint([hoveredBoundingBox.min, hoveredBoundingBox.max]).y,
      multiSelectBoundingBox.max.z
    ),
    new THREE.Vector3(
      getCrossAxisEndPoint(selected, hovered, hoveredBoundingBox, "x"),
      getMidPoint([hoveredBoundingBox.min, hoveredBoundingBox.max]).y,
      multiSelectBoundingBox.max.z
    ),
  ];
  const crossY = [
    new THREE.Vector3(
      getMidPoint([hoveredBoundingBox.min, hoveredBoundingBox.max]).x,
      getClosestPointToHovered(multiSelectBoundingBox, hoveredBoundingBox, "y"),
      multiSelectBoundingBox.max.z
    ),
    new THREE.Vector3(
      getMidPoint([hoveredBoundingBox.min, hoveredBoundingBox.max]).x,
      getCrossAxisEndPoint(selected, hovered, hoveredBoundingBox, "y"),
      multiSelectBoundingBox.max.z
    ),
  ];

  return (
    <>
      <Line
        points={mainX}
        color={"#4c9a2a"}
        lineWidth={1.0}
        dashed={true}
        dashScale={5.0}
      />
      <Line
        points={mainY}
        color={"#4c9a2a"}
        lineWidth={1.0}
        dashed={true}
        dashScale={5.0}
      />
      <Line
        points={mainZ}
        color={"#4c9a2a"}
        lineWidth={1.0}
        dashed={true}
        dashScale={5.0}
      />
      <Line points={crossX} color={"#932191"} lineWidth={1.0}>
        <group position={getMidPoint(crossX)}>
          <Html
            as="div"
            wrapperClass="measure-text"
            zIndexRange={[100, 0]}
            center
            transform={false}
            sprite={true}
          >
            <p>{Math.round(Math.abs(crossX[0].x - crossX[1].x))}</p>
          </Html>
        </group>
      </Line>
      <Line points={crossY} color={"#932191"} lineWidth={1.0}>
        <group position={getMidPoint(crossY)}>
          <Html
            as="div"
            wrapperClass="measure-text"
            zIndexRange={[100, 0]}
            center
            transform={false}
            sprite={true}
          >
            <p>{Math.round(Math.abs(crossY[0].y - crossY[1].y))}</p>
          </Html>
        </group>
      </Line>
    </>
  );
}
