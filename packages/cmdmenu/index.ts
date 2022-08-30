// eslint-disable-next-line import/no-extraneous-dependencies
import { MouseEventHandler, useEffect, useLayoutEffect, useRef, useState } from 'react'
import type {
  ChangeEventHandler,
  Dispatch,
  KeyboardEventHandler,
  MouseEvent,
  RefObject,
  SetStateAction
} from 'react'

import type { GroupData, GroupItemData, MenuProps, SearchProps } from './types'

const TRIGGER_KEY = 'k'
const DOWN_KEY = 'ArrowDown'
const UP_KEY = 'ArrowUp'
const ENTER_KEY = 'Enter'

type ConfigType = GroupData[] | GroupItemData[]

type ListItemData = {
  id: string
  label: string
  onPointerEnter: () => void
  onClick: (event: MouseEvent<HTMLLIElement>) => void
  isGroup: undefined
  items: undefined
}

type ListGroupData = {
  id: string
  label: string
  isGroup: boolean
  items: ListItemData[]
}

type ListData = ListGroupData[] | ListItemData[]

const isConfigWithGroups = (config: ConfigType | ListData): config is GroupData[] =>
  (config as GroupData[]).at(0)?.items !== undefined

const prepareListOption = (
  config: GroupItemData[],
  setSelectedItem: Dispatch<SetStateAction<string | undefined>>
) =>
  config.map(({ id, label, onSelect }) => ({
    id,
    label,
    onPointerEnter: () => setSelectedItem(id),
    onClick: onSelect,
    isGroup: undefined,
    items: undefined
  }))

const getListData = (
  config: ConfigType,
  setSelectedItem: Dispatch<SetStateAction<string | undefined>>
): ListData => {
  if (isConfigWithGroups(config)) {
    return config.map(({ id, label, items }) => ({
      id,
      label,
      isGroup: true,
      items: prepareListOption(items, setSelectedItem)
    }))
  }
  return prepareListOption(config, setSelectedItem)
}

const getFlatListData = (listData: ListData): ListItemData[] => {
  if (isConfigWithGroups(listData as unknown as ConfigType)) {
    return listData.flatMap(({ items }) => items!)
  }
  return listData as ListItemData[]
}

const getFirstOption = (config: ConfigType): string => {
  if (isConfigWithGroups(config)) {
    return config.at(0)?.items.at(0)?.id!
  }
  return config.at(0)?.id!
}

type UseCmdMenuProps = {
  config: ConfigType
}

type UseCmdMenuReturn = {
  isCommandMenuOpen: boolean
  selectedItem?: string
  selectedItemRef: RefObject<HTMLLIElement> | null
  menuProps: MenuProps
  searchProps: SearchProps
  preparedList: ListData
}

export const useCmdMenu = ({ config }: UseCmdMenuProps): UseCmdMenuReturn => {
  const [isCommandMenuOpen, setIsCommandMenuOpen] = useState<boolean>(false)
  const [selectedItem, setSelectedItem] = useState<string | undefined>(getFirstOption(config))

  const listRef = useRef<HTMLDivElement>(null)
  const searchRef = useRef<HTMLInputElement>(null)
  const selectedItemRef = useRef<HTMLLIElement>(null)
  const preparedListData = useRef<ListData>(getListData(config, setSelectedItem))
  const flattedListData = useRef<ListItemData[]>(getFlatListData(preparedListData.current))

  const [currentListData, setCurrentListData] = useState<ListData>(preparedListData.current)

  const handleResetToDefaultState = () => {
    const firstItem = preparedListData.current.at(0)!.items?.at(0)!.id
    selectedItem !== firstItem && setSelectedItem(firstItem)
    return setCurrentListData(preparedListData.current)
  }

  useEffect(() => {
    const keyDownHandler = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === TRIGGER_KEY) {
        const newIsCommandMenuOpen = !isCommandMenuOpen
        newIsCommandMenuOpen && handleResetToDefaultState()
        return setIsCommandMenuOpen(!isCommandMenuOpen)
      }
      if (isCommandMenuOpen && event.key === 'Escape') {
        return setIsCommandMenuOpen(false)
      }
    }

    document.addEventListener('keydown', keyDownHandler)
    return () => document.removeEventListener('keydown', keyDownHandler)
  }, [isCommandMenuOpen])

  useLayoutEffect(() => {
    if (listRef.current && searchRef.current && selectedItemRef.current) {
      const handleScrollSelectedIntoView = (selectedOptionRef: RefObject<HTMLLIElement>) => {
        const listDimensions = listRef.current!.getBoundingClientRect()
        const searchDimensions = searchRef.current!.getBoundingClientRect()
        const selectedOptionDimensions = selectedItemRef.current?.getBoundingClientRect()

        const shouldScroll =
          selectedOptionDimensions &&
          (selectedOptionDimensions.top < listDimensions.top + searchDimensions.height ||
            selectedOptionDimensions.bottom > listDimensions.bottom)

        if (selectedItemRef.current?.parentElement?.firstChild === selectedItemRef.current) {
          // Find a better option to handle this, maybe a more generic one? Without the need for a #group
          return selectedItemRef.current?.closest('#group')?.firstElementChild?.scrollIntoView({
            block: 'nearest'
          })
        } else if (shouldScroll) {
          return selectedOptionRef.current?.scrollIntoView({
            block: 'nearest'
          })
        }
      }

      handleScrollSelectedIntoView(selectedItemRef)
    }
  }, [selectedItem])

  const handleSearchChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    const getFiltered = (listData: ListData, searchValue: string) => {
      if (isConfigWithGroups(listData)) {
        const fillteredItems = listData.map(({ items, ...data }) => ({
          ...data,
          items: items?.filter(({ label }) =>
            label.toLowerCase().includes(searchValue.toLowerCase())
          )
        }))
        return fillteredItems.filter(({ items }) => items?.length)
      }
      return listData.filter(({ label }) => label.toLowerCase().includes(searchValue.toLowerCase()))
    }
    const getPreselectedOption = (listData: ListData) => {
      if (isConfigWithGroups(listData)) {
        return listData.at(0)?.items?.at(0)?.id
      }
      return listData.at(0).id
    }

    const filteredData = getFiltered(preparedListData.current, target.value)
    const preselectedOption = getPreselectedOption(filteredData)
    setCurrentListData(filteredData)
    flattedListData.current = getFlatListData(filteredData)
    return setSelectedItem(preselectedOption)
  }

  const handleSelect = (optionRef: RefObject<HTMLLIElement>) => optionRef.current?.click()

  const handleKeyPress = (direction: 'up' | 'down') => {
    const flattedList = flattedListData.current
    const selectedItemIndex = flattedList.findIndex((configData) => configData.id === selectedItem)
    const getNextItem = () => {
      if (selectedItemIndex < flattedList.length - 1 && direction === 'down') {
        return flattedList.at(selectedItemIndex + 1)?.id
      }
      if (selectedItemIndex > 0 && direction === 'up') {
        return flattedList.at(selectedItemIndex - 1)?.id
      }
      return selectedItem
    }
    return setSelectedItem(getNextItem()!)
  }

  const handleMenuKeyDown: KeyboardEventHandler<HTMLDivElement> = (event) => {
    switch (event.key) {
      case DOWN_KEY: {
        event.preventDefault()
        return handleKeyPress('down')
      }
      case UP_KEY: {
        event.preventDefault()
        return handleKeyPress('up')
      }
      case ENTER_KEY: {
        event.preventDefault()
        return handleSelect(selectedItemRef)
      }
    }
  }

  const handleClickInMenuList: MouseEventHandler<HTMLDivElement> = (event) => {
    if ((event.target as HTMLDivElement).localName === 'li') {
      return setIsCommandMenuOpen(false)
    }
  }

  return {
    isCommandMenuOpen,
    selectedItem,
    selectedItemRef,
    menuProps: {
      ref: listRef,
      onKeyDown: handleMenuKeyDown,
      onClick: handleClickInMenuList
    },
    searchProps: {
      autoFocus: true,
      ref: searchRef,
      onChange: handleSearchChange
    },
    preparedList: currentListData
  }
}

export * from './types'
