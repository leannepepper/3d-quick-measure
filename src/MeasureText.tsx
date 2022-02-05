import * as THREE from "three";
import * as React from "react";
import { extend, useLoader, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";

extend({ TextGeometry });

export function MeasureText({ ...props }) {
  const textMesh = useRef<THREE.Mesh>();

  const material = new THREE.MeshBasicMaterial({ color: "white" });

  const font = useLoader(FontLoader, "./fonts/manrope-regular-normal-700.json");

  const config = useMemo(
    () => ({
      font,
      size: 3.5,
      height: 0.2,
      curveSegments: 20,
      bevelEnabled: true,
      bevelThickness: 0.5,
      bevelSize: 0.01,
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
    <mesh
      ref={textMesh}
      {...props}
      material={material}
      geometry={textGeometry}
    ></mesh>
  );
}
