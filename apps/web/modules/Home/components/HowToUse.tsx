import type { FunctionComponent } from 'react'

import styled from 'styled-components'

import { CodeSnippet } from 'components/CodeSnippet'
import { SectionTitle } from 'components/Primitives'
import { from } from 'utils/styles/responsiveness'

const HowToUseWrapper = styled.section`
  margin: 0 auto;
  width: 100%;

  ${from('tablet')} {
    width: 640px;
  }
`

export const HowToUse: FunctionComponent = () => (
  <HowToUseWrapper>
    <SectionTitle>How to use it?</SectionTitle>
    <CodeSnippet>Soon...</CodeSnippet>
  </HowToUseWrapper>
)
