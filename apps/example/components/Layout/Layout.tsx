import type { FunctionComponent, ReactNode } from 'react'

import styled, { ThemeProvider, createGlobalStyle } from 'styled-components'

import { Footer } from 'components/Footer'
import { Normalize } from 'utils/styles/Normalize'
import { theme } from 'utils/styles/theme'
import { TopMenu } from 'components/TopMenu'

const GlobalStyle = createGlobalStyle`
  html {
    color: ${({ theme }) => theme.colors.text.tertiary};
  }

  body {
    font-family: 'Montserrat', sans-serif;
    background-color: ${({ theme }) => theme.colors.background.primary};

    #__next {
      display: flex;
      flex-direction: column;
      background: ${({ theme }) => theme.colors.misc.pageGradient};
      min-height: 100vh;
    }
  }
`

const LayoutMain = styled.main`
  margin: ${({ theme }) => `${theme.spacing.ss0} ${theme.spacing.ss10} ${theme.spacing.ss5}`};
`

type LayoutProps = {
  children: ReactNode
}

export const Layout: FunctionComponent<LayoutProps> = ({ children }) => (
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    <Normalize />
    <TopMenu />
    <LayoutMain>{children}</LayoutMain>
    <Footer />
  </ThemeProvider>
)
