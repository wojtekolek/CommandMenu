import { FunctionComponent } from 'react'

import styled from 'styled-components'

const FooterWrapper = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 120px;
  background: ${({ theme }) => theme.colors.misc.footerGradient};
`

const FooterText = styled.span`
  color: ${({ theme }) => theme.colors.text.secondary};
`

const CopyrightYear = styled.span`
  margin-left: ${({ theme }) => theme.spacing.ss2};
  color: ${({ theme }) => theme.colors.text.tertiary};
`

const YEAR = new Date().getFullYear()

export const Footer: FunctionComponent = () => (
  <FooterWrapper>
    <FooterText>
      Made with 🖤 by Wojtek Olek
      <CopyrightYear>{YEAR} ©</CopyrightYear>
    </FooterText>
  </FooterWrapper>
)
