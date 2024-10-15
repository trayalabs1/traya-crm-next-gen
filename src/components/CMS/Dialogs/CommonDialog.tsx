import { Button, ButtonProps } from "@components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@components/ui/dialog";
import React, { memo, PropsWithChildren, ReactElement } from "react";

interface CommonDialogProps extends PropsWithChildren {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  confirmVariant?: ButtonProps["variant"];
  cancelVariant?: ButtonProps["variant"];
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  trigger: ReactElement;
}

const CommonDialog: React.FC<CommonDialogProps> = memo(
  ({
    isOpen,
    onCancel,
    onConfirm,
    title = "Are you sure?",
    description = "This action cannot be undone.",
    confirmLabel = "Confirm",
    cancelLabel = "Cancel",
    confirmVariant = "default",
    cancelVariant = "outline",
    setIsDialogOpen,
    trigger,
    children,
  }) => {
    return (
      <Dialog open={isOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        <DialogContent className="z-[60]">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          {children}
          <DialogFooter>
            <Button variant={cancelVariant} onClick={onCancel}>
              {cancelLabel}
            </Button>
            <Button variant={confirmVariant} onClick={onConfirm}>
              {confirmLabel}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  },
);

export default CommonDialog;
