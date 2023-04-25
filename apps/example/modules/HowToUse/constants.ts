import type { HowToUseData } from "./types";

const BASIC: HowToUseData = {
  message:
    "This package offers a hook for creating a customized command menu.\n\nIt returns an object that includes properties for every element in the menu, such as the menu itself, the search input, and a list of all the necessary properties for each menu item which enables you to easily build a command menu tailored to your specific needs.",
  codeMarkdown: `import { useCommandMenu } from "commandmenu";
import { config } from "./config";
  
const { selectedItem, selectedItemRef, menuProps, searchProps, list } = 
  useCommandMenu({ config })`,
};

const CONFIG: HowToUseData = {
  message:
    "In order to fully utilize the functionality of this package, you must pass a configuration array that includes all the items you wish to display in the menu. A basic example of this configuration array might look something like the following:",
  codeMarkdown: `import type { ConfigData } from "commandmenu";
import type { IconName } from "components/Icon";

const config: ConfigData<IconName> = [
  {
    id: 'github',
    label: 'Github',
    icon: 'Github',
    description: 'Check github',
    onSelect: () => console.log('github selected')
  },
  {
    id: 'spotifyPlay',
    label: 'Spotify play',
    icon: 'Play',
    description: 'Play songs on Spotify',
    onSelect: () => console.log('spotify play selected')
  },
  {
    id: 'spotifyNext',
    label: 'Spotify next',
    icon: 'Next',
    description: 'Next song on Spotify',
    onSelect: () => console.log('spotify next selected')
  },
]`,
};

const USAGE: HowToUseData = {
  message:
    "Utilizing the props data returned by the hook is a straightforward process. Simply spread the `menuProps` and `searchProps`, then map through the list in order to render all the necessary menu items.",
  codeMarkdown: `return (
  <CommandMenu {...menuProps}>
    <SearchInput {...searchProps} />
    <CommandMenuList>
      {list.map(({ id, label, icon, description }) => {
        const isSelected = id === selectedItem
        return (
          <CommandMenuListItemWrapper
            key={id}
            ref={isSelected ? selectedItemRef : null}
            isSelected={isSelected}
          >
            {icon && <CommandMenuListItemIcon name={icon} />}
            <CommandMenuListItemLabel>{label}</CommandMenuListItemLabel>
            {description && (
              <CommandMenuListItemDescription>
                {description}
              </CommandMenuListItemDescription>
            )}
          </CommandMenuListItemWrapper>
        )
      })}
    </CommandMenuList>
  </CommandMenu>
)`,
};

export const HOW_TO_USE_DATA = [BASIC, CONFIG, USAGE];

const GROUPS: HowToUseData = {
  title: "Groups",
  message:
    "If you wish to group items in your menu, it's easy to do so by wrapping them in a group object configuration. Once you've done this, you're ready to go!",
  codeMarkdown: `{
  id: 'favs',
  label: 'Favorites',
  groupItems: [
    {
      id: 'github',
      label: 'Github',
      icon: 'Github',
      description: 'Check github',
      onSelect: () => console.log('open github')
    },
    {
      id: 'spotifyPlay',
      label: 'Spotify play',
      icon: 'Play',
      description: 'Play songs on Spotify',
      onSelect: () => console.log('spotify play')
    },
    {
      id: 'spotifyNext',
      label: 'Spotify next',
      icon: 'Next',
      description: 'Next song on Spotify',
      onSelect: () => console.log('spotify next')
    },
  ]
},`,
};

const GROUPS_RETURN: HowToUseData = {
  message:
    "Once you've updated the command menu configuration, the final step is to simply render the group elements inside another list. This can be accomplished using code similar to the following:",
  codeMarkdown: `return (
    <CommandMenu {...menuProps}>
      <SearchInput {...searchProps} />
      <CommandMenuList>
        {list.map((item) => {
          if (isGroupItem(item)) {
            return (
              <CommandMenuListGroupItem key={item.id} id="group">
                <CommandMenuListGroupItemLabel>
                  {item.label}
                </CommandMenuListGroupItemLabel>
                <CommandMenuGroupList>
                  {item.groupItems.map((groupItem) => (
                    <CommandMenuListItem
                      key={groupItem.id}
                      selectedItem={selectedItem}
                      selectedItemRef={selectedItemRef}
                      {...groupItem}
                    />
                  ))}
                </CommandMenuGroupList>
              </CommandMenuListGroupItem>
            )
          }
          return (
            <CommandMenuListItem
              key={item.id}
              selectedItem={selectedItem}
              selectedItemRef={selectedItemRef}
              {...item}
            />
          )
        })}
      </CommandMenuList>
    </CommandMenu>
  )`,
};

const NESTED: HowToUseData = {
  title: "Nested menus",
  message:
    "If you'd like to include multiple options related to a specific item, you can utilize nested menus. You can even add nested menus to each level, as needed. Once you've updated the configuration accordingly, this feature should work seamlessly, allowing you to take your menu functionality to the next level!",
  codeMarkdown: `{
  id: 'spotify',
  label: 'Spotify',
  icon: 'Music',
  description: 'Control Spotify',
  items: [
    {
      id: 'spotifyPlay',
      label: 'Play',
      icon: 'Play',
      onSelect: () => console.log('spotify play selected')
    },
    {
      id: 'spotifyPause',
      label: 'Pause',
      icon: 'Pause',
      onSelect: () => console.log('spotify pasue selected')
    },
    {
      id: 'spotifyNext',
      label: 'Next',
      icon: 'ArrowRight',
      onSelect: () => console.log('spotify next selected')
    },
    {
      id: 'spotifyPrevious',
      label: 'Previous',
      icon: 'ArrowLeft',
      onSelect: () => console.log('spotify prev selected')
    },
  ]
}`,
};

export const ADVANCED_USE_DATA = [GROUPS, GROUPS_RETURN, NESTED];
