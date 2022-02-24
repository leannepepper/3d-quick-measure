/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import * as THREE from "three";
import React, { useEffect, useRef } from "react";
import { useGLTF, useAnimations, Html } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { GLTF } from "three-stdlib";
import { TriangleSolid } from "./TriangleSolid";
import { GlitterMaterial } from "three-glitter-material";

type GLTFResult = GLTF & {
  nodes: {
    Plane: THREE.Mesh;
    Cone_cell004: THREE.Mesh;
    Cone_cell004_1: THREE.Mesh;
    Cone_cell005: THREE.Mesh;
    Cone_cell005_1: THREE.Mesh;
    Cone_cell001_1: THREE.Mesh;
    Cone_cell001_2: THREE.Mesh;
    Cone_cell002_1: THREE.Mesh;
    Cone_cell002_2: THREE.Mesh;
  };
  materials: {
    ["Material.001"]: THREE.MeshStandardMaterial;
    ["Material.002"]: THREE.MeshStandardMaterial;
  };
};

type ActionName =
  | "Cone_cellAction"
  | "Cone_cell.001Action"
  | "Cone_cell.002Action"
  | "Cone_cell.003Action";
type GLTFActions = Record<ActionName, THREE.AnimationAction>;

export function Triangle({
  visible,
  ...props
}: JSX.IntrinsicElements["group"]) {
  const group = useRef<THREE.Group>();
  const { nodes, materials, animations } = useGLTF(
    "/models/TriangleFractureBaked6.glb"
  ) as GLTFResult;
  const { actions } = useAnimations(animations, group);
  const { scene, viewport } = useThree();

  const gridWidth = viewport.width;
  const gridHeight = viewport.height;

  useEffect(() => {
    if (visible)
      Object.keys(actions).forEach((key) => {
        actions[key].repetitions = 0;
        actions[key].clampWhenFinished = true;
        actions[key].play();
      });
  }, [visible]);

  const customUniforms = {
    uGlitterSize: { value: 30.0 },
    uGlitterDensity: { value: 1.0 },
  };

  const glitterMaterial = new GlitterMaterial(customUniforms, {
    color: "#040305",
  });

  function removeSolidTriangle() {
    const solidTriangle = scene.getObjectByName("triangle_solid");
    if (solidTriangle) solidTriangle.parent.remove(solidTriangle);
  }
  return (
    <>
      <Html
        as="div"
        wrapperClass={"html"}
        prepend
        position={[gridWidth / 2.09, gridHeight / 2.2, 0]}
        rotation={[0, 0, 0]}
        transform
      >
        <a
          target="_blank"
          href="https://medium.com/@leannewerner/creating-cell-fractured-animations-using-blender-and-react-three-fiber-dbd0299d4767"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="rgba(250, 196, 7, 0.5)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-info"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="16" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12.01" y2="8"></line>
          </svg>
        </a>
      </Html>
      <group ref={group} name="triangles" {...props} dispose={null}>
        <TriangleSolid
          onClick={() => removeSolidTriangle()}
          position={[0, 0, 0]}
        />
        <group name="Cone_cell" position={[0.02, 4.25, -0.06]}>
          <mesh
            geometry={nodes.Cone_cell004.geometry}
            material={nodes.Cone_cell004.material}
          />
          <mesh
            geometry={nodes.Cone_cell004_1.geometry}
            material={glitterMaterial}
          />
        </group>
        <group name="Cone_cell001" position={[0.45, 4.03, 0.45]}>
          <mesh
            geometry={nodes.Cone_cell005.geometry}
            material={nodes.Cone_cell005.material}
          />
          <mesh
            geometry={nodes.Cone_cell005_1.geometry}
            material={glitterMaterial}
          />
        </group>
        <group name="Cone_cell002" position={[-0.36, 4.05, 0.42]}>
          <mesh
            geometry={nodes.Cone_cell001_1.geometry}
            material={nodes.Cone_cell001_1.material}
          />
          <mesh
            geometry={nodes.Cone_cell001_2.geometry}
            material={glitterMaterial}
          />
        </group>
        <group name="Cone_cell003" position={[-0.01, 4.98, 0.31]}>
          <mesh
            geometry={nodes.Cone_cell002_1.geometry}
            material={nodes.Cone_cell002_1.material}
          />
          <mesh
            geometry={nodes.Cone_cell002_2.geometry}
            material={glitterMaterial}
          />
        </group>
      </group>
    </>
  );
}

useGLTF.preload("/models/TriangleFractureBaked6.glb");
