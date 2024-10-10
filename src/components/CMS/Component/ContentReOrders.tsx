import { motion, Reorder } from "framer-motion";
import { Button } from "@components/ui/button";
import { Label } from "@components/ui/label";
import { X, GripVertical, Plus } from "lucide-react";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import Select, { SingleValue, GroupBase, SelectInstance } from "react-select";
import { CustomOptionType, mapToSelectOptions } from "@utils/common";
import { reactSelectSingleStyles } from "@components/ui/ReactSelect/reactSelect";
import { isEmpty, isArray, get } from "lodash";
import { Content, ContentOrder } from "cms";
import { cn } from "@utils/shadcn";

interface ContentOrdersProps {
  selectedContents: ContentOrder[];
  availableContents: Content[];
  isDisabled?: boolean;
  onChange: (contents: ContentOrder[]) => void;
}

function ContentOrders({
  selectedContents,
  availableContents,
  onChange,
  isDisabled = false,
}: ContentOrdersProps) {
  const [contents, setContents] = useState<ContentOrder[]>(selectedContents);
  const selectRef = useRef<SelectInstance<
    CustomOptionType,
    false,
    GroupBase<CustomOptionType>
  > | null>(null);

  const updateContent = useCallback(
    (newComponents: ContentOrder[]) => {
      const updatedComponents =
        (isArray(newComponents) &&
          newComponents.map((component, index) => ({
            ...component,
            order: index + 1,
          }))) ||
        [];
      setContents(updatedComponents);
      onChange(updatedComponents);
    },
    [onChange],
  );

  useEffect(() => {
    if (
      !isEmpty(selectedContents) &&
      JSON.stringify(selectedContents) !== JSON.stringify(contents)
    ) {
      setContents(selectedContents);
    }
  }, [selectedContents, contents]);

  const addContent = useCallback(
    (newValue: SingleValue<CustomOptionType>): void => {
      if (newValue) {
        const newContent =
          isArray(availableContents) &&
          availableContents.find((c) => c.content_id === newValue.value);
        if (newContent) {
          updateContent([
            ...contents,
            {
              name: newContent.name,
              content_id: newContent.content_id,
              order: contents.length,
            },
          ]);
        }
      }
    },
    [contents, availableContents, updateContent],
  );

  const removeComponent = useCallback(
    (contentId: string) => {
      updateContent(contents.filter((c) => c.content_id !== contentId));
    },
    [contents, updateContent],
  );

  const handleReorder = useCallback(
    (reorderedContents: ContentOrder[]) => {
      updateContent(reorderedContents);
    },
    [updateContent],
  );

  const availableOptions =
    isArray(availableContents) &&
    availableContents.filter(
      (c) => !contents.some((comp) => comp?.content_id === c?.content_id),
    );

  const openSelect = () => {
    if (isDisabled) return;
    if (selectRef.current) {
      selectRef.current?.focus();
      selectRef.current?.openMenu("first");
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <Label
          htmlFor="content-select"
          className="text-sm font-medium text-gray-700 mb-2 block"
        >
          Add Content
        </Label>
        {isArray(availableOptions) && availableOptions.length > 0 ? (
          <Select<CustomOptionType, false, GroupBase<CustomOptionType>>
            ref={selectRef}
            styles={reactSelectSingleStyles}
            placeholder="Select contents..."
            options={mapToSelectOptions(availableOptions, "content_id", "name")}
            value={null}
            onChange={addContent}
            isDisabled={isDisabled}
          />
        ) : (
          <div className="text-sm text-gray-500 italic">
            All contents have been added
          </div>
        )}
      </div>

      <Reorder.Group
        axis="y"
        values={contents}
        onReorder={handleReorder}
        className="space-y-2"
      >
        {isArray(contents) &&
          contents.map((content) => (
            <Reorder.Item
              key={content?.content_id}
              value={content}
              drag={!isDisabled}
            >
              <motion.div
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex items-center space-x-3 bg-white p-3 rounded-lg shadow-sm border border-gray-200"
              >
                <GripVertical className="cursor-move text-gray-400 flex-shrink-0" />
                <div className="flex-grow">
                  <h3 className="text-sm font-medium text-gray-900">
                    {get(content, ["name"]) || "-"}
                  </h3>
                  <p className="text-xs text-gray-500">
                    ID: {get(content, ["content_id"]) || "-"}
                  </p>
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeComponent(content?.content_id)}
                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  disabled={isDisabled}
                >
                  <X className="h-4 w-4" />
                </Button>
              </motion.div>
            </Reorder.Item>
          ))}
      </Reorder.Group>

      {isArray(contents) && contents.length === 0 && (
        <div
          className={cn(
            "text-center p-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 cursor-pointer hover:bg-gray-100 transition-colors",
            isDisabled ? "cursor-not-allowed" : "",
          )}
          onClick={openSelect}
        >
          <Plus className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            No contents
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Get started by adding a new content
          </p>
        </div>
      )}
    </div>
  );
}

export default memo(ContentOrders);
