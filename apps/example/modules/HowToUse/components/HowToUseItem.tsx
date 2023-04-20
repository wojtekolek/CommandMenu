import type { FunctionComponent } from "react";

import { CodeSnippet } from "components/CodeSnippet";
import { H2, Paragraph } from "components/Primitives";

import type { HowToUseData } from "../types";

type HowToUseItemProps = HowToUseData;

export const HowToUseItem: FunctionComponent<HowToUseItemProps> = ({
  message,
  codeMarkdown,
  title,
}) => (
  <div className="flex flex-col gap-4">
    {title && <H2>{title}</H2>}
    <Paragraph>{message}</Paragraph>
    <CodeSnippet>{codeMarkdown}</CodeSnippet>
  </div>
);
