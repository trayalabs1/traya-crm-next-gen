import { Skeleton } from "@components/ui/skeleton";
import { motion } from "framer-motion";

const pulse = {
  initial: { opacity: 0.6 },
  animate: { opacity: 1 },
  transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
};

const GlobalFallback = () => {
  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-gray-800 p-4 border-r border-gray-200 dark:border-gray-700">
        <Skeleton className="h-8 w-32 mb-8" />
        <nav className="space-y-4">
          {[...Array(24)].map((_, i) => (
            <motion.div
              key={i}
              {...pulse}
              transition={{ ...pulse.transition, delay: i * 0.1 }}
            >
              <Skeleton className="h-4 w-full" />
            </motion.div>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center">
            <Skeleton className="h-8 w-48" />
            <div className="flex space-x-4">
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-8 w-8 rounded-full" />
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="p-6">
          <Skeleton className="h-10 w-[200px] mb-6" />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                {...pulse}
                transition={{ ...pulse.transition, delay: 0.2 + i * 0.1 }}
              >
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
                  <Skeleton className="h-4 w-3/4 mb-4" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default GlobalFallback;
