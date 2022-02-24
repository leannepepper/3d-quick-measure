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
        position={[-gridWidth / 3, gridHeight / 3, 0]}
        transform
      >
        <pre
          style={{ fontSize: "18px" }}
        >{` npm-i-react-three-quick-measure`}</pre>
      </Html>

      <Html
        as="div"
        wrapperClass={"html"}
        prepend
        position={[gridWidth / 3, 0, 0]}
        transform
      >
        <pre style={{ fontSize: "18px" }}>
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
