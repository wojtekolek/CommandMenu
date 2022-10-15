import styled from 'styled-components'

export const Message = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: 1.3;

  strong {
    color: ${({ theme }) => theme.colors.primary.default};
  }
`
