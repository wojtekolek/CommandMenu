import type { FunctionComponent } from "react";

import { motion, useScroll, useTransform } from "framer-motion";
import styled from "styled-components";

import { from } from "utils/styles/responsiveness";

import { Demo } from "./components/Demo";
import { Heading } from "./components/Heading";

const HomeSection = styled.section`
  padding: ${({ theme }) => `${theme.spacing.ss0} ${theme.spacing.ss2} ${theme.spacing.ss8}`};

  ${from("tablet")} {
    padding: ${({ theme }) => `${theme.spacing.ss0} ${theme.spacing.ss6} ${theme.spacing.ss8}`};
  }

  ${from("desktop")} {
    padding: ${({ theme }) => `${theme.spacing.ss0} ${theme.spacing.ss10} ${theme.spacing.ss8}`};
  }
`;

const DemoWrapper = styled(motion.div)``;

export const Home: FunctionComponent = () => {
  const { scrollYProgress } = useScroll({
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 500]);
  const opacity = useTransform(scrollYProgress, [1, 0], [0, 1]);

  return (
    <HomeSection>
      <Heading />
      <DemoWrapper style={{ y, opacity }}>
        <Demo />
      </DemoWrapper>
    </HomeSection>
  );
};
