import * as React from "react";
import type { Measure } from "./QuickMeasure";
import { CrossMeasurementLines } from "./CrossMeasureLines";
import { MainMeasurementLines } from "./MainMeasureLines";
import { getBoundingBox } from "./measureUtils";

export function Measurements({ ...props }): null | JSX.Element {
  const { hovered, selected } = props;

  if (selected.length === 0 || hovered.length === 0) {
    return null;
  }
  const selectBoundingBox = getBoundingBox(selected);
  const hoveredBoundingBox = getBoundingBox(hovered);

  return (
    <>
      <MainMeasurementLines
        {...props}
        selectBoundingBox={selectBoundingBox}
        hoveredBoundingBox={hoveredBoundingBox}
      />
      <CrossMeasurementLines
        {...props}
        selectBoundingBox={selectBoundingBox}
        hoveredBoundingBox={hoveredBoundingBox}
      />
    </>
  );
}
