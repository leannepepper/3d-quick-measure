import { Html } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import * as React from "react";
import { CopyButton } from "./CopyButton";
import { GHLink } from "./GHLink";

export const ExampleText = ({ ...props }) => {
  const { viewport } = useThree();
  const gridWidth = viewport.width;
  const gridHeight = viewport.height;

  return (
    <>
      <GHLink position={[-gridWidth / 2, gridHeight / 2.05, 0]} />
      <CopyButton
        position={[-gridWidth / 4.8, gridHeight / 2.2, 0]}
        text="npm install react-three-quick-measure"
      />

      <Html
        as="div"
        wrapperClass={"html"}
        prepend
        center
        position={[-gridWidth / 3, gridHeight / 3, 0]}
        transform
      >
        <pre style={{ fontSize: "18px", textAlign: "left", lineHeight: 1.5 }}>
          npm install <br />
          react-three-quick-measure
        </pre>
      </Html>
      <Html
        as="div"
        wrapperClass={"html"}
        position={[gridWidth / 3, 0, 0]}
        transform
      >
        <pre style={{ fontSize: "16px" }}>
          {`
function MeasureComponent(){
 
  return (
    <QuickMeasure>
      <Box/>
      <Torus/>
    </QuickMeasure>
)}`}
        </pre>
      </Html>
      <CopyButton
        position={[gridWidth / 2.2, 2.5, 0]}
        text="
function MeasureComponent(){
 
  return (
    <QuickMeasure>
      <Box/>
      <Torus/>
    </QuickMeasure>
)}"
      />
    </>
  );
};
