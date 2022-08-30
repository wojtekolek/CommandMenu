import type {
  ChangeEventHandler,
  KeyboardEventHandler,
  MouseEvent,
  MouseEventHandler,
  RefObject
} from 'react'

export type ConfigData = {
  name: string
  onSelect: (event: MouseEvent<HTMLLIElement>) => void
}

export type GroupItemData = {
  id: string
  label: string
  onSelect: (event: MouseEvent<HTMLLIElement>) => void
}

export type GroupData = {
  id: string
  label: string
  items: GroupItemData[]
}

export type MenuProps = {
  ref: RefObject<HTMLDivElement>
  onKeyDown: KeyboardEventHandler<HTMLDivElement>
  onClick: MouseEventHandler<HTMLDivElement>
}

export type SearchProps = {
  autoFocus: boolean
  ref: RefObject<HTMLInputElement>
  // value: string
  onChange: ChangeEventHandler<HTMLInputElement>
}
