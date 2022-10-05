import type { FunctionComponent, RefObject } from 'react'

import { useCmdMenu } from 'cmdmenu'
import type { ListItemData } from 'cmdmenu'
import styled from 'styled-components'

import { Icon } from 'components/Icon'
import { from } from 'utils/styles/responsiveness'
import { config } from './config'

const PortalMenuWrapper = styled.div`
  margin: 0 auto;
  width: 100%;
  min-height: 240px;
  max-height: 480px;
  background-color: ${({ theme }) => theme.colors.background.tertriary};
  border: 1px solid ${({ theme }) => theme.colors.misc.border};
  border-radius: ${({ theme }) => theme.radius.rad2};
  overflow: hidden;
  z-index: 999999;

  ${from('tablet')} {
    width: 640px;
  }
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
  display: flex;
  align-items: center;
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

const ItemIcon = styled(Icon).attrs({
  size: 16
})`
  color: ${({ theme }) => theme.colors.primary.default};
  margin-right: ${({ theme }) => theme.spacing.ss1};
`

const Label = styled.label`
  font-size: 16px;
`

const Description = styled.span`
  margin-left: ${({ theme }) => theme.spacing.ss1};
  font-size: 12px;
`

type ListComponentProps = {
  selectedItem?: string
  selectedItemRef: RefObject<HTMLLIElement> | null
} & ListItemData

const ListComponent: FunctionComponent<ListComponentProps> = ({
  id,
  label,
  icon,
  description,
  selectedItemRef,
  selectedItem,
  ...itemProps
}) => {
  const isSelected = id === selectedItem
  return (
    <PortalMenuListItem
      {...itemProps}
      ref={isSelected ? selectedItemRef : null}
      isSelected={isSelected}
    >
      {icon && <ItemIcon name={icon as any} />}
      <Label>{label}</Label>
      {description && <Description>{description}</Description>}
    </PortalMenuListItem>
  )
}

export const Demo: FunctionComponent = () => {
  const { selectedItem, selectedItemRef, menuProps, searchProps, preparedList } = useCmdMenu({
    config
  })

  return (
    <PortalMenuWrapper>
      <PortalMenuListWrappper {...menuProps}>
        <SearchInput {...searchProps} type="text" />
        <PortalMenuItems>
          {preparedList.map(({ isGroup, ...groupItemProps }) => {
            if (isGroup && groupItemProps.groupItems) {
              return (
                <CommandMenuGroupItem key={groupItemProps.id} id="group">
                  <CommandMenuGroupItemLabel>{groupItemProps.label}</CommandMenuGroupItemLabel>
                  <GroupMenuItems>
                    {groupItemProps.groupItems.map((itemData) => (
                      <ListComponent
                        key={itemData.id}
                        selectedItem={selectedItem}
                        selectedItemRef={selectedItemRef}
                        {...itemData}
                      />
                    ))}
                  </GroupMenuItems>
                </CommandMenuGroupItem>
              )
            }
            return (
              <ListComponent
                key={groupItemProps.id}
                selectedItem={selectedItem}
                selectedItemRef={selectedItemRef}
                {...(groupItemProps as ListItemData)}
              />
            )
          })}
        </PortalMenuItems>
      </PortalMenuListWrappper>
    </PortalMenuWrapper>
  )
}
