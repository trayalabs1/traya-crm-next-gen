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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@components/ui/table";
import { SegmentComponentsContentsExpandedType } from "cms";
import { Edit, GripVertical, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSegmentComponentContent } from "src/queries/cms/segments";
import { isArray, get } from "lodash";
import TableSkeleton from "@components/ui/Loader/TableSkeleton";
import { formatWithSpaces } from "@utils/common";

export default function SegmentComponents(): React.ReactElement {
  const { segmentId } = useParams<{ segmentId: string }>();
  const [components, setComponents] =
    useState<SegmentComponentsContentsExpandedType>([]);

  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

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
      const newComponents = [...components];
      newComponents.splice(draggedIndex, 1);
      newComponents.splice(index, 0, components[draggedIndex]);
      setComponents(newComponents);
      setDraggedIndex(index);
      setHasChanges(true);
    }
  };

  const onDragEnd = () => {
    setDraggedIndex(null);
  };

  const handleSave = () => {
    // Here you would typically send the updated order to your backend
    console.log("Saving new order:", components);
    setHasChanges(false);
    setIsConfirmationOpen(false);
  };
  const navigate = useNavigate();

  const { data, isSuccess, isLoading } = useSegmentComponentContent({
    segmentId: segmentId ?? "defaultSegmentId",
    draftdata: false,
  });

  useEffect(() => {
    if (isArray(data)) {
      setComponents(data);
    }
  }, [isSuccess, data]);

  if (isLoading) return <TableSkeleton />;

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Segment</CardTitle>
          <CardDescription>Manage Components of Segment</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Button
              onClick={() => {
                navigate(`/cms/segments/${segmentId}`);
              }}
              className="mb-4"
            >
              <Plus className="mr-2 h-4 w-4" /> Add Component
            </Button>
            {/* <Select>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select a Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Status</SelectLabel>
                  {status.map((item, index) => (
                    <SelectItem key={index} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select a Version" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Version</SelectLabel>
                  <SelectItem value="v1">V1</SelectItem>
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
                  <TableHead>Title</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Version</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-center">Action</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {components.map((component, index) => (
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
                      <Button asChild variant="link" className="no-underline">
                        <Link
                          to={`/cms/components/${component.componentId}/contents`}
                        >
                          {get(component, ["name"]) || "-"}
                        </Link>
                      </Button>
                    </TableCell>
                    <TableCell> {get(component, ["title"]) || "-"}</TableCell>
                    <TableCell>
                      {get(component, ["description"]) || "-"}
                    </TableCell>
                    <TableCell>
                      {get(component, ["current_version"]) || "-"}
                    </TableCell>
                    <TableCell>
                      {formatWithSpaces(get(component, ["status"])) || "-"}
                    </TableCell>
                    <TableCell className="text-center">
                      <Button
                        variant="outline"
                        size="sm"
                        className="mr-2"
                        onClick={() => {
                          navigate(`/cms/components/${component.componentId}`);
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
