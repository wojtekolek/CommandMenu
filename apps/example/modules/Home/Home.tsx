import { FunctionComponent, useRef } from 'react'

import { motion, useScroll, useTransform } from 'framer-motion'
import styled from 'styled-components'

import { Demo } from './components/Demo'
import { Heading } from './components/Heading'
import { HowToUse } from './components/HowToUse'

const HomeSection = styled.section``

const HomeContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.ss4};
`

const DemoWrapper = styled(motion.div)``

export const Home: FunctionComponent = () => {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start']
  })
  const y = useTransform(scrollYProgress, [0, 1], [0, 160])
  const opacity = useTransform(scrollYProgress, [1, 0], [0, 1])

  return (
    <HomeSection ref={ref}>
      <Heading />
      <HomeContent>
        <DemoWrapper style={{ y, opacity }}>
          <Demo />
        </DemoWrapper>
        <HowToUse />
      </HomeContent>
    </HomeSection>
  )
}
