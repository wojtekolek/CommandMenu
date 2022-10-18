import type { FunctionComponent } from 'react'

import SyntaxHighlighter from 'react-syntax-highlighter'
import styled from 'styled-components'

const CodeWrapper = styled.div`
  padding: ${({ theme }) => theme.spacing.ss2};
  background: linear-gradient(42deg, #aaaaaa06, #c6c6c605);
  border-radius: ${({ theme }) => theme.radius.rad3};
`

const CodeInner = styled.pre`
  padding: ${({ theme }) => theme.spacing.ss2};
  margin: ${({ theme }) => theme.spacing.ss0};
  background-color: #90909010;
  border-radius: ${({ theme }) => theme.radius.rad2};
`

type CodeSnippetProps = {
  children: string
}

export const CodeSnippet: FunctionComponent<CodeSnippetProps> = ({ children }) => (
  <CodeWrapper>
    <SyntaxHighlighter
      language="javascript"
      PreTag={CodeInner}
      useInlineStyles={false}
      wrapLongLines
    >
      {children}
    </SyntaxHighlighter>
  </CodeWrapper>
)
