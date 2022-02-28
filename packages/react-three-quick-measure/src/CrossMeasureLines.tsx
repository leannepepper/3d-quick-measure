import { Html, Line } from "@react-three/drei";
import * as React from "react";
import * as THREE from "three";
import type { Measure } from "./QuickMeasure";
import {
  getBoundingBox,
  getClosestPointToHovered,
  getClosestPointToSelected,
  getMidPoint,
  quickMeasureTheme,
} from "./measureUtils";

export function CrossMeasurementLines(props: Measure): null | JSX.Element {
  const { hovered, selected } = props;

  if (selected.length === 0 || hovered.length === 0) {
    return null;
  }

  const multiSelectBoundingBox = getBoundingBox(selected);
  hovered[0].geometry.computeBoundingBox();
  const hoveredBoundingBox = hovered[0].geometry.boundingBox.clone();
  hoveredBoundingBox.applyMatrix4(hovered[0].matrixWorld);

  let crossX = [
    new THREE.Vector3(
      getClosestPointToSelected(
        multiSelectBoundingBox,
        hoveredBoundingBox,
        "x"
      ),
      getMidPoint([multiSelectBoundingBox.min, multiSelectBoundingBox.max]).y,
      Math.max(hoveredBoundingBox.max.z, multiSelectBoundingBox.max.z)
    ),
    new THREE.Vector3(
      getClosestPointToHovered(multiSelectBoundingBox, hoveredBoundingBox, "x"),
      getMidPoint([multiSelectBoundingBox.min, multiSelectBoundingBox.max]).y,
      Math.max(hoveredBoundingBox.max.z, multiSelectBoundingBox.max.z)
    ),
  ];
  let crossY = [
    new THREE.Vector3(
      getMidPoint([multiSelectBoundingBox.min, multiSelectBoundingBox.max]).x,
      getClosestPointToSelected(
        multiSelectBoundingBox,
        hoveredBoundingBox,
        "y"
      ),
      Math.max(hoveredBoundingBox.max.z, multiSelectBoundingBox.max.z)
    ),
    new THREE.Vector3(
      getMidPoint([multiSelectBoundingBox.min, multiSelectBoundingBox.max]).x,
      getClosestPointToHovered(multiSelectBoundingBox, hoveredBoundingBox, "y"),
      Math.max(hoveredBoundingBox.max.z, multiSelectBoundingBox.max.z)
    ),
  ];

  // TODO: Clean up this mess
  let additionalCrossY = null;
  let additionalCrossX = null;
  const selectedBoundingBox = getBoundingBox(selected);
  if (
    (hoveredBoundingBox.min.y > selectedBoundingBox.min.y &&
      hoveredBoundingBox.max.y < selectedBoundingBox.max.y) ||
    (hoveredBoundingBox.min.y < selectedBoundingBox.min.y &&
      hoveredBoundingBox.max.y > selectedBoundingBox.max.y)
  ) {
    additionalCrossY = [
      new THREE.Vector3(
        getMidPoint([multiSelectBoundingBox.min, multiSelectBoundingBox.max]).x,
        hoveredBoundingBox.min.y,
        Math.max(hoveredBoundingBox.max.z, multiSelectBoundingBox.max.z)
      ),
      new THREE.Vector3(
        getMidPoint([multiSelectBoundingBox.min, multiSelectBoundingBox.max]).x,
        selectedBoundingBox.min.y,
        Math.max(hoveredBoundingBox.max.z, multiSelectBoundingBox.max.z)
      ),
    ];
    crossY = [
      new THREE.Vector3(
        getMidPoint([multiSelectBoundingBox.min, multiSelectBoundingBox.max]).x,
        hoveredBoundingBox.max.y,
        Math.max(hoveredBoundingBox.max.z, multiSelectBoundingBox.max.z)
      ),
      new THREE.Vector3(
        getMidPoint([multiSelectBoundingBox.min, multiSelectBoundingBox.max]).x,
        selectedBoundingBox.max.y,
        Math.max(hoveredBoundingBox.max.z, multiSelectBoundingBox.max.z)
      ),
    ];
  }
  if (
    hoveredBoundingBox.min.x > selectedBoundingBox.min.x &&
    hoveredBoundingBox.max.x < selectedBoundingBox.max.x
  ) {
    additionalCrossX = [
      new THREE.Vector3(
        hoveredBoundingBox.min.x,
        getMidPoint([multiSelectBoundingBox.min, multiSelectBoundingBox.max]).y,
        Math.max(hoveredBoundingBox.max.z, multiSelectBoundingBox.max.z)
      ),
      new THREE.Vector3(
        selectedBoundingBox.min.x,
        getMidPoint([multiSelectBoundingBox.min, multiSelectBoundingBox.max]).y,
        Math.max(hoveredBoundingBox.max.z, multiSelectBoundingBox.max.z)
      ),
    ];
    crossX = [
      new THREE.Vector3(
        hoveredBoundingBox.max.x,
        getMidPoint([multiSelectBoundingBox.min, multiSelectBoundingBox.max]).y,
        Math.max(hoveredBoundingBox.max.z, multiSelectBoundingBox.max.z)
      ),
      new THREE.Vector3(
        selectedBoundingBox.max.x,
        getMidPoint([multiSelectBoundingBox.min, multiSelectBoundingBox.max]).y,
        Math.max(hoveredBoundingBox.max.z, multiSelectBoundingBox.max.z)
      ),
    ];
  } else if (
    hoveredBoundingBox.min.x < selectedBoundingBox.min.x &&
    hoveredBoundingBox.max.x > selectedBoundingBox.max.x
  ) {
    additionalCrossX = [
      new THREE.Vector3(
        hoveredBoundingBox.min.x,
        getMidPoint([multiSelectBoundingBox.min, multiSelectBoundingBox.max]).y,
        Math.max(hoveredBoundingBox.min.z, multiSelectBoundingBox.min.z)
      ),
      new THREE.Vector3(
        selectedBoundingBox.min.x,
        getMidPoint([multiSelectBoundingBox.min, multiSelectBoundingBox.max]).y,
        Math.max(hoveredBoundingBox.min.z, multiSelectBoundingBox.min.z)
      ),
    ];
    crossX = [
      new THREE.Vector3(
        hoveredBoundingBox.max.x,
        getMidPoint([multiSelectBoundingBox.min, multiSelectBoundingBox.max]).y,
        Math.max(hoveredBoundingBox.min.z, multiSelectBoundingBox.min.z)
      ),
      new THREE.Vector3(
        selectedBoundingBox.max.x,
        getMidPoint([multiSelectBoundingBox.min, multiSelectBoundingBox.max]).y,
        Math.max(hoveredBoundingBox.min.z, multiSelectBoundingBox.min.z)
      ),
    ];
  }

  return (
    <>
      {additionalCrossY ? (
        <Line
          points={additionalCrossY}
          color={quickMeasureTheme.colors.crossAxis}
          lineWidth={1.0}
          alphaWrite={undefined}
        >
          <group position={getMidPoint(additionalCrossY)}>
            <Html
              as="div"
              wrapperClass="measure-text"
              zIndexRange={[100, 0]}
              center
              transform={false}
              sprite={true}
            >
              <p>
                {Math.round(
                  Math.abs(additionalCrossY[0].y - additionalCrossY[1].y)
                )}
              </p>
            </Html>
          </group>
        </Line>
      ) : null}
      {additionalCrossX ? (
        <Line
          points={additionalCrossX}
          color={quickMeasureTheme.colors.crossAxis}
          lineWidth={1.0}
          alphaWrite={undefined}
        >
          <group position={getMidPoint(additionalCrossX)}>
            <Html
              as="div"
              wrapperClass="measure-text"
              zIndexRange={[100, 0]}
              center
              transform={false}
              sprite={true}
            >
              <p>
                {Math.round(
                  Math.abs(additionalCrossX[0].x - additionalCrossX[1].x)
                )}
              </p>
            </Html>
          </group>
        </Line>
      ) : null}
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
