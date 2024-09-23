import { Button } from "@components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@components/ui/card";
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
import { Link, useNavigate } from "react-router-dom";

const segments = [
  {
    segment_id: "segment_id_1st",
    name: "female-draft",
    gender: "female",
    weeks_in_program: 1,
    order_counts: 1,
    recommended_products: ["prod1", "prod2"],
    status: "draft",
    data: {
      component_ids: [],
    },
    current_version: 3,
    draft_version: 3,
    draft: {
      name: "female-draft",
      gender: "female",
      weeks_in_program: 1,
      product_counts: 1,
      recommended_products: ["prod1", "prod2"],
      data: {
        component_ids: [],
      },
    },
    created_by: "user_id_1",
    created_at: "2024-06-10T00:00:00Z",
    updated_by: "user_id_3",
    updated_at: "2024-06-12T00:00:00Z",
  },
  {
    segment_id: "segment_id_2st",
    name: "female-draft",
    gender: "female",
    weeks_in_program: 1,
    order_counts: 1,
    recommended_products: ["prod1", "prod2"],
    status: "draft",
    data: {
      component_ids: [],
    },
    current_version: 3,
    draft_version: 3,
    draft: {
      name: "female-draft",
      gender: "female",
      weeks_in_program: 1,
      product_counts: 1,
      recommended_products: ["prod1", "prod2"],
      data: {
        component_ids: [],
      },
    },
    created_by: "user_id_1",
    created_at: "2024-06-10T00:00:00Z",
    updated_by: "user_id_3",
    updated_at: "2024-06-12T00:00:00Z",
  },
  {
    segment_id: "segment_id_3st",
    name: "female-draft",
    gender: "female",
    weeks_in_program: 1,
    order_counts: 1,
    recommended_products: ["prod1", "prod2"],
    status: "draft",
    data: {
      component_ids: [],
    },
    current_version: 3,
    draft_version: 3,
    draft: {
      name: "female-draft",
      gender: "female",
      weeks_in_program: 1,
      product_counts: 1,
      recommended_products: ["prod1", "prod2"],
      data: {
        component_ids: [],
      },
    },
    created_by: "user_id_1",
    created_at: "2024-06-10T00:00:00Z",
    updated_by: "user_id_3",
    updated_at: "2024-06-12T00:00:00Z",
  },
];

const status = [
  "draft",
  "submitted",
  "approved_by_checker",
  "approved_by_publisher",
  "published",
];
export default function SegmentManager() {
  const navigate = useNavigate();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Segments</CardTitle>
        <CardDescription>Manage your segments</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          <Button
            onClick={() => {
              navigate("new");
            }}
            className="mb-4"
          >
            <Plus className="mr-2 h-4 w-4" /> Add Segment
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
                <TableHead>Gender</TableHead>
                <TableHead>Week In Program</TableHead>
                <TableHead>Order Count</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-center">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array(10)
                .fill(segments[0])
                .map((segment, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell className="font-medium">
                      <Button asChild variant="link" className="no-underline">
                        <Link to="/cms/segments/123/components">
                          {segment.name}
                        </Link>
                      </Button>
                    </TableCell>
                    <TableCell>{segment.gender}</TableCell>
                    <TableCell>{segment.weeks_in_program}</TableCell>
                    <TableCell>{segment.order_counts}</TableCell>
                    <TableCell>{segment.status}</TableCell>
                    <TableCell className="text-center">
                      <Button
                        variant="outline"
                        size="sm"
                        className="mr-2"
                        onClick={() => {
                          navigate(segment.segment_id)
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
