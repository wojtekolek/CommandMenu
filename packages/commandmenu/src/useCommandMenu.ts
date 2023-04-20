// eslint-disable-next-line import/no-extraneous-dependencies
import { useEffect, useLayoutEffect as useLayoutEffectBase, useRef, useState } from "react";
import type {
  ChangeEventHandler,
  Dispatch,
  KeyboardEventHandler,
  RefObject,
  SetStateAction,
} from "react";

import type { ConfigData, ListData, MenuProps, SearchProps, SelectedItemData } from "./types";
import {
  findIndexes,
  getFilteredList,
  getFirstOption,
  getItemsOrder,
  getListData,
  getPropByPath,
} from "./utils";

const useLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffectBase;

const SEARCH_PLACEHOLDER = "Type to search...";

export const DOWN_KEY = "ArrowDown";
export const UP_KEY = "ArrowUp";
export const ENTER_KEY = "Enter";
export const BACK_KEY = "Backspace";
export const ESCAPE_KEY = "Escape";

type CurrentListState = {
  preparedConfig: ListData;
  data: ListData;
  itemsOrder: SelectedItemData[];
  configLevelKey: (string | number)[];
  searchPlaceholder?: string;
  searchValue?: string;
};

type CommandMenuState = {
  preparedConfig: ListData;
  currentList: CurrentListState;
};

export const getCurrentList = (preparedConfig: ListData): CurrentListState => ({
  preparedConfig,
  data: preparedConfig,
  itemsOrder: getItemsOrder(preparedConfig),
  configLevelKey: [],
});

const getInitialData = (
  config: ConfigData,
  setSelectedItem: Dispatch<SetStateAction<SelectedItemData | undefined>>,
  goToNested: (passedItemId: string) => void,
): CommandMenuState => {
  // prepared config
  const preparedConfig = getListData(config, setSelectedItem, goToNested);

  return {
    preparedConfig,
    currentList: getCurrentList(preparedConfig),
  };
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

export const useCommandMenu = ({
  config,
  searchPlaceholder = SEARCH_PLACEHOLDER,
}: UseCommandMenuProps): UseCommandMenuReturn => {
  const [selectedItem, setSelectedItem] = useState<SelectedItemData | undefined>(
    getFirstOption(config),
  );

  const goToNested = (passedItemId: string) => handleGoToNestedItems(passedItemId);
  const state = useRef<CommandMenuState>(getInitialData(config, setSelectedItem, goToNested));
  const getState = () => state.current;

  const setCurrentListState = (newCurrentListData: Partial<CurrentListState>) =>
    (state.current.currentList = { ...state.current.currentList, ...newCurrentListData });

  const listRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const selectedItemRef = useRef<HTMLLIElement>(null);

  useLayoutEffect(() => {
    if (listRef.current && searchRef.current && selectedItemRef.current) {
      const handleScrollSelectedIntoView = (selectedOptionRef: RefObject<HTMLLIElement>) => {
        const listDimensions = listRef.current!.getBoundingClientRect();
        const searchDimensions = searchRef.current!.getBoundingClientRect();
        const selectedOptionDimensions = selectedItemRef.current?.getBoundingClientRect();

        const shouldScroll =
          selectedOptionDimensions &&
          (selectedOptionDimensions.top < listDimensions.top + searchDimensions.height ||
            selectedOptionDimensions.bottom > listDimensions.bottom);

        if (selectedItemRef.current?.parentElement?.firstChild === selectedItemRef.current) {
          // eslint-disable-next-line max-len
          // Find a better option to handle this, maybe a more generic one? Without the need for a #group
          return selectedItemRef.current?.closest("#group")?.firstElementChild?.scrollIntoView({
            block: "nearest",
          });
        } else if (shouldScroll) {
          return selectedOptionRef.current?.scrollIntoView({
            block: "nearest",
          });
        }
      };

      handleScrollSelectedIntoView(selectedItemRef);
    }
  }, [selectedItem]);

  const handleSearchChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const { value } = event.target;
    const newData = getFilteredList(getState().currentList.preparedConfig, value);

    setCurrentListState({
      data: newData.data,
      itemsOrder: newData.itemsOrder,
      searchValue: value,
    });

    const newSelectedOption = newData.itemsOrder.at(0);
    return setSelectedItem(newSelectedOption);
  };

  const handleGoBackFromNested = () => {
    const getPreviousKey = (levelKey: (string | number)[]) => {
      const lastItemsKeyIndex = levelKey.lastIndexOf("items");
      if (lastItemsKeyIndex) {
        const preparedKey = levelKey.slice(0, lastItemsKeyIndex);
        const lastGroupsItemsKeyIndex = levelKey.lastIndexOf("groupItems");
        return lastGroupsItemsKeyIndex === preparedKey.length - 1
          ? preparedKey.slice(0, lastGroupsItemsKeyIndex - 1)
          : preparedKey;
      }
      return levelKey;
    };

    const baseState = getState();
    const { configLevelKey } = baseState.currentList;
    const arrayKey = getPreviousKey(configLevelKey);
    const data = getPropByPath(baseState, [...arrayKey], {});
    const listData = arrayKey.length > 1 ? data.items : data;
    const newItemsOrder = getItemsOrder(listData);

    setCurrentListState({
      data: listData,
      itemsOrder: newItemsOrder,
      preparedConfig: listData,
      configLevelKey: arrayKey,
      searchPlaceholder: data.placeholder,
    });

    const newSelectedOption = newItemsOrder.at(0);
    return setSelectedItem(newSelectedOption);
  };

  const handleGoToNestedItems = (passedItemId: string) => {
    const baseState = getState();
    const { preparedConfig, configLevelKey } = baseState.currentList;

    const getArrayKey = (config: ListData, levelKey: (string | number)[]) => {
      const indexes = findIndexes(config, passedItemId);
      if (!levelKey?.length || (levelKey && levelKey.length <= 1)) {
        // For grouped configs the first index will be the group index.
        const [groupIndex, selectedItemIndex] = indexes;
        return ["preparedConfig", groupIndex, "groupItems", selectedItemIndex];
      }
      // For flat configs the first index will be the item index.
      const [selectedItemIndex] = indexes;
      return [...levelKey, "items", selectedItemIndex];
    };
    const arrayKey = getArrayKey(preparedConfig, configLevelKey);
    const data = getPropByPath(baseState, [...arrayKey], {});
    const newItemsOrder = getItemsOrder(data.items);

    setCurrentListState({
      data: data.items,
      itemsOrder: newItemsOrder,
      preparedConfig: data.items,
      configLevelKey: arrayKey,
      searchPlaceholder: data.placeholder,
      searchValue: undefined,
    });

    const newSelectedOption = newItemsOrder.at(0);
    return setSelectedItem(newSelectedOption);
  };

  const handleSelect = (optionRef: RefObject<HTMLLIElement>) => optionRef.current?.click();

  const handleKeyPress = (direction: "up" | "down") => {
    const { itemsOrder } = getState().currentList;
    const selectedItemIndex = itemsOrder.findIndex(({ id }) => id === selectedItem?.id);

    const getNextItemIndex = () => {
      if (selectedItemIndex < itemsOrder.length - 1 && direction === "down") {
        return selectedItemIndex + 1;
      }
      if (selectedItemIndex > 0 && direction === "up") {
        return selectedItemIndex - 1;
      }
      return selectedItemIndex;
    };
    const newSelectedItemIndex = getNextItemIndex();
    const newSelectedItem = itemsOrder.at(newSelectedItemIndex);
    return setSelectedItem(newSelectedItem);
  };

  const handleListKeyDown: KeyboardEventHandler<HTMLDivElement> = (event) => {
    switch (event.key) {
      case DOWN_KEY: {
        event.preventDefault();
        return handleKeyPress("down");
      }
      case UP_KEY: {
        event.preventDefault();
        return handleKeyPress("up");
      }
      case ENTER_KEY: {
        event.preventDefault();
        return handleSelect(selectedItemRef);
      }
      case BACK_KEY: {
        const { configLevelKey } = getState().currentList;
        if (!(event.target as HTMLInputElement).value.length && configLevelKey.length > 1) {
          return handleGoBackFromNested();
        }
      }
    }
  };

  const getMenuProps = () => ({
    ref: listRef,
    onKeyDown: handleListKeyDown,
  });

  const getSearchProps = () => {
    const { searchPlaceholder: listSearchPlaceholder, searchValue } = getState().currentList;

    return {
      autoFocus: true,
      placeholder: listSearchPlaceholder ?? searchPlaceholder,
      value: searchValue ?? "",
      ref: searchRef,
      onChange: handleSearchChange,
    };
  };

  return {
    selectedItem: selectedItem?.id,
    selectedItemRef,
    menuProps: getMenuProps(),
    searchProps: getSearchProps(),
    list: getState().currentList.data,
  };
};
