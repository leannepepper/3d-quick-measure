import { Html, Line } from "@react-three/drei";
import * as React from "react";
import * as THREE from "three";
import {
  getBoundingBox,
  getClosestMainAxisPoint,
  getClosestPointToSelected,
  getMidPoint,
} from "./measureUtils";

export function MainMeasurementLines({ ...props }): null | JSX.Element {
  const {
    hovered,
    selected,
    hoveredBoundingBox,
    selectBoundingBox,
    quickMeasureTheme,
  } = props;

  const [mainXStart, mainXEnd] = getClosestMainAxisPoint(
    selected,
    hovered,
    selectBoundingBox,
    hoveredBoundingBox,
    "x"
  );

  const [mainYStart, mainYEnd] = getClosestMainAxisPoint(
    selected,
    hovered,
    selectBoundingBox,
    hoveredBoundingBox,
    "y"
  );

  const [mainZStart, mainZEnd] = getClosestMainAxisPoint(
    selected,
    hovered,
    selectBoundingBox,
    hoveredBoundingBox,
    "z"
  );

  const mainX = [
    new THREE.Vector3(
      mainXStart,
      getClosestPointToSelected(selectBoundingBox, hoveredBoundingBox, "y"),
      hoveredBoundingBox.max.z
    ),
    new THREE.Vector3(
      mainXEnd,
      getClosestPointToSelected(selectBoundingBox, hoveredBoundingBox, "y"),
      hoveredBoundingBox.max.z
    ),
  ];

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
      getClosestPointToSelected(selectBoundingBox, hoveredBoundingBox, "x"),
      mainYStart,
      hoveredBoundingBox.max.z
    ),
    new THREE.Vector3(
      getClosestPointToSelected(selectBoundingBox, hoveredBoundingBox, "x"),
      mainYEnd,
      hoveredBoundingBox.max.z
    ),
  ];

  const mainZ = [
    new THREE.Vector3(
      getClosestPointToSelected(selectBoundingBox, hoveredBoundingBox, "x"),
      getClosestPointToSelected(selectBoundingBox, hoveredBoundingBox, "y"),
      mainZStart
    ),
    new THREE.Vector3(
      getClosestPointToSelected(selectBoundingBox, hoveredBoundingBox, "x"),
      getClosestPointToSelected(selectBoundingBox, hoveredBoundingBox, "y"),
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
            zIndexRange={[100, 0]}
            center
            transform={false}
            sprite={true}
          >
            <p
              style={{
                color: quickMeasureTheme.colors.textColor,
                backgroundColor: quickMeasureTheme.colors.textBackgroundColor,
                padding: "1px 5px",
                borderRadius: "5px",
                fontFamily: "sans-serif",
              }}
            >
              {Math.round(Math.abs(mainZ[0].z - mainZ[1].z))}
            </p>
          </Html>
        </group>
      </Line>
    </>
  );
}
