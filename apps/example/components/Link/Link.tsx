import type { FunctionComponent, ReactNode } from "react";

import { cn } from "utils/styles/utils";

type ExternalLinkProps = {
  className?: string;
  href: string;
  children: ReactNode;
};

export const ExternalLink: FunctionComponent<ExternalLinkProps> = ({
  className,
  href,
  children,
}) => (
  <a
    className={cn(
      "text-primary-900 dark:text-primary-100 inline-flex border-none bg-transparent p-0 transition-all hover:opacity-80 active:scale-95",
      className,
    )}
    href={href}
  >
    {children}
  </a>
);
