import * as THREE from "three";
import { Select } from "@react-three/drei";
import {
  extend,
  ReactThreeFiber,
  useFrame,
  useThree,
} from "@react-three/fiber";
import * as React from "react";
import { createContext, useEffect, useMemo, useRef, useState } from "react";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { OutlinePass } from "three/examples/jsm/postprocessing/OutlinePass";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { Measurements } from "./MeasureLines";
import { MultiObjectBoundingBox } from "./measureUtils";
import { Hover } from "./Hover";
import { hoverContext, selectContext } from "./contexts";

extend({
  EffectComposer,
  RenderPass,
  OutlinePass,
});

export interface Measure {
  selected: THREE.Mesh[];
  hovered: THREE.Mesh[];
}

export interface QuickMeasureTheme {
  colors: {
    mainAxis: string;
    crossAxis: string;
  };
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      outlinePass: ReactThreeFiber.Object3DNode<
        OutlinePass,
        typeof OutlinePass
      >;
    }
  }
}

const context = createContext({
  selected: [],
  hovered: [],
});

const defaultSettings = {
  colors: {
    mainAxis: "#41a5f5",
    crossAxis: "#f17720",
    textColor: "#fff",
    textBackgroundColor: "#f17720",
  },
};

export function QuickMeasure({
  children,
  quickMeasureTheme = defaultSettings,
  active = true,
}: {
  children: React.ReactNode;
  quickMeasureTheme?: QuickMeasureTheme;
  active?: boolean;
}) {
  if (active === false) {
    return <>{children}</>;
  }
  const composer = useRef(null);
  const { scene, gl, size, camera } = useThree();
  const aspect = useMemo(() => new THREE.Vector2(1024, 1024), []);
  const [hovered, setHover] = useState([]);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    if (composer.current) {
      composer.current.setSize(size.width, size.height);
    }
  }, [size]);

  useFrame(() => {
    if (composer.current) {
      composer.current.render();
    }
    if (selected.length > 0) {
      setSelected((state: any) => [...state]);
    }
  }, 1);

  return (
    <hoverContext.Provider value={setHover}>
      <selectContext.Provider value={selected}>
        <Select
          box
          multiple
          onChange={(selectedObjs) => {
            setHover([]);
            const objs = [];
            selectedObjs.forEach((obj) => {
              if (scene.getObjectById(obj.id)) {
                objs.push(obj);
              }
            });
            setSelected(objs);
          }}
        >
          <Hover>
            <context.Provider value={{ selected, hovered }}>
              {children}
            </context.Provider>
          </Hover>
        </Select>

        <MultiObjectBoundingBox multiSelected={selected} />
        <Measurements
          quickMeasureTheme={quickMeasureTheme}
          selected={selected}
          hovered={hovered}
        />
        <effectComposer ref={composer} args={[gl]}>
          <renderPass attachArray="passes" scene={scene} camera={camera} />
          <outlinePass
            attachArray="passes"
            args={[aspect, scene, camera]}
            selectedObjects={hovered}
            visibleEdgeColor={new THREE.Color(0x0474ba)}
          />
          <outlinePass
            attachArray="passes"
            args={[aspect, scene, camera]}
            selectedObjects={selected}
            visibleEdgeColor={new THREE.Color(0xffffff)}
            edgeStrength={10}
            edgeThickness={0.25}
          />
        </effectComposer>
      </selectContext.Provider>
    </hoverContext.Provider>
  );
}

export function useQuickMeasure() {
  return React.useContext(context);
}
