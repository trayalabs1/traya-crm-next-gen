import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@components/ui/button";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@components/ui/dialog";
import {
  ArrowLeft,
  ChevronDown,
  ChevronRight,
  Plus,
  Trash2,
  UploadIcon,
  X,
} from "lucide-react";
import { useParams } from "react-router-dom";
import { get } from "lodash";
import { ContentMutationPayload } from "cms";
import { generateQueryString } from "@utils/common";
import _ from "lodash";
import { uploadMedia } from "@services/cmsServices";
import { useGetContents } from "@queries/cms/contents";
import { toast } from "react-toastify";

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
  error?: string;
};

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  type: z.enum(contentTypes as [string, ...string[]], {
    errorMap: () => ({ message: "Please select a valid content type" }),
  }),
  data: z.record(z.unknown()),
});

const ImageViewerDialog = ({ imageUrl }: { imageUrl: string }) => (
  <Dialog>
    <DialogTrigger asChild>
      <Button variant="link" size="sm">
        View
      </Button>
    </DialogTrigger>
    <DialogContent className="max-w-3xl">
      <DialogHeader aria-label="Image Preview">
        <DialogTitle>Image Preview</DialogTitle>
      </DialogHeader>
      <DialogDescription></DialogDescription>
      <div className="mt-4 mx-auto">
        <img src={imageUrl} alt="Preview" className="w-auto h-auto" />
      </div>
    </DialogContent>
  </Dialog>
);

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
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
      onUpdate({ ...item, file: file, error: undefined });
    }
  };

  const handleRemoveFile = () => {
    onUpdate({ ...item, value: "", file: null, error: undefined });
    setPreviewUrl(null);
  };

  const validateField = (value: string) => {
    if (!value.trim()) {
      return "This field is required";
    }
    if (!isNaN(Number(value))) {
      return undefined; // It's a valid number
    }
    try {
      JSON.parse(value);
      return undefined; // It's a valid JSON string
    } catch {
      return undefined; // It's a regular string
    }
  };

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    const error = validateField(newValue);
    onUpdate({ ...item, value: newValue, error });
  };

  useEffect(() => {
    if (typeof item.file === "string" && item.file.startsWith("http")) {
      setPreviewUrl(item.file);
    }
  }, [item.file]);

  return (
    <div className="ml-4 mb-2">
      <div className="flex items-center space-x-2">
        {item.isObject && (
          <Button
            variant="ghost"
            size="icon"
            type="button"
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
          onChange={(e) =>
            onUpdate({
              ...item,
              key: e.target.value,
              error: e.target.value.trim() ? undefined : "Key is required",
            })
          }
          className="flex-1"
        />
        {!item.isObject && (
          <>
            {previewUrl ? (
              <div className="flex items-center">
                <ImageViewerDialog imageUrl={previewUrl} />
                <Button
                  onClick={handleRemoveFile}
                  variant="outline"
                  size="icon"
                  type="button"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <>
                <Input
                  placeholder="Value"
                  value={item.value as string}
                  onChange={handleValueChange}
                  className="flex-1"
                />
                <label
                  id={`file-upload-${item.id}`}
                  style={{ display: "none" }}
                >
                  <input
                    id={`file-upload-${item.id}`}
                    type="file"
                    onChange={handleFileChange}
                  />
                </label>
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
                  <UploadIcon className="h-4 w-4" />
                </Button>
              </>
            )}
          </>
        )}
        <Button
          variant="outline"
          size="sm"
          type="button"
          onClick={() =>
            onUpdate({
              ...item,
              isObject: !item.isObject,
              value: item.isObject ? "" : [],
              error: undefined,
            })
          }
        >
          {item.isObject ? "To Value" : "To Object"}
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={onDelete}
          className="text-destructive hover:text-destructive"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
      {item.error && <p className="text-sm text-red-500 mt-1">{item.error}</p>}
      {item.isObject && isExpanded && (
        <div className="mt-2">
          {Array.isArray(item.value) &&
            item.value.map((subItem, index) => (
              <div key={index}>
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
          <Button
            variant="outline"
            size="sm"
            onClick={handleAddField}
            className="mt-2"
            disabled={(item.value as DataItem[]).some(
              (subItem) =>
                !subItem.key.trim() || (!subItem.value && !subItem.file),
            )}
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
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      type: "",
      data: {},
    },
  });
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

  const validateData = (items: DataItem[]): boolean => {
    for (const item of items) {
      if (!item.key.trim()) {
        setError("All keys must be filled");
        return false;
      }
      if (!item.isObject && !item.value && !item.file) {
        setError("All values must be filled or have a file");
        return false;
      }
      if (item.isObject && Array.isArray(item.value)) {
        if (!validateData(item.value)) {
          return false;
        }
      }
    }
    return true;
  };

  const onFormSubmit = async (formData: z.infer<typeof formSchema>) => {
    setError("");
    if (!validateData(data)) {
      return;
    }
    try {
      const processedData = processData(data);

      // Upload images
      for (const item of data) {
        if (item.file instanceof File) {
          const uploadedMedia = await uploadMedia(item.file);
          if (uploadedMedia?.success) {
            processedData[item.key] = uploadedMedia.url;
          }
        }
      }

      onSubmit({
        id: id,
        payload: {
          ...formData,
          data: processedData,
        },
      });
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
          if (!isNaN(Number(item.value))) {
            acc[item.key] = Number(item.value);
          } else {
            try {
              acc[item.key] = JSON.parse(item.value as string);
            } catch {
              acc[item.key] = item.value;
            }
          }
        }
        return acc;
      },
      {} as Record<string, unknown>,
    );
  };

  const addDataField = () => {
    if (validateData(data)) {
      setData([
        ...data,
        { key: "", value: "", isObject: false, id: generateUniqueId() },
      ]);
    }
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
    if (_.isEmpty(content) && !isNew) toast.error("Content Not Found");
    if (content) {
      setValue("name", get(content, ["name"], ""));
      setValue("type", get(content, ["type"], ""));

      let dataKey: "data" | "draft_data" = "draft_data";
      if (content.status === "published") {
        dataKey = "data";
      }
      const draftData = get(content, [dataKey], {}) || {};

      if (draftData) {
        const transformedData: DataItem[] = transformData(draftData);
        setData(transformedData);
      }
    }
  }, [content, setValue, id, isNew]);

  const isDisabled = !isNew;

  const handleClear = () => {
    if (isNew) {
      setValue("name", "");
      setValue("type", "");
    }
    setData([]);
    setError("");
  };
  return (
    <div className="w-3/4 mx-auto">
      <div className="flex flex-wrap justify-between my-6 ">
        <Button onClick={onBack} variant="ghost" aria-label="Go back">
          <ArrowLeft className="h-4 w-4 mr-4" />
          <h3 className="font-bold text-xl">
            {isNew ? "Create" : "Edit"} Content
            {_.get(content, ["status"]) == "draft" ? " (Draft Version) " : ""}
          </h3>
        </Button>
      </div>
      <div>
        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <Input
                  id="name"
                  placeholder="Enter the name of comtent"
                  {...field}
                  disabled={isDisabled}
                />
              )}
            />
            {errors?.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="type">Type</Label>
            <Controller
              name="type"
              control={control}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  disabled={isDisabled}
                >
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
              )}
            />
            {errors?.type && (
              <p className="text-sm text-red-500">{errors.type.message}</p>
            )}
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
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addDataField}
            className="mt-2"
            disabled={data.some(
              (item) => !item.key.trim() || (!item.value && !item.file),
            )}
          >
            <Plus className="h-4 w-4 mr-2" /> Add Field
          </Button>
          {error && <p className="text-destructive text-sm">{error}</p>}
          <div className="flex flex-wrap gap-2 justify-end">
            <Button
              type="reset"
              className="w-36"
              variant="outline"
              onClick={handleClear}
            >
              Clear
            </Button>
            <Button type="submit" className="w-36">
              {isNew ? "Create" : "Save"} Content
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
