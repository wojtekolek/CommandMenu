import type { ConfigData } from '@wojtekolek/cmdpalette'
import type { IconName } from 'components/Icon'

export const config: ConfigData<IconName> = [
  {
    id: 'favs',
    label: 'Favorites',
    groupItems: [
      {
        id: 'spotify',
        label: 'Spotify',
        icon: 'Music',
        description: 'Control spotify',
        placeholder: 'Search in spotify...',
        items: [
          {
            id: 'spotifyPlay',
            label: 'Play',
            icon: 'Play',
            onSelect: () => console.log('spotify play')
          },
          {
            id: 'spotifyPause',
            label: 'Pause',
            icon: 'Pause',
            onSelect: () => console.log('spotify pasue')
          },
          {
            id: 'spotifyNext',
            label: 'Next',
            icon: 'ArrowRight',
            onSelect: () => console.log('spotify next')
          },
          {
            id: 'spotifyPrevious',
            label: 'Previous',
            icon: 'ArrowLeft',
            onSelect: () => console.log('spotify prev')
          },
          {
            id: 'spotifyMore',
            icon: 'MoreVertical',
            label: 'More...',
            placeholder: 'Search in spotify more...',
            items: [
              {
                id: 'spotifyMoreActionOne',
                label: 'Action one',
                onSelect: () => console.log('spotify more action one')
              },
              {
                id: 'spotifyMoreActionTwo',
                label: 'Action two',
                onSelect: () => console.log('spotify more action two')
              },
              {
                id: 'spotifyMoreActionMore',
                label: 'More...',
                placeholder: 'Search in more actions...',
                items: [
                  {
                    id: 'spotifyMoreActionMoreActionMore1',
                    label: 'More 1',
                    onSelect: () => console.log('spotifyMoreActionMoreActionMore1 click')
                  },
                  {
                    id: 'spotifyMoreActionMoreActionMore2',
                    label: 'More 2',
                    onSelect: () => console.log('spotifyMoreActionMoreActionMore2 click')
                  },
                  {
                    id: 'spotifyMoreActionMoreActionMore3',
                    label: 'More 3',
                    onSelect: () => console.log('spotifyMoreActionMoreActionMore3 click')
                  },
                  {
                    id: 'spotifyMoreActionMoreActionMoreMore',
                    label: 'More...',
                    placeholder: 'Show me more options mate...',
                    items: [
                      {
                        id: 'spotifyMoreActionMoreActionMoreMore1',
                        label: 'More 1',
                        onSelect: () => console.log('spotifyMoreActionMoreActionMore1 click')
                      },
                      {
                        id: 'spotifyMoreActionMoreActionMoreMore2',
                        label: 'More 2',
                        onSelect: () => console.log('spotifyMoreActionMoreActionMore2 click')
                      },
                      {
                        id: 'spotifyMoreActionMoreActionMoreMore3',
                        label: 'More 3',
                        onSelect: () => console.log('spotifyMoreActionMoreActionMore3 click')
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 'instagram',
        label: 'Instagram',
        icon: 'Instagram',
        description: 'Check instagram',
        onSelect: () => console.log('clicked instagram')
      },
      {
        id: 'twitter',
        label: 'Twitter',
        icon: 'Twitter',
        description: 'Check twitter',
        onSelect: () => console.log('clicked twitter')
      }
    ]
  },
  {
    id: 'common',
    label: 'Common',
    groupItems: [
      {
        id: 'weather',
        label: 'Weather',
        icon: 'CloudLightning',
        description: 'Check todays weather',
        onSelect: () => console.log('clicked test1')
      },
      {
        id: 'share',
        label: 'Share',
        icon: 'Share',
        description: 'Share smth',
        placeholder: 'Show me more options mate...',
        items: [
          {
            id: 'shareMore1',
            label: 'More 1',
            onSelect: () => console.log('spotifyMoreActionMoreActionMore1 click')
          },
          {
            id: 'shareMore2',
            label: 'More 2',
            onSelect: () => console.log('spotifyMoreActionMoreActionMore2 click')
          },
          {
            id: 'shareMore3',
            label: 'More 3',
            onSelect: () => console.log('spotifyMoreActionMoreActionMore3 click')
          }
        ]
      },
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
      {
        id: 'lightMode',
        label: 'Light mode',
        icon: 'Sun',
        description: 'Switch to light mode',
        onSelect: () => console.log('clicked test7')
      },
      {
        id: 'darkMode',
        label: 'Dark mode',
        icon: 'Moon',
        description: 'Switch to dark mode',
        onSelect: () => console.log('clicked test8')
      },
      {
        id: 'configuration',
        label: 'Configuration',
        icon: 'Settings',
        description: 'Change smth',
        onSelect: () => console.log('clicked test9')
      }
    ]
  }
]
