"use client";

import type { FunctionComponent, ReactNode } from "react";
import { useRef } from "react";

import { motion, useScroll, useTransform } from "framer-motion";

type AnimatedSectionProps = {
  className?: string;
  children: ReactNode;
  id: string;
};

export const AnimatedSection: FunctionComponent<AnimatedSectionProps> = ({
  className,
  children,
  id,
}) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["24px end", "192px end"] });
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <motion.section ref={ref} className={className} id={id} style={{ opacity }}>
      {children}
    </motion.section>
  );
};
