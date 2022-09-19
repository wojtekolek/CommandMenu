import type { FunctionComponent } from 'react'

import { useCmdMenu } from 'cmdmenu'
import type { ConfigData } from 'cmdmenu'
import styled from 'styled-components'

const PortalMenuWrapper = styled.div`
  margin: 0 auto;
  width: 640px;
  min-height: 240px;
  max-height: 480px;
  background-color: ${({ theme }) => theme.colors.background.tertriary};
  border: 1px solid ${({ theme }) => theme.colors.misc.border};
  border-radius: ${({ theme }) => theme.radius.rad2};
  overflow: hidden;
  z-index: 999999;
`

type PortalMenuListItemButtonStyleProps = {
  isSelected: boolean
}

const CommandMenuGroupItem = styled.li`
  width: 100%;
`

const CommandMenuGroupItemLabel = styled.span`
  display: block;
  padding: ${({ theme }) => `${theme.spacing.ss1} ${theme.spacing.ss1}`};
  border-bottom: 1px solid ${({ theme }) => theme.colors.misc.border};
  font-size: ${({ theme }) => theme.fontSize.fs1};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
`

const PortalMenuListItem = styled.li<PortalMenuListItemButtonStyleProps>`
  padding: ${({ theme }) => `${theme.spacing.ss0} ${theme.spacing.ss1}`};
  border-radius: ${({ theme }) => theme.radius.rad1};
  line-height: 40px;
  width: 100%;

  ${({ isSelected, theme }) =>
    isSelected &&
    `
    background-color: ${theme.colors.background.quartenary};
  `}
`

const PortalMenuListWrappper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 480px;
`

const PortalMenuItems = styled.ul`
  flex: 1;
  overflow-y: scroll;
  list-style: none;
  padding: ${({ theme }) => theme.spacing.ss1};
  margin: ${({ theme }) => theme.spacing.ss0};
`

const GroupMenuItems = styled(PortalMenuItems)`
  padding: ${({ theme }) => theme.spacing.ss0};
`

const SearchInput = styled.input.attrs({
  type: 'text'
})`
  width: 100%;
  background-color: transparent;
  padding: ${({ theme }) => `${theme.spacing.ss0} ${theme.spacing.ss2}`};
  line-height: 40px;
  color: ${({ theme }) => theme.colors.text.primary};
  border-color: transparent;
  border-bottom: 1px solid ${({ theme }) => theme.colors.primary.default};
  outline: none;
  font-size: ${({ theme }) => theme.fontSize.fs2};
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

const config: ConfigData = [
  {
    id: 'favs',
    label: 'Favorite',
    groupItems: [
      {
        id: 'spotify',
        label: 'Spotify',
        placeholder: 'Search in spotify...',
        items: [
          {
            id: 'spotifyPlay',
            label: 'Play',
            onSelect: () => console.log('spotify play')
          },
          {
            id: 'spotifyPause',
            label: 'Pause',
            onSelect: () => console.log('spotify pasue')
          },
          {
            id: 'spotifyNext',
            label: 'Next',
            onSelect: () => console.log('spotify next')
          },
          {
            id: 'spotifyPrevious',
            label: 'Previous',
            onSelect: () => console.log('spotify prev')
          },
          {
            id: 'spotifyMore',
            label: 'More...',
            placeholder: 'Search in spotify more...',
            items: [
              {
                id: 'spotifyMoreActionOne',
                label: 'Action one',
                onSelect: () => console.log('spotify more action one')
              },
              {
                id: 'spotifyMoreActionTwo',
                label: 'Action two',
                onSelect: () => console.log('spotify more action two')
              },
              {
                id: 'spotifyMoreActionMore',
                label: 'More...',
                placeholder: 'Search in more actions...',
                items: [
                  {
                    id: 'spotifyMoreActionMoreActionMore1',
                    label: 'More 1',
                    onSelect: () => console.log('spotifyMoreActionMoreActionMore1 click')
                  },
                  {
                    id: 'spotifyMoreActionMoreActionMore2',
                    label: 'More 2',
                    onSelect: () => console.log('spotifyMoreActionMoreActionMore2 click')
                  },
                  {
                    id: 'spotifyMoreActionMoreActionMore3',
                    label: 'More 3',
                    onSelect: () => console.log('spotifyMoreActionMoreActionMore3 click')
                  },
                  {
                    id: 'spotifyMoreActionMoreActionMoreMore',
                    label: 'More...',
                    placeholder: 'Show me more options mate...',
                    items: [
                      {
                        id: 'spotifyMoreActionMoreActionMoreMore1',
                        label: 'More 1',
                        onSelect: () => console.log('spotifyMoreActionMoreActionMore1 click')
                      },
                      {
                        id: 'spotifyMoreActionMoreActionMoreMore2',
                        label: 'More 2',
                        onSelect: () => console.log('spotifyMoreActionMoreActionMore2 click')
                      },
                      {
                        id: 'spotifyMoreActionMoreActionMoreMore3',
                        label: 'More 3',
                        onSelect: () => console.log('spotifyMoreActionMoreActionMore3 click')
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
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
    groupItems: [
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
  },
  {
    id: 'common',
    label: 'Common',
    groupItems: [
      {
        id: 'test1',
        label: 'Test 1',
        onSelect: () => console.log('clicked test1')
      },
      {
        id: 'test2',
        label: 'Test 2',
        onSelect: () => console.log('clicked test2')
      },
      {
        id: 'test3',
        label: 'Test 3',
        onSelect: () => console.log('clicked test3')
      },
      {
        id: 'test4',
        label: 'Test 4',
        onSelect: () => console.log('clicked test4')
      },
      {
        id: 'test5',
        label: 'Test 5',
        onSelect: () => console.log('clicked test5')
      },
      {
        id: 'test6',
        label: 'Test 6',
        onSelect: () => console.log('clicked test6')
      },
      {
        id: 'test7',
        label: 'Test 7',
        onSelect: () => console.log('clicked test7')
      },
      {
        id: 'test8',
        label: 'Test 8',
        onSelect: () => console.log('clicked test8')
      },
      {
        id: 'test9',
        label: 'Test 9',
        onSelect: () => console.log('clicked test9')
      },
      {
        id: 'test10',
        label: 'Test 10',
        onSelect: () => console.log('clicked test10')
      },
      {
        id: 'test11',
        label: 'Test 11',
        onSelect: () => console.log('clicked test11')
      },
      {
        id: 'test12',
        label: 'Test 12',
        onSelect: () => console.log('clicked test12')
      },
      {
        id: 'test13',
        label: 'Test 13',
        onSelect: () => console.log('clicked test13')
      }
    ]
  }
]

export const Demo: FunctionComponent = () => {
  const { selectedItem, selectedItemRef, menuProps, searchProps, preparedList } = useCmdMenu({
    config
  })

  return (
    <PortalMenuWrapper>
      <PortalMenuListWrappper {...menuProps}>
        <SearchInput {...searchProps} type="text" />
        <PortalMenuItems>
          {preparedList.map(({ id, label, isGroup, ...itemProps }) => {
            if (isGroup && itemProps.groupItems) {
              return (
                <CommandMenuGroupItem key={id} id="group">
                  <CommandMenuGroupItemLabel>{label}</CommandMenuGroupItemLabel>
                  <GroupMenuItems>
                    {itemProps.groupItems.map(
                      ({ id: itemId, label: itemLabel, ...nestedItemProps }) => {
                        const isSelected = itemId === selectedItem
                        return (
                          <PortalMenuListItem
                            {...nestedItemProps}
                            key={itemId}
                            ref={isSelected ? selectedItemRef : null}
                            isSelected={isSelected}
                          >
                            {itemLabel}
                          </PortalMenuListItem>
                        )
                      }
                    )}
                  </GroupMenuItems>
                </CommandMenuGroupItem>
              )
            }
            const isSelected = id === selectedItem
            return (
              <PortalMenuListItem
                {...itemProps}
                key={id}
                ref={isSelected ? selectedItemRef : null}
                isSelected={isSelected}
              >
                {label}
              </PortalMenuListItem>
            )
          })}
        </PortalMenuItems>
      </PortalMenuListWrappper>
    </PortalMenuWrapper>
  )
}
