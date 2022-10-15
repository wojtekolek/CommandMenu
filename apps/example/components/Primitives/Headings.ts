import styled from 'styled-components'

export const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSize.fs5};
  color: ${({ theme }) => theme.colors.text.primary};
  background-image: ${({ theme }) =>
    `-webkit-linear-gradient(45deg, ${theme.colors.text.primary}, #A5A5A5)`};
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`

export const SubTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSize.fs3};
  color: ${({ theme }) => theme.colors.text.secondary};
`

export const SectionTitle = styled.h3`
  font-weight: ${({ theme }) => theme.fontWeight.regular};
  font-size: ${({ theme }) => theme.fontSize.fs4};
  color: ${({ theme }) => theme.colors.text.tertiary};
`
