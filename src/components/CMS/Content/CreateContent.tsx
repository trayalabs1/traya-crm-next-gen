import React, { useEffect, useState } from "react";
import { Button, buttonVariants } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { Label } from "@components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";
import {
  ArrowLeft,
  ChevronDown,
  ChevronRight,
  Plus,
  Smartphone,
  Trash2,
  UploadIcon,
  X,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useGetContents } from "src/queries";
import { get } from "lodash";
import { ContentMutationPayload } from "cms";
import { generateQueryString } from "@utils/common";
import _ from "lodash";
import { uploadMedia } from "@services/cmsServices";
// import DiffCheckerDrawer from "../DiffChecker/DiffCheckerDrawer";
const contentTypes = [
  "banner",
  "cta",
  "name",
  "cta_button",
  "custom",
  "full_image",
  "carousel_item",
  "image",
  "community_card",
  "playlist",
  "hair_solution",
  "step",
  "retake_hair_test",
  "holistic_plan",
  "support_card",
  "full_width_image",
  "lottie",
  "video_card",
];

const generateUniqueId = () => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

type CreateContentProps = {
  onSubmit: (content: ContentMutationPayload) => void;
  onBack?: () => void;
};

type DataItem = {
  key: string;
  value: string | DataItem[];
  isObject: boolean;
  id: string;
  file?: File | string | null;
};

const DataField = ({
  item,
  onUpdate,
  onDelete,
  level = 0,
}: {
  item: DataItem;
  onUpdate: (item: DataItem) => void;
  onDelete: () => void;
  level?: number;
}) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const handleToggle = () => {
    if (item.isObject) {
      setIsExpanded(!isExpanded);
    }
  };

  const handleAddField = () => {
    if (Array.isArray(item.value)) {
      onUpdate({
        ...item,
        value: [
          ...item.value,
          { key: "", value: "", isObject: false, id: generateUniqueId() },
        ],
      });
    }
  };

  const handleUpdateField = (index: number, updatedItem: DataItem) => {
    if (Array.isArray(item.value)) {
      const newValue = [...item.value];
      newValue[index] = updatedItem;
      onUpdate({ ...item, value: newValue });
    }
  };

  const handleDeleteField = (index: number) => {
    if (Array.isArray(item.value)) {
      onUpdate({
        ...item,
        value: item.value.filter((_, i) => i !== index),
      });
    }
  };
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log("Selected file:", file); // Debugging
      const uploadedMedia = await uploadMedia(file);
      if (uploadedMedia?.success) {
        const URL = uploadedMedia?.url;
        onUpdate({ ...item, value: URL, file: file });
      }
    }
  };

  return (
    <div className="ml-4 mb-2">
      <div className="flex items-center space-x-2">
        {item.isObject && (
          <Button
            variant="ghost"
            size="icon"
            onClick={handleToggle}
            className="h-8 w-8 p-0"
          >
            {isExpanded ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </Button>
        )}
        <Input
          placeholder="Key"
          value={item.key}
          onChange={(e) => onUpdate({ ...item, key: e.target.value })}
          className="flex-1"
        />
        {!item.isObject && (
          <>
            {item.file ? (
              <Link
                to="#"
                target="_blank"
                className={buttonVariants({ variant: "link" })}
              >
                View
              </Link>
            ) : (
              <Input
                placeholder="Value"
                value={item.value as string}
                onChange={(e) => onUpdate({ ...item, value: e.target.value })}
                className="flex-1"
                disabled={item.file ? true : false}
              />
            )}
            <label id={`file-upload-${item.id}`} style={{ display: "none" }}>
              <input
                id={`file-upload-${item.id}`}
                type="file"
                onChange={handleFileChange}
              />
            </label>
            {item.file ? (
              <Button
                onClick={() => onUpdate({ ...item, value: "", file: null })}
                variant="outline"
                size="icon"
                type="button"
              >
                <X />
              </Button>
            ) : (
              <Button
                variant="outline"
                size="icon"
                type="button"
                onClick={() => {
                  const fileInput = document.getElementById(
                    `file-upload-${item.id}`,
                  ) as HTMLInputElement;
                  fileInput?.click();
                }}
              >
                <UploadIcon />
              </Button>
            )}
          </>
        )}
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            onUpdate({
              ...item,
              isObject: !item.isObject,
              value: item.isObject ? "" : [],
            })
          }
        >
          {item.isObject ? "To Value" : "To Object"}
        </Button>
        {/* {level > 0 && ( */}
        <Button
          variant="outline"
          size="icon"
          onClick={onDelete}
          className="text-destructive hover:text-destructive"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
        {/* )} */}
      </div>
      {item.isObject && isExpanded && (
        <div className="mt-2">
          {/* <AnimatePresence> */}
          {Array.isArray(item.value) &&
            item.value.map((subItem, index) => (
              <div
                key={index}
                // initial={{ opacity: 0, y: -10 }}
                // animate={{ opacity: 1, y: 0 }}
                // exit={{ opacity: 0, y: -10 }}
                // transition={{ duration: 0.2 }}
              >
                <DataField
                  item={subItem}
                  onUpdate={(updatedItem) =>
                    handleUpdateField(index, updatedItem)
                  }
                  onDelete={() => handleDeleteField(index)}
                  level={level + 1}
                />
              </div>
            ))}
          {/* </AnimatePresence> */}
          <Button
            variant="outline"
            size="sm"
            onClick={handleAddField}
            className="mt-2"
          >
            <Plus className="h-4 w-4 mr-2" /> Add Field
          </Button>
        </div>
      )}
    </div>
  );
};

interface DraftData {
  [key: string]: string | DraftData | null;
}
function transformData(draftData: DraftData): DataItem[] {
  return Object.entries(draftData).map(([key, value]) => {
    const isObject = typeof value === "object" && value !== null;

    return {
      key,
      value: isObject ? transformData(value as DraftData) : String(value),
      isObject,
      id: generateUniqueId(),
      file: typeof value === "string" && value.includes("http") ? value : null,
    };
  });
}

export default function CreateContent({
  onSubmit,
  onBack,
}: CreateContentProps) {
  const [name, setName] = useState<string>("");
  const [type, setType] = useState(contentTypes[0]);
  const [data, setData] = useState<DataItem[]>([
    { key: "", value: "", isObject: false, id: generateUniqueId() },
  ]);
  const [error, setError] = useState("");

  const { id } = useParams();

  const isNew = id === "new";

  const queryString = generateQueryString({
    content_id: id,
  });

  const { data: contentData, refetch } = useGetContents(queryString, {
    enabled: false,
  });
  const content = get(contentData, ["mainData", 0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const processedData = processData(data);
      onSubmit({ payload: { name, type, data: processedData }, id });
    } catch (err) {
      setError("Invalid data structure");
    }
  };

  const processData = (items: DataItem[]): Record<string, unknown> => {
    return items.reduce(
      (acc, item) => {
        if (item.isObject && Array.isArray(item.value)) {
          acc[item.key] = processData(item.value);
        } else {
          try {
            acc[item.key] = JSON.parse(item.value as string);
          } catch {
            acc[item.key] = item.value;
          }
        }
        return acc;
      },
      {} as Record<string, unknown>,
    );
  };

  const addDataField = () => {
    setData([
      ...data,
      { key: "", value: "", isObject: false, id: generateUniqueId() },
    ]);
  };

  const updateDataField = (index: number, updatedItem: DataItem) => {
    const newData = [...data];
    newData[index] = updatedItem;
    setData(newData);
  };

  const deleteDataField = (index: number) => {
    setData(data.filter((_, i) => i !== index));
  };

  useEffect(() => {
    if (!isNew) {
      refetch();
    }
  }, [isNew, refetch]);

  useEffect(() => {
    if (content) {
      setName(get(content, ["name"], ""));
      setType(get(content, ["type"], ""));

      const draftData = get(content, ["draft_data"], {});

      if (draftData) {
        const draftData = get(content, ["draft_data"], {});
        const transformedData: DataItem[] = transformData(draftData);

        setData(transformedData);
      }
    }
  }, [content]);

  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <div className="w-3/4 mx-auto">
      <div className="flex flex-wrap justify-between my-6 ">
        <div className="flex flex-wrap items-center">
          <Button
            onClick={onBack}
            variant="ghost"
            size="icon"
            className="mr-2"
            aria-label="Go back"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h3 className="font-bold text-xl">
            {isNew ? "Create" : "Edit"} Content
            {_.get(content, ["mainData", 0, "status"]) == "draft"
              ? " (Draft Version) "
              : ""}
          </h3>
        </div>
        <Button
          // disabled={!form.formState.isValid}
          disabled
          onClick={toggleDrawer}
          className="bg-green-500 hover:bg-green-700 hover:ease-in"
          type="button"
        >
          <Smartphone className="mr-2 h-4 w-4" /> Phone Screen
        </Button>
      </div>
      <div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="type">Type</Label>
            <Select value={type} onValueChange={setType}>
              <SelectTrigger>
                <SelectValue placeholder="Select content type" />
              </SelectTrigger>
              <SelectContent>
                {contentTypes.map((contentType) => (
                  <SelectItem key={contentType} value={contentType}>
                    {contentType.replace("_", " ")}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Data</Label>
            {data.map((item, index) => (
              <div key={index}>
                <DataField
                  item={item}
                  onUpdate={(updatedItem) =>
                    updateDataField(index, updatedItem)
                  }
                  onDelete={() => deleteDataField(index)}
                />
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addDataField}
              className="mt-2"
            >
              <Plus className="h-4 w-4 mr-2" /> Add Field
            </Button>
          </div>
          {error && <p className="text-destructive text-sm">{error}</p>}
          <div className="flex flex-wrap gap-2 justify-end">
            <Button type="reset" className="w-36" variant="outline">
              Clear
            </Button>
            <Button type="submit" className="w-36">
              {isNew ? "Create" : "Save"} Content
            </Button>
          </div>
        </form>
      </div>
      {/* <DiffCheckerDrawer
        isDrawerOpen={isDrawerOpen}
        toggleDrawer={toggleDrawer}
        currentVersion={isNew ? undefined : {}}
        newVersion={isNew ? {} : undefined}
      /> */}
    </div>
  );
}
