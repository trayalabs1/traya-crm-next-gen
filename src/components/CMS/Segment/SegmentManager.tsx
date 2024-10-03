import { Button } from "@components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@components/ui/card";
import TableSkeleton from "@components/ui/Loader/TableSkeleton";
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
import { getSegments } from "@services/cmsServices";
import { useQuery } from "@tanstack/react-query";
import { Edit, GitCompare, Plus } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { get, isArray } from "lodash";
import {
  formatWithSpaces,
  generateQueryString,
  getCMSActionButtonColor,
  getCMSFilterStatusByRole,
  PAGINATION_CONFIG,
  statusList,
} from "@utils/common";
import GenericPagination from "@components/ui/GenericPagination";
import { useAuth } from "src/context/useAuth";
import DiffCheckerDrawer from "../DiffChecker/DiffCheckerDrawer";
import { ROLES } from "@utils/user";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@components/ui/tooltip";
import { Segment } from "cms";

export default function SegmentManager() {
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(PAGINATION_CONFIG.DEFAULT_PAGE);
  const [limit] = useState<number>(PAGINATION_CONFIG.DEFAULT_LIMIT);
  const { user } = useAuth();
  const DEFAULT_STATUS = getCMSFilterStatusByRole(user?.role);
  const [status, setStatus] = useState<string>(DEFAULT_STATUS);
  const [currentVersion, setCurrentVersion] = useState<string>("");
  const [selectedSegment, setSelectedSegment] = useState<Segment | null>(null);

  const queryString = generateQueryString({
    page_number: String(page),
    page_size: String(limit),
    status,
    current_version: currentVersion,
  });
  const { data, isLoading } = useQuery({
    queryKey: ["getSegments", queryString],
    queryFn: () => getSegments(queryString),
  });

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  if (isLoading) return <TableSkeleton />;
  return (
    <>
      <Card className="h-full">
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
            <Select
              onValueChange={(value) => {
                setStatus(value);
                setPage(1);
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
                setPage(1);
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
            </Select>
          </div>
          <ScrollArea>
            <TooltipProvider>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>#</TableHead>
                    <TableHead className="w-[100px]">Name</TableHead>
                    <TableHead>Gender</TableHead>
                    {/* <TableHead>Week In Program</TableHead> */}
                    <TableHead>Version</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-center">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isArray(data?.mainData) &&
                    get(data, ["mainData"]).map((segment, index) => (
                      <TableRow key={index}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell className="font-medium">
                          <Button
                            asChild
                            variant="link"
                            className="no-underline"
                          >
                            <Link
                              to={`/cms/segments/${segment.segment_id}/components`}
                            >
                              {segment.name}
                            </Link>
                          </Button>
                        </TableCell>
                        <TableCell>{segment.gender}</TableCell>
                        {/* <TableCell>{segment.weeks_in_program}</TableCell>*/}
                        <TableCell>{segment.current_version}</TableCell>
                        <TableCell>
                          {formatWithSpaces(segment.status) || "-"}
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="flex justify-center space-x-2">
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className={getCMSActionButtonColor("compare")}
                                  onClick={() => {
                                    setSelectedSegment(segment);
                                    toggleDrawer();
                                  }}
                                >
                                  <GitCompare className="h-4 w-4" />
                                  <span className="sr-only">View</span>
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>View</p>
                              </TooltipContent>
                            </Tooltip>

                            {user?.role === ROLES.maker ? (
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    className={getCMSActionButtonColor("edit")}
                                    onClick={() => {
                                      navigate(segment.segment_id);
                                    }}
                                  >
                                    <Edit className="h-4 w-4" />
                                    <span className="sr-only">Edit</span>
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Edit</p>
                                </TooltipContent>
                              </Tooltip>
                            ) : null}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell colSpan={7}>
                      <GenericPagination
                        currentPage={page}
                        itemsPerPage={limit}
                        onPageChange={(page) => setPage(page)}
                        totalItems={get(data, ["row_count"], 0)}
                      />
                    </TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </TooltipProvider>
          </ScrollArea>
        </CardContent>
      </Card>
      <DiffCheckerDrawer
        isDrawerOpen={isDrawerOpen}
        toggleDrawer={toggleDrawer}
        currentVersion={{}}
        newVersion={{}}
        diffEntity="segment"
        action="CHANGES"
        segment={selectedSegment}
      />
    </>
  );
}
