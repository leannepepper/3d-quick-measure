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
// import { maybeDrawMeasurements } from "./line";

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
  const setHovered = useContext(hoverContext);

  const onPointerOver = useCallback(() => {
    setHovered((state: any) => {
      return selected.includes(ref.current)
        ? [...state]
        : [...state, ref.current];
    });
  }, [selected]);

  const onPointerOut = useCallback(
    () =>
      setHovered((state: any) =>
        state.filter((mesh: any) => mesh !== ref.current)
      ),
    []
  );
  return { onPointerOver, onPointerOut };
}

function useSelect(ref: React.MutableRefObject<undefined>) {
  const setSelected = useContext(selectedContext);
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

  const selectProps = useSelect(ref);
  const hoverProps = useHover(ref, props.selected);

  return (
    <mesh {...props} ref={ref} {...hoverProps} {...selectProps}>
      <boxGeometry args={[2, 2, 2]} />
      <meshBasicMaterial color={props.color} />
    </mesh>
  );
};

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
      <selectedContext.Provider value={setSelected}>
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
      </selectedContext.Provider>
    </hoverContext.Provider>
  );
}
