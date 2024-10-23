import { Button } from "@components/ui/button";
import { cn } from "@utils/shadcn";
import { DashboardIcon } from "@radix-ui/react-icons";

import { Link } from "react-router-dom";
import { SidebarToggle } from "./SiderbarToggle";
import { Menu } from "./Menu";
import { useStore } from "zustand";
import { useSidebarToggle } from "@hooks/use-sidebar-toggle";
import { StarFleet } from "./StarFleet";

export function Sidebar() {
  const sidebar = useStore(useSidebarToggle, (state) => state);

  if (!sidebar) return null;

  return (
    <aside
      className={cn(
        "fixed top-0 left-0 z-20 h-screen -translate-x-full lg:translate-x-0 transition-[width] ease-in-out duration-300",
        sidebar?.isOpen === false ? "w-[90px]" : "w-72",
      )}
    >
      <SidebarToggle isOpen={sidebar?.isOpen} setIsOpen={sidebar?.setIsOpen} />
      <div className="relative h-full flex flex-col px-3 py-4 overflow-y-auto shadow-md dark:shadow-zinc-800">
        <Button
          className={cn(
            "transition-transform ease-in-out duration-300 mb-1",
            sidebar?.isOpen === false ? "translate-x-1" : "translate-x-0",
          )}
          variant="link"
          asChild
        >
          <Link to="/" className="flex items-center gap-2">
            {sidebar?.isOpen ? (
              <StarFleet className="w-28" />
            ) : (
              <DashboardIcon className="w-6 h-6 mr-1" />
            )}
          </Link>
        </Button>
        <Menu isOpen={sidebar?.isOpen} />
      </div>
    </aside>
  );
}
