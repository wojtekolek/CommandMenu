"use client";

import { type FunctionComponent, useRef } from "react";

import { motion, useScroll, useTransform } from "framer-motion";

import { H1 } from "components/Primitives";

export const AdvancedHeading: FunctionComponent = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "center center"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-50, 0]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <motion.div ref={ref} className="flex items-center justify-center py-10" style={{ y, opacity }}>
      <H1 className="text-center">
        Ah, you are looking for <br />
        something more advanced...
      </H1>
    </motion.div>
  );
};
