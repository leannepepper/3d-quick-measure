import { Html } from "@react-three/drei";
import * as React from "react";
import { useState } from "react";
import { motion } from "framer-motion";

export function CopyButton({ ...props }) {
  const [showTooltip, setShowTooltip] = useState(false);

  function copyTextToClipboard() {
    if (!navigator.clipboard) {
      console.log("clipboard not supported");
      return;
    }
    navigator.clipboard.writeText(props.text).then(
      function () {
        setShowTooltip(true);
        setTimeout(() => {
          setShowTooltip(false);
        }, 1000);
        console.log("Copying to clipboard was successful!");
      },
      function (err) {
        console.error("Could not copy text: ", err);
      }
    );
  }

  return (
    <Html as="div" wrapperClass={"html"} {...props} transform>
      <motion.span
        style={{
          fontSize: "12px",
          backgroundColor: "#000",
          color: "#fac407",
          padding: "3px",
          borderRadius: "3px",
          display: "inline-block",
          position: "relative",
          bottom: "5px",
          opacity: showTooltip ? 1 : 0,
        }}
        animate={{
          opacity: showTooltip ? 1 : 0,
        }}
        transition={{
          duration: 0.2,
          ease: "easeInOut",
        }}
      >
        Copied!
      </motion.span>
      <button
        onClick={() => {
          copyTextToClipboard();
        }}
        aria-label={`Copy ${props.text} to clipboard`}
        style={{
          backgroundColor: "transparent",
          border: "none",
          cursor: "pointer",
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="rgba(0,0,0,0.5)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-clipboard"
        >
          <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
          <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
        </svg>
      </button>
    </Html>
  );
}
