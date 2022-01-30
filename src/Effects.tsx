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
  forwardRef,
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
import { Measurements, MeasurementsFromBoundingBox } from "./line";
import { CycleRaycast, useIntersect, Select } from "@react-three/drei";
import { MultiObjectBoundingBox } from "./measureUtils";

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

function useHover() {
  const [selected, setSelected] = useContext(selectedContext);
  const [hovered, setHover] = useContext(hoverContext);

  const onPointerOver = useCallback((event) => {
    setHover((state: any) => {
      const isItemSelected = selected.filter(
        (obj: any) => obj.object === event.intersections[0].object
      );

      return isItemSelected.length > 0 ? [] : [event.intersections[0]];
    });
  }, []);

  const onPointerOut = useCallback((event) => {
    setHover([]);
  }, []);
  return { onPointerOver, onPointerOut };
}

function useSelected() {
  const [selected, setSelected] = useContext(selectedContext);

  const onClick = useCallback((event) => {
    setSelected((state: any) => {
      return [event.intersections[0]];
    });
  }, []);
  return { onClick };
}

const MeasuredMesh = ({ ...props }) => {
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

  const hoverProps = useHover();
  const selectedProps = useSelected();

  return (
    <mesh ref={ref} {...props} {...hoverProps} {...selectedProps}>
      <boxGeometry args={[2, 2, 2]} />
      <meshBasicMaterial color={props.color} />
    </mesh>
  );
};

export interface Measure {
  selected: any[];
  hovered: any[];
  multiSelected: any[];
}

export function Effects() {
  const composer = useRef(null);
  const { scene, gl, size, camera } = useThree();
  const aspect = useMemo(() => new THREE.Vector2(512, 512), []);
  const [hovered, setHover] = useState([]);
  const [selected, setSelected] = useState([]);
  const [multiSelectedObjs, setMultiSelectedObjs] = useState([]);

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

  function clearSingleSelect(multiSelectedObjs: any[]) {
    const selectedMeshes = selected.map((item) => {
      return item.object;
    });

    const multiSelectContainsSelected = multiSelectedObjs.some((obj) =>
      selectedMeshes.includes(obj)
    );

    if (multiSelectedObjs.length > 1 && multiSelectContainsSelected) {
      setSelected([]);
    }
  }

  return (
    <hoverContext.Provider value={[hovered, setHover]}>
      <selectedContext.Provider value={[selected, setSelected]}>
        <Select
          box
          multiple
          onChange={(selectedObjs) => {
            clearSingleSelect(selectedObjs);
            setMultiSelectedObjs(selectedObjs);
          }}
        >
          <MeasuredMesh
            position={[-3, 0, -3]}
            color={"hotpink"}
            animate={false}
          />
          <MeasuredMesh position={[1, 3, 0]} color={"yellow"} animate={false} />
          <MeasuredMesh position={[8, -4, 0]} color={"blue"} animate={false} />
        </Select>
        <MultiObjectBoundingBox multiSelected={multiSelectedObjs} />
        <Measurements
          selected={selected}
          hovered={hovered}
          multiSelected={multiSelectedObjs}
        />
        <MeasurementsFromBoundingBox
          selected={selected}
          hovered={hovered}
          multiSelected={multiSelectedObjs}
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
            selectedObjects={selected.map((obj) => obj.object)}
            visibleEdgeColor={new THREE.Color(0xff0000)}
            edgeStrength={25}
            edgeThickness={0.15}
          />
        </effectComposer>
      </selectedContext.Provider>
    </hoverContext.Provider>
  );
}
