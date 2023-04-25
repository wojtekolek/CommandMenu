import { MouseEvent, ReactNode, RefObject, KeyboardEventHandler, ChangeEventHandler } from 'react';

type ItemCommonConfigData = {
    id: string;
    icon?: ReactNode;
    label: string;
    description?: string;
};
type ItemConfigData = ItemCommonConfigData & {
    placeholder?: never;
    items?: never;
    onSelect: (event: MouseEvent<HTMLLIElement>) => void;
};
type ItemWithNestedListConfigData = ItemCommonConfigData & {
    onSelect?: never;
    placeholder: string;
    items: Array<ItemWithNestedListConfigData | ItemConfigData>;
};
type ItemsGroupConfigData = {
    id: string;
    label: string;
    groupItems: Array<ItemConfigData | ItemWithNestedListConfigData>;
};
type ConfigData = ItemsGroupConfigData[] | ItemConfigData[] | ItemWithNestedListConfigData[];
type ListItemData = {
    id: string;
    label: string;
    icon?: ReactNode;
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

declare const isGroupItem: (itemToCheck: ListGroupData | ListItemData) => itemToCheck is ListGroupData;

export { ConfigData, ItemConfigData, ItemsGroupConfigData, ListItemData, isGroupItem, useCommandMenu };
