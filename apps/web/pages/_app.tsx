import type { AppProps as NextAppProps } from 'next/app'

import { Layout } from 'components/Layout'
import { PageMeta } from 'components/PageMeta'

type AppProps = NextAppProps

const App = ({ Component, pageProps }: AppProps) => (
  <>
    <PageMeta>
      <link
        rel="apple-touch-icon-precomposed"
        sizes="180x180"
        href="/favicons/apple-touch-icon.png"
      />
      <link rel="icon" type="image/png" href="/favicons/favicon-32x32.png" sizes="32x32" />
      <link rel="icon" type="image/png" href="/favicons/favicon-16x16.png" sizes="16x16" />
      <link rel="icon" type="image/png" href="/favicons/favicon.png" sizes="48x48" />
      <link rel="manifest" href="/favicons/site.webmanifest" />
    </PageMeta>
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </>
)

export default App
