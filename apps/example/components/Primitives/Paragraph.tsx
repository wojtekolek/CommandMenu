import type { FunctionComponent, ReactNode } from "react";

import { type ClassName, cn } from "utils/styles/utils";

type ParagraphProps = {
  className?: ClassName;
  children: ReactNode;
};

export const Paragraph: FunctionComponent<ParagraphProps> = ({ className, children }) => (
  <p
    className={cn(
      "text-primary-700 dark:text-primary-200 [&>strong]:text-secondary-600 whitespace-pre-wrap",
      className,
    )}
  >
    {children}
  </p>
);
