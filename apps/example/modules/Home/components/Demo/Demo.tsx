import type { FunctionComponent, RefObject } from "react";

import { useCommandMenu } from "commandmenu";
import type { ListItemData } from "commandmenu";
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
} & ListItemData;

const CommandMenuListItem: FunctionComponent<CommandMenuListItemProps> = ({
  id,
  label,
  icon,
  description,
  selectedItemRef,
  selectedItem,
  ...itemProps
}) => {
  const isSelected = id === selectedItem;

  return (
    <li
      {...itemProps}
      ref={isSelected ? selectedItemRef : null}
      className={cn(
        "text-primary-200 flex w-full cursor-default items-center rounded p-2",
        isSelected ? "bg-secondary-600/70 text-primary-50" : "",
      )}
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
            {list.map(({ isGroup, ...groupItemProps }) => {
              if (isGroup && groupItemProps.groupItems) {
                return (
                  <li key={groupItemProps.id} id="group" className="w-full">
                    <div className="border-b-1 border-primary-400 my-2 p-1 text-xs font-semibold">
                      {groupItemProps.label}
                    </div>
                    <ul className="m-0 list-none p-0">
                      {groupItemProps.groupItems.map((itemData) => (
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
                  key={groupItemProps.id}
                  selectedItem={selectedItem}
                  selectedItemRef={selectedItemRef}
                  {...(groupItemProps as ListItemData)}
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
