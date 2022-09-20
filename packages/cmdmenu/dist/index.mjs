// src/useCmdMenu.ts
import {
  useCallback,
  useEffect,
  useLayoutEffect as useLayoutEffectBase,
  useRef,
  useState
} from "react";

// src/utils.ts
var isConfigWithGroups = (config) => {
  var _a;
  return ((_a = config.at(0)) == null ? void 0 : _a.groupItems) !== void 0;
};
var isListDataWithGroups = (config) => {
  var _a;
  return ((_a = config.at(0)) == null ? void 0 : _a.groupItems) !== void 0;
};
var prepareListOption = (config, setSelectedItem) => config.map(({ id, label, onSelect, items, placeholder }, index) => ({
  id,
  label,
  onPointerEnter: () => setSelectedItem({
    id,
    isConfigWithNestedData: !!(items == null ? void 0 : items.length),
    index
  }),
  onClick: onSelect,
  isGroup: void 0,
  placeholder,
  items: (items == null ? void 0 : items.length) ? prepareListOption(items, setSelectedItem) : void 0
}));
var getListData = (config, setSelectedItem) => {
  if (isConfigWithGroups(config)) {
    return config.map(({ id, label, groupItems }) => ({
      id,
      label,
      isGroup: true,
      groupItems: prepareListOption(groupItems, setSelectedItem)
    }));
  }
  return prepareListOption(config, setSelectedItem);
};
var getFirstOption = (config) => {
  var _a;
  const INITIAL_INDEX = 0;
  if (isConfigWithGroups(config)) {
    const item2 = (_a = config.at(INITIAL_INDEX)) == null ? void 0 : _a.groupItems.at(INITIAL_INDEX);
    return {
      id: item2.id,
      isConfigWithNestedData: true,
      index: INITIAL_INDEX
    };
  }
  const item = config.at(INITIAL_INDEX);
  return {
    id: item.id,
    isConfigWithNestedData: false,
    index: INITIAL_INDEX
  };
};

// src/useCmdMenu.ts
var useLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffectBase;
var TRIGGER_KEY = "k";
var DOWN_KEY = "ArrowDown";
var UP_KEY = "ArrowUp";
var ENTER_KEY = "Enter";
var BACK_KEY = "Backspace";
var getItemsOrder = (preparedConfig) => {
  if (isListDataWithGroups(preparedConfig)) {
    const flatList = preparedConfig.flatMap(
      ({ groupItems }) => groupItems.flatMap(({ id, items }) => ({
        id,
        isConfigWithNestedData: !!items,
        index: 0
      }))
    );
    return flatList.flatMap((data, index) => ({
      ...data,
      index
    }));
  }
  return preparedConfig.flatMap(({ id, items }, index) => ({
    id,
    isConfigWithNestedData: !!items,
    index
  }));
};
var getCurrentList = (preparedConfig) => ({
  preparedConfig,
  data: preparedConfig,
  itemsOrder: getItemsOrder(preparedConfig),
  configLevelKey: []
});
var getInitialData = (config, setSelectedItem) => {
  const preparedConfig = getListData(config, setSelectedItem);
  return {
    preparedConfig,
    currentList: getCurrentList(preparedConfig)
  };
};
var getFilteredList = (list, searchValue) => {
  if (isListDataWithGroups(list)) {
    const fillteredItems = list.map(({ groupItems, ...data3 }) => ({
      ...data3,
      groupItems: groupItems == null ? void 0 : groupItems.filter(
        ({ label }) => label.toLowerCase().includes(searchValue.toLowerCase())
      )
    }));
    const data2 = fillteredItems.filter(({ groupItems }) => groupItems == null ? void 0 : groupItems.length);
    return {
      data: data2,
      itemsOrder: getItemsOrder(data2)
    };
  }
  const data = list.filter(({ label }) => label.toLowerCase().includes(searchValue.toLowerCase()));
  return {
    data,
    itemsOrder: getItemsOrder(data)
  };
};
var getPropByPath = (object, path, defaultValue) => {
  if (object && path.length)
    return getPropByPath(object[path.shift()], path, defaultValue);
  return object === void 0 ? defaultValue : object;
};
var findIndexes = (data, selectedItemId) => data.flatMap(({ id, isGroup, groupItems }, index) => {
  if (isGroup && groupItems.length) {
    const itemIndex = groupItems.findIndex(({ id: id2 }) => id2 === selectedItemId);
    return itemIndex > -1 ? [index, itemIndex] : [];
  } else if (id === selectedItemId) {
    return [index];
  }
  return [];
});
var useCmdMenu = ({ config }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(
    getFirstOption(config)
  );
  const state = useRef(getInitialData(config, setSelectedItem));
  const getState = () => state.current;
  const setCurrentListState = (newCurrentListData) => state.current.currentList = { ...state.current.currentList, ...newCurrentListData };
  const listRef = useRef(null);
  const searchRef = useRef(null);
  const selectedItemRef = useRef(null);
  const handleResetToDefaultState = useCallback(() => {
    state.current = getInitialData(config, setSelectedItem);
  }, [config]);
  useEffect(() => {
    const keyDownHandler = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key === TRIGGER_KEY) {
        const newIsCommandMenuOpen = !isOpen;
        newIsCommandMenuOpen && handleResetToDefaultState();
        return setIsOpen(!isOpen);
      }
      if (isOpen && event.key === "Escape") {
        return setIsOpen(false);
      }
    };
    document.addEventListener("keydown", keyDownHandler);
    return () => document.removeEventListener("keydown", keyDownHandler);
  }, [handleResetToDefaultState, isOpen]);
  useLayoutEffect(() => {
    if (listRef.current && searchRef.current && selectedItemRef.current) {
      const handleScrollSelectedIntoView = (selectedOptionRef) => {
        var _a, _b, _c, _d, _e, _f, _g;
        const listDimensions = listRef.current.getBoundingClientRect();
        const searchDimensions = searchRef.current.getBoundingClientRect();
        const selectedOptionDimensions = (_a = selectedItemRef.current) == null ? void 0 : _a.getBoundingClientRect();
        const shouldScroll = selectedOptionDimensions && (selectedOptionDimensions.top < listDimensions.top + searchDimensions.height || selectedOptionDimensions.bottom > listDimensions.bottom);
        if (((_c = (_b = selectedItemRef.current) == null ? void 0 : _b.parentElement) == null ? void 0 : _c.firstChild) === selectedItemRef.current) {
          return (_f = (_e = (_d = selectedItemRef.current) == null ? void 0 : _d.closest("#group")) == null ? void 0 : _e.firstElementChild) == null ? void 0 : _f.scrollIntoView({
            block: "nearest"
          });
        } else if (shouldScroll) {
          return (_g = selectedOptionRef.current) == null ? void 0 : _g.scrollIntoView({
            block: "nearest"
          });
        }
      };
      handleScrollSelectedIntoView(selectedItemRef);
    }
  }, [selectedItem]);
  const handleSearchChange = (event) => {
    const { value } = event.target;
    const newData = getFilteredList(getState().currentList.preparedConfig, value);
    setCurrentListState({
      data: newData.data,
      itemsOrder: newData.itemsOrder,
      searchValue: value
    });
    const newSelectedOption = newData.itemsOrder.at(0);
    return setSelectedItem(newSelectedOption);
  };
  const handleGoBackFromNested = () => {
    const getPreviousKey = (levelKey) => {
      const lastItemsKeyIndex = levelKey.lastIndexOf("items");
      if (lastItemsKeyIndex) {
        const preparedKey = levelKey.slice(0, lastItemsKeyIndex);
        const lastGroupsItemsKeyIndex = levelKey.lastIndexOf("groupItems");
        return lastGroupsItemsKeyIndex === preparedKey.length - 1 ? preparedKey.slice(0, lastGroupsItemsKeyIndex - 1) : preparedKey;
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
      searchPlaceholder: data.placeholder
    });
    const newSelectedOption = newItemsOrder.at(0);
    return setSelectedItem(newSelectedOption);
  };
  const handleGoToNestedItems = () => {
    const baseState = getState();
    const { preparedConfig, configLevelKey } = baseState.currentList;
    const getArrayKey = (config2, levelKey) => {
      const indexes = findIndexes(config2, selectedItem.id);
      if (!(levelKey == null ? void 0 : levelKey.length) || levelKey && levelKey.length <= 1) {
        const [groupIndex, selectedItemIndex2] = indexes;
        return ["preparedConfig", groupIndex, "groupItems", selectedItemIndex2];
      }
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
      searchValue: void 0
    });
    const newSelectedOption = newItemsOrder.at(0);
    return setSelectedItem(newSelectedOption);
  };
  const handleSelect = (optionRef) => {
    var _a;
    if (selectedItem == null ? void 0 : selectedItem.isConfigWithNestedData) {
      handleGoToNestedItems();
    } else {
      (_a = optionRef.current) == null ? void 0 : _a.click();
    }
  };
  const handleKeyPress = (direction) => {
    const { itemsOrder } = getState().currentList;
    const selectedItemIndex = selectedItem.index;
    const newSelectedItemIndex = selectedItemIndex < itemsOrder.length - 1 && direction === "down" ? selectedItemIndex + 1 : selectedItemIndex - 1;
    const newSelectedItem = itemsOrder.at(newSelectedItemIndex);
    return setSelectedItem(newSelectedItem);
  };
  const handleMenuKeyDown = (event) => {
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
        if (!event.target.value.length && configLevelKey.length > 1) {
          return handleGoBackFromNested();
        }
      }
    }
  };
  return {
    isOpen,
    selectedItem: selectedItem == null ? void 0 : selectedItem.id,
    selectedItemRef,
    menuProps: {
      ref: listRef,
      onKeyDown: handleMenuKeyDown
    },
    searchProps: {
      autoFocus: true,
      placeholder: getState().currentList.searchPlaceholder ?? "Type to search...",
      value: getState().currentList.searchValue ?? "",
      ref: searchRef,
      onChange: handleSearchChange
    },
    preparedList: getState().currentList.data
  };
};
export {
  useCmdMenu
};
