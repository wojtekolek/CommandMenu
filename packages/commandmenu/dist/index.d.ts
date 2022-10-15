import { MouseEvent, RefObject, KeyboardEventHandler, ChangeEventHandler } from 'react';

declare type ItemCommonConfigData<IconName = string> = {
    id: string;
    icon?: IconName;
    label: string;
    description?: string;
};
declare type ItemConfigData<IconName = string> = ItemCommonConfigData<IconName> & {
    placeholder?: never;
    items?: never;
    onSelect: (event: MouseEvent<HTMLLIElement>) => void;
};
declare type ItemWithNestedListConfigData<IconName = string> = ItemCommonConfigData<IconName> & {
    onSelect?: never;
    placeholder: string;
    items: Array<ItemWithNestedListConfigData<IconName> | ItemConfigData<IconName>>;
};
declare type ItemsGroupConfigData<IconName = string> = {
    id: string;
    label: string;
    groupItems: Array<ItemConfigData<IconName> | ItemWithNestedListConfigData<IconName>>;
};
declare type ConfigData<IconName = string> = ItemsGroupConfigData<IconName>[] | ItemConfigData<IconName>[];
declare type ListItemData = {
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
declare type ListGroupData = {
    id: string;
    label: string;
    isGroup: boolean;
    groupItems: ListItemData[];
    items?: never;
    icon?: never;
    description?: never;
};
declare type ListData = ListGroupData[] | ListItemData[];
declare type WrapperProps = {
    ref: RefObject<HTMLDivElement>;
    onKeyDown: KeyboardEventHandler<HTMLDivElement>;
};
declare type SearchProps = {
    autoFocus: boolean;
    placeholder: string;
    value?: string;
    ref: RefObject<HTMLInputElement>;
    onChange: ChangeEventHandler<HTMLInputElement>;
};

declare type UseCommandMenuProps = {
    config: ConfigData;
};
declare type UseCommandMenuReturn = {
    selectedItem?: string;
    selectedItemRef: RefObject<HTMLLIElement> | null;
    wrapperProps: WrapperProps;
    searchProps: SearchProps;
    preparedList: ListData;
};
declare const useCommandMenu: ({ config }: UseCommandMenuProps) => UseCommandMenuReturn;

export { ConfigData, ItemConfigData, ItemsGroupConfigData, ListItemData, useCommandMenu };
