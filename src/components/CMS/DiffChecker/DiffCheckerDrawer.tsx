import CustomDrawer from "@components/ui/Drawer/CustomDrawer";
import DiffChecker, { DiffCheckerProps } from "./DiffChecker";
import { memo } from "react";

interface DiffCheckerDrawerProps extends DiffCheckerProps {
  isDrawerOpen: boolean;
  toggleDrawer: () => void;
  direction?: "left" | "right" | "top" | "bottom";
}

const DiffCheckerDrawer = ({
  isDrawerOpen,
  toggleDrawer,
  direction = "right",
  action,
}: DiffCheckerDrawerProps) => {
  return (
    <CustomDrawer
      isOpen={isDrawerOpen}
      onClose={toggleDrawer}
      direction={direction}
    >
      <DiffChecker toggleDrawer={toggleDrawer} action={action} />
    </CustomDrawer>
  );
};

export default memo(DiffCheckerDrawer);
