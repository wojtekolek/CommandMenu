import type { Dispatch, SetStateAction } from 'react'

import type {
  ConfigData,
  GroupConfigData,
  GroupItemConfigData,
  ListData,
  ListGroupData,
  ListItemData
} from './types'

// Type guards
export const isConfigWithGroups = (config: ConfigData): config is GroupConfigData[] =>
  (config as GroupConfigData[]).at(0)?.items !== undefined

export const isListDataWithGroups = (config: ListData): config is ListGroupData[] =>
  (config as ListGroupData[]).at(0)?.items !== undefined

// Preapare list
export const prepareListOption = (
  config: GroupItemConfigData[],
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

export const getListData = (
  config: ConfigData,
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

export const getFlatListData = (listData: ListData): ListItemData[] => {
  if (isConfigWithGroups(listData as unknown as ConfigData)) {
    return listData.flatMap(({ items }) => items!)
  }
  return listData as ListItemData[]
}

export const getFirstOption = (config: ConfigData): string => {
  if (isConfigWithGroups(config)) {
    return config.at(0)?.items.at(0)?.id!
  }
  return config.at(0)?.id!
}
