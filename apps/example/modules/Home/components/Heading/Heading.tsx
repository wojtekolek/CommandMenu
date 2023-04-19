import { FunctionComponent, useRef } from "react";

import { motion, useScroll, useTransform } from "framer-motion";
import type { Variants } from "framer-motion";
import styled from "styled-components";

import { Title } from "components/Primitives";
import { from } from "utils/styles/responsiveness";

import { PackageName } from "./components/PackageName";

const HeadingWrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: ${({ theme }) => theme.spacing.ss8};
  margin-bottom: ${({ theme }) => theme.spacing.ss4};
  gap: ${({ theme }) => theme.spacing.ss3};

  ${Title} {
    text-align: center;
  }
`;

const HEADER_ANIMATION_VARIANTS: Variants = {
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

const AnimatedTitleWrapper = styled(motion.div).attrs(HEADER_ANIMATION_VARIANTS)``;

const AnimatedPackageNameWrapper = styled(motion.div).attrs({
  initial: {
    ...HEADER_ANIMATION_VARIANTS.initial,
  },
  animate: {
    ...HEADER_ANIMATION_VARIANTS.animate,
    transition: {
      duration: 0.5,
      delay: 0.4,
    },
  },
})``;

const Separator = styled.div`
  width: 100%;
  height: 2px;
  background: ${({ theme }) => theme.colors.misc.separatorGradient};

  ${from("tablet")} {
    width: 80%;
  }
`;

export const Heading: FunctionComponent = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [1, 0], [0, 1]);

  return (
    <HeadingWrapper ref={ref} style={{ opacity }}>
      <AnimatedTitleWrapper>
        <Title>
          Headless UI for building
          <br />
          command menus in React.
        </Title>
      </AnimatedTitleWrapper>
      <AnimatedPackageNameWrapper>
        <PackageName />
      </AnimatedPackageNameWrapper>
      <Separator />
    </HeadingWrapper>
  );
};
