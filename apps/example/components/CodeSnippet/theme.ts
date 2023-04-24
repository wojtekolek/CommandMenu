import { CSSProperties } from "react";

import { colors } from "utils/styles/colors.cjs";

export const theme: { [key: string]: CSSProperties } = {
  'code[class*="language-"]': {
    color: colors.primary[200],
    background: "none",
    fontFamily: "\"Fira Code\", Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",
    textAlign: "left",
    whiteSpace: "pre",
    wordSpacing: "normal",
    wordBreak: "normal",
    wordWrap: "normal",
    lineHeight: "1.5",
    MozTabSize: "4",
    OTabSize: "4",
    tabSize: "4",
    WebkitHyphens: "none",
    MozHyphens: "none",
    msHyphens: "none",
    hyphens: "none",
  },
  'pre[class*="language-"]': {
    color: colors.primary[200],
    fontFamily: "\"Fira Code\", Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",
    textAlign: "left",
    whiteSpace: "pre",
    wordSpacing: "normal",
    wordBreak: "normal",
    wordWrap: "normal",
    lineHeight: "1.5",
    MozTabSize: "4",
    OTabSize: "4",
    tabSize: "4",
    WebkitHyphens: "none",
    MozHyphens: "none",
    msHyphens: "none",
    hyphens: "none",
    overflow: "auto",
  },
  ':not(pre) > code[class*="language-"]': {
    padding: ".1em",
    borderRadius: ".3em",
    whiteSpace: "normal",
  },
  comment: {
    color: "#636f88",
  },
  prolog: {
    color: "#636f88",
  },
  doctype: {
    color: "#636f88",
  },
  cdata: {
    color: "#636f88",
  },
  punctuation: {
    color: "#81A1C1",
  },
  ".namespace": {
    opacity: ".7",
  },
  property: {
    color: colors.primary[100],
  },
  tag: {
    color: colors.secondary[400],
  },
  constant: {
    color: colors.secondary[500],
  },
  symbol: {
    color: colors.primary[600],
  },
  deleted: {
    color: "#81A1C1",
  },
  number: {
    color: "#B48EAD",
  },
  boolean: {
    color: "#81A1C1",
  },
  selector: {
    color: colors.primary[300],
  },
  "attr-name": {
    color: colors.primary[300],
  },
  string: {
    color: colors.secondary[300],
  },
  char: {
    color: colors.primary[300],
  },
  builtin: {
    color: colors.primary[300],
  },
  inserted: {
    color: colors.primary[300],
  },
  operator: {
    color: "#81A1C1",
  },
  entity: {
    color: "#81A1C1",
    cursor: "help",
  },
  url: {
    color: "#81A1C1",
  },
  ".language-css .token.string": {
    color: "#81A1C1",
  },
  ".style .token.string": {
    color: "#81A1C1",
  },
  variable: {
    color: colors.secondary[500],
  },
  atrule: {
    color: colors.secondary[700],
  },
  "attr-value": {
    color: colors.secondary[700],
  },
  function: {
    color: colors.secondary[500],
  },
  "class-name": {
    color: colors.primary[50],
  },
  keyword: {
    color: colors.secondary[600],
  },
  regex: {
    color: "#EBCB8B",
  },
  important: {
    color: "#EBCB8B",
    fontWeight: "bold",
  },
  bold: {
    fontWeight: "bold",
  },
  italic: {
    fontStyle: "italic",
  },
};
