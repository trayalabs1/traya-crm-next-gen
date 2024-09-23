import { Button } from "@components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@components/ui/card";
import TableSkeleton from "@components/ui/Loader/TableSkeleton";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@components/ui/pagination";
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
  //   TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@components/ui/table";
import { Edit, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useGetContents } from "src/queries";

const status = [
  "draft",
  "submitted",
  "approved_by_checker",
  "approved_by_publisher",
  "published",
];
export default function ContentManager() {
  const navigate = useNavigate();

  const { data, isLoading } = useGetContents();

  if (isLoading) return <TableSkeleton />;
  return (
    <Card>
      <CardHeader>
        <CardTitle>Contents</CardTitle>
        <CardDescription>Manage your contents</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          <Button
            onClick={() => {
              navigate("new");
            }}
            className="mb-4"
          >
            <Plus className="mr-2 h-4 w-4" /> Create Content
          </Button>
          {/* <Button onClick={() => {}} className="mb-4">
            <Plus className="mr-2 h-4 w-4" /> Add Component
          </Button>
          <Button onClick={() => {}} className="mb-4">
            <Plus className="mr-2 h-4 w-4" /> Add Content
          </Button> */}
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
                <TableHead>#</TableHead>
                <TableHead className="w-[100px]">Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Current Version</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-center">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.mainData.map((content, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell className="font-medium">
                    {/* <Button asChild variant="link" className="no-underline">
                        <Link to="#">
                          {content.name}
                        </Link>
                      </Button> */}
                    {content.name}
                  </TableCell>
                  <TableCell>{content.type}</TableCell>
                  <TableCell>{content.current_version}</TableCell>
                  <TableCell>{content.status}</TableCell>
                  <TableCell className="text-center">
                    <Button
                      variant="outline"
                      size="sm"
                      className="mr-2"
                      onClick={() => {
                        navigate(content.content_id);
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
            <TableFooter>
              <TableRow>
                <TableCell colSpan={7}>
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious href="#" />
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href="#">1</PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href="#" isActive>
                          2
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href="#">3</PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationEllipsis />
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationNext href="#" />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
