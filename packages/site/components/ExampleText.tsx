import { Html } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import * as React from "react";

export const ExampleText = ({ ...props }) => {
  const { viewport } = useThree();
  const gridWidth = viewport.width;
  const gridHeight = viewport.height;

  function copyTextToClipboard(text: string) {
    if (!navigator.clipboard) {
      console.log("clipboard not supported");
      return;
    }
    navigator.clipboard.writeText(text).then(
      function () {
        console.log("Copying to clipboard was successful!");
      },
      function (err) {
        console.error("Could not copy text: ", err);
      }
    );
  }
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
        position={[-gridWidth / 5.2, gridHeight / 2.2, 0]}
        transform
      >
        <a
          onClick={() => {
            copyTextToClipboard("npm install react three quick measure");
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="rgba(0,0,0,0.5)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-clipboard"
          >
            <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
            <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
          </svg>
        </a>
      </Html>

      <Html
        as="div"
        wrapperClass={"html"}
        prepend
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
      <Html
        as="div"
        wrapperClass={"html"}
        position={[gridWidth / 2.09, gridHeight / 8, 0]}
        transform
      >
        <a
          onClick={() => {
            copyTextToClipboard(`function MeasureComponent(){
              return (
                <QuickMeasure>
                  <Box/>
                  <Torus/>
                </QuickMeasure>
            )}`);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="rgba(0,0,0,0.5)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-clipboard"
          >
            <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
            <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
          </svg>
        </a>
      </Html>
    </>
  );
};
