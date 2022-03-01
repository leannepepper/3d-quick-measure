import { Html } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import * as React from "react";
import { CopyButton } from "./CopyButton";

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
        position={[-gridWidth / 2, gridHeight / 2.05, 0]}
        transform
      >
        <a
          className="gh-link"
          href="https://github.com/leannepepper/3d-quick-measure"
          target="_blank"
          aria-label="Go to the 3d-quick-measure repository on GitHub"
        >
          <svg
            aria-hidden="false"
            height="20"
            viewBox="0 0 16 16"
            version="1.1"
            width="20"
            data-view-component="true"
            className="octicon octicon-mark-github"
          >
            <path
              fillRule="evenodd"
              d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
            ></path>
          </svg>
        </a>
      </Html>
      <CopyButton
        position={[-gridWidth / 4.8, gridHeight / 2.2, 0]}
        text="npm install react three quick measure"
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
          react three quick measure
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
