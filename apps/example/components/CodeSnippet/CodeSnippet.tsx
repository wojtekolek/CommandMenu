import type { FunctionComponent } from "react";

import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import jsx from "react-syntax-highlighter/dist/esm/languages/prism/jsx";

import { theme } from "./theme";

SyntaxHighlighter.registerLanguage("jsx", jsx);

type CodeSnippetProps = {
  children: string;
};

export const CodeSnippet: FunctionComponent<CodeSnippetProps> = ({ children }) => (
  <div className="from-secondary-400/5 rounded-lg bg-gradient-to-br p-3">
    <div className="bg-primary-950/20 m-0 rounded p-4 backdrop-blur-sm">
      <SyntaxHighlighter showLineNumbers language="jsx" style={theme} wrapLines>
        {children}
      </SyntaxHighlighter>
    </div>
  </div>
);
