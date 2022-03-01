import * as React from "react";
import { motion } from "framer-motion";

export function CopyTooltip({ ...props }) {
  const { showTooltip } = props;
  return (
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
  );
}
