"use client";

import type { FunctionComponent } from "react";

import { motion, useScroll, useTransform } from "framer-motion";

import { Demo } from "./components/Demo";
import { Heading } from "./components/Heading";

export const Home: FunctionComponent = () => {
  const { scrollYProgress } = useScroll({
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 500]);
  const opacity = useTransform(scrollYProgress, [1, 0], [0, 1]);

  return (
    <div className="tablet:px-12 desktop:px-32 px-4 pb-16">
      <Heading />
      <motion.div style={{ y, opacity }}>
        <Demo />
      </motion.div>
    </div>
  );
};
