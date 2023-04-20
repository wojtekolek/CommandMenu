import type { FunctionComponent, ReactNode } from "react";

import { type ClassName, cn } from "utils/styles/utils";

type TitleProps = {
  className?: ClassName;
  children: ReactNode;
};

export const H1: FunctionComponent<TitleProps> = ({ className, children }) => (
  <h1
    className={cn(
      "from-primary-50 to-primary-400 bg-gradient-to-br bg-clip-text text-4xl font-medium text-transparent drop-shadow",
      className,
    )}
  >
    {children}
  </h1>
);

export const H2: FunctionComponent<TitleProps> = ({ className, children }) => (
  <h2 className={cn("text-primary-100 text-3xl drop-shadow", className)}>{children}</h2>
);

export const H3: FunctionComponent<TitleProps> = ({ className, children }) => (
  <h3 className={cn("text-primary-200 text-2xl drop-shadow", className)}>{children}</h3>
);
