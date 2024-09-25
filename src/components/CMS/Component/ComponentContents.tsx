import { Button } from "@components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@components/ui/dialog";
import { ScrollArea } from "@components/ui/scroll-area";
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectLabel,
//   SelectTrigger,
//   SelectValue,
// } from "@components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@components/ui/table";
import { getComponentContents } from "@services/cmsServices";
import { useQuery } from "@tanstack/react-query";
import { ComponentContentsType } from "cms";
// import { statusList } from "@utils/common";
import { Edit, GripVertical, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TableSkeleton from "@components/ui/Loader/TableSkeleton";
import { isArray, get } from "lodash";
export default function ComponentContents() {
  const { componentId } = useParams();
  const [contents, setContents] = useState<ComponentContentsType>([]);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  // const [status, setStatus] = useState<string>("");
  // const [currentVersion, setCurrentVersion] = useState<string>("");

  const onDragStart = (
    e: React.DragEvent<HTMLTableRowElement>,
    index: number,
  ) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", index.toString());
  };

  const onDragOver = (
    e: React.DragEvent<HTMLTableRowElement>,
    index: number,
  ) => {
    e.preventDefault();
    // const draggedOverItem = components[index];
    if (draggedIndex !== null && draggedIndex !== index) {
      const newContents = [...contents];
      newContents.splice(draggedIndex, 1);
      newContents.splice(index, 0, contents[draggedIndex]);
      setContents(newContents);
      setDraggedIndex(index);
      setHasChanges(true);
    }
  };

  const onDragEnd = () => {
    setDraggedIndex(null);
  };

  const handleSave = () => {
    // Here you would typically send the updated order to your backend
    console.log("Saving new order:", contents);
    setHasChanges(false);
    setIsConfirmationOpen(false);
  };
  const navigate = useNavigate();

  // const queryString = generateQueryString({
  //   page_number: String(page),
  //   page_size: String(limit),
  //   status,
  //   current_version: currentVersion,
  // });
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["getComponentContents", componentId],
    queryFn: () => getComponentContents(componentId),
  });

  useEffect(() => {
    if (isArray(data)) {
      setContents(data);
    }
  }, [isSuccess, data]);
  if (isLoading) return <TableSkeleton />;
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>{get(data, [0, "name"], "-")}</CardTitle>
          <CardDescription>Manage Contents of Component</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Button
              onClick={() => {
                navigate(`/cms/components/${componentId}`);
              }}
              className="mb-4"
            >
              <Plus className="mr-2 h-4 w-4" /> Add Content
            </Button>
            {/* <Select
              onValueChange={(value) => {
                setStatus(value);
              }}
              value={status}
            >
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select a Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Status</SelectLabel>
                  {statusList.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <Select
              onValueChange={(value) => {
                setCurrentVersion(value);
              }}
              value={currentVersion}
            >
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select a Version" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Version</SelectLabel>
                  {Array.from({ length: 5 }, (_, index) =>
                    (index + 1).toString(),
                  ).map((version, index) => (
                    <SelectItem key={index} value={version}>
                      {version}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select> */}
          </div>
          <ScrollArea>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead></TableHead>
                  <TableHead>#</TableHead>
                  <TableHead className="w-[100px]">Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Version</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-center">Action</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {isArray(data) &&
                  data.map((content, index) => (
                    <TableRow
                      key={index}
                      draggable
                      onDragStart={(e) => onDragStart(e, index)}
                      onDragOver={(e) => onDragOver(e, index)}
                      onDragEnd={onDragEnd}
                      className={draggedIndex === index ? "opacity-50" : ""}
                    >
                      <TableCell>
                        <GripVertical className="h-4 w-4 text-gray-400 cursor-move" />
                      </TableCell>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell className="font-medium">
                        {/* <Button asChild variant="link" className="no-underline"> */}
                        {/* <Link to="/cms/segments/123/components"> */}
                        {get(content, ["content_name"])}
                        {/* </Link> */}
                        {/* </Button> */}
                      </TableCell>
                      <TableCell>
                        {get(content, ["content_type"]) || "-"}
                      </TableCell>
                      <TableCell>
                        {" "}
                        {get(content, ["current_version"]) || "-"}
                      </TableCell>
                      <TableCell> {get(content, ["status"]) || "-"}</TableCell>
                      <TableCell className="text-center">
                        <Button
                          variant="outline"
                          size="sm"
                          className="mr-2"
                          onClick={() => {
                            navigate(
                              `/cms/contents/${content.contents.content_id}`,
                            );
                          }}
                        >
                          <Edit className="mr-2 h-4 w-4" /> Edit
                        </Button>
                        {/* <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => {}}
                      >
                        <Trash2 className="mr-2 h-4 w-4" /> Delete
                      </Button> */}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </CardContent>
      </Card>
      {hasChanges && (
        <div className="mt-4 text-center">
          <Button onClick={() => setIsConfirmationOpen(true)}>
            Save Changes
          </Button>
        </div>
      )}

      <Dialog open={isConfirmationOpen} onOpenChange={setIsConfirmationOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Changes</DialogTitle>
            <DialogDescription>
              Are you sure you want to save the new order?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsConfirmationOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleSave}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
