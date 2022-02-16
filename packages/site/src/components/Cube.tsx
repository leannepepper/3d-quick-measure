import * as THREE from "three";
import React, { useEffect, useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { useMotionValue, useTransform } from "framer-motion";
import { motion } from "framer-motion-3d";
import { a, useSpring } from "@react-spring/three";
import { useFrame } from "@react-three/fiber";

type GLTFResult = GLTF & {
  nodes: {
    Cube: THREE.Mesh;
  };
  materials: {
    Material: THREE.MeshStandardMaterial;
  };
};

export function Cube({ ...props }) {
  const group = useRef();
  const meshRef = useRef();
  const { nodes, materials } = useGLTF("/models/cube.glb") as GLTFResult;
  const material = new THREE.MeshStandardMaterial({
    color: 0x000000,
  });

  return (
    <group ref={group} {...props} dispose={null}>
      <motion.mesh
        ref={meshRef}
        material={material}
        scale={[2, 1, 1]}
        animate={{
          y: [0, 0, 3, 6, 6, 3, 0],
          scaleY: [1, 1, 4, 1, 1, 4, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          // repeatType: "reverse",
        }}
      >
        <boxGeometry args={[2, 2, 2]} />
      </motion.mesh>
    </group>
  );
}

useGLTF.preload("/models/cube.glb");
