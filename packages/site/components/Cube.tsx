import { motion } from "framer-motion-3d";
import React, { useRef } from "react";
import * as THREE from "three";

export function Cube({ ...props }) {
  const material = new THREE.MeshStandardMaterial({
    color: 0x000000,
  });

  return (
    <>
      <motion.mesh
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
      {props.includeHorizontalCube && (
        <>
          <motion.mesh
            material={material}
            scale={[1, 1, 1]}
            position={[0, 0, 0]}
            animate={{
              x: [-5, -5, -5, 0, 5, 5, 5, 5, 0, -5, -5],
              scaleX: [1, 1, 1, 6, 1, 1, 1, 1, 6, 1, 1],
            }}
            transition={{
              duration: 16,
              repeat: Infinity,
            }}
          >
            <boxGeometry args={[2, 2, 2]} />
          </motion.mesh>
          <motion.mesh
            material={material}
            scale={[1, 1, 1]}
            position={[0, 6, 0]}
            animate={{
              x: [5, 5, 5, 0, -5, -5, -5, -5, 0, 5, 5],
              scaleX: [1, 1, 1, 6, 1, 1, 1, 1, 6, 1, 1],
            }}
            transition={{
              delay: 4,
              duration: 16,
              repeat: Infinity,
            }}
          >
            <boxGeometry args={[2, 2, 2]} />
          </motion.mesh>
        </>
      )}
    </>
  );
}
