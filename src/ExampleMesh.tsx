import { useFrame } from "@react-three/fiber";
import * as React from "react";
import { useRef } from "react";

export const MeasuredMesh = ({ ...props }) => {
  const ref = useRef<any>();

  useFrame((state) => {
    if (props.animate) {
      const elapsedTime = state.clock.elapsedTime;
      if (ref.current) {
        ref.current.position.y = Math.sin(elapsedTime * 0.8) * 1.5;
        ref.current.scale.x = Math.sin(elapsedTime * 0.8) * 0.5 + 1;
      }
    }
  });

  return (
    <mesh ref={ref} {...props}>
      <boxGeometry args={props.boxSize} />
      <meshBasicMaterial color={props.color} />
    </mesh>
  );
};
