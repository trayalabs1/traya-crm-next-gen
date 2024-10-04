import CustomDrawer from "@components/ui/Drawer/CustomDrawer";
import DiffChecker, { DiffCheckerProps } from "./DiffChecker";

interface DiffCheckerDrawerProps extends DiffCheckerProps {
  isDrawerOpen: boolean;
  toggleDrawer: () => void;
  direction?: "left" | "right" | "top" | "bottom";
}

const DiffCheckerDrawer = ({
  isDrawerOpen,
  toggleDrawer,
  direction = "right",
  currentVersion,
  newVersion,
  action,
  diffEntity,
  segment,
  component,
  content,
}: DiffCheckerDrawerProps) => {
  return (
    <CustomDrawer
      isOpen={isDrawerOpen}
      onClose={toggleDrawer}
      direction={direction}
    >
      <DiffChecker
        currentVersion={currentVersion}
        newVersion={newVersion}
        toggleDrawer={toggleDrawer}
        action={action}
        diffEntity={diffEntity}
        segment={segment}
        component={component}
        content={content}
      />
    </CustomDrawer>
  );
};

export default DiffCheckerDrawer;
