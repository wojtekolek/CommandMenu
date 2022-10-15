import type { FunctionComponent } from 'react'

import { motion, useScroll, useTransform } from 'framer-motion'
import styled from 'styled-components'

import { Demo } from './components/Demo'
import { Heading } from './components/Heading'

const HomeSection = styled.section`
  padding-bottom: ${({ theme }) => theme.spacing.ss4};
  overflow: hidden;
`

const DemoWrapper = styled(motion.div)``

export const Home: FunctionComponent = () => {
  const { scrollYProgress } = useScroll({
    offset: ['start start', 'end start']
  })
  const y = useTransform(scrollYProgress, [0, 1], [0, 240])
  const opacity = useTransform(scrollYProgress, [1, 0], [0, 1])

  return (
    <HomeSection>
      <Heading />
      <DemoWrapper style={{ y, opacity }}>
        <Demo />
      </DemoWrapper>
    </HomeSection>
  )
}
