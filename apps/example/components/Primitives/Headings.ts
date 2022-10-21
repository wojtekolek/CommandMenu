import styled, { css } from 'styled-components'

export const HeadingsColorStyles = css`
  background-image: ${({ theme }) =>
    `-webkit-linear-gradient(45deg, ${theme.colors.text.primary}, ${theme.colors.text.quaternary})`};
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: ${({ theme }) => theme.colors.misc.textDropShadow};
`

export const Title = styled.h1`
  ${HeadingsColorStyles}
  font-size: ${({ theme }) => theme.fontSize.fs5};
`

export const SubTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSize.fs3};
  color: ${({ theme }) => theme.colors.text.secondary};
`

export const SectionTitle = styled.h2`
  ${HeadingsColorStyles}
  font-weight: ${({ theme }) => theme.fontWeight.regular};
  font-size: ${({ theme }) => theme.fontSize.fs4};
`
