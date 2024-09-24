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
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@components/ui/table";
import { Edit, GripVertical, Plus } from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// const segments = [
//   {
//     segment_id: "segment_id_1st",
//     name: "female-draft",
//     gender: "female",
//     weeks_in_program: 1,
//     order_counts: 1,
//     recommended_products: ["prod1", "prod2"],
//     status: "draft",
//     data: {
//       component_ids: [],
//     },
//     current_version: 3,
//     draft_version: 3,
//     draft: {
//       name: "female-draft",
//       gender: "female",
//       weeks_in_program: 1,
//       product_counts: 1,
//       recommended_products: ["prod1", "prod2"],
//       data: {
//         component_ids: [],
//       },
//     },
//     created_by: "user_id_1",
//     created_at: "2024-06-10T00:00:00Z",
//     updated_by: "user_id_3",
//     updated_at: "2024-06-12T00:00:00Z",
//   },
//   {
//     segment_id: "segment_id_2st",
//     name: "female-draft",
//     gender: "female",
//     weeks_in_program: 1,
//     order_counts: 1,
//     recommended_products: ["prod1", "prod2"],
//     status: "draft",
//     data: {
//       component_ids: [],
//     },
//     current_version: 3,
//     draft_version: 3,
//     draft: {
//       name: "female-draft",
//       gender: "female",
//       weeks_in_program: 1,
//       product_counts: 1,
//       recommended_products: ["prod1", "prod2"],
//       data: {
//         component_ids: [],
//       },
//     },
//     created_by: "user_id_1",
//     created_at: "2024-06-10T00:00:00Z",
//     updated_by: "user_id_3",
//     updated_at: "2024-06-12T00:00:00Z",
//   },
//   {
//     segment_id: "segment_id_3st",
//     name: "female-draft",
//     gender: "female",
//     weeks_in_program: 1,
//     order_counts: 1,
//     recommended_products: ["prod1", "prod2"],
//     status: "draft",
//     data: {
//       component_ids: [],
//     },
//     current_version: 3,
//     draft_version: 3,
//     draft: {
//       name: "female-draft",
//       gender: "female",
//       weeks_in_program: 1,
//       product_counts: 1,
//       recommended_products: ["prod1", "prod2"],
//       data: {
//         component_ids: [],
//       },
//     },
//     created_by: "user_id_1",
//     created_at: "2024-06-10T00:00:00Z",
//     updated_by: "user_id_3",
//     updated_at: "2024-06-12T00:00:00Z",
//   },
// ];

const status = [
  "draft",
  "submitted",
  "approved_by_checker",
  "approved_by_publisher",
  "published",
];

// interface Component {
//   component_id: string;
//   data: {
//     name: string;
//     description: string;
//     content_ids: string[]; // Array of strings, assuming content IDs are strings
//   };
//   status:
//     | "draft"
//     | "submitted"
//     | "approved_by_checker"
//     | "approved_by_publisher"
//     | "published";
//   current_version: number;
// }

const initialContent = Array(10)
  .fill(null)
  .map((_, index) => ({
    id: `content-${index + 1}`,
    data: {
      name: `content ${index + 1}`,
      description: `Description for content ${index + 1}`,
    },
    status: "draft",
  }));
export default function ComponentContents() {
  const { componentId } = useParams();
  const [contents, setContents] = useState(initialContent);
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

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Component {componentId}</CardTitle>
          <CardDescription>Manage Contents</CardDescription>
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
            <Select>
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
            </Select>
          </div>
          <ScrollArea>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead></TableHead>
                  <TableHead>#</TableHead>
                  <TableHead className="w-[100px]">Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-center">Action</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {contents.map((content, index) => (
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
                      {content.data.name}
                      {/* </Link> */}
                      {/* </Button> */}
                    </TableCell>
                    <TableCell>{content.data.description}</TableCell>
                    <TableCell>{content.status}</TableCell>
                    <TableCell className="text-center">
                      <Button
                        variant="outline"
                        size="sm"
                        className="mr-2"
                        onClick={() => {
                          navigate(`/cms/contents/${content.id}`);
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
