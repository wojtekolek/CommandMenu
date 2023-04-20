import type { FunctionComponent } from "react";

import { ExternalLink } from "components/Link";

const YEAR = new Date().getFullYear();

export const Footer: FunctionComponent = () => (
  <footer className="from-primary-200 dark:from-primary-900 flex h-32 flex-col items-center justify-center bg-gradient-to-t">
    <div className="text-primary-800 dark:text-primary-200">
      Made with 🖤 by{" "}
      <ExternalLink
        href="https://wojtekolek.com"
        className="text-secondary-600 dark:text-secondary-400 underline decoration-dashed"
      >
        Wojtek Olek
      </ExternalLink>
      <span className="text-primary-500 ml-2">{YEAR} ©</span>
    </div>
  </footer>
);
