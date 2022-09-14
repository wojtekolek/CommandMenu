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
  return ((_a = config.at(0)) == null ? void 0 : _a.items) !== void 0;
};
var isListDataWithGroups = (config) => {
  var _a;
  return ((_a = config.at(0)) == null ? void 0 : _a.items) !== void 0;
};
var prepareListOption = (config, setSelectedItem) => config.map(({ id, label, onSelect }) => ({
  id,
  label,
  onPointerEnter: () => setSelectedItem(id),
  onClick: onSelect,
  isGroup: void 0,
  items: void 0
}));
var getListData = (config, setSelectedItem) => {
  if (isConfigWithGroups(config)) {
    return config.map(({ id, label, items }) => ({
      id,
      label,
      isGroup: true,
      items: prepareListOption(items, setSelectedItem)
    }));
  }
  return prepareListOption(config, setSelectedItem);
};
var getFlatListData = (listData) => {
  if (isConfigWithGroups(listData)) {
    return listData.flatMap(({ items }) => items);
  }
  return listData;
};
var getFirstOption = (config) => {
  var _a, _b, _c;
  if (isConfigWithGroups(config)) {
    return (_b = (_a = config.at(0)) == null ? void 0 : _a.items.at(0)) == null ? void 0 : _b.id;
  }
  return (_c = config.at(0)) == null ? void 0 : _c.id;
};

// src/useCmdMenu.ts
var useLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffectBase;
var TRIGGER_KEY = "k";
var DOWN_KEY = "ArrowDown";
var UP_KEY = "ArrowUp";
var ENTER_KEY = "Enter";
var useCmdMenu = ({ config }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(getFirstOption(config));
  const listRef = useRef(null);
  const searchRef = useRef(null);
  const selectedItemRef = useRef(null);
  const preparedListData = useRef(getListData(config, setSelectedItem));
  const flattedListData = useRef(getFlatListData(preparedListData.current));
  const [currentListData, setCurrentListData] = useState(preparedListData.current);
  const handleResetToDefaultState = useCallback(() => {
    var _a;
    const firstItem = (_a = preparedListData.current.at(0).items) == null ? void 0 : _a.at(0).id;
    selectedItem !== firstItem && setSelectedItem(firstItem);
    return setCurrentListData(preparedListData.current);
  }, [selectedItem]);
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
  const handleSearchChange = ({ target }) => {
    const getFiltered = (listData, searchValue) => {
      if (isListDataWithGroups(listData)) {
        const fillteredItems = listData.map(({ items, ...data }) => ({
          ...data,
          items: items == null ? void 0 : items.filter(
            ({ label }) => label.toLowerCase().includes(searchValue.toLowerCase())
          )
        }));
        return fillteredItems.filter(({ items }) => items == null ? void 0 : items.length);
      }
      return listData.filter(({ label }) => label.toLowerCase().includes(searchValue.toLowerCase()));
    };
    const getPreselectedOption = (listData) => {
      var _a, _b, _c;
      if (isListDataWithGroups(listData)) {
        return (_c = (_b = (_a = listData.at(0)) == null ? void 0 : _a.items) == null ? void 0 : _b.at(0)) == null ? void 0 : _c.id;
      }
      return listData.at(0).id;
    };
    const filteredData = getFiltered(preparedListData.current, target.value);
    const preselectedOption = getPreselectedOption(filteredData);
    setCurrentListData(filteredData);
    flattedListData.current = getFlatListData(filteredData);
    return setSelectedItem(preselectedOption);
  };
  const handleSelect = (optionRef) => {
    var _a;
    return (_a = optionRef.current) == null ? void 0 : _a.click();
  };
  const handleKeyPress = (direction) => {
    const flattedList = flattedListData.current;
    const selectedItemIndex = flattedList.findIndex((configData) => configData.id === selectedItem);
    const getNextItem = () => {
      var _a, _b;
      if (selectedItemIndex < flattedList.length - 1 && direction === "down") {
        return (_a = flattedList.at(selectedItemIndex + 1)) == null ? void 0 : _a.id;
      }
      if (selectedItemIndex > 0 && direction === "up") {
        return (_b = flattedList.at(selectedItemIndex - 1)) == null ? void 0 : _b.id;
      }
      return selectedItem;
    };
    return setSelectedItem(getNextItem());
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
    }
  };
  const handleClickInMenuList = (event) => {
    if (event.target.localName === "li") {
      return setIsOpen(false);
    }
  };
  return {
    isOpen,
    selectedItem,
    selectedItemRef,
    menuProps: {
      ref: listRef,
      onKeyDown: handleMenuKeyDown,
      onClick: handleClickInMenuList
    },
    searchProps: {
      autoFocus: true,
      placeholder: "Type to search...",
      ref: searchRef,
      onChange: handleSearchChange
    },
    preparedList: currentListData
  };
};
export {
  useCmdMenu
};
