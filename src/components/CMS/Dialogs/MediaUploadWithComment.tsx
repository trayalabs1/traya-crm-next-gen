import { Button } from "@components/ui/button";
import { Label } from "@components/ui/label";
import { Textarea } from "@components/ui/textarea";
import { X } from "lucide-react";
import { useCallback, useState } from "react";

interface FileWithPreview extends File {
  preview: string;
}

interface MediaUploadWithCommentProps {
  onChange: (files: File[]) => void;
  onComment: (comment: string) => void;
  maxFileSize?: number;
  allowedTypes?: string[];
}

const MediaUploadWithComment: React.FC<MediaUploadWithCommentProps> = ({
  onChange,
  onComment,
  maxFileSize = 5 * 1024 * 1024, // 5 MB limit
  allowedTypes = [
    "image/jpeg",
    "image/png",
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ],
}) => {
  const [comment, setComment] = useState<string>("");
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [error, setError] = useState<string>("");

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newFiles: FileWithPreview[] = [];
      let errorMessage = "";

      if (e.target.files) {
        for (const file of Array.from(e.target.files)) {
          const isAllowedType = allowedTypes.includes(file.type);
          if (!isAllowedType) {
            errorMessage =
              "Only image or document files are allowed (PDF, DOCX).";
            break;
          }

          if (maxFileSize && file.size > maxFileSize) {
            errorMessage = "Each file must be less than 5 MB.";
            break;
          }

          newFiles.push(
            Object.assign(file, { preview: URL.createObjectURL(file) }),
          );
        }

        if (errorMessage) {
          setError(errorMessage);
        } else {
          setError("");
          setFiles((prevFiles) => {
            const updatedFiles = [...prevFiles, ...newFiles];
            onChange(updatedFiles);
            return updatedFiles;
          });
        }
      }
    },
    [allowedTypes, maxFileSize, onChange],
  );

  const removeFile = useCallback(
    (fileToRemove: FileWithPreview) => {
      setFiles((prev) => {
        const updatedFiles = prev.filter((file) => file !== fileToRemove);
        URL.revokeObjectURL(fileToRemove.preview);
        onChange(updatedFiles);
        return updatedFiles;
      });
    },
    [onChange],
  );

  return (
    <div className="grid gap-4 py-1">
      <div className="grid gap-2">
        <Label htmlFor="comment">Comment</Label>
        <Textarea
          id="comment"
          placeholder="Add your comment here..."
          value={comment}
          onChange={(e) => {
            const value = e.target.value;
            setComment(value);
            onComment(value);
          }}
          className="min-h-[100px]"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="file-upload">Attachments</Label>
        <input
          type="file"
          multiple
          accept={allowedTypes.join(",")}
          onChange={handleFileChange}
          className="hidden"
          id="file-upload"
        />
        <label
          htmlFor="file-upload"
          className="cursor-pointer inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-cyan-600 text-primary-foreground hover:bg-cyan-600/90 h-9 px-4 py-2"
        >
          Upload Files
        </label>
      </div>
      <div className="space-y-2">
        {files.map((file, index) => (
          <div
            key={index}
            className="flex items-center justify-between bg-secondary p-1 h-10 rounded-md"
          >
            <span className="truncate text-sm max-w-[300px]">
              {index + 1}. {file.name}
            </span>
            <Button
              variant="secondary"
              size="icon"
              className="hover:text-destructive-foreground shadow-sm hover:bg-destructive/90"
              onClick={() => removeFile(file)}
            >
              <X />
            </Button>
          </div>
        ))}
      </div>
      {error && (
        <h5 className="text-sm text-destructive font-medium">{error}</h5>
      )}
    </div>
  );
};

export default MediaUploadWithComment;
