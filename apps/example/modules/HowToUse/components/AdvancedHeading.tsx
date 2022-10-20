import { FunctionComponent, useRef } from 'react'

import { motion, useScroll, useTransform } from 'framer-motion'
import styled from 'styled-components'

import { Title } from 'components/Primitives'

const AdvancedHeadingWrapper = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => `${theme.spacing.ss10} ${theme.spacing.ss0}`};

  ${Title} {
    text-align: center;
  }
`

export const AdvancedHeading: FunctionComponent = () => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start center', 'center center']
  })
  const y = useTransform(scrollYProgress, [0, 1], [-50, 0])
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <AdvancedHeadingWrapper ref={ref} style={{ y, opacity }}>
      <Title>
        Ah, you are looking for <br />
        something more advanced...
      </Title>
    </AdvancedHeadingWrapper>
  )
}
