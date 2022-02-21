/// <reference types="react" />
import * as THREE from "three";
export declare const quickMeasureTheme: {
    colors: {
        mainAxis: string;
        crossAxis: string;
    };
};
export declare function getMidPoint(points: THREE.Vector3[]): THREE.Vector3;
export declare function getBoundingBox(multiSelected: any[]): THREE.Box3;
export declare function MultiObjectBoundingBox({ ...props }: {
    [x: string]: any;
}): JSX.Element;
