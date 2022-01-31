import { useFrame } from "@react-three/fiber";
import * as React from "react";
import { useCallback, useContext, useRef } from "react";
import * as THREE from "three";
import { hoverContext } from "./Effects";

function useHover(ref: React.RefObject<any>) {
  const setHover = useContext(hoverContext);
  const onPointerOver = useCallback(
    () => setHover((state: any) => [...state, ref.current]),
    []
  );
  const onPointerOut = useCallback(
    () =>
      setHover((state: any) =>
        state.filter((mesh: THREE.Mesh) => mesh !== ref.current)
      ),
    []
  );
  return { onPointerOver, onPointerOut };
}

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
    <mesh ref={ref} {...props} {...useHover(ref)}>
      <boxGeometry args={[2, 2, 2]} />
      <meshBasicMaterial color={props.color} />
    </mesh>
  );
};
