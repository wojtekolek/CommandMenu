"use client";

import type { FunctionComponent, ReactNode } from "react";
import { useRef } from "react";

import { motion, useScroll, useTransform } from "framer-motion";

import { AnimatedSection } from "components/Primitives";
import { cn } from "utils/styles/utils";

type HowToUseSectionProps = {
  className?: string;
  title: string;
  children: ReactNode;
};

export const HowToUseSection: FunctionComponent<HowToUseSectionProps> = ({
  className,
  title,
  children,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start center"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-20, 80]);
  const borderOpacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const titleOpacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={ref} className={cn("mt-52", className)}>
      <motion.h2 className="text-center text-4xl" style={{ y, opacity: titleOpacity }}>
        {title}
      </motion.h2>
      <motion.div
        style={{ opacity: borderOpacity }}
        className="from-secondary-600/20 relative  top-28 z-10 mx-auto h-28 max-w-3xl bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] via-transparent"
      >
        <motion.div className="from-primary-800 via-secondary-500 to-primary-800 h-[1px] bg-gradient-to-r" />
      </motion.div>
      <AnimatedSection
        id="howToUseBasic"
        className="border-1 border-primary-800 bg-primary-900 mx-auto max-w-4xl rounded-md p-6"
      >
        <div className="flex flex-col gap-8">{children}</div>
      </AnimatedSection>
    </div>
  );
};
