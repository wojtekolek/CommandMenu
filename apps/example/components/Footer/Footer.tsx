import { FunctionComponent } from "react";

import styled from "styled-components";

const FooterWrapper = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 120px;
  background: ${({ theme }) => theme.colors.misc.footerGradient};
`;

const FooterText = styled.span`
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const CopyrightYear = styled.span`
  margin-left: ${({ theme }) => theme.spacing.ss2};
  color: ${({ theme }) => theme.colors.text.tertiary};
`;

const AuthorWebsiteLink = styled.a.attrs({
  href: "https://wojtekolek.com",
  target: "_blank",
})`
  color: ${({ theme }) => theme.colors.text.secondary};
  text-decoration: underline dashed 1px;
  transition: opacity 0.3s;

  &:hover {
    opacity: 0.8;
  }
`;

const YEAR = new Date().getFullYear();

export const Footer: FunctionComponent = () => (
  <FooterWrapper>
    <FooterText>
      Made with 🖤 by <AuthorWebsiteLink>Wojtek Olek</AuthorWebsiteLink>
      <CopyrightYear>{YEAR} ©</CopyrightYear>
    </FooterText>
  </FooterWrapper>
);
