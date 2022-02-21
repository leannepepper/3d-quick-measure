import { Html } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import * as React from "react";

export const ExampleText = ({ ...props }) => {
  const { viewport } = useThree();
  const gridWidth = viewport.width;
  const gridHeight = viewport.height;

  return (
    <>
      <Html
        as="div"
        wrapperClass={"html"}
        prepend
        center
        position={[-gridWidth / 3, gridHeight / 3, 0]}
        sprite
      >
        <pre
          style={{ fontSize: "18px" }}
        >{` npm-i-react-three-quick-measure`}</pre>
      </Html>

      <Html
        as="div"
        wrapperClass={"html"}
        prepend
        position={[gridWidth / 5.5, gridHeight / 9, 0]}
        sprite
      >
        <pre style={{ fontSize: "14px" }}>
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
    </>
  );
};
