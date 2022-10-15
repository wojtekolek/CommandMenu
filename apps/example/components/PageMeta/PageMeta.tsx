import type { FunctionComponent, ReactNode } from 'react'

import Head from 'next/head'

export const LIBRARY_DESCRIPTION = 'Headless UI for building command palettes in React.'

type PageMetaProps = {
  children?: ReactNode
}

export const PageMeta: FunctionComponent<PageMetaProps> = ({ children }) => {
  const title = `Command Palette — ${LIBRARY_DESCRIPTION}`
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={LIBRARY_DESCRIPTION} />
      {children}
    </Head>
  )
}
