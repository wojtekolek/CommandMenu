import type { FunctionComponent, ReactElement } from 'react'

import type { RenderOptions, RenderResult } from '@testing-library/react'
import { render as baseRender, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import styled from 'styled-components'

import { ConfigData, GroupConfigData, GroupItemConfigData } from './types'
import { DOWN_KEY, ENTER_KEY, UP_KEY, useCmdMenu } from './useCmdMenu'

type RenderReturnType = RenderResult & {
  user: ReturnType<typeof userEvent['setup']>
}

const render = (ui: ReactElement, options?: Omit<RenderOptions, 'queries'>): RenderReturnType => ({
  user: userEvent.setup(),
  ...(baseRender(ui, { ...options }) as RenderResult)
})

const baseConfig: GroupConfigData[] = [
  {
    id: 'favs',
    label: 'Favorite',
    items: [
      {
        id: 'instagram',
        label: 'Instagram',
        onSelect: () => console.log('clicked instagram')
      },
      {
        id: 'twitter',
        label: 'Twitter',
        onSelect: () => console.log('clicked twitter')
      }
    ]
  },
  {
    id: 'spotify',
    label: 'Spotify',
    items: [
      {
        id: 'spotifyPlay',
        label: 'Play',
        onSelect: () => console.log('clicked Play')
      },
      {
        id: 'spotifyPause',
        label: 'Pause',
        onSelect: () => console.log('clicked Pause')
      },
      {
        id: 'spotifyNext',
        label: 'Next song',
        onSelect: () => console.log('clicked Next song')
      }
    ]
  }
]

const CmdMenuWrapper = styled.div`
  position: absolute;
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  width: 640px;
  min-height: 240px;
  max-height: 480px;
  background-color: #303030;
  color: #d6d6d6;
  border-radius: 6px;
  overflow: hidden;
  z-index: 999999;
`

type CmdMenuListItemButtonStyleProps = {
  isSelected: boolean
}

const CmdMenuGroupItem = styled.li`
  width: 100%;
`

const CmdMenuGroupItemLabel = styled.span`
  display: block;
  padding: 8px 0px;
  border-bottom: 1px solid #555;
`

const CmdMenuListItem = styled.li<CmdMenuListItemButtonStyleProps>`
  line-height: 40px;
  width: 100%;

  ${({ isSelected }) =>
    isSelected &&
    `
    background-color: #1F1F1F;
  `}
`

const CmdMenuListWrappper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
`

const CmdMenuItems = styled.ul`
  flex: 1;
  overflow-y: scroll;
  list-style: none;
  padding: 0;
  margin: 0;
`

const CmdMenuSearchInput = styled.input.attrs({
  type: 'text'
})`
  width: 100%;
  background-color: transparent;
  padding: 8px;
  color: #fff;
  border-color: transparent;
  border-bottom: 1px solid #b4b4b4;
  outline: none;
  font-size: 16px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  &:disabled {
    opacity: 0.8;
  }

  &::placeholder {
    color: #808080;
  }
`

type TestComponentProps = {
  config?: ConfigData
}

const TestComponent: FunctionComponent<TestComponentProps> = ({ config = baseConfig }) => {
  const { selectedItem, selectedItemRef, menuProps, searchProps, preparedList } = useCmdMenu({
    config
  })

  return (
    <CmdMenuWrapper>
      <CmdMenuListWrappper {...menuProps}>
        <CmdMenuSearchInput {...searchProps} type="text" />
        <CmdMenuItems>
          {preparedList.map(({ id, label, isGroup, ...itemProps }) => {
            if (isGroup && itemProps.items) {
              return (
                <CmdMenuGroupItem key={id} id="group">
                  <CmdMenuGroupItemLabel>{label}</CmdMenuGroupItemLabel>
                  <CmdMenuItems>
                    {itemProps.items.map(({ id: itemId, label: itemLabel, ...nestedItemProps }) => {
                      const isSelected = itemId === selectedItem
                      return (
                        <CmdMenuListItem
                          {...nestedItemProps}
                          key={itemId}
                          ref={isSelected ? selectedItemRef : null}
                          isSelected={isSelected}
                        >
                          {itemLabel}
                        </CmdMenuListItem>
                      )
                    })}
                  </CmdMenuItems>
                </CmdMenuGroupItem>
              )
            }
            const isSelected = id === selectedItem
            return (
              <CmdMenuListItem
                {...itemProps}
                key={id}
                ref={isSelected ? selectedItemRef : null}
                isSelected={isSelected}
              >
                {label}
              </CmdMenuListItem>
            )
          })}
        </CmdMenuItems>
      </CmdMenuListWrappper>
    </CmdMenuWrapper>
  )
}

type RenderComponentOptions = {
  config?: ConfigData
}

const renderComponent = ({ config }: RenderComponentOptions = {}) =>
  render(<TestComponent config={config} />)

describe('useCmdMenu hook', () => {
  describe('with groups config', () => {
    it('should render', () => {
      renderComponent()

      expect(screen.getByText('Favorite')).toBeInTheDocument()
      expect(screen.getByText('Spotify')).toBeInTheDocument()
    })

    it('should render and change to next option', async () => {
      const { user } = renderComponent()

      expect(screen.getByText('Favorite')).toBeInTheDocument()
      const input = screen.getByRole('textbox')
      expect(input).toHaveFocus()

      await user.keyboard(`[${DOWN_KEY}]`)

      const selectedTwitterOption = screen.getByText('Twitter')
      expect(selectedTwitterOption).toHaveStyle('line-height: 40px;')
      expect(selectedTwitterOption).toHaveStyle('width: 100%;')
      expect(selectedTwitterOption).toHaveStyle('background-color: #1F1F1F;')
    })

    it('should render and change to next option and then come back to first one', async () => {
      const { user } = renderComponent()

      expect(screen.getByText('Favorite')).toBeInTheDocument()
      const input = screen.getByRole('textbox')
      expect(input).toHaveFocus()

      const instagramListItem = screen.getByText('Instagram')
      const twitterListItem = screen.getByText('Twitter')

      await user.keyboard(`[${DOWN_KEY}]`)

      expect(instagramListItem).not.toHaveStyle('background-color: #1F1F1F;')
      expect(twitterListItem).toHaveStyle('background-color: #1F1F1F;')

      await user.keyboard(`[${UP_KEY}]`)

      expect(instagramListItem).toHaveStyle('background-color: #1F1F1F;')
      expect(twitterListItem).not.toHaveStyle('background-color: #1F1F1F;')
    })

    it('should render and call handler after hiting enter', async () => {
      const logSpy = jest.spyOn(console, 'log')
      const { user } = renderComponent()

      expect(screen.getByText('Favorite')).toBeInTheDocument()

      await user.keyboard(`[${ENTER_KEY}]`)

      expect(logSpy).toHaveBeenCalledWith('clicked instagram')
    })

    it('should render and filter list', async () => {
      const { user } = renderComponent()

      expect(screen.getByText('Favorite')).toBeInTheDocument()
      const input = screen.getByRole('textbox')
      await user.type(input, 'insta')

      expect(screen.getByText('Instagram')).toBeInTheDocument()
      expect(screen.queryByText('Twitter')).not.toBeInTheDocument()
    })
  })

  describe('with flat config', () => {
    it('should render without groups', () => {
      const config: GroupItemConfigData[] = [
        {
          id: 'spotifyPlay',
          label: 'Play',
          onSelect: () => console.log('clicked Play')
        },
        {
          id: 'spotifyPause',
          label: 'Pause',
          onSelect: () => console.log('clicked Pause')
        },
        {
          id: 'spotifyNext',
          label: 'Next song',
          onSelect: () => console.log('clicked Next song')
        }
      ]
      renderComponent({ config })

      expect(screen.getByText('Play')).toBeInTheDocument()
      expect(screen.getByText('Pause')).toBeInTheDocument()
      expect(screen.getByText('Next song')).toBeInTheDocument()
    })
  })
})
