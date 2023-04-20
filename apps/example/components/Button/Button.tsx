import type { FunctionComponent, MouseEventHandler, ReactNode } from "react";

import { type ClassName, cn } from "utils/styles/utils";

type ButtonProps = {
  className: ClassName;
  testid?: string;
  type?: "submit" | "reset" | "button";
  disabled?: boolean;
  onClick?: MouseEventHandler;
  children: ReactNode;
};

export const Button: FunctionComponent<ButtonProps> = ({
  className,
  testid,
  children,
  ...props
}) => (
  <button
    {...props}
    data-testid={testid}
    className={cn(
      "text-primary-900 dark:text-primary-100 inline-flex border-none bg-transparent p-0 transition-all hover:opacity-80 active:scale-95",
      className,
    )}
  >
    {children}
  </button>
);
