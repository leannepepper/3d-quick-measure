import * as THREE from "three";
import * as React from "react";
import { extend, useLoader, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";

extend({ TextGeometry });

export function MeasureText({ ...props }) {
  const textMesh = useRef<THREE.Mesh>();

  const font = useLoader(FontLoader, "./fonts/manrope-regular-normal-200.json");

  const config = useMemo(
    () => ({
      font,
      size: 2.0,
      height: 0.1,
      curveSegments: 20,
      bevelEnabled: true,
      bevelThickness: 0.01,
      bevelSize: 0.01,
      bevelOffset: 0,
      bevelSegments: 20,
    }),
    [font]
  );
  const textGeometry = new TextGeometry(props.text, config);

  useEffect(() => {
    textGeometry.computeBoundingBox();
    textGeometry.center();
  });

  return (
    <mesh ref={textMesh} {...props} geometry={textGeometry}>
      <meshPhysicalMaterial color={0x000000} reflectivity={0} roughness={0} />
    </mesh>
  );
}
