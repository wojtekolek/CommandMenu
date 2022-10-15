import type { NextPage } from 'next'

import { Home } from 'modules/Home'
import { HowToUse } from 'modules/HowToUse'

const HomePage: NextPage = () => (
  <>
    <Home />
    <HowToUse />
  </>
)

export default HomePage
