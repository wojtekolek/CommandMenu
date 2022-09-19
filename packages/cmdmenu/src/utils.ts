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
  setSelectedItem: Dispatch<SetStateAction<SelectedItemData | undefined>>
): ListItemData[] =>
  config.map(({ id, label, onSelect, items, placeholder }) => ({
    id,
    label,
    onPointerEnter: () =>
      setSelectedItem({
        id,
        isConfigWithNestedData: !!items?.length
      }),
    onClick: onSelect!,
    isGroup: undefined,
    placeholder,
    items: items?.length ? prepareListOption(items, setSelectedItem) : undefined
  }))

export const getListData = (
  config: ConfigData,
  setSelectedItem: Dispatch<SetStateAction<SelectedItemData | undefined>>
): ListData => {
  if (isConfigWithGroups(config)) {
    return config.map(({ id, label, groupItems }) => ({
      id,
      label,
      isGroup: true,
      groupItems: prepareListOption(groupItems, setSelectedItem)
    }))
  }
  return prepareListOption(config, setSelectedItem)
}

export const getFlatListData = (listData: ListData): ListItemData[] => {
  if (isConfigWithGroups(listData as unknown as ConfigData)) {
    return listData.flatMap(({ items }) => items!)
  }
  return listData as ListItemData[]
}

// export const getFirstOption = (
//   config: ConfigData
// ): ItemConfigData | ItemWithNestedListConfigData => {
//   if (isConfigWithGroups(config)) {
//     return config.at(0)?.items.at(0)!
//   }
//   return config.at(0)!
// }

export const getFirstOption = (config: ConfigData): SelectedItemData => {
  if (isConfigWithGroups(config)) {
    const item = config.at(0)?.groupItems.at(0)!
    return {
      id: item.id,
      isConfigWithNestedData: true
    }
  }
  const item = config.at(0)!
  return {
    id: item.id,
    isConfigWithNestedData: false
  }
}
