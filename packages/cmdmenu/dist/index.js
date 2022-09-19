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

// index.ts
var cmdmenu_exports = {};
__export(cmdmenu_exports, {
  useCmdMenu: () => useCmdMenu
});
module.exports = __toCommonJS(cmdmenu_exports);

// src/useCmdMenu.ts
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
var prepareListOption = (config, setSelectedItem) => config.map(({ id, label, onSelect, items, placeholder }) => ({
  id,
  label,
  onPointerEnter: () => setSelectedItem({
    id,
    isConfigWithNestedData: !!(items == null ? void 0 : items.length)
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
  if (isConfigWithGroups(config)) {
    const item2 = (_a = config.at(0)) == null ? void 0 : _a.groupItems.at(0);
    return {
      id: item2.id,
      isConfigWithNestedData: true
    };
  }
  const item = config.at(0);
  return {
    id: item.id,
    isConfigWithNestedData: false
  };
};

// src/useCmdMenu.ts
var useLayoutEffect = typeof window === "undefined" ? import_react.useEffect : import_react.useLayoutEffect;
var TRIGGER_KEY = "k";
var DOWN_KEY = "ArrowDown";
var UP_KEY = "ArrowUp";
var ENTER_KEY = "Enter";
var BACK_KEY = "Backspace";
var getItemsOrder = (preparedConfig) => preparedConfig.flatMap(({ id, isGroup, groupItems, items }) => {
  if (isGroup && groupItems.length) {
    return groupItems.flatMap(({ id: id2, items: items2 }) => ({
      id: id2,
      isConfigWithNestedData: !!items2
    }));
  }
  return {
    id,
    isConfigWithNestedData: !!items
  };
});
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
var useCmdMenu = ({ config }) => {
  const [isOpen, setIsOpen] = (0, import_react.useState)(false);
  const [selectedItem, setSelectedItem] = (0, import_react.useState)(
    getFirstOption(config)
  );
  const state = (0, import_react.useRef)(getInitialData(config, setSelectedItem));
  const getState = () => state.current;
  const setCurrentListState = (newCurrentListData) => state.current.currentList = { ...state.current.currentList, ...newCurrentListData };
  const listRef = (0, import_react.useRef)(null);
  const searchRef = (0, import_react.useRef)(null);
  const selectedItemRef = (0, import_react.useRef)(null);
  const handleResetToDefaultState = (0, import_react.useCallback)(() => {
    state.current = getInitialData(config, setSelectedItem);
  }, [config]);
  (0, import_react.useEffect)(() => {
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
    const searchValue = event.target.value;
    const data = getState().currentList.preparedConfig;
    console.log(data);
    const newData = getFilteredList(Array.isArray(data) ? data : data.items, searchValue);
    state.current.currentList.data = newData.data;
    state.current.currentList.itemsOrder = newData.itemsOrder;
    state.current.currentList.searchValue = searchValue;
    setCurrentListState({
      data: newData.data,
      itemsOrder: newData.itemsOrder,
      searchValue
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
    const { itemsOrder, preparedConfig, configLevelKey } = baseState.currentList;
    const getArrayKey = (levelKey) => {
      const findIndex = (data2, selectedItemId) => data2.findIndex(({ id, isGroup, groupItems }) => {
        if (isGroup && groupItems.length) {
          return groupItems.some(({ id: id2 }) => id2 === selectedItemId);
        }
        return id === selectedItemId;
      });
      if (!(levelKey == null ? void 0 : levelKey.length) || levelKey && levelKey.length <= 1) {
        const groupId = findIndex(preparedConfig, selectedItem.id);
        const selectedItemIndex2 = itemsOrder.findIndex(({ id }) => id === (selectedItem == null ? void 0 : selectedItem.id));
        return ["preparedConfig", groupId, "groupItems", selectedItemIndex2];
      }
      const selectedItemIndex = itemsOrder.findIndex(({ id }) => id === (selectedItem == null ? void 0 : selectedItem.id));
      return [...levelKey, "items", selectedItemIndex];
    };
    const arrayKey = getArrayKey(configLevelKey);
    const data = getPropByPath(baseState, [...arrayKey], {});
    const newItemsOrder = getItemsOrder(data.items);
    setCurrentListState({
      data: data.items,
      itemsOrder: newItemsOrder,
      preparedConfig: data,
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
    const selectedItemIndex = itemsOrder.findIndex(({ id }) => id === (selectedItem == null ? void 0 : selectedItem.id));
    let newSelectedItem = selectedItem;
    if (selectedItemIndex < itemsOrder.length - 1 && direction === "down") {
      newSelectedItem = itemsOrder.at(selectedItemIndex + 1);
    } else if (selectedItemIndex > 0 && direction === "up") {
      newSelectedItem = itemsOrder.at(selectedItemIndex - 1);
    }
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  useCmdMenu
});
