import type { ConfigData } from "commandmenu";
import {
  ArrowLeft,
  ArrowRight,
  CloudDrizzle,
  Facebook,
  Figma,
  Framer,
  Github,
  Instagram,
  Moon,
  MoreVertical,
  Music,
  Pause,
  Play,
  Plus,
  Settings,
  Share,
  Sun,
  Twitter,
} from "lucide-react";

export const config: ConfigData = [
  {
    id: "favs",
    label: "Favorites",
    groupItems: [
      {
        id: "spotify",
        label: "Spotify",
        icon: <Music />,
        description: "Control Spotify",
        placeholder: "Search in spotify...",
        items: [
          {
            id: "spotifyAddPlaylist",
            label: "Add playlist",
            icon: <Plus />,
            onSelect: () => console.log("spotify play"),
          },
          {
            id: "spotifyPlay",
            label: "Play",
            icon: <Play />,
            onSelect: () => console.log("spotify play"),
          },
          {
            id: "spotifyPause",
            label: "Pause",
            icon: <Pause />,
            onSelect: () => console.log("spotify pasue"),
          },
          {
            id: "spotifyNext",
            label: "Next",
            icon: <ArrowRight />,
            onSelect: () => console.log("spotify next"),
          },
          {
            id: "spotifyPrevious",
            label: "Previous",
            icon: <ArrowLeft />,
            onSelect: () => console.log("spotify prev"),
          },
          {
            id: "spotifyMore",
            icon: <MoreVertical />,
            label: "More...",
            placeholder: "Search in spotify more...",
            items: [
              {
                id: "spotifyMoreActionOne",
                label: "Action one",
                onSelect: () => console.log("spotify more action one"),
              },
              {
                id: "spotifyMoreActionTwo",
                label: "Action two",
                onSelect: () => console.log("spotify more action two"),
              },
              {
                id: "spotifyMoreActionMore",
                label: "More...",
                placeholder: "Search in more actions...",
                items: [
                  {
                    id: "spotifyMoreActionMoreActionMore1",
                    label: "More 1",
                    onSelect: () => console.log("spotifyMoreActionMoreActionMore1 clicked"),
                  },
                  {
                    id: "spotifyMoreActionMoreActionMore2",
                    label: "More 2",
                    onSelect: () => console.log("spotifyMoreActionMoreActionMore2 clicked"),
                  },
                  {
                    id: "spotifyMoreActionMoreActionMore3",
                    label: "More 3",
                    onSelect: () => console.log("spotifyMoreActionMoreActionMore3 clicked"),
                  },
                  {
                    id: "spotifyMoreActionMoreActionMoreMore",
                    label: "More...",
                    placeholder: "Show me more options mate...",
                    items: [
                      {
                        id: "spotifyMoreActionMoreActionMoreMore1",
                        label: "More 1",
                        onSelect: () => console.log("spotifyMoreActionMoreActionMore1 clicked"),
                      },
                      {
                        id: "spotifyMoreActionMoreActionMoreMore2",
                        label: "More 2",
                        onSelect: () => console.log("spotifyMoreActionMoreActionMore2 clicked"),
                      },
                      {
                        id: "spotifyMoreActionMoreActionMoreMore3",
                        label: "More 3",
                        onSelect: () => console.log("spotifyMoreActionMoreActionMore3 clicked"),
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "instagram",
        label: "Instagram",
        icon: <Instagram />,
        description: "Check our instagram",
        onSelect: () => console.log("instagram clickeded"),
      },
      {
        id: "twitter",
        label: "Twitter",
        icon: <Twitter />,
        description: "Check our twitter",
        onSelect: () => console.log("twitter clickeded"),
      },
    ],
  },
  {
    id: "common",
    label: "Common",
    groupItems: [
      {
        id: "weather",
        label: "Weather",
        icon: <CloudDrizzle />,
        description: "Check today's weather",
        onSelect: () => console.log("weather clicked"),
      },
      {
        id: "share",
        label: "Share",
        icon: <Share />,
        description: "Share smth",
        placeholder: "Where you would like to share?",
        items: [
          {
            id: "shareTwitter",
            icon: <Twitter />,
            label: "Twitter",
            onSelect: () => console.log("shareTwitter clicked"),
          },
          {
            id: "shareFacebook",
            icon: <Facebook />,
            label: "Facebook",
            onSelect: () => console.log("shareFacebook clicked"),
          },
          {
            id: "shareInstagram",
            icon: <Instagram />,
            label: "Instagram",
            onSelect: () => console.log("shareInstagram clicked"),
          },
        ],
      },
      {
        id: "github",
        label: "Github",
        icon: <Github />,
        description: "Check github",
        onSelect: () => console.log("github clickeded"),
      },
      {
        id: "framer",
        label: "Framer",
        icon: <Framer />,
        description: "Open Framer",
        onSelect: () => console.log("framer clickeded"),
      },
      {
        id: "figma",
        label: "Figma",
        icon: <Figma />,
        description: "Open Figma",
        onSelect: () => console.log("figma clickeded"),
      },
      {
        id: "lightMode",
        label: "Light mode",
        icon: <Sun />,
        description: "Switch to light mode",
        onSelect: () => console.log("lightMode clickeded"),
      },
      {
        id: "darkMode",
        label: "Dark mode",
        icon: <Moon />,
        description: "Switch to dark mode",
        onSelect: () => console.log("darkMode clickeded"),
      },
      {
        id: "configuration",
        label: "Configuration",
        icon: <Settings />,
        description: "Change smth",
        onSelect: () => console.log("configuration clickeded"),
      },
    ],
  },
];
