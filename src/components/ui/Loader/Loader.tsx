import { LoaderContext } from "@providers/LoaderProvider";
import { cn } from "@utils/shadcn";
import { AnimatePresence, motion } from "framer-motion";
import { useContext } from "react";

interface LoaderProps {
  variant?: "spinner" | "progress" | "pulse";
  size?: "small" | "medium" | "large";
  color?: "primary" | "secondary" | "accent";
  className?: string;
}

export function Loader({
  variant = "spinner",
  size = "medium",
  color = "primary",
  className,
}: LoaderProps) {
  const sizeClasses = {
    small: "w-6 h-6",
    medium: "w-10 h-10",
    large: "w-16 h-16",
  };

  const colorClasses = {
    primary: "text-primary",
    secondary: "text-secondary",
    accent: "text-accent",
  };

  const spinnerVariants = {
    animate: {
      rotate: 360,
    },
    transition: {
      repeat: Infinity,
      duration: 1,
      ease: "linear",
    },
  };

  const progressVariants = {
    initial: { pathLength: 0 },
    animate: {
      pathLength: 1,
      transition: {
        repeat: Infinity,
        duration: 1.5,
        ease: "easeInOut",
      },
    },
  };

  const pulseVariants = {
    animate: {
      scale: [1, 1.1, 1],
      opacity: [0.7, 1, 0.7],
    },
    transition: {
      repeat: Infinity,
      duration: 1.5,
      ease: "easeInOut",
    },
  };

  const renderLoader = () => {
    switch (variant) {
      case 'spinner':
        return (
          <motion.div
            className={cn(
              "border-4 border-t-transparent rounded-full",
              sizeClasses[size],
              colorClasses[color]
            )}
            animate={spinnerVariants.animate}
            transition={spinnerVariants.transition}
          />
        )
      case 'progress':
        return (
          <svg className={cn(sizeClasses[size], colorClasses[color])} viewBox="0 0 50 50">
            <motion.circle
              cx="25"
              cy="25"
              r="20"
              fill="none"
              strokeWidth="5"
              stroke="currentColor"
              strokeLinecap="round"
              initial="initial"
              animate="animate"
              variants={progressVariants}
            />
          </svg>
        )
      case 'pulse':
        return (
          <motion.div
            className={cn(
              "rounded-full bg-current",
              sizeClasses[size],
              colorClasses[color]
            )}
            animate={pulseVariants.animate}
            transition={pulseVariants.transition}
          />
        )
      default:
        return null
    }
  }

  return (
    <div className={cn("flex items-center justify-center", className)}>
      {renderLoader()}
    </div>
  );
}

export function LoaderOverlay({ ...props }: LoaderProps) {
  const { isLoading } = useContext(LoaderContext);

  return (
    <>
      {isLoading && (
        <AnimatePresence>
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30"
            >
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Loader {...props} />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </>
  );
}
