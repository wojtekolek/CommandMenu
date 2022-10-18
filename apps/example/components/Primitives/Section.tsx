import type { FunctionComponent, ReactNode } from 'react'
import { useRef } from 'react'

import { motion, useScroll, useTransform } from 'framer-motion'
import styled from 'styled-components'

const AnimatedSectionWrapper = styled(motion.section)`
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    inset: ${({ theme }) => theme.spacing.ss0};
    opacity: 0.1;
    filter: url('/noise.svg#noiseFilter');
  }
`

type AnimatedSectionProps = {
  className?: string
  children: ReactNode
  id: string
}

export const AnimatedSection: FunctionComponent<AnimatedSectionProps> = ({
  className,
  children,
  id
}) => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['24px end', '192px end'] })
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <AnimatedSectionWrapper ref={ref} className={className} id={id} style={{ opacity }}>
      {children}
    </AnimatedSectionWrapper>
  )
}
