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
        <pre>{` npm-i-three-quick-measure`}</pre>
      </Html>

      <Html
        as="div"
        wrapperClass={"html"}
        prepend
        center
        position={[gridWidth / 3, gridHeight / 26, 0]}
        sprite
      >
        <pre>
          {`
import {QuickMeasure} from three-quick-measure

function App(){
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
