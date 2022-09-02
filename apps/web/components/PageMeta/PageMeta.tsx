import type { FunctionComponent, ReactNode } from 'react'

import Head from 'next/head'

type PageMetaProps = {
  children?: ReactNode
  subTitle?: string
}

export const PageMeta: FunctionComponent<PageMetaProps> = ({ subTitle, children }) => (
  <Head>
    <title>{`${subTitle ? `${subTitle} — ` : ''}CmdMenu`}</title>
    <meta name="description" content="Headless UI for building command menus in React." />
    {children}
  </Head>
)
