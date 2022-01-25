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
import { CycleRaycast } from "@react-three/drei";

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

function useHover(ref: React.MutableRefObject<undefined>, selected: any[]) {
  //const hovered = useContext(hoverContext);

  const onPointerOver = useCallback(() => {
    //console.log("In");
  }, []);

  const onPointerOut = useCallback(() => {
    //console.log("Out");
  }, []);

  // const onPointerOver = useCallback(() => {
  //   setHovered((state: any) => {
  //     return selected.includes(ref.current)
  //       ? [...state]
  //       : [...state, ref.current];
  //   });
  // }, [selected]);

  // const onPointerOut = useCallback(
  //   () =>
  //     setHovered((state: any) => {
  //       return state.filter((mesh: any) => mesh !== ref.current);
  //     }),

  //   []
  // );
  return { onPointerOver, onPointerOut };
}

function useSelect(ref: React.MutableRefObject<undefined>) {
  const [selected, setSelected] = useContext(selectedContext);
  const hovered = useContext(hoverContext);
  // console.log("hit", hovered);
  //console.log("selected", selected);

  const onClick = useCallback(
    () =>
      setSelected((state: any[]) => {
        return state.includes(ref.current)
          ? state.filter((mesh: any) => mesh !== ref.current)
          : [...state, ref.current];
      }),
    []
  );

  return { onClick };
}

const MeasuredMesh = ({ ...props }) => {
  const ref = useRef<any>();

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
      {...useHover(ref, props.selected)}
      {...useSelect(ref)}
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
    <hoverContext.Provider value={hovered}>
      <selectedContext.Provider value={[selected, setSelected]}>
        <MeasuredMesh
          position={[-2, 0, 0]}
          color={"hotpink"}
          animate={false}
          selected={selected}
        />
        <MeasuredMesh
          position={[1, 3, 0]}
          color={"yellow"}
          animate={true}
          selected={selected}
        />
        <MeasuredMesh
          position={[4, -4, 0]}
          color={"blue"}
          animate={false}
          selected={selected}
        />
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
            selectedObjects={selected}
            visibleEdgeColor={new THREE.Color(0xff0000)}
            edgeStrength={25}
            edgeThickness={0.15}
          />
        </effectComposer>
        <CycleRaycast
          preventDefault={true}
          scroll={true}
          keyCode={9}
          onChanged={(objects, cycle) => {
            setHover(objects);
            return null;
          }}
        />
        <Measurements selected={selected} hovered={hovered} />
      </selectedContext.Provider>
    </hoverContext.Provider>
  );
}
