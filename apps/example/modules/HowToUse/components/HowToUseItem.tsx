import type { FunctionComponent } from 'react'

import styled from 'styled-components'

import { CodeSnippet } from 'components/CodeSnippet'
import { Message } from 'components/Primitives'

const HowToUseItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.ss2};
`

type HowToUseItemProps = {
  message: string
  codeMarkdown: string
}

export const HowToUseItem: FunctionComponent<HowToUseItemProps> = ({ message, codeMarkdown }) => (
  <HowToUseItemWrapper>
    <Message>{message}</Message>
    <CodeSnippet>{codeMarkdown}</CodeSnippet>
  </HowToUseItemWrapper>
)
