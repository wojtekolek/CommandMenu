import type { FunctionComponent } from 'react'

import styled from 'styled-components'

import { Demo } from './components/Demo'
import { Heading } from './components/Heading'
import { HowToUse } from './components/HowToUse'

const HomeContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.ss4};
`

export const Home: FunctionComponent = () => (
  <>
    <Heading />
    <HomeContent>
      <Demo />
      <HowToUse />
    </HomeContent>
  </>
)
