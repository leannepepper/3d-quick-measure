import * as React from "react";
import { useCallback, useContext } from "react";
import { hoverContext, selectContext } from "./contexts";

export function Hover({ children }: JSX.IntrinsicElements["group"]) {
  const setHover = useContext(hoverContext);
  const selected = useContext(selectContext);

  const onPointerOver = useCallback(
    (e) => {
      e.stopPropagation();
      setHover((state: any) => {
        return selected.includes(e.object) ? [] : [...state, e.object];
      });
    },
    [selected]
  );

  const onPointerOut = useCallback((e) => {
    e.stopPropagation();
    setHover([]);
  }, []);

  return (
    <group onPointerOver={onPointerOver} onPointerOut={onPointerOut}>
      {children}
    </group>
  );
}
