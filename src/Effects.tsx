import { Select } from "@react-three/drei";
import {
  extend,
  ReactThreeFiber,
  useFrame,
  useThree,
} from "@react-three/fiber";
import * as React from "react";
import { createContext, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { OutlinePass } from "three/examples/jsm/postprocessing/OutlinePass";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { MeasuredMesh } from "./ExampleMesh";
import { MeasurementsFromBoundingBox } from "./line";
import { MultiObjectBoundingBox } from "./measureUtils";

extend({
  EffectComposer,
  RenderPass,
  OutlinePass,
});

export const hoverContext = createContext(null);
export const selectContext = createContext(null);

export interface Measure {
  selected: THREE.Mesh[];
  hovered: THREE.Mesh[];
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

export function Effects() {
  const composer = useRef(null);
  const { scene, gl, size, camera } = useThree();
  const aspect = useMemo(() => new THREE.Vector2(512, 512), []);
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
  }, 1);

  return (
    <hoverContext.Provider value={setHover}>
      <selectContext.Provider value={selected}>
        <Select
          box
          multiple
          onChange={(selectedObjs) => {
            setHover([]);
            setSelected(selectedObjs);
          }}
        >
          <MeasuredMesh
            position={[-3, 0, -10]}
            color={"hotpink"}
            animate={false}
            boxSize={[3, 2, 2]}
          />
          <MeasuredMesh
            position={[1, 3, 0]}
            color={"yellow"}
            animate={false}
            boxSize={[3, 1, 2]}
          />
          <MeasuredMesh
            position={[8, -4, 0]}
            color={"blue"}
            animate={false}
            boxSize={[3, 3, 3]}
          />
        </Select>
        <MultiObjectBoundingBox multiSelected={selected} />
        <MeasurementsFromBoundingBox selected={selected} hovered={hovered} />
        <effectComposer ref={composer} args={[gl]}>
          <renderPass attachArray="passes" scene={scene} camera={camera} />
          <outlinePass
            attachArray="passes"
            args={[aspect, scene, camera]}
            selectedObjects={hovered}
            visibleEdgeColor={new THREE.Color(0xffffff)}
            edgeStrength={25}
            edgeThickness={0.25}
          />
          <outlinePass
            attachArray="passes"
            args={[aspect, scene, camera]}
            selectedObjects={selected}
            visibleEdgeColor={new THREE.Color(0xff0000)}
            edgeStrength={25}
            edgeThickness={0.15}
          />
        </effectComposer>
      </selectContext.Provider>
    </hoverContext.Provider>
  );
}
