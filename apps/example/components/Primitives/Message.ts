import styled from "styled-components";

export const Message = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: 1.3;
  white-space: pre-wrap;

  strong {
    color: ${({ theme }) => theme.colors.primary.default};
  }
`;
