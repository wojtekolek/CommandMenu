# CommandMenu

This package offers a hook for creating a customized command menu.\n\nThe package returns an object that includes properties for every element in the menu, such as the menu itself, the search input, and a list of all the necessary properties for each menu item which enables you to easily build a command menu tailored to your specific needs.

Demo: [commandmenu.wojtekolek.com](https://commandmenu.wojtekolek.com/)

### Installation

```bash
# npm
npm i commandmenu

# yarn
yarn add commandmenu

# pnpm
pnpm add commandmenu
```

### Get started

In order to fully utilize the functionality of this package, you must pass a configuration array that includes all the items you wish to display in the menu. A basic example of this configuration array might look something like the following:

```typescript
// config.ts
import type { ConfigData } from "commandmenu";
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
]
```

Utilizing the props data returned by the hook is a straightforward process. Simply spread the `menuProps` and `searchProps`, then map through the list in order to render all the necessary menu items.

```typescript
// CommandMenu.tsx
return (
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
)
```

#### Grouping

If you wish to group items in your menu, it's easy to do so by wrapping them in a group object configuration. Once you've done this, you're ready to go!

```typescript
// config.ts
{
  id: 'favs',
  label: 'Favorites',
  groupItems: [
    {
      id: 'github',
      label: 'Github',
      icon: 'Github',
      description: 'Check our Github',
      onSelect: () => console.log('open Github')
    },
    {
      id: 'twitter',
      label: 'Twitter',
      icon: 'Twitter',
      description: 'Check our Twitter',
      onSelect: () => console.log('open Twitter')
    },
     {
      id: 'instagram',
      label: 'Instagram',
      icon: 'Instagram',
      description: 'Check our Instagram',
      onSelect: () => console.log('open Instagram')
    },
  ]
},
```

Once you've updated the command menu configuration, the final step is to simply render the group elements inside another list. This can be accomplished using code similar to the following:

```typescript
// CommandMenu.tsx
return (
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
)
```

#### Nested menus

If you'd like to include multiple options related to a specific item, you can utilize nested menus. You can even add nested menus to each level, as needed. Once you've updated the configuration accordingly, this feature should work seamlessly, allowing you to take your menu functionality to the next level!

```typescript
// config.ts
{
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
},
```