import type { FunctionComponent, RefObject } from "react";

import { isGroupItem, type ListItemData, useCommandMenu } from "commandmenu";
import { AnimationProps, motion } from "framer-motion";
import { SearchIcon } from "lucide-react";

import { cn } from "utils/styles/utils";

import { config } from "./config";

const COMMAND_MENU_ANIMATION_PROPS: AnimationProps = {
  initial: {
    y: -50,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      delay: 0.7,
    },
  },
};

type CommandMenuListItemProps = {
  selectedItem?: string;
  selectedItemRef: RefObject<HTMLLIElement> | null;
} & Omit<ListItemData, "isGroup" | "items" | "groupItems">;

const CommandMenuListItem: FunctionComponent<CommandMenuListItemProps> = ({
  id,
  label,
  icon,
  description,
  selectedItemRef,
  selectedItem,
  onPointerMove,
  onClick,
}) => {
  const isSelected = id === selectedItem;

  return (
    <li
      ref={isSelected ? selectedItemRef : null}
      className={cn(
        "text-primary-200 flex w-full cursor-default items-center rounded p-2",
        isSelected ? "bg-secondary-600/70 text-primary-50" : "",
      )}
      onPointerMove={onPointerMove}
      onClick={onClick}
    >
      {icon && <div className="mr-3">{icon}</div>}
      <div className="text-base">{label}</div>
      {description && (
        <div className={cn("text-primary-300  ml-2 text-xs", isSelected ? "text-primary-100" : "")}>
          {description}
        </div>
      )}
    </li>
  );
};

export const Demo: FunctionComponent = () => {
  const { selectedItem, selectedItemRef, menuProps, searchProps, list } = useCommandMenu({
    config,
  });

  return (
    <motion.div className="relative flex justify-center" {...COMMAND_MENU_ANIMATION_PROPS}>
      <div
        className="tablet:w-[640px] border-gradient relative flex h-[480px] min-h-[240px] w-full flex-col overflow-hidden rounded-lg shadow"
        {...menuProps}
      >
        <input
          {...searchProps}
          className="border-b-1 border-primary-600 placeholder:text-primary-300 w-full text-ellipsis bg-transparent p-3 outline-none"
        />
        {list.length ? (
          <ul className="m-0 flex-1 list-none overflow-y-auto p-2">
            {list.map((item) => {
              if (isGroupItem(item)) {
                return (
                  <li key={item.id} id="group" className="w-full">
                    <div className="border-b-1 border-primary-400 mb-2 p-1 pt-3 text-xs font-semibold">
                      {item.label}
                    </div>
                    <ul className="m-0 list-none p-0">
                      {item.groupItems.map((itemData) => (
                        <CommandMenuListItem
                          key={itemData.id}
                          selectedItem={selectedItem}
                          selectedItemRef={selectedItemRef}
                          {...itemData}
                        />
                      ))}
                    </ul>
                  </li>
                );
              }
              return (
                <CommandMenuListItem
                  key={item.id}
                  selectedItem={selectedItem}
                  selectedItemRef={selectedItemRef}
                  {...item}
                />
              );
            })}
          </ul>
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center">
            <SearchIcon className="mb-2" />
            <span className="text-primary-300">No results</span>
          </div>
        )}
        <div className="from-primary-900/70 absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t" />
      </div>
    </motion.div>
  );
};
