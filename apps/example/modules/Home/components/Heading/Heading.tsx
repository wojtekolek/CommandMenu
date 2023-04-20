import { type FunctionComponent, useRef } from "react";

import { motion, useScroll, useTransform } from "framer-motion";
import type { Variants } from "framer-motion";

import { H1 } from "components/Primitives";

import { PackageName } from "./components/PackageName";

const TITLE_ANIMATION_PROPS: Variants = {
  initial: {
    y: -50,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
};

const PACKAGE_NAME_ANIMATION_PROPS: Variants = {
  initial: TITLE_ANIMATION_PROPS.initial,
  animate: {
    ...TITLE_ANIMATION_PROPS.animate,
    transition: {
      duration: 0.5,
      delay: 0.4,
    },
  },
};

export const Heading: FunctionComponent = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [1, 0], [0, 1]);

  return (
    <motion.div
      className="mb-8 mt-16 flex flex-col items-center gap-6"
      ref={ref}
      style={{ opacity }}
    >
      <motion.div {...TITLE_ANIMATION_PROPS}>
        <H1 className="text-center">
          Headless UI for building
          <br />
          command menus in React.
        </H1>
      </motion.div>
      <motion.div {...PACKAGE_NAME_ANIMATION_PROPS}>
        <PackageName />
      </motion.div>
      <div className="from-secondary-400 tablet:w-4/5 h-[2px] w-full bg-gradient-to-l" />
    </motion.div>
  );
};
