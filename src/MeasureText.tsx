import * as THREE from "three";
import * as React from "react";
import { extend, useLoader, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";

extend({ TextGeometry });

export function MeasureText({ ...props }) {
  const textMesh = useRef<THREE.Mesh>();

  const font = useLoader(FontLoader, "./fonts/manrope-regular-normal-700.json");

  const config = useMemo(
    () => ({
      font,
      size: 1.5,
      height: 0.02,
      curveSegments: 20,
      bevelEnabled: true,
      bevelThickness: 0.3,
      bevelSize: 0.05,
      bevelOffset: 0,
      bevelSegments: 10,
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
      <meshPhysicalMaterial
        color={0xffffff}
        clearcoat={0.5}
        clearcoatRoughness={0.5}
        metalness={0.005}
        reflectivity={0.9}
        roughness={0.5}
      />
    </mesh>
  );
}
