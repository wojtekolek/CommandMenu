import type { FunctionComponent, ReactNode } from 'react'

import { ThemeProvider, createGlobalStyle } from 'styled-components'

import { Footer } from 'components/Footer'
import { Normalize } from 'utils/styles/Normalize'
import { theme } from 'utils/styles/theme'

const GlobalStyle = createGlobalStyle`
  html {
    color: ${({ theme }) => theme.colors.text.tertiary};
  }

  body {
    font-family: 'Quicksand', sans-serif;
    background-color: ${({ theme }) => theme.colors.background.primary};

    #__next {
      display: flex;
      flex-direction: column;
      background: ${({ theme }) => theme.colors.misc.pageGradient};
      min-height: 100vh;
    }
  }
`

type LayoutProps = {
  children: ReactNode
}

export const Layout: FunctionComponent<LayoutProps> = ({ children }) => (
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    <Normalize />
    {children}
    <Footer />
  </ThemeProvider>
)
