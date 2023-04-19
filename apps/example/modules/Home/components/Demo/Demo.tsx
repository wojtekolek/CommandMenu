import type { FunctionComponent, RefObject } from "react";

import { useCommandMenu } from "commandmenu";
import type { ListItemData } from "commandmenu";
import { motion } from "framer-motion";
import styled from "styled-components";

import { Icon } from "components/Icon";
import { from } from "utils/styles/responsiveness";

import { config } from "./config";

const CommandMenuWrapper = styled(motion.div).attrs({
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
})`
  display: flex;
  justify-content: center;
`;

const CommandMenu = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 240px;
  height: 480px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.background.tertiary};
  border: 1px solid ${({ theme }) => theme.colors.misc.border};
  border-radius: ${({ theme }) => theme.radius.rad2};

  ${from("tablet")} {
    width: 640px;
  }
`;

const SearchInput = styled.input.attrs({
  type: "text",
})`
  width: 100%;
  background-color: transparent;
  padding: ${({ theme }) => `${theme.spacing.ss0} ${theme.spacing.ss2}`};
  line-height: 40px;
  color: ${({ theme }) => theme.colors.text.primary};
  border-color: transparent;
  border-bottom: 1px solid ${({ theme }) => theme.colors.primary.default};
  outline: none;
  font-size: ${({ theme }) => theme.fontSize.fs2};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.quaternary};
  }
`;

const CommandMenuList = styled.ul`
  flex: 1;
  overflow-y: scroll;
  list-style: none;
  padding: ${({ theme }) => theme.spacing.ss1};
  margin: ${({ theme }) => theme.spacing.ss0};
`;

const CommandMenuListGroupItem = styled.li`
  width: 100%;
`;

const CommandMenuListGroupItemLabel = styled.span`
  display: block;
  padding: ${({ theme }) => `${theme.spacing.ss1} ${theme.spacing.ss1}`};
  border-bottom: 1px solid ${({ theme }) => theme.colors.misc.border};
  font-size: ${({ theme }) => theme.fontSize.fs1};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
`;

const CommandMenuGroupList = styled(CommandMenuList)`
  padding: ${({ theme }) => theme.spacing.ss0};
`;

type CommandMenuListItemButtonStyleProps = {
  isSelected: boolean;
};

const CommandMenuListItemWrapper = styled.li<CommandMenuListItemButtonStyleProps>`
  display: flex;
  align-items: center;
  padding: ${({ theme }) => `${theme.spacing.ss0} ${theme.spacing.ss1}`};
  border-radius: ${({ theme }) => theme.radius.rad1};
  line-height: 40px;
  width: 100%;

  ${({ isSelected, theme }) =>
    isSelected &&
    `
    background-color: ${theme.colors.background.quaternary};
  `}
`;

const CommandMenuListItemIcon = styled(Icon).attrs({
  size: 16,
})`
  color: ${({ theme }) => theme.colors.primary.default};
  margin-right: ${({ theme }) => theme.spacing.ss1};
`;

const CommandMenuListItemLabel = styled.label`
  font-size: ${({ theme }) => theme.fontSize.fs2};
`;

const CommandMenuListItemDescription = styled.span`
  margin-left: ${({ theme }) => theme.spacing.ss1};
  font-size: ${({ theme }) => theme.fontSize.fs1};
`;

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
    <CommandMenuListItemWrapper
      {...itemProps}
      ref={isSelected ? selectedItemRef : null}
      isSelected={isSelected}
    >
      {icon && <CommandMenuListItemIcon name={icon as any} />}
      <CommandMenuListItemLabel>{label}</CommandMenuListItemLabel>
      {description && (
        <CommandMenuListItemDescription>{description}</CommandMenuListItemDescription>
      )}
    </CommandMenuListItemWrapper>
  );
};

export const Demo: FunctionComponent = () => {
  const { selectedItem, selectedItemRef, menuProps, searchProps, list } = useCommandMenu({
    config,
  });

  return (
    <CommandMenuWrapper>
      <CommandMenu {...menuProps}>
        <SearchInput {...searchProps} type="text" />
        <CommandMenuList>
          {list.map(({ isGroup, ...groupItemProps }) => {
            if (isGroup && groupItemProps.groupItems) {
              return (
                <CommandMenuListGroupItem key={groupItemProps.id} id="group">
                  <CommandMenuListGroupItemLabel>
                    {groupItemProps.label}
                  </CommandMenuListGroupItemLabel>
                  <CommandMenuGroupList>
                    {groupItemProps.groupItems.map((itemData) => (
                      <CommandMenuListItem
                        key={itemData.id}
                        selectedItem={selectedItem}
                        selectedItemRef={selectedItemRef}
                        {...itemData}
                      />
                    ))}
                  </CommandMenuGroupList>
                </CommandMenuListGroupItem>
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
        </CommandMenuList>
      </CommandMenu>
    </CommandMenuWrapper>
  );
};
