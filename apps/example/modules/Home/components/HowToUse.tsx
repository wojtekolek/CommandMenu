import type { FunctionComponent } from 'react'

import styled from 'styled-components'

import { CodeSnippet } from 'components/CodeSnippet'
import { SectionTitle } from 'components/Primitives'

const HowToUseWrapper = styled.section`
  padding: ${({ theme }) => theme.spacing.ss8};
  border-radius: ${({ theme }) => theme.radius.rad3};
  border: 1px solid ${({ theme }) => theme.colors.misc.border};
  background-color: ${({ theme }) => theme.colors.background.secondary};
  z-index: ${({ theme }) => theme.zIndex.onTopOfInitial};
`

export const HowToUse: FunctionComponent = () => (
  <HowToUseWrapper>
    <SectionTitle>How to use it?</SectionTitle>
    <p>
      Curabitur pellentesque nibh nibh, at maximus ante fermentum sit amet. Pellentesque commodo
      lacus at sodales sodales. Quisque sagittis orci ut diam condimentum, vel euismod erat
      placerat. In iaculis arcu eros, eget tempus orci facilisis id.
    </p>
    <CodeSnippet>Soon...</CodeSnippet>
    <p>
      Curabitur pellentesque nibh nibh, at maximus ante fermentum sit amet. Pellentesque commodo
      lacus at sodales sodales. Quisque sagittis orci ut diam condimentum, vel euismod erat
      placerat. In iaculis arcu eros, eget tempus orci facilisis id.
    </p>
    <CodeSnippet>Soon...</CodeSnippet>
    <p>
      Curabitur pellentesque nibh nibh, at maximus ante fermentum sit amet. Pellentesque commodo
      lacus at sodales sodales. Quisque sagittis orci ut diam condimentum, vel euismod erat
      placerat. In iaculis arcu eros, eget tempus orci facilisis id.
    </p>
    <CodeSnippet>Soon...</CodeSnippet>
    <p>
      Curabitur pellentesque nibh nibh, at maximus ante fermentum sit amet. Pellentesque commodo
      lacus at sodales sodales. Quisque sagittis orci ut diam condimentum, vel euismod erat
      placerat. In iaculis arcu eros, eget tempus orci facilisis id.
    </p>
    <CodeSnippet>Soon...</CodeSnippet>
    <p>
      Curabitur pellentesque nibh nibh, at maximus ante fermentum sit amet. Pellentesque commodo
      lacus at sodales sodales. Quisque sagittis orci ut diam condimentum, vel euismod erat
      placerat. In iaculis arcu eros, eget tempus orci facilisis id.
    </p>
    <CodeSnippet>Soon...</CodeSnippet>
    <p>
      Curabitur pellentesque nibh nibh, at maximus ante fermentum sit amet. Pellentesque commodo
      lacus at sodales sodales. Quisque sagittis orci ut diam condimentum, vel euismod erat
      placerat. In iaculis arcu eros, eget tempus orci facilisis id.
    </p>
    <CodeSnippet>Soon...</CodeSnippet>
  </HowToUseWrapper>
)
