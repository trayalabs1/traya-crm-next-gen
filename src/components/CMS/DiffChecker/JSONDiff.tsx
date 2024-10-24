import { Switch } from "@components/ui/switch";
import { diffLines, Change } from "diff";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface JsonDiffViewerProps {
  oldJson: object | null;
  newJson?: object | null;
}

const ColorLegend = () => (
  <div className="flex flex-wrap gap-4 mt-4">
    <div className="flex items-center">
      <span className="w-4 h-4 bg-green-200 mr-2" />
      <span className="text-sm">Added</span>
    </div>
    <div className="flex items-center">
      <span className="w-4 h-4 bg-red-200 mr-2" />
      <span className="text-sm">Removed</span>
    </div>
  </div>
);

export default function JsonDiffViewer({
  oldJson,
  newJson,
}: JsonDiffViewerProps) {
  const [isVisible, setIsVisible] = useState(false);
  const oldStr = oldJson ? JSON.stringify(oldJson, null, 2) : "";
  const newStr = newJson ? JSON.stringify(newJson, null, 2) : "";

  const diff = diffLines(oldStr, newStr);

  const renderDiff = (changes: Change[], isOld: boolean) => {
    return changes.map((part, index) => {
      const backgroundColor = part.added
        ? "bg-green-200"
        : part.removed
          ? "bg-red-200"
          : "";

      // Only render if it's in the correct column (old or new)
      if ((isOld && !part.added) || (!isOld && !part.removed)) {
        return (
          <span key={index} className={backgroundColor}>
            {part.value}
          </span>
        );
      }
      return null;
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <span className="text-lg font-semibold">JSON Diff</span>
        <Switch checked={isVisible} onCheckedChange={setIsVisible} />
      </div>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="w-full">
              {newJson && <ColorLegend />}
              <div className="flex flex-col lg:flex-row gap-4">
                <div className={`flex-1 ${!newJson ? "w-full" : ""}`}>
                  <h2 className="text-lg font-semibold mb-2">Original</h2>
                  <pre className="font-mono text-sm bg-gray-100 p-4 rounded-lg overflow-x-auto max-h-[500px] h-full overflow-y-auto">
                    {newJson ? renderDiff(diff, true) : oldStr}
                  </pre>
                </div>
                {newJson && (
                  <div className="flex-1">
                    <h2 className="text-lg font-semibold mb-2">Modified</h2>
                    <pre className="font-mono text-sm bg-gray-100 p-4 rounded-lg overflow-x-auto max-h-[500px] h-full overflow-y-auto">
                      {renderDiff(diff, false)}
                    </pre>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
