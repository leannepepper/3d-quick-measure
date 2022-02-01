import { useFrame } from "@react-three/fiber";
import * as React from "react";
import { useCallback, useContext, useRef } from "react";
import { hoverContext, selectContext } from "./Effects";

function useHover(ref: React.RefObject<any>) {
  const setHover = useContext(hoverContext);
  const selected = useContext(selectContext);

  const onPointerOver = useCallback(
    () =>
      setHover((state: any) => {
        return selected.includes(ref.current) ? [] : [...state, ref.current];
      }),
    [selected]
  );
  const onPointerOut = useCallback(() => setHover([]), []);
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
      <boxGeometry args={props.boxSize} />
      <meshBasicMaterial color={props.color} />
    </mesh>
  );
};
