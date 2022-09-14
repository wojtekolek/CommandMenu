import type { FunctionComponent } from 'react'

import styled from 'styled-components'

import { Demo } from './components/Demo'
import { Heading } from './components/Heading'
import { HowToUse } from './components/HowToUse'

const LandingContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.ss4};
`

export const Landing: FunctionComponent = () => (
  <>
    <Heading />
    <LandingContent>
      <Demo />
      <HowToUse />
    </LandingContent>
  </>
)
