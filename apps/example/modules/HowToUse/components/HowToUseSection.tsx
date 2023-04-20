"use client";

import type { FunctionComponent, ReactNode } from "react";
import { useRef } from "react";

import { motion, useScroll, useTransform } from "framer-motion";

import { AnimatedSection } from "components/Primitives";

type HowToUseSectionProps = {
  title: string;
  children: ReactNode;
};

export const HowToUseSection: FunctionComponent<HowToUseSectionProps> = ({ title, children }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start center"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-120, 0]);
  const titleOpacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={ref} className="mt-80">
      <motion.h2 className="mb-6 text-center text-4xl" style={{ y, opacity: titleOpacity }}>
        {title}
      </motion.h2>
      <AnimatedSection
        id="howToUseBasic"
        className="border-1 border-primary-800 bg-primary-900 mx-auto mb-6 max-w-4xl rounded-md p-6"
      >
        <div className="flex flex-col gap-8">{children}</div>
      </AnimatedSection>
    </div>
  );
};
