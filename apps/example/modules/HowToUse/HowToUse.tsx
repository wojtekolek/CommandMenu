import type { FunctionComponent } from 'react'

import { AdvancedHeading } from './components/AdvancedHeading'
import { HowToUseItem } from './components/HowToUseItem'
import { HowToUseSection } from './components/HowToUseSection'
import { ADVANCED_USE_DATA, HOW_TO_USE_DATA } from './constants'

export const HowToUse: FunctionComponent = () => (
  <>
    <HowToUseSection title="How to use it?">
      {HOW_TO_USE_DATA.map(({ message, codeMarkdown }, index) => (
        <HowToUseItem key={`${index}_base_use`} message={message} codeMarkdown={codeMarkdown} />
      ))}
    </HowToUseSection>
    <AdvancedHeading />
    <HowToUseSection title="Grouping and nested menus">
      {ADVANCED_USE_DATA.map(({ message, codeMarkdown, title }, index) => (
        <HowToUseItem
          key={`${index}_advanced_use`}
          title={title}
          message={message}
          codeMarkdown={codeMarkdown}
        />
      ))}
    </HowToUseSection>
  </>
)
