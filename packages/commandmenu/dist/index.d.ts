import { MouseEvent, RefObject, KeyboardEventHandler, ChangeEventHandler } from 'react';

type ItemCommonConfigData<IconName = string> = {
    id: string;
    icon?: IconName;
    label: string;
    description?: string;
};
type ItemConfigData<IconName = string> = Omit<ItemCommonConfigData<IconName>, "label"> & {
    placeholder?: never;
    label: ((typedValue: string) => string) | string;
    items?: never;
    onSelect: (event: MouseEvent<HTMLLIElement>) => void;
};
type ItemWithNestedListConfigData<IconName = string> = ItemCommonConfigData<IconName> & {
    onSelect?: never;
    placeholder: string;
    items: Array<ItemWithNestedListConfigData<IconName> | ItemConfigData<IconName>>;
};
type ItemsGroupConfigData<IconName = string> = {
    id: string;
    label: string;
    groupItems: Array<ItemConfigData<IconName> | ItemWithNestedListConfigData<IconName>>;
};
type ConfigData<IconName = string> = ItemsGroupConfigData<IconName>[] | ItemConfigData<IconName>[];
type ListItemData = {
    id: string;
    label: string;
    icon?: string;
    description?: string;
    onPointerMove: () => void;
    onClick: (event: MouseEvent<HTMLLIElement>) => void;
    items?: ListItemData[];
    isGroup?: never;
    groupItems?: never;
};
type ListGroupData = {
    id: string;
    label: string;
    isGroup: boolean;
    groupItems: ListItemData[];
    items?: never;
    icon?: never;
    description?: never;
};
type ListData = ListGroupData[] | ListItemData[];
type MenuProps = {
    ref: RefObject<HTMLDivElement>;
    onKeyDown: KeyboardEventHandler<HTMLDivElement>;
};
type SearchProps = {
    autoFocus: boolean;
    placeholder: string;
    value?: string;
    ref: RefObject<HTMLInputElement>;
    onChange: ChangeEventHandler<HTMLInputElement>;
};

type UseCommandMenuProps = {
    config: ConfigData;
    searchPlaceholder?: string;
};
type UseCommandMenuReturn = {
    selectedItem?: string;
    selectedItemRef: RefObject<HTMLLIElement> | null;
    menuProps: MenuProps;
    searchProps: SearchProps;
    list: ListData;
};
declare const useCommandMenu: ({ config, searchPlaceholder, }: UseCommandMenuProps) => UseCommandMenuReturn;

export { ConfigData, ItemConfigData, ItemsGroupConfigData, ListItemData, useCommandMenu };
