import { Users, Settings, SquarePen, LucideIcon, Images } from "lucide-react";

type Submenu = {
  href: string;
  label: string;
  active: boolean;
};

type Menu = {
  href: string;
  label: string;
  active: boolean;
  icon: LucideIcon;
  submenus: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "cms",
          label: "CMS",
          active: pathname.includes("/cms"),
          icon: SquarePen,
          submenus: [
            {
              href: "/cms/segments",
              label: "Segments",
              active: pathname === "cms/segments",
            },
            {
              href: "/cms/components",
              label: "Components",
              active: pathname === "cms/components",
            },
            {
              href: "/cms/contents",
              label: "Contents",
              active: pathname === "cms/contents",
            },
          ],
        },
        {
          href: "/media-manager",
          label: "Media Manager",
          active: pathname.includes("/media-manager"),
          icon: Images,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "Settings",
      menus: [
        {
          href: "/users",
          label: "Users",
          active: pathname.includes("/users"),
          icon: Users,
          submenus: [],
        },
        {
          href: "/account",
          label: "Account",
          active: pathname.includes("/account"),
          icon: Settings,
          submenus: [],
        },
      ],
    },
  ];
}
