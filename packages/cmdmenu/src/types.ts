import type { ChangeEventHandler, KeyboardEventHandler, MouseEvent, RefObject } from 'react'

// Config
type ItemCommonConfigData<IconName = string> = {
  id: string
  icon?: IconName
  label: string
  description?: string
}

export type ItemConfigData<IconName = string> = ItemCommonConfigData<IconName> & {
  placeholder?: never
  items?: never
  onSelect: (event: MouseEvent<HTMLLIElement>) => void
}

export type ItemWithNestedListConfigData<IconName = string> = ItemCommonConfigData<IconName> & {
  onSelect?: never
  placeholder: string
  items: Array<ItemWithNestedListConfigData<IconName> | ItemConfigData<IconName>>
}

export type ItemsGroupConfigData<IconName = string> = {
  id: string
  label: string
  groupItems: Array<ItemConfigData<IconName> | ItemWithNestedListConfigData<IconName>>
}

export type ConfigData<IconName = string> =
  | ItemsGroupConfigData<IconName>[]
  | ItemConfigData<IconName>[]

// Prepared list
export type SelectedItemData = {
  id: string
  isConfigWithNestedData: boolean
}

export type ListItemData = {
  id: string
  label: string
  icon?: string
  description?: string
  onPointerMove: () => void
  onClick: (event: MouseEvent<HTMLLIElement>) => void
  items?: ListItemData[]
  isGroup?: never
  groupItems?: never
}

export type ListGroupData = {
  id: string
  label: string
  isGroup: boolean
  groupItems: ListItemData[]
  items?: never
  icon?: never
  description?: never
}

export type ListData = ListGroupData[] | ListItemData[]

// Return types
export type MenuProps = {
  ref: RefObject<HTMLDivElement>
  onKeyDown: KeyboardEventHandler<HTMLDivElement>
}

export type SearchProps = {
  autoFocus: boolean
  placeholder: string
  value?: string
  ref: RefObject<HTMLInputElement>
  onChange: ChangeEventHandler<HTMLInputElement>
}
