import type { FunctionComponent } from 'react'

import styled from 'styled-components'

import { CodeSnippet } from 'components/CodeSnippet'
import { Message, SectionTitle } from 'components/Primitives'

const HowToUseContentItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.ss2};
`

const HowToUseContentItem: FunctionComponent = () => (
  <HowToUseContentItemWrapper>
    <Message>
      Curabitur pellentesque nibh nibh, at maximus ante fermentum sit amet. Pellentesque commodo
      lacus at sodales sodales. Quisque sagittis orci ut diam condimentum, vel euismod erat
      placerat. In iaculis arcu eros, eget tempus orci facilisis id.
    </Message>
    <CodeSnippet>Soon...</CodeSnippet>
  </HowToUseContentItemWrapper>
)

const HowToUseWrapper = styled.section`
  padding: ${({ theme }) => theme.spacing.ss8};
  border-radius: ${({ theme }) => theme.radius.rad3};
  border: 1px solid ${({ theme }) => theme.colors.misc.border};
  background-color: ${({ theme }) => theme.colors.background.secondary};
  z-index: ${({ theme }) => theme.zIndex.onTopOfInitial};
`

const HowToUseContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.ss4};
  margin-top: ${({ theme }) => theme.spacing.ss4};
`

export const HowToUse: FunctionComponent = () => (
  <HowToUseWrapper>
    <SectionTitle>How to use it?</SectionTitle>
    <HowToUseContent>
      <HowToUseContentItem />
      <HowToUseContentItem />
      <HowToUseContentItem />
      <HowToUseContentItem />
      <HowToUseContentItem />
      <HowToUseContentItem />
      <HowToUseContentItem />
      <HowToUseContentItem />
      <HowToUseContentItem />
      <HowToUseContentItem />
      <HowToUseContentItem />
      <HowToUseContentItem />
      <HowToUseContentItem />
      <HowToUseContentItem />
    </HowToUseContent>
  </HowToUseWrapper>
)
