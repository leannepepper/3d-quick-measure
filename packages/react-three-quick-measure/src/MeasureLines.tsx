import { Html, Line } from "@react-three/drei";
import * as React from "react";
import * as THREE from "three";
import type { Measure } from "./QuickMeasure";
import { CrossMeasurementLines } from "./CrossMeasureLines";
import { MainMeasurementLines } from "./MainMeasureLines";

export function Measurements(props: Measure): null | JSX.Element {
  const { hovered, selected } = props;

  if (selected.length === 0 || hovered.length === 0) {
    return null;
  }

  return (
    <>
      <MainMeasurementLines {...props} />
      <CrossMeasurementLines {...props} />
    </>
  );
}
