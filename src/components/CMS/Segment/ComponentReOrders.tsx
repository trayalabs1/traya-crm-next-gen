import { motion, Reorder } from "framer-motion";
import { Button } from "@components/ui/button";
import { Label } from "@components/ui/label";
import { X, GripVertical, Plus } from "lucide-react";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import Select, { SingleValue, GroupBase, SelectInstance } from "react-select";
import { CustomOptionType, mapToSelectOptions } from "@utils/common";
import { reactSelectSingleStyles } from "@components/ui/ReactSelect/reactSelect";
import { isArray, get } from "lodash";
import { Component, ComponentOrder } from "cms";

interface ComponentOrdersProps {
  selectedComponents: ComponentOrder[];
  availableComponents: Component[];
  onChange: (components: ComponentOrder[]) => void;
}

function ComponentOrders({
  selectedComponents,
  availableComponents,
  onChange,
}: ComponentOrdersProps) {
  const [components, setComponents] =
    useState<ComponentOrder[]>(selectedComponents);
  const selectRef = useRef<SelectInstance<
    CustomOptionType,
    false,
    GroupBase<CustomOptionType>
  > | null>(null);

  const updateComponents = useCallback(
    (newComponents: ComponentOrder[]) => {
      const updatedComponents =
        (isArray(newComponents) &&
          newComponents.map((component, index) => ({
            ...component,
            order: (index + 1) * 10,
          }))) ||
        [];
      setComponents(updatedComponents);
      onChange(updatedComponents);
    },
    [onChange],
  );

  useEffect(() => {
    if (JSON.stringify(selectedComponents) !== JSON.stringify(components)) {
      setComponents(selectedComponents);
    }
  }, [selectedComponents, components]);

  const addComponent = useCallback(
    (newValue: SingleValue<CustomOptionType>): void => {
      if (newValue) {
        const newComponent =
          isArray(availableComponents) &&
          availableComponents.find((c) => c.component_id === newValue.value);
        if (newComponent) {
          updateComponents([
            ...components,
            {
              name: newComponent.name,
              component_id: newComponent.component_id,
              order: components.length,
            },
          ]);
        }
      }
    },
    [components, availableComponents, updateComponents],
  );

  const removeComponent = useCallback(
    (componentId: string) => {
      updateComponents(
        components.filter((c) => c.component_id !== componentId),
      );
    },
    [components, updateComponents],
  );

  const handleReorder = useCallback(
    (reorderedComponents: ComponentOrder[]) => {
      updateComponents(reorderedComponents);
    },
    [updateComponents],
  );

  const availableOptions =
    isArray(availableComponents) &&
    availableComponents.filter(
      (c) => !components.some((comp) => comp?.component_id === c?.component_id),
    );

  const openSelect = () => {
    if (selectRef.current) {
      selectRef.current?.focus();
      selectRef.current?.openMenu("first");
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <Label
          htmlFor="component-select"
          className="text-sm font-medium text-gray-700 mb-2 block"
        >
          Add Component
        </Label>
        {isArray(availableOptions) && availableOptions.length > 0 ? (
          <Select<CustomOptionType, false, GroupBase<CustomOptionType>>
            ref={selectRef}
            styles={reactSelectSingleStyles}
            placeholder="Select components..."
            options={mapToSelectOptions(
              availableOptions,
              "component_id",
              "name",
            )}
            value={null}
            onChange={addComponent}
          />
        ) : (
          <div className="text-sm text-gray-500 italic">
            All components have been added
          </div>
        )}
      </div>

      <Reorder.Group
        axis="y"
        values={components}
        onReorder={handleReorder}
        className="space-y-2"
      >
        {isArray(components) &&
          components.map((component) => (
            <Reorder.Item key={component?.component_id} value={component}>
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
                    {get(component, ["name"]) || "-"}
                  </h3>
                  <p className="text-xs text-gray-500">
                    ID: {get(component, ["component_id"]) || "-"}
                  </p>
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeComponent(component?.component_id)}
                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                >
                  <X className="h-4 w-4" />
                </Button>
              </motion.div>
            </Reorder.Item>
          ))}
      </Reorder.Group>

      {isArray(components) && components.length === 0 && (
        <div
          className="text-center p-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 cursor-pointer hover:bg-gray-100 transition-colors"
          onClick={openSelect}
        >
          <Plus className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            No components
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Get started by adding a new component
          </p>
        </div>
      )}
    </div>
  );
}

export default memo(ComponentOrders);
