import type { Dispatch, SetStateAction } from 'react'

import type {
  ConfigData,
  ItemConfigData,
  ItemWithNestedListConfigData,
  ItemsGroupConfigData,
  ListData,
  ListGroupData,
  ListItemData,
  SelectedItemData
} from './types'

// Type guards
export const isConfigWithGroups = (config: ConfigData): config is ItemsGroupConfigData[] =>
  (config as ItemsGroupConfigData[]).at(0)?.groupItems !== undefined

export const isListDataWithGroups = (config: ListData): config is ListGroupData[] =>
  (config as ListGroupData[]).at(0)?.groupItems !== undefined

// Preapare list
export const prepareListOption = (
  config: Array<ItemConfigData | ItemWithNestedListConfigData>,
  setSelectedItem: Dispatch<SetStateAction<SelectedItemData | undefined>>,
  goToNested: (passedItemId: string) => void
): ListItemData[] =>
  config.map(({ id, label, icon, description, onSelect, items, placeholder }) => {
    const isConfigWithNestedData = !!items?.length
    return {
      id,
      label,
      icon,
      description,
      onPointerMove: () =>
        setSelectedItem({
          id,
          isConfigWithNestedData
        }),
      onClick: isConfigWithNestedData ? () => goToNested(id) : onSelect!,
      isGroup: undefined,
      placeholder,
      items: items?.length ? prepareListOption(items, setSelectedItem, goToNested) : undefined
    }
  })

export const getListData = (
  config: ConfigData,
  setSelectedItem: Dispatch<SetStateAction<SelectedItemData | undefined>>,
  goToNested: (passedItemId: string) => void
): ListData => {
  if (isConfigWithGroups(config)) {
    return config.map(({ id, label, groupItems }) => ({
      id,
      label,
      isGroup: true,
      groupItems: prepareListOption(groupItems, setSelectedItem, goToNested)
    }))
  }
  return prepareListOption(config, setSelectedItem, goToNested)
}

export const getFlatListData = (listData: ListData): ListItemData[] => {
  if (isConfigWithGroups(listData as unknown as ConfigData)) {
    return listData.flatMap(({ items }) => items!)
  }
  return listData as ListItemData[]
}

export const getFirstOption = (config: ConfigData): SelectedItemData => {
  const INITIAL_INDEX = 0
  if (isConfigWithGroups(config)) {
    const item = config.at(INITIAL_INDEX)?.groupItems.at(INITIAL_INDEX)!
    return {
      id: item.id,
      isConfigWithNestedData: true
    }
  }
  const item = config.at(INITIAL_INDEX)!
  return {
    id: item.id,
    isConfigWithNestedData: false
  }
}
