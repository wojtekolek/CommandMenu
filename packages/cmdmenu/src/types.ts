import type {
  ChangeEventHandler,
  KeyboardEventHandler,
  MouseEvent,
  MouseEventHandler,
  RefObject
} from 'react'

export type GroupItemConfigData = {
  id: string
  label: string
  onSelect: (event: MouseEvent<HTMLLIElement>) => void
}

export type GroupConfigData = {
  id: string
  label: string
  items: GroupItemConfigData[]
}

export type ConfigData = GroupConfigData[] | GroupItemConfigData[]

export type ListItemData = {
  id: string
  label: string
  onPointerEnter: () => void
  onClick: (event: MouseEvent<HTMLLIElement>) => void
  isGroup: undefined
  items: undefined
}

export type ListGroupData = {
  id: string
  label: string
  isGroup: boolean
  items: ListItemData[]
}

export type ListData = ListGroupData[] | ListItemData[]

export type MenuProps = {
  ref: RefObject<HTMLDivElement>
  onKeyDown: KeyboardEventHandler<HTMLDivElement>
  onClick: MouseEventHandler<HTMLDivElement>
}

export type SearchProps = {
  autoFocus: boolean
  placeholder: string
  ref: RefObject<HTMLInputElement>
  onChange: ChangeEventHandler<HTMLInputElement>
}
