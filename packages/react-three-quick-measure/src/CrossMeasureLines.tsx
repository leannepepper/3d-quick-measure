import { Html, Line } from "@react-three/drei";
import * as React from "react";
import * as THREE from "three";

import {
  getBoundingBox,
  getClosestPointToHovered,
  getClosestPointToSelected,
  getMidPoint,
  quickMeasureTheme,
} from "./measureUtils";

export function CrossMeasurementLines(props): null | JSX.Element {
  const { selected, hoveredBoundingBox, selectBoundingBox } = props;

  let crossX = [
    new THREE.Vector3(
      getClosestPointToSelected(selectBoundingBox, hoveredBoundingBox, "x"),
      getMidPoint([selectBoundingBox.min, selectBoundingBox.max]).y,
      Math.max(hoveredBoundingBox.max.z, selectBoundingBox.max.z)
    ),
    new THREE.Vector3(
      getClosestPointToHovered(selectBoundingBox, hoveredBoundingBox, "x"),
      getMidPoint([selectBoundingBox.min, selectBoundingBox.max]).y,
      Math.max(hoveredBoundingBox.max.z, selectBoundingBox.max.z)
    ),
  ];
  let crossY = [
    new THREE.Vector3(
      getMidPoint([selectBoundingBox.min, selectBoundingBox.max]).x,
      getClosestPointToSelected(selectBoundingBox, hoveredBoundingBox, "y"),
      Math.max(hoveredBoundingBox.max.z, selectBoundingBox.max.z)
    ),
    new THREE.Vector3(
      getMidPoint([selectBoundingBox.min, selectBoundingBox.max]).x,
      getClosestPointToHovered(selectBoundingBox, hoveredBoundingBox, "y"),
      Math.max(hoveredBoundingBox.max.z, selectBoundingBox.max.z)
    ),
  ];

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
        getMidPoint([selectBoundingBox.min, selectBoundingBox.max]).x,
        hoveredBoundingBox.min.y,
        Math.max(hoveredBoundingBox.max.z, selectBoundingBox.max.z)
      ),
      new THREE.Vector3(
        getMidPoint([selectBoundingBox.min, selectBoundingBox.max]).x,
        selectedBoundingBox.min.y,
        Math.max(hoveredBoundingBox.max.z, selectBoundingBox.max.z)
      ),
    ];
    crossY = [
      new THREE.Vector3(
        getMidPoint([selectBoundingBox.min, selectBoundingBox.max]).x,
        hoveredBoundingBox.max.y,
        Math.max(hoveredBoundingBox.max.z, selectBoundingBox.max.z)
      ),
      new THREE.Vector3(
        getMidPoint([selectBoundingBox.min, selectBoundingBox.max]).x,
        selectedBoundingBox.max.y,
        Math.max(hoveredBoundingBox.max.z, selectBoundingBox.max.z)
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
        getMidPoint([selectBoundingBox.min, selectBoundingBox.max]).y,
        Math.max(hoveredBoundingBox.max.z, selectBoundingBox.max.z)
      ),
      new THREE.Vector3(
        selectedBoundingBox.min.x,
        getMidPoint([selectBoundingBox.min, selectBoundingBox.max]).y,
        Math.max(hoveredBoundingBox.max.z, selectBoundingBox.max.z)
      ),
    ];
    crossX = [
      new THREE.Vector3(
        hoveredBoundingBox.max.x,
        getMidPoint([selectBoundingBox.min, selectBoundingBox.max]).y,
        Math.max(hoveredBoundingBox.max.z, selectBoundingBox.max.z)
      ),
      new THREE.Vector3(
        selectedBoundingBox.max.x,
        getMidPoint([selectBoundingBox.min, selectBoundingBox.max]).y,
        Math.max(hoveredBoundingBox.max.z, selectBoundingBox.max.z)
      ),
    ];
  } else if (
    hoveredBoundingBox.min.x < selectedBoundingBox.min.x &&
    hoveredBoundingBox.max.x > selectedBoundingBox.max.x
  ) {
    additionalCrossX = [
      new THREE.Vector3(
        hoveredBoundingBox.min.x,
        getMidPoint([selectBoundingBox.min, selectBoundingBox.max]).y,
        Math.max(hoveredBoundingBox.min.z, selectBoundingBox.min.z)
      ),
      new THREE.Vector3(
        selectedBoundingBox.min.x,
        getMidPoint([selectBoundingBox.min, selectBoundingBox.max]).y,
        Math.max(hoveredBoundingBox.min.z, selectBoundingBox.min.z)
      ),
    ];
    crossX = [
      new THREE.Vector3(
        hoveredBoundingBox.max.x,
        getMidPoint([selectBoundingBox.min, selectBoundingBox.max]).y,
        Math.max(hoveredBoundingBox.min.z, selectBoundingBox.min.z)
      ),
      new THREE.Vector3(
        selectedBoundingBox.max.x,
        getMidPoint([selectBoundingBox.min, selectBoundingBox.max]).y,
        Math.max(hoveredBoundingBox.min.z, selectBoundingBox.min.z)
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
              zIndexRange={[100, 0]}
              center
              transform={false}
              sprite={true}
            >
              <p
                style={{
                  color: "#fff",
                  backgroundColor: "#f17720",
                  padding: "1px 5px",
                  borderRadius: "5px",
                }}
              >
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
              zIndexRange={[100, 0]}
              center
              transform={false}
              sprite={true}
            >
              <p
                style={{
                  color: "#fff",
                  backgroundColor: "#f17720",
                  padding: "1px 5px",
                  borderRadius: "5px",
                }}
              >
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
            zIndexRange={[100, 0]}
            center
            transform={false}
            sprite={true}
          >
            <p
              style={{
                color: "#fff",
                backgroundColor: "#f17720",
                padding: "1px 5px",
                borderRadius: "5px",
              }}
            >
              {Math.round(Math.abs(crossX[0].x - crossX[1].x))}
            </p>
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
            zIndexRange={[100, 0]}
            center
            transform={false}
            sprite={true}
          >
            <p
              style={{
                color: "#fff",
                backgroundColor: "#f17720",
                padding: "1px 5px",
                borderRadius: "5px",
              }}
            >
              {Math.round(Math.abs(crossY[0].y - crossY[1].y))}
            </p>
          </Html>
        </group>
      </Line>
    </>
  );
}
