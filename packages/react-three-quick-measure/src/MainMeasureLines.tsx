import { Html, Line } from "@react-three/drei";
import * as React from "react";
import * as THREE from "three";
import type { Measure } from "./QuickMeasure";
import {
  getBoundingBox,
  getClosestMainAxisPoint,
  getClosestPointToSelected,
  getMidPoint,
  quickMeasureTheme,
} from "./measureUtils";

export function MainMeasurementLines(props: Measure): null | JSX.Element {
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
        "y",
        "min"
      ),
      hoveredBoundingBox.max.z
    ),
    new THREE.Vector3(
      mainXEnd,
      getClosestPointToSelected(
        multiSelectBoundingBox,
        hoveredBoundingBox,
        "y",
        "min"
      ),
      hoveredBoundingBox.max.z
    ),
  ];

  // TODO: Clean up this mess
  let additionalMainX = null;
  let additionalMainY = null;
  const selectedBoundingBox = getBoundingBox(selected);
  if (
    hoveredBoundingBox.min.y > selectedBoundingBox.min.y &&
    hoveredBoundingBox.max.y < selectedBoundingBox.max.y
  ) {
    additionalMainX = [
      new THREE.Vector3(
        mainXStart,
        hoveredBoundingBox.max.y,
        hoveredBoundingBox.max.z
      ),
      new THREE.Vector3(
        mainXEnd,
        hoveredBoundingBox.max.y,
        hoveredBoundingBox.max.z
      ),
    ];
  } else if (
    hoveredBoundingBox.min.y < selectedBoundingBox.min.y &&
    hoveredBoundingBox.max.y > selectedBoundingBox.max.y
  ) {
    additionalMainX = [
      new THREE.Vector3(
        mainXStart,
        hoveredBoundingBox.min.y,
        hoveredBoundingBox.max.z
      ),
      new THREE.Vector3(
        mainXEnd,
        hoveredBoundingBox.min.y,
        hoveredBoundingBox.max.z
      ),
    ];
  } else if (
    (hoveredBoundingBox.min.x > selectedBoundingBox.min.x &&
      hoveredBoundingBox.max.x < selectedBoundingBox.max.x) ||
    (hoveredBoundingBox.min.x < selectedBoundingBox.min.x &&
      hoveredBoundingBox.max.x > selectedBoundingBox.max.x)
  ) {
    additionalMainY = [
      new THREE.Vector3(
        hoveredBoundingBox.max.x,
        mainYStart,
        hoveredBoundingBox.max.z
      ),
      new THREE.Vector3(
        hoveredBoundingBox.max.x,
        mainYEnd,
        hoveredBoundingBox.max.z
      ),
    ];
  }

  const mainY = [
    new THREE.Vector3(
      getClosestPointToSelected(
        multiSelectBoundingBox,
        hoveredBoundingBox,
        "x",
        "min"
      ),
      mainYStart,
      hoveredBoundingBox.max.z
    ),
    new THREE.Vector3(
      getClosestPointToSelected(
        multiSelectBoundingBox,
        hoveredBoundingBox,
        "x",
        "min"
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
        "x",
        "min"
      ),
      getClosestPointToSelected(
        multiSelectBoundingBox,
        hoveredBoundingBox,
        "y",
        "min"
      ),
      mainZStart
    ),
    new THREE.Vector3(
      getClosestPointToSelected(
        multiSelectBoundingBox,
        hoveredBoundingBox,
        "x",
        "min"
      ),
      getClosestPointToSelected(
        multiSelectBoundingBox,
        hoveredBoundingBox,
        "y",
        "min"
      ),
      mainZEnd
    ),
  ];

  return (
    <>
      {additionalMainX ? (
        <Line
          points={additionalMainX}
          color={quickMeasureTheme.colors.mainAxis}
          lineWidth={1.0}
          dashed={true}
          dashScale={10.0}
          alphaWrite={undefined}
        />
      ) : null}
      {additionalMainY ? (
        <Line
          points={additionalMainY}
          color={quickMeasureTheme.colors.mainAxis}
          lineWidth={1.0}
          dashed={true}
          dashScale={10.0}
          alphaWrite={undefined}
        />
      ) : null}
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
    </>
  );
}
