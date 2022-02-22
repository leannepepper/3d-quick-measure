import { Html, Line } from "@react-three/drei";
import * as React from "react";
import * as THREE from "three";
import type { Measure } from "./QuickMeasure";
import {
  getBoundingBox,
  getClosestPointToSelected,
  getCrossAxisEndPoint,
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

  const crossX = [
    new THREE.Vector3(
      getClosestPointToSelected(
        multiSelectBoundingBox,
        hoveredBoundingBox,
        "x",
        "min"
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
  let crossY = [
    new THREE.Vector3(
      getMidPoint([multiSelectBoundingBox.min, multiSelectBoundingBox.max]).x,
      getClosestPointToSelected(
        multiSelectBoundingBox,
        hoveredBoundingBox,
        "y",
        "min"
      ),
      hoveredBoundingBox.max.z
    ),
    new THREE.Vector3(
      getMidPoint([multiSelectBoundingBox.min, multiSelectBoundingBox.max]).x,
      getCrossAxisEndPoint(selected, hovered, multiSelectBoundingBox, "y"),
      hoveredBoundingBox.max.z
    ),
  ];

  // TODO: Clean up this mess
  let additionalCrossY = null;
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
        hoveredBoundingBox.max.z
      ),
      new THREE.Vector3(
        getMidPoint([multiSelectBoundingBox.min, multiSelectBoundingBox.max]).x,
        selectedBoundingBox.min.y,
        hoveredBoundingBox.max.z
      ),
    ];
    crossY = [
      new THREE.Vector3(
        getMidPoint([multiSelectBoundingBox.min, multiSelectBoundingBox.max]).x,
        hoveredBoundingBox.max.y,
        hoveredBoundingBox.max.z
      ),
      new THREE.Vector3(
        getMidPoint([multiSelectBoundingBox.min, multiSelectBoundingBox.max]).x,
        selectedBoundingBox.max.y,
        hoveredBoundingBox.max.z
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
