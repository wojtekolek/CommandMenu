// eslint-disable-next-line import/no-extraneous-dependencies
import {
  MouseEventHandler,
  useCallback,
  useEffect,
  useLayoutEffect as useLayoutEffectBase,
  useRef,
  useState
} from 'react'
import type { ChangeEventHandler, KeyboardEventHandler, RefObject } from 'react'

import type { ConfigData, ListData, ListItemData, MenuProps, SearchProps } from './types'
import { getFirstOption, getFlatListData, getListData, isListDataWithGroups } from './utils'

const useLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffectBase

const TRIGGER_KEY = 'k'
const DOWN_KEY = 'ArrowDown'
const UP_KEY = 'ArrowUp'
const ENTER_KEY = 'Enter'

type UseCmdMenuProps = {
  config: ConfigData
}

type UseCmdMenuReturn = {
  isOpen: boolean
  selectedItem?: string
  selectedItemRef: RefObject<HTMLLIElement> | null
  menuProps: MenuProps
  searchProps: SearchProps
  preparedList: ListData
}

export const useCmdMenu = ({ config }: UseCmdMenuProps): UseCmdMenuReturn => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [selectedItem, setSelectedItem] = useState<string | undefined>(getFirstOption(config))

  const listRef = useRef<HTMLDivElement>(null)
  const searchRef = useRef<HTMLInputElement>(null)
  const selectedItemRef = useRef<HTMLLIElement>(null)
  const preparedListData = useRef<ListData>(getListData(config, setSelectedItem))
  const flattedListData = useRef<ListItemData[]>(getFlatListData(preparedListData.current))

  const [currentListData, setCurrentListData] = useState<ListData>(preparedListData.current)

  const handleResetToDefaultState = useCallback(() => {
    const firstItem = preparedListData.current.at(0)!.items?.at(0)!.id
    selectedItem !== firstItem && setSelectedItem(firstItem)
    return setCurrentListData(preparedListData.current)
  }, [selectedItem])

  useEffect(() => {
    const keyDownHandler = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === TRIGGER_KEY) {
        const newIsCommandMenuOpen = !isOpen
        newIsCommandMenuOpen && handleResetToDefaultState()
        return setIsOpen(!isOpen)
      }
      if (isOpen && event.key === 'Escape') {
        return setIsOpen(false)
      }
    }

    document.addEventListener('keydown', keyDownHandler)
    return () => document.removeEventListener('keydown', keyDownHandler)
  }, [handleResetToDefaultState, isOpen])

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
      if (isListDataWithGroups(listData)) {
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
      if (isListDataWithGroups(listData)) {
        return listData.at(0)?.items?.at(0)?.id
      }
      return listData.at(0)!.id
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
    if ((event.target as HTMLLIElement).localName === 'li') {
      return setIsOpen(false)
    }
  }

  return {
    isOpen,
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
