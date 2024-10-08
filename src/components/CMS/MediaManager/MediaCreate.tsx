import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { Label } from "@components/ui/label";
import { Textarea } from "@components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";
import { useToast } from "@hooks/use-toast";
import { delay } from "@utils/common";

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB

const mediaSchema = z.object({
  file: z
    .any()
    .refine((file) => file?.length > 0, "File is required")
    .refine((file) => file[0]?.size <= MAX_FILE_SIZE, `Max file size is 50MB`),
  thumbnail: z
    .any()
    .refine(
      (file) => file?.length === 0 || file[0]?.size <= MAX_FILE_SIZE,
      `Max file size is 50MB`,
    )
    .optional(),
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  platform: z.enum(["crm", "website", "mobile", "other"]),
});

type MediaFormData = z.infer<typeof mediaSchema>;

export default function MediaCreate() {
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm<MediaFormData>({
    resolver: zodResolver(mediaSchema),
  });

  const watchFile = watch("file");
  const watchThumbnail = watch("thumbnail");

  React.useEffect(() => {
    if (watchFile && watchFile.length > 0) {
      setPreviewUrl(URL.createObjectURL(watchFile[0]));
    }
  }, [watchFile]);

  React.useEffect(() => {
    if (watchThumbnail && watchThumbnail.length > 0) {
      setThumbnailUrl(URL.createObjectURL(watchThumbnail[0]));
    }
  }, [watchThumbnail]);

  const onSubmit = async (data: MediaFormData) => {
    console.log(data);
    setIsUploading(true);
    try {
      // upload to a bucket
      await delay(2000);
      toast({
        title: "Media uploaded successfully",
        description: "Your file has been uploaded and added to the list.",
      });
      navigate("/");
    } catch (error) {
      console.error("Upload failed:", error);
      toast({
        title: "Upload failed",
        description:
          "There was an error uploading your file. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Card className="w-full mx-auto">
      <CardHeader>
        <CardTitle>Create Media</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="space-y-2">
            <Label htmlFor="file">Upload File (Max 50MB)</Label>
            <Input
              id="file"
              type="file"
              accept="image/*,video/*"
              {...register("file")}
            />
            {errors.file && (
              <p className="text-sm text-red-500">
                {errors.file.message as string}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="thumbnail">
              Upload Thumbnail (Optional, for videos)
            </Label>
            <Input
              id="thumbnail"
              type="file"
              accept="image/*"
              {...register("thumbnail")}
            />
            {errors.thumbnail && (
              <p className="text-sm text-red-500">
                {errors.thumbnail.message as string}
              </p>
            )}
          </div>

          {previewUrl && (
            <div className="space-y-2">
              <Label>Preview</Label>
              <div className="w-full max-w-sm mx-auto">
                {watchFile[0]?.type.startsWith("image/") ? (
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="w-full h-auto"
                  />
                ) : (
                  <video
                    src={previewUrl}
                    controls
                    poster={thumbnailUrl || undefined}
                    className="w-full h-auto"
                  />
                )}
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" {...register("title")} />
            {errors.title && (
              <p className="text-sm text-red-500">{errors.title.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" {...register("description")} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="platform">Platform</Label>
            <Controller
              name="platform"
              control={control}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select platform" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="crm">CRM</SelectItem>
                    <SelectItem value="website">Website</SelectItem>
                    <SelectItem value="mobile">Mobile</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.platform && (
              <p className="text-sm text-red-500">{errors.platform.message}</p>
            )}
          </div>

          <Button type="submit" disabled={isUploading}>
            {isUploading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" />
                Upload Media
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
