import { Users, Settings, SquarePen, LucideIcon } from "lucide-react";

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
              href: "/cms/maker",
              label: "Maker",
              active: pathname === "cms/maker",
            },
            {
              href: "/cms/checker",
              label: "Checker",
              active: pathname === "cms/checker",
            },
            {
              href: "/cms/publisher",
              label: "Publisher",
              active: pathname === "cms/publisher",
            },
          ],
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
