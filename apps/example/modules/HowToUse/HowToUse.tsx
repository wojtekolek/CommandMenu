import { FunctionComponent, useRef } from 'react'

import { motion, useScroll, useTransform } from 'framer-motion'
import styled from 'styled-components'

import { AnimatedSection } from 'components/Primitives'

import { HowToUseItem } from './components/HowToUseItem'
import { HOW_TO_USE_DATA } from './constants'

const HowToUseSectionWrapper = styled.div``

const HowToUseWrapper = styled(AnimatedSection)`
  padding: ${({ theme }) => theme.spacing.ss8};
  border-radius: ${({ theme }) => theme.radius.rad3};
  border: 1px solid ${({ theme }) => theme.colors.misc.border};
  background-color: ${({ theme }) => theme.colors.background.secondary};
  z-index: ${({ theme }) => theme.zIndex.onTopOfInitial};
`

const HowToUseContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.ss4};
`

const SectionTitleWrapper = styled.div`
  padding-top: ${({ theme }) => theme.spacing.ss8};
  padding-bottom: ${({ theme }) => theme.spacing.ss10};
  overflow: hidden;
`

const SectionTitle = styled(motion.h3).attrs({
  initial: {
    opacity: 0
  },
  whileInView: {
    opacity: 1,
    transition: {
      duration: 0.5,
      delay: 0.2
    }
  }
})`
  text-align: center;
  font-weight: ${({ theme }) => theme.fontWeight.regular};
  font-size: ${({ theme }) => theme.fontSize.fs5};
  color: ${({ theme }) => theme.colors.text.tertiary};
`

export const HowToUse: FunctionComponent = () => {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center end']
  })
  const y = useTransform(scrollYProgress, [0, 1], [0, 180])

  return (
    <HowToUseSectionWrapper ref={ref}>
      <SectionTitleWrapper>
        <SectionTitle style={{ y }}>How to use it?</SectionTitle>
      </SectionTitleWrapper>
      <HowToUseWrapper id="howToUseBasic">
        <HowToUseContent>
          {HOW_TO_USE_DATA.map(({ message, codeMarkdown }, index) => (
            <HowToUseItem
              key={`${index}_how_to_use`}
              message={message}
              codeMarkdown={codeMarkdown}
            />
          ))}
        </HowToUseContent>
      </HowToUseWrapper>
    </HowToUseSectionWrapper>
  )
}
