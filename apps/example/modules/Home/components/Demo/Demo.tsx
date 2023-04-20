import type { FunctionComponent, RefObject } from "react";

import { useCommandMenu } from "commandmenu";
import type { ListItemData } from "commandmenu";
import { AnimationProps, motion } from "framer-motion";

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
      className={`text-primary-600 dark:text-primary-200 flex w-full cursor-default items-center rounded p-2 ${
        isSelected ? "bg-secondary-400/20 dark:bg-secondary-600/70 dark:text-primary-50" : ""
      }`}
    >
      {icon && <div className="mr-2">{icon}</div>}
      <div className="text-base">{label}</div>
      {description && <div className="dark:text-primary-300 ml-2 text-xs">{description}</div>}
    </li>
  );
};

export const Demo: FunctionComponent = () => {
  const { selectedItem, selectedItemRef, menuProps, searchProps, list } = useCommandMenu({
    config,
  });

  return (
    <motion.div className="flex justify-center" {...COMMAND_MENU_ANIMATION_PROPS}>
      <div
        className="bg-primary-100 dark:bg-primary-900 dark:border-primary-700 border-1 border-primary-300 tablet:w-[640px] relative flex h-[480px] min-h-[240px] w-full flex-col rounded-lg shadow"
        {...menuProps}
      >
        <input
          {...searchProps}
          type="text"
          className="border-b-1 border-primary-600 placeholder:text-primary-600 dark:placeholder:text-primary-300 w-full text-ellipsis bg-transparent px-3 py-2 outline-none"
        />
        <ul className="m-0 flex-1 list-none overflow-y-auto p-2">
          {list.map(({ isGroup, ...groupItemProps }) => {
            if (isGroup && groupItemProps.groupItems) {
              return (
                <li key={groupItemProps.id} id="group" className="w-full">
                  <div className="border-b-1 border-primary-400 mb-2 p-1 text-xs font-semibold">
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
      </div>
    </motion.div>
  );
};
