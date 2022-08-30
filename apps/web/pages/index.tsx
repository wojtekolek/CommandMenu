import { useCmdMenu } from 'cmdmenu'
import type { GroupData } from 'cmdmenu'
import { AnimatePresence, motion } from 'framer-motion'
import styled from 'styled-components'

const animationVariants = {
  initial: {
    opacity: 0,
    scale: 0.8
  },
  animate: {
    opacity: 1,
    scale: 1
  }
}

export const PortalMenuAnimationProps = {
  variants: animationVariants,
  initial: 'initial',
  animate: 'animate',
  exit: 'initial'
}

const PortalMenuWrapper = styled(motion.div).attrs(PortalMenuAnimationProps)`
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

type PortalMenuListItemButtonStyleProps = {
  isSelected: boolean
}

const CommandMenuGroupItem = styled.li`
  width: 100%;
`

const CommandMenuGroupItemLabel = styled.span`
  display: block;
  padding: 8px 0px;
  border-bottom: 1px solid #555;
`

const PortalMenuListItem = styled.li<PortalMenuListItemButtonStyleProps>`
  line-height: 40px;
  width: 100%;

  ${({ isSelected }) =>
    isSelected &&
    `
    background-color: #1F1F1F;
  `}
`

const PortalMenuListWrappper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
`

const PortalMenuItems = styled.ul`
  flex: 1;
  overflow-y: scroll;
  list-style: none;
  padding: 0;
  margin: 0;
`

const SearchInput = styled.input.attrs({
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

const config: GroupData[] = [
  {
    id: 'favs',
    label: 'Favorite',
    items: [
      {
        id: 'spotify',
        label: 'Spotify',
        onSelect: () => console.log('clicked spotify')
      },
      {
        id: 'instagram',
        label: 'Instagram',
        onSelect: () => console.log('clicked instagram')
      }
    ]
  },
  {
    id: 'common',
    label: 'Common',
    items: [
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

const Home = () => {
  const { isCommandMenuOpen, selectedItem, selectedItemRef, menuProps, searchProps, preparedList } =
    useCmdMenu({
      config
    })

  return (
    <div>
      <h1>cmd + k</h1>
      <AnimatePresence>
        {isCommandMenuOpen ? (
          <PortalMenuWrapper>
            <PortalMenuListWrappper {...menuProps}>
              <SearchInput {...searchProps} type="text" />
              <PortalMenuItems>
                {preparedList.map(({ id, label, isGroup, ...itemProps }) => {
                  if (isGroup && itemProps.items) {
                    return (
                      <CommandMenuGroupItem key={id} id="group">
                        <CommandMenuGroupItemLabel>{label}</CommandMenuGroupItemLabel>
                        <PortalMenuItems>
                          {itemProps.items.map(
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
                        </PortalMenuItems>
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
        ) : null}
      </AnimatePresence>
    </div>
  )
}

export default Home
