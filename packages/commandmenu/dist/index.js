"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  useCommandMenu: () => useCommandMenu
});
module.exports = __toCommonJS(src_exports);

// src/useCommandPalette.ts
var import_react = require("react");

// src/utils.ts
var isConfigWithGroups = (config) => {
  var _a;
  return ((_a = config.at(0)) == null ? void 0 : _a.groupItems) !== void 0;
};
var isListDataWithGroups = (config) => {
  var _a;
  return ((_a = config.at(0)) == null ? void 0 : _a.groupItems) !== void 0;
};
var prepareListOption = (config, setSelectedItem, goToNested) => config.map(({ id, label, icon, description, onSelect, items, placeholder }) => {
  const isConfigWithNestedData = !!(items == null ? void 0 : items.length);
  return {
    id,
    label,
    icon,
    description,
    onPointerMove: () => setSelectedItem({
      id,
      isConfigWithNestedData
    }),
    onClick: isConfigWithNestedData ? () => goToNested(id) : onSelect,
    isGroup: void 0,
    placeholder,
    items: (items == null ? void 0 : items.length) ? prepareListOption(items, setSelectedItem, goToNested) : void 0
  };
});
var getListData = (config, setSelectedItem, goToNested) => {
  if (isConfigWithGroups(config)) {
    return config.map(({ id, label, groupItems }) => ({
      id,
      label,
      isGroup: true,
      groupItems: prepareListOption(groupItems, setSelectedItem, goToNested)
    }));
  }
  return prepareListOption(config, setSelectedItem, goToNested);
};
var getFirstOption = (config) => {
  var _a;
  const INITIAL_INDEX = 0;
  if (isConfigWithGroups(config)) {
    const item2 = (_a = config.at(INITIAL_INDEX)) == null ? void 0 : _a.groupItems.at(INITIAL_INDEX);
    return {
      id: item2.id,
      isConfigWithNestedData: true
    };
  }
  const item = config.at(INITIAL_INDEX);
  return {
    id: item.id,
    isConfigWithNestedData: false
  };
};
var getItemsOrder = (preparedConfig) => {
  if (isListDataWithGroups(preparedConfig)) {
    return preparedConfig.flatMap(
      ({ groupItems }) => groupItems.flatMap(({ id, items }) => ({
        id,
        isConfigWithNestedData: !!items
      }))
    );
  }
  return preparedConfig.flatMap(({ id, items }) => ({
    id,
    isConfigWithNestedData: !!(items == null ? void 0 : items.length)
  }));
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

// src/useCommandPalette.ts
var useLayoutEffect = typeof window === "undefined" ? import_react.useEffect : import_react.useLayoutEffect;
var DOWN_KEY = "ArrowDown";
var UP_KEY = "ArrowUp";
var ENTER_KEY = "Enter";
var BACK_KEY = "Backspace";
var getCurrentList = (preparedConfig) => ({
  preparedConfig,
  data: preparedConfig,
  itemsOrder: getItemsOrder(preparedConfig),
  configLevelKey: []
});
var getInitialData = (config, setSelectedItem, goToNested) => {
  const preparedConfig = getListData(config, setSelectedItem, goToNested);
  return {
    preparedConfig,
    currentList: getCurrentList(preparedConfig)
  };
};
var useCommandMenu = ({ config }) => {
  const [selectedItem, setSelectedItem] = (0, import_react.useState)(
    getFirstOption(config)
  );
  const goToNested = (passedItemId) => handleGoToNestedItems(passedItemId);
  const state = (0, import_react.useRef)(getInitialData(config, setSelectedItem, goToNested));
  const getState = () => state.current;
  const setCurrentListState = (newCurrentListData) => state.current.currentList = { ...state.current.currentList, ...newCurrentListData };
  const listRef = (0, import_react.useRef)(null);
  const searchRef = (0, import_react.useRef)(null);
  const selectedItemRef = (0, import_react.useRef)(null);
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
  const handleGoToNestedItems = (passedItemId) => {
    const baseState = getState();
    const { preparedConfig, configLevelKey } = baseState.currentList;
    const getArrayKey = (config2, levelKey) => {
      const indexes = findIndexes(config2, passedItemId);
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
    return (_a = optionRef.current) == null ? void 0 : _a.click();
  };
  const handleKeyPress = (direction) => {
    const { itemsOrder } = getState().currentList;
    const selectedItemIndex = itemsOrder.findIndex(({ id }) => id === (selectedItem == null ? void 0 : selectedItem.id));
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
  const handleListKeyDown = (event) => {
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
    selectedItem: selectedItem == null ? void 0 : selectedItem.id,
    selectedItemRef,
    wrapperProps: {
      ref: listRef,
      onKeyDown: handleListKeyDown
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  useCommandMenu
});
