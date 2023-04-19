import type { FunctionComponent } from "react";

import styled from "styled-components";

import { CodeSnippet } from "components/CodeSnippet";
import { Message, SubTitle } from "components/Primitives";

import type { HowToUseData } from "../types";

const HowToUseItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.ss2};
`;

type HowToUseItemProps = HowToUseData;

export const HowToUseItem: FunctionComponent<HowToUseItemProps> = ({
  message,
  codeMarkdown,
  title,
}) => (
  <HowToUseItemWrapper>
    {title && <SubTitle>{title}</SubTitle>}
    <Message>{message}</Message>
    <CodeSnippet>{codeMarkdown}</CodeSnippet>
  </HowToUseItemWrapper>
);
