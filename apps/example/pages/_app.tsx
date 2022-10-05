import type { AppProps as NextAppProps } from 'next/app'

import { Layout } from 'components/Layout'
import { PageMeta } from 'components/PageMeta'

type AppProps = NextAppProps

const App = ({ Component, pageProps }: AppProps) => (
  <>
    <PageMeta />
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </>
)

export default App
