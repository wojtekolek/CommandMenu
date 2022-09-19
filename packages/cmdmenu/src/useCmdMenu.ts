// eslint-disable-next-line import/no-extraneous-dependencies
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useLayoutEffect as useLayoutEffectBase,
  useRef,
  useState
} from 'react'
import type { ChangeEventHandler, KeyboardEventHandler, RefObject } from 'react'

import type { ConfigData, ListData, MenuProps, SearchProps, SelectedItemData } from './types'
import { getFirstOption, getListData, isListDataWithGroups } from './utils'

const useLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffectBase

const TRIGGER_KEY = 'k'
export const DOWN_KEY = 'ArrowDown'
export const UP_KEY = 'ArrowUp'
export const ENTER_KEY = 'Enter'
export const BACK_KEY = 'Backspace'
export const ESCAPE_KEY = 'Escape'

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

type CurrentListState = {
  preparedConfig: ListData
  data: ListData
  itemsOrder: SelectedItemData[]
  configLevelKey: (string | number)[]
  searchPlaceholder?: string
  searchValue?: string
}

type CmdMenuState = {
  preparedConfig: ListData
  currentList: CurrentListState
}

const getItemsOrder = (preparedConfig: ListData): SelectedItemData[] =>
  preparedConfig.flatMap(({ id, isGroup, groupItems, items }) => {
    if (isGroup && groupItems.length) {
      return groupItems.flatMap(({ id, items }) => ({
        id,
        isConfigWithNestedData: !!items
      }))
    }
    return {
      id,
      isConfigWithNestedData: !!items
    }
  })

const getCurrentList = (preparedConfig: ListData): CurrentListState => ({
  preparedConfig,
  data: preparedConfig,
  itemsOrder: getItemsOrder(preparedConfig),
  configLevelKey: []
})

const getInitialData = (
  config: ConfigData,
  setSelectedItem: Dispatch<SetStateAction<SelectedItemData | undefined>>
): CmdMenuState => {
  // prepared config
  const preparedConfig = getListData(config, setSelectedItem)

  return {
    preparedConfig,
    currentList: getCurrentList(preparedConfig)
  }
}

type FilteredData = {
  data: ListData
  itemsOrder: SelectedItemData[]
}

const getFilteredList = (list: ListData, searchValue: string): FilteredData => {
  if (isListDataWithGroups(list)) {
    const fillteredItems = list.map(({ groupItems, ...data }) => ({
      ...data,
      groupItems: groupItems?.filter(({ label }) =>
        label.toLowerCase().includes(searchValue.toLowerCase())
      )
    }))
    const data = fillteredItems.filter(({ groupItems }) => groupItems?.length)
    return {
      data,
      itemsOrder: getItemsOrder(data)
    }
  }
  const data = list.filter(({ label }) => label.toLowerCase().includes(searchValue.toLowerCase()))
  return {
    data,
    itemsOrder: getItemsOrder(data)
  }
}

const getPropByPath = (
  object: Record<string, any>,
  path: (string | number)[],
  defaultValue: unknown
): any => {
  if (object && path.length) return getPropByPath(object[path.shift()!], path, defaultValue)
  return object === undefined ? defaultValue : object
}

export const useCmdMenu = ({ config }: UseCmdMenuProps): UseCmdMenuReturn => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [selectedItem, setSelectedItem] = useState<SelectedItemData | undefined>(
    getFirstOption(config)
  )
  const state = useRef<CmdMenuState>(getInitialData(config, setSelectedItem))
  const getState = () => state.current

  const setCurrentListState = (newCurrentListData: Partial<CurrentListState>) =>
    (state.current.currentList = { ...state.current.currentList, ...newCurrentListData })

  const listRef = useRef<HTMLDivElement>(null)
  const searchRef = useRef<HTMLInputElement>(null)
  const selectedItemRef = useRef<HTMLLIElement>(null)

  const handleResetToDefaultState = useCallback(() => {
    state.current = getInitialData(config, setSelectedItem)
  }, [config])

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

  const handleSearchChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const searchValue = event.target.value
    const data = getState().currentList.preparedConfig
    console.log(data)
    const newData = getFilteredList(Array.isArray(data) ? data : data.items, searchValue)

    state.current.currentList.data = newData.data
    state.current.currentList.itemsOrder = newData.itemsOrder
    state.current.currentList.searchValue = searchValue

    setCurrentListState({
      data: newData.data,
      itemsOrder: newData.itemsOrder,
      searchValue
    })

    const newSelectedOption = newData.itemsOrder.at(0)
    return setSelectedItem(newSelectedOption)
  }

  const handleGoBackFromNested = () => {
    const getPreviousKey = (levelKey: (string | number)[]) => {
      const lastItemsKeyIndex = levelKey.lastIndexOf('items')
      if (lastItemsKeyIndex) {
        const preparedKey = levelKey.slice(0, lastItemsKeyIndex)
        const lastGroupsItemsKeyIndex = levelKey.lastIndexOf('groupItems')
        return lastGroupsItemsKeyIndex === preparedKey.length - 1
          ? preparedKey.slice(0, lastGroupsItemsKeyIndex - 1)
          : preparedKey
      }
      return levelKey
    }

    const baseState = getState()
    const { configLevelKey } = baseState.currentList
    const arrayKey = getPreviousKey(configLevelKey)
    const data = getPropByPath(baseState, [...arrayKey], {})
    const listData = arrayKey.length > 1 ? data.items : data
    const newItemsOrder = getItemsOrder(listData)

    setCurrentListState({
      data: listData,
      itemsOrder: newItemsOrder,
      preparedConfig: listData,
      configLevelKey: arrayKey,
      searchPlaceholder: data.placeholder
    })

    const newSelectedOption = newItemsOrder.at(0)
    return setSelectedItem(newSelectedOption)
  }

  const handleGoToNestedItems = () => {
    const baseState = getState()
    const { itemsOrder, preparedConfig, configLevelKey } = baseState.currentList

    const getArrayKey = (levelKey?: (string | number)[]) => {
      const findIndex = (data: ListData, selectedItemId: string) =>
        data.findIndex(({ id, isGroup, groupItems }) => {
          if (isGroup && groupItems.length) {
            return groupItems!.some(({ id }) => id === selectedItemId)
          }
          return id === selectedItemId
        })

      if (!levelKey?.length || (levelKey && levelKey.length <= 1)) {
        const groupId = findIndex(preparedConfig, selectedItem!.id)
        const selectedItemIndex = itemsOrder.findIndex(({ id }) => id === selectedItem?.id)
        return ['preparedConfig', groupId, 'groupItems', selectedItemIndex]
      }
      const selectedItemIndex = itemsOrder.findIndex(({ id }) => id === selectedItem?.id)
      return [...levelKey, 'items', selectedItemIndex]
    }

    const arrayKey = getArrayKey(configLevelKey)
    const data = getPropByPath(baseState, [...arrayKey], {})
    const newItemsOrder = getItemsOrder(data.items)

    setCurrentListState({
      data: data.items,
      itemsOrder: newItemsOrder,
      preparedConfig: data,
      configLevelKey: arrayKey,
      searchPlaceholder: data.placeholder,
      searchValue: undefined
    })

    const newSelectedOption = newItemsOrder.at(0)
    return setSelectedItem(newSelectedOption)
  }

  const handleSelect = (optionRef: RefObject<HTMLLIElement>) => {
    if (selectedItem?.isConfigWithNestedData) {
      handleGoToNestedItems()
    } else {
      optionRef.current?.click()
    }
  }

  const handleKeyPress = (direction: 'up' | 'down') => {
    const { itemsOrder } = getState().currentList
    const selectedItemIndex = itemsOrder.findIndex(({ id }) => id === selectedItem?.id)

    let newSelectedItem = selectedItem
    if (selectedItemIndex < itemsOrder.length - 1 && direction === 'down') {
      newSelectedItem = itemsOrder.at(selectedItemIndex + 1)
    } else if (selectedItemIndex > 0 && direction === 'up') {
      newSelectedItem = itemsOrder.at(selectedItemIndex - 1)
    }

    return setSelectedItem(newSelectedItem)
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
      case BACK_KEY: {
        const { configLevelKey } = getState().currentList
        if (!(event.target as any).value.length && configLevelKey.length > 1) {
          return handleGoBackFromNested()
        }
      }
    }
  }

  return {
    isOpen,
    selectedItem: selectedItem?.id,
    selectedItemRef,
    menuProps: {
      ref: listRef,
      onKeyDown: handleMenuKeyDown
    },
    searchProps: {
      autoFocus: true,
      placeholder: getState().currentList.searchPlaceholder ?? 'Type to search...',
      value: getState().currentList.searchValue ?? '',
      ref: searchRef,
      onChange: handleSearchChange
    },
    preparedList: getState().currentList.data
  }
}
