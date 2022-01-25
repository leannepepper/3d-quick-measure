import * as THREE from "three";
import * as React from "react";
import {
  useRef,
  useMemo,
  useEffect,
  useState,
  createContext,
  useContext,
  useCallback,
} from "react";
import {
  ReactThreeFiber,
  useFrame,
  extend,
  useThree,
} from "@react-three/fiber";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { OutlinePass } from "three/examples/jsm/postprocessing/OutlinePass";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { Measurements } from "./line";

extend({
  EffectComposer,
  RenderPass,
  OutlinePass,
});
const hoverContext = createContext(null);
const selectedContext = createContext(null);

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

const MeasuredMesh = ({ ...props }) => {
  const ref = useRef<any>();
  const [selected, setSelected] = useContext(selectedContext);
  const [hovered, setHover] = useContext(hoverContext);

  useFrame((state) => {
    if (props.animate) {
      const elapsedTime = state.clock.elapsedTime;
      if (ref.current) {
        ref.current.position.y = Math.sin(elapsedTime * 0.8) * 1.5;
      }
    }
  });

  return (
    <mesh
      ref={ref}
      {...props}
      onPointerOver={(event) => {
        setHover((state: any) => {
          const isItemSelected = selected.filter(
            (obj: any) => obj.object === event.intersections[0].object
          );
          return isItemSelected.length > 0 ? [] : [event.intersections[0]];
        });
      }}
      onPointerOut={(event) => {
        setHover([]);
      }}
      onClick={(event) =>
        setSelected((state: any) => {
          const itemToRemove = state.filter(
            (obj: any) => obj.object === event.intersections[0].object
          );
          return itemToRemove.length > 0
            ? state.filter(
                (obj: any) => obj.object !== event.intersections[0].object
              )
            : [...state, event.intersections[0]];
        })
      }
    >
      <boxGeometry args={[2, 2, 2]} />
      <meshBasicMaterial color={props.color} />
    </mesh>
  );
};

export interface Measure {
  selected: any[];
  hovered: any[];
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
    <hoverContext.Provider value={[hovered, setHover]}>
      <selectedContext.Provider value={[selected, setSelected]}>
        <MeasuredMesh position={[-2, 0, 0]} color={"hotpink"} animate={false} />
        <MeasuredMesh position={[1, 3, 0]} color={"yellow"} animate={true} />
        <MeasuredMesh position={[4, -4, 0]} color={"blue"} animate={false} />
        <effectComposer ref={composer} args={[gl]}>
          <renderPass attachArray="passes" scene={scene} camera={camera} />
          <outlinePass
            attachArray="passes"
            args={[aspect, scene, camera]}
            selectedObjects={hovered.map((obj) => obj.object)}
            visibleEdgeColor={new THREE.Color(0xffffff)}
            edgeStrength={25}
            edgeThickness={0.25}
          />
          <outlinePass
            attachArray="passes"
            args={[aspect, scene, camera]}
            selectedObjects={selected.map((obj) => obj.object)}
            visibleEdgeColor={new THREE.Color(0xff0000)}
            edgeStrength={25}
            edgeThickness={0.15}
          />
        </effectComposer>
        <Measurements selected={selected} hovered={hovered} />
      </selectedContext.Provider>
    </hoverContext.Provider>
  );
}
