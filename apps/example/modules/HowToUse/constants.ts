type HowToUseData = {
  message: string
  codeMarkdown: string
}

const BASIC: HowToUseData = {
  message:
    'The package provides you with a whole logic to build your own command menu.\n\nIt returns an object with props for each element like the menu itself, search input and list with all needed props for each menu element.',
  codeMarkdown: `const { selectedItem, selectedItemRef, menuProps, searchProps, list } = 
  useCommandMenu({ config })`
}

const CONFIG: HowToUseData = {
  message:
    'To provide full functionality, you need to pass a config array with all items you would like to display in the menu.\n The simplest version of it could look like this:',
  codeMarkdown: `const config: ConfigData<IconName> = [
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
]`
}

const USAGE: HowToUseData = {
  message:
    'The usage of the returned props data from the hook is straightforward. You need to spread the menuProps, searchProps and map through the list to render all necessary menu items.',
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
  )`
}

export const HOW_TO_USE_DATA = [BASIC, CONFIG, USAGE]
