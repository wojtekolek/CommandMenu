import type { FunctionComponent, ReactNode } from "react";

import { type ClassName, cn } from "utils/styles/utils";

type BadgeProps = {
  className?: ClassName;
  children: ReactNode;
};

const Badge: FunctionComponent<BadgeProps> = ({ className, children }) => (
  <div className={cn("inline-flex items-center gap-2", className)}>{children}</div>
);

type BadgesFunctionComponent<Props> = {
  Badge: typeof Badge;
} & FunctionComponent<Props>;

type BadgesProps = {
  className?: ClassName;
  children: ReactNode;
};

export const Badges: BadgesFunctionComponent<BadgesProps> = ({ className, children }) => (
  <div className={cn("flex  items-center gap-6", className)}>{children}</div>
);

Badges.Badge = Badge;
