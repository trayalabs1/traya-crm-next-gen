import {
  useEffect,
  useCallback,
  useState,
  useRef,
  memo,
  useInsertionEffect,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  direction?: "left" | "right" | "top" | "bottom";
  className?: string;
  width?: string;
}

function CustomDrawer({
  isOpen,
  onClose,
  children,
  direction = "right",
  className = "",
  width,
}: DrawerProps) {
  const [contentDimensions, setContentDimensions] = useState<{
    width: number;
    height: number;
  } | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  useInsertionEffect(() => {
    if (isOpen && contentRef.current) {
      const { scrollWidth, scrollHeight } = contentRef.current;
      setContentDimensions({ width: scrollWidth, height: scrollHeight });
    }
  }, [isOpen, children]);

  const getAnimationProps = useCallback(() => {
    switch (direction) {
      case "left":
        return { x: "-100%" };
      case "right":
        return { x: "100%" };
      case "top":
        return { y: "-100%" };
      case "bottom":
        return { y: "100%" };
      default:
        return { x: "100%" };
    }
  }, [direction]);

  const baseClasses = `fixed bg-background p-6 shadow-lg z-[60] ${
    direction === "left" || direction === "right" ? "h-full" : "w-full"
  } ${
    direction === "left"
      ? "left-0 top-0"
      : direction === "right"
        ? "right-0 top-0"
        : direction === "top"
          ? "top-0 left-0"
          : "bottom-0 left-0"
  }`;

  const sizeClasses = width
    ? `w-[${width}]`
    : direction === "left" || direction === "right"
      ? `w-[${contentDimensions?.width ? `${contentDimensions.width}px` : "auto"}] max-w-[95vw]`
      : `h-[${contentDimensions?.height ? `${contentDimensions.height}px` : "auto"}] max-h-[95vh]`;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/50 z-50"
            onClick={onClose}
          />
          <motion.div
            className={`${baseClasses} ${sizeClasses} ${className}`}
            initial={getAnimationProps()}
            animate={{ x: 0, y: 0 }}
            exit={getAnimationProps()}
            transition={{ type: "tween" }}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Close drawer"
            >
              <X className="h-6 w-6" />
            </button>
            <div ref={contentRef} className="h-full w-full overflow-auto">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default memo(CustomDrawer);
