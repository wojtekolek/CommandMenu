import styled from 'styled-components'
import { from } from 'utils/styles/responsiveness'

export const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSize.fs6};
  color: ${({ theme }) => theme.colors.text.primary};
  background-image: -webkit-linear-gradient(45deg, #f7f7f7, #d8b364);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  ${from('tablet')} {
    font-size: ${({ theme }) => theme.fontSize.fs7};
  }
`

export const SubTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSize.fs3};
  color: ${({ theme }) => theme.colors.text.secondary};
`

export const SectionTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSize.fs3};
  color: ${({ theme }) => theme.colors.text.tertiary};
`
