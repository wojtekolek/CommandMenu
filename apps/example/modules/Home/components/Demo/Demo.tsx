import type { FunctionComponent, RefObject } from 'react'

import { useCMDPalette } from '@wojtekolek/cmdpalette'
import type { ListItemData } from '@wojtekolek/cmdpalette'
import styled from 'styled-components'

import { Icon } from 'components/Icon'
import { from } from 'utils/styles/responsiveness'
import { config } from './config'

const CMDPaletteWrapper = styled.div`
  margin: 0 auto;
  width: 100%;
  min-height: 240px;
  max-height: 480px;
  background-color: ${({ theme }) => theme.colors.background.tertiary};
  border: 1px solid ${({ theme }) => theme.colors.misc.border};
  border-radius: ${({ theme }) => theme.radius.rad2};
  overflow: hidden;
  z-index: 999999;

  ${from('tablet')} {
    width: 640px;
  }
`

const CMDPaletteContentWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 480px;
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

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.quaternary};
  }
`

const CMDPaletteList = styled.ul`
  flex: 1;
  overflow-y: scroll;
  list-style: none;
  padding: ${({ theme }) => theme.spacing.ss1};
  margin: ${({ theme }) => theme.spacing.ss0};
`

const CMDPaletteListGroupItem = styled.li`
  width: 100%;
`

const CMDPaletteListGroupItemLabel = styled.span`
  display: block;
  padding: ${({ theme }) => `${theme.spacing.ss1} ${theme.spacing.ss1}`};
  border-bottom: 1px solid ${({ theme }) => theme.colors.misc.border};
  font-size: ${({ theme }) => theme.fontSize.fs1};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
`

const CMDPaletteGroupList = styled(CMDPaletteList)`
  padding: ${({ theme }) => theme.spacing.ss0};
`

type PortalMenuListItemButtonStyleProps = {
  isSelected: boolean
}

const CMDPaletteListItemWrapper = styled.li<PortalMenuListItemButtonStyleProps>`
  display: flex;
  align-items: center;
  padding: ${({ theme }) => `${theme.spacing.ss0} ${theme.spacing.ss1}`};
  border-radius: ${({ theme }) => theme.radius.rad1};
  line-height: 40px;
  width: 100%;

  ${({ isSelected, theme }) =>
    isSelected &&
    `
    background-color: ${theme.colors.background.quaternary};
  `}
`

const CMDPaletteListItemIcon = styled(Icon).attrs({
  size: 16
})`
  color: ${({ theme }) => theme.colors.primary.default};
  margin-right: ${({ theme }) => theme.spacing.ss1};
`

const CMDPaletteListItemLabel = styled.label`
  font-size: ${({ theme }) => theme.fontSize.fs2};
`

const CMDPaletteListItemDescription = styled.span`
  margin-left: ${({ theme }) => theme.spacing.ss1};
  font-size: ${({ theme }) => theme.fontSize.fs1};
`

type ListComponentProps = {
  selectedItem?: string
  selectedItemRef: RefObject<HTMLLIElement> | null
} & ListItemData

const CMDPaletteListItem: FunctionComponent<ListComponentProps> = ({
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
    <CMDPaletteListItemWrapper
      {...itemProps}
      ref={isSelected ? selectedItemRef : null}
      isSelected={isSelected}
    >
      {icon && <CMDPaletteListItemIcon name={icon as any} />}
      <CMDPaletteListItemLabel>{label}</CMDPaletteListItemLabel>
      {description && <CMDPaletteListItemDescription>{description}</CMDPaletteListItemDescription>}
    </CMDPaletteListItemWrapper>
  )
}

export const Demo: FunctionComponent = () => {
  const { selectedItem, selectedItemRef, listProps, searchProps, preparedList } = useCMDPalette({
    config
  })

  return (
    <CMDPaletteWrapper>
      <CMDPaletteContentWrapper {...listProps}>
        <SearchInput {...searchProps} type="text" />
        <CMDPaletteList>
          {preparedList.map(({ isGroup, ...groupItemProps }) => {
            if (isGroup && groupItemProps.groupItems) {
              return (
                <CMDPaletteListGroupItem key={groupItemProps.id} id="group">
                  <CMDPaletteListGroupItemLabel>
                    {groupItemProps.label}
                  </CMDPaletteListGroupItemLabel>
                  <CMDPaletteGroupList>
                    {groupItemProps.groupItems.map((itemData) => (
                      <CMDPaletteListItem
                        key={itemData.id}
                        selectedItem={selectedItem}
                        selectedItemRef={selectedItemRef}
                        {...itemData}
                      />
                    ))}
                  </CMDPaletteGroupList>
                </CMDPaletteListGroupItem>
              )
            }
            return (
              <CMDPaletteListItem
                key={groupItemProps.id}
                selectedItem={selectedItem}
                selectedItemRef={selectedItemRef}
                {...(groupItemProps as ListItemData)}
              />
            )
          })}
        </CMDPaletteList>
      </CMDPaletteContentWrapper>
    </CMDPaletteWrapper>
  )
}
