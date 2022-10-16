type HowToUseData = {
  message: string
  codeMarkdown: string
}

const BASIC: HowToUseData = {
  message:
    'Curabitur pellentesque nibh nibh, at maximus ante fermentum sit amet. Pellentesque commodo lacus at sodales sodales. Quisque sagittis orci ut diam condimentum, vel euismod erat placerat. In iaculis arcu eros, eget tempus orci facilisis id.',
  codeMarkdown: `const { selectedItem, selectedItemRef, wrapperProps, searchProps, preparedList } = useCommandMenu({ config })`
}

const CONFIG: HowToUseData = {
  message:
    'Curabitur pellentesque nibh nibh, at maximus ante fermentum sit amet. Pellentesque commodo lacus at sodales sodales. Quisque sagittis orci ut diam condimentum, vel euismod erat placerat. In iaculis arcu eros, eget tempus orci facilisis id.',
  codeMarkdown: `const config: ConfigData<IconName> = [
  {
    id: 'github',
    label: 'Github',
    icon: 'Github',
    description: 'Check github',
    onSelect: () => console.log('clicked test2')
  },
  {
    id: 'framer',
    label: 'Framer',
    icon: 'Framer',
    description: 'Open Framer',
    onSelect: () => console.log('clicked test3')
  },
  {
    id: 'figma',
    label: 'Figma',
    icon: 'Figma',
    description: 'Open Figma',
    onSelect: () => console.log('clicked test4')
  },
]`
}

const USAGE: HowToUseData = {
  message:
    'Curabitur pellentesque nibh nibh, at maximus ante fermentum sit amet. Pellentesque commodo lacus at sodales sodales. Quisque sagittis orci ut diam condimentum, vel euismod erat placerat. In iaculis arcu eros, eget tempus orci facilisis id.',
  codeMarkdown: `return (
  <CommandMenu {...wrapperProps}>
    <SearchInput {...searchProps} type="text" />
    <CommandMenuList>
      {preparedList.map(({ id, label, icon, description }) => {
        const isSelected = id === selectedItem
        return (
          <CommandMenuListItemWrapper
            key={id}
            ref={isSelected ? selectedItemRef : null}
            isSelected={isSelected}
          >
            {icon && <CommandMenuListItemIcon name={icon as any} />}
            <CommandMenuListItemLabel>{label}</CommandMenuListItemLabel>
            {description && (
              <CommandMenuListItemDescription>{description}</CommandMenuListItemDescription>
            )}
          </CommandMenuListItemWrapper>
        )
      })}
    </CommandMenuList>
  </CommandMenu>
  )`
}

export const HOW_TO_USE_DATA = [BASIC, CONFIG, USAGE]
