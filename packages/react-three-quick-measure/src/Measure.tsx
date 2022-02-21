import { Html, Line } from "@react-three/drei";
import * as React from "react";
import * as THREE from "three";
import type { Measure } from "./QuickMeasure";
import { getBoundingBox, getMidPoint, quickMeasureTheme } from "./measureUtils";

type Axis = "x" | "y" | "z";

function getClosestMainAxisPoint(
  selected: THREE.Mesh[],
  hovered: THREE.Mesh[],
  selectedBoundingBox: THREE.Box3,
  hoveredBoundingBox: THREE.Box3,
  axis: Axis
) {
  if (selected[0].position[axis] > hovered[0].position[axis]) {
    return [hoveredBoundingBox.max[axis], selectedBoundingBox.max[axis]];
  } else if (selected[0].position[axis] < hovered[0].position[axis]) {
    return [hoveredBoundingBox.min[axis], selectedBoundingBox.min[axis]];
  } else {
    return [hoveredBoundingBox.max[axis], selectedBoundingBox.max[axis]];
  }
}

function getClosestPointToSelected(
  multiSelectBoundingBox: THREE.Box3,
  hoveredBoundingBox: THREE.Box3,
  axis: Axis
): number {
  const goal = multiSelectBoundingBox.min[axis];
  const closestPoint = [
    hoveredBoundingBox.min[axis],
    hoveredBoundingBox.max[axis],
  ].reduce(function (prev, curr) {
    return Math.abs(curr - goal) < Math.abs(prev - goal) ? curr : prev;
  });
  return closestPoint;
}

function getCrossAxisEndPoint(
  selected: THREE.Mesh[],
  hovered: THREE.Mesh[],
  multiSelectBoundingBox: THREE.Box3,
  axis: Axis
) {
  if (selected[0].position[axis] > hovered[0].position[axis]) {
    return multiSelectBoundingBox.min[axis];
  } else if (selected[0].position[axis] < hovered[0].position[axis]) {
    return multiSelectBoundingBox.max[axis];
  } else {
    return multiSelectBoundingBox.min[axis];
  }
}

export function Measurements(props: Measure): null | JSX.Element {
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
      getClosestPointToSelected(
        multiSelectBoundingBox,
        hoveredBoundingBox,
        "y"
      ),
      hoveredBoundingBox.max.z
    ),
    new THREE.Vector3(
      mainXEnd,
      getClosestPointToSelected(
        multiSelectBoundingBox,
        hoveredBoundingBox,
        "y"
      ),
      hoveredBoundingBox.max.z
    ),
  ];

  const mainY = [
    new THREE.Vector3(
      getClosestPointToSelected(
        multiSelectBoundingBox,
        hoveredBoundingBox,
        "x"
      ),
      mainYStart,
      hoveredBoundingBox.max.z
    ),
    new THREE.Vector3(
      getClosestPointToSelected(
        multiSelectBoundingBox,
        hoveredBoundingBox,
        "x"
      ),
      mainYEnd,
      hoveredBoundingBox.max.z
    ),
  ];

  const mainZ = [
    new THREE.Vector3(
      getClosestPointToSelected(
        multiSelectBoundingBox,
        hoveredBoundingBox,
        "x"
      ),
      getClosestPointToSelected(
        multiSelectBoundingBox,
        hoveredBoundingBox,
        "y"
      ),
      mainZStart
    ),
    new THREE.Vector3(
      getClosestPointToSelected(
        multiSelectBoundingBox,
        hoveredBoundingBox,
        "x"
      ),
      getClosestPointToSelected(
        multiSelectBoundingBox,
        hoveredBoundingBox,
        "y"
      ),
      mainZEnd
    ),
  ];

  const crossX = [
    new THREE.Vector3(
      getClosestPointToSelected(
        multiSelectBoundingBox,
        hoveredBoundingBox,
        "x"
      ),
      getMidPoint([multiSelectBoundingBox.min, multiSelectBoundingBox.max]).y,
      hoveredBoundingBox.max.z
    ),
    new THREE.Vector3(
      getCrossAxisEndPoint(selected, hovered, multiSelectBoundingBox, "x"),
      getMidPoint([multiSelectBoundingBox.min, multiSelectBoundingBox.max]).y,
      hoveredBoundingBox.max.z
    ),
  ];
  const crossY = [
    new THREE.Vector3(
      getMidPoint([multiSelectBoundingBox.min, multiSelectBoundingBox.max]).x,
      getClosestPointToSelected(
        multiSelectBoundingBox,
        hoveredBoundingBox,
        "y"
      ),
      hoveredBoundingBox.max.z
    ),
    new THREE.Vector3(
      getMidPoint([multiSelectBoundingBox.min, multiSelectBoundingBox.max]).x,
      getCrossAxisEndPoint(selected, hovered, multiSelectBoundingBox, "y"),
      hoveredBoundingBox.max.z
    ),
  ];

  return (
    <>
      <Line
        points={mainX}
        color={quickMeasureTheme.colors.mainAxis}
        lineWidth={1.0}
        dashed={true}
        dashScale={10.0}
        alphaWrite={undefined}
      />
      <Line
        points={mainY}
        color={quickMeasureTheme.colors.mainAxis}
        lineWidth={1.0}
        dashed={true}
        dashScale={10.0}
        alphaWrite={undefined}
      />
      <Line
        points={mainZ}
        color={quickMeasureTheme.colors.mainAxis}
        lineWidth={1.0}
        dashed={true}
        dashScale={10.0}
        alphaWrite={undefined}
      >
        <group position={getMidPoint(mainZ)}>
          <Html
            as="div"
            wrapperClass="measure-text"
            zIndexRange={[100, 0]}
            center
            transform={false}
            sprite={true}
          >
            <p>{Math.round(Math.abs(mainZ[0].z - mainZ[1].z))}</p>
          </Html>
        </group>
      </Line>
      <Line
        points={crossX}
        color={quickMeasureTheme.colors.crossAxis}
        lineWidth={1.0}
        alphaWrite={undefined}
      >
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
      <Line
        points={crossY}
        color={quickMeasureTheme.colors.crossAxis}
        lineWidth={1.0}
        alphaWrite={undefined}
      >
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
