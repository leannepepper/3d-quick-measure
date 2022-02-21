import { motion } from "framer-motion-3d";
import React, { useRef } from "react";
import * as THREE from "three";

export function Cube({ ...props }) {
  const group = useRef();
  const meshRef = useRef();
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
        }}
      >
        <boxGeometry args={[2, 2, 2]} />
      </motion.mesh>
    </group>
  );
}
