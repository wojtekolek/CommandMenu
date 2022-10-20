import type { FunctionComponent, ReactNode } from 'react'
import { useRef } from 'react'

import { motion, useScroll, useTransform } from 'framer-motion'
import styled from 'styled-components'

import { AnimatedSection, HeadingsColorStyles } from 'components/Primitives'
import { from } from 'utils/styles/responsiveness'

const HowToUseSectionWrapper = styled.div``

const HowToUseWrapper = styled(AnimatedSection)`
  margin: ${({ theme }) => `${theme.spacing.ss0} ${theme.spacing.ss8} ${theme.spacing.ss3}`};

  ${from('desktop')} {
    margin: ${({ theme }) => `${theme.spacing.ss0} ${theme.spacing.ss10} ${theme.spacing.ss5}`};
  }

  padding: ${({ theme }) => theme.spacing.ss8};
  border-radius: ${({ theme }) => theme.radius.rad3};
  border: 1px solid ${({ theme }) => theme.colors.misc.border};
  background-color: ${({ theme }) => `${theme.colors.background.secondary}80`};
  z-index: ${({ theme }) => theme.zIndex.onTopOfInitial};
`

const HowToUseContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.ss4};
`

const SectionTitleWrapper = styled.div`
  transform: ${({ theme }) => `translateY(${theme.spacing.ss10})`};
`

const BottomBorder = styled(motion.div)`
  height: 400px;
  background: ${({
    theme
  }) => `conic-gradient(from 90deg at 80% 50%, ${theme.colors.background.primary}00, ${theme.colors.primary.background}),
    conic-gradient(from 270deg at 20% 50%, ${theme.colors.primary.background}, ${theme.colors.background.primary}00)`};
  mask-image: ${({ theme }) =>
    `radial-gradient(100% 50% at center center, ${theme.colors.primary.background}, transparent)`};
  background-position-x: 0%, 100%;
  background-size: 50% 100%, 50% 100%;
  background-repeat: no-repeat;
`

const SectionTitle = styled(motion.h3)`
  ${HeadingsColorStyles}
  text-align: center;
  font-size: ${({ theme }) => theme.fontSize.fs5};
`

type HowToUseSectionProps = {
  title: string
  children: ReactNode
}

export const HowToUseSection: FunctionComponent<HowToUseSectionProps> = ({ title, children }) => {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start center', 'end center']
  })
  const y = useTransform(scrollYProgress, [0, 1], [0, 180])
  const scale = useTransform(scrollYProgress, [0.5, 1], [1, 2])
  const opacity = useTransform(scrollYProgress, [0.5, 1], [0.1, 0.4])
  const titleOpacity = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <HowToUseSectionWrapper>
      <SectionTitleWrapper ref={ref}>
        <SectionTitle style={{ y, opacity: titleOpacity }}>{title}</SectionTitle>
        <BottomBorder style={{ scale, opacity, rotate: 180 }} />
      </SectionTitleWrapper>
      <HowToUseWrapper id="howToUseBasic">
        <HowToUseContent>{children}</HowToUseContent>
      </HowToUseWrapper>
    </HowToUseSectionWrapper>
  )
}
