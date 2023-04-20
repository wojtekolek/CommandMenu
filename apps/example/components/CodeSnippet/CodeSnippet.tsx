import type { FunctionComponent } from "react";

import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import ts from "react-syntax-highlighter/dist/esm/languages/hljs/typescript";
import { nord } from "react-syntax-highlighter/dist/esm/styles/hljs";

SyntaxHighlighter.registerLanguage("typescript", ts);

type CodeSnippetProps = {
  children: string;
};

export const CodeSnippet: FunctionComponent<CodeSnippetProps> = ({ children }) => (
  <div className="from-secondary-400/5 rounded-lg bg-gradient-to-br p-3">
    <div className="bg-primary-950/20 m-0 overflow-x-auto rounded p-4 backdrop-blur-sm">
      <SyntaxHighlighter
        showLineNumbers
        language="typescript"
        style={nord}
        wrapLongLines
        customStyle={{
          padding: 0,
          background: "unset",
        }}
      >
        {children}
      </SyntaxHighlighter>
    </div>
  </div>
);
