import styled from 'styled-components'

const StyledLink = styled.a`
  display: block;
  color: ${({ theme }) => theme.colors.text.primary};
  white-space: nowrap;
  transition: opacity 0.3s;

  &:hover {
    opacity: 0.8;
  }

  &:active {
    transform: scale(0.99);
  }
`

export const ExternalLink = styled(StyledLink).attrs({
  target: '_blank',
  rel: 'noopener'
})`
  color: ${({ theme }) => theme.colors.text.primary};
`
