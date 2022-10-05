import type { FunctionComponent, ReactNode } from 'react'

import Head from 'next/head'

const DESCRIPTION = 'Headless UI for building command menus in React.'

type PageMetaProps = {
  children?: ReactNode
}

export const PageMeta: FunctionComponent<PageMetaProps> = ({ children }) => (
  <Head>
    <title>CmdMenu - {DESCRIPTION}</title>
    <meta name="description" content={DESCRIPTION} />
    {children}
  </Head>
)
