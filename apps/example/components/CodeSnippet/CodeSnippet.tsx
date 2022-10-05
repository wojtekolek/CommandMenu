import { FunctionComponent, ReactNode } from 'react'

import styled from 'styled-components'

const CodeWrapper = styled.div`
  padding: ${({ theme }) => theme.spacing.ss2};
  background: linear-gradient(42deg, #42424206, #d8b36405);
  border-radius: ${({ theme }) => theme.radius.rad3};
`

const CodeInner = styled.pre`
  padding: ${({ theme }) => theme.spacing.ss2};
  margin: ${({ theme }) => theme.spacing.ss0};
  background-color: #45454510;
  border-radius: ${({ theme }) => theme.radius.rad2};
`

type CodeSnippetProps = {
  children: ReactNode
}

export const CodeSnippet: FunctionComponent<CodeSnippetProps> = ({ children }) => (
  <CodeWrapper>
    <CodeInner>{children}</CodeInner>
  </CodeWrapper>
)
