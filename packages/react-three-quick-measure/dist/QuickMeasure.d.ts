/// <reference types="react" />
import * as THREE from "three";
import { ReactThreeFiber } from "@react-three/fiber";
import { OutlinePass } from "three/examples/jsm/postprocessing/OutlinePass";
export interface Measure {
    selected: THREE.Mesh[];
    hovered: THREE.Mesh[];
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            outlinePass: ReactThreeFiber.Object3DNode<OutlinePass, typeof OutlinePass>;
        }
    }
}
export declare function QuickMeasure({ children: _children, ...props }: ReactThreeFiber.Object3DNode<THREE.Object3D, THREE.Object3D>): JSX.Element;
