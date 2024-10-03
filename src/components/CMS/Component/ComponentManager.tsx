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
import { getComponents } from "@services/cmsServices";
import { useQuery } from "@tanstack/react-query";
import { Edit, GitCompare, Plus } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { get } from "lodash";
import {
  generateQueryString,
  getCMSActionButtonColor,
  getCMSFilterStatusByRole,
  PAGINATION_CONFIG,
} from "@utils/common";
import GenericPagination from "@components/ui/GenericPagination";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@components/ui/tooltip";
import { ROLES } from "@utils/user";
import { useAuth } from "src/context/useAuth";
import DiffCheckerDrawer from "../DiffChecker/DiffCheckerDrawer";
import { Component } from "cms";
const statusList = [
  { label: "Draft", value: "draft" },
  { label: "Submitted", value: "submitted" },
  { label: "Approved By Checker", value: "approved_by_checker" },
  { label: "Approved By Publisher", value: "approved_by_publisher" },
  { label: "Published", value: "published" },
];
export default function ComponentManager() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [page, setPage] = useState<number>(PAGINATION_CONFIG.DEFAULT_PAGE);
  const [limit] = useState<number>(PAGINATION_CONFIG.DEFAULT_LIMIT);
  const DEFAULT_STATUS = getCMSFilterStatusByRole(user?.role);
  const [status, setStatus] = useState<string>(DEFAULT_STATUS);
  const [currentVersion, setCurrentVersion] = useState<string>("");

  const queryString = generateQueryString({
    page_number: String(page),
    page_size: String(limit),
    status,
    current_version: currentVersion,
  });

  const { data, isLoading } = useQuery({
    queryKey: ["getComponents", queryString],
    queryFn: () => getComponents(queryString),
  });

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [selectedComponent, setSelectedComponent] = useState<Component | null>(
    null,
  );

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  if (isLoading) return <TableSkeleton />;

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Components</CardTitle>
          <CardDescription>Manage your components</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Button
              onClick={() => {
                navigate("new");
              }}
              className="mb-4"
            >
              <Plus className="mr-2 h-4 w-4" /> Create Component
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
                    <TableHead>Title</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Current Version</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-center">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data?.mainData?.map((component, index) => (
                    <TableRow key={index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell className="font-medium">
                        <Button asChild variant="link" className="no-underline">
                          <Link to={`${component.component_id}/contents`}>
                            {get(component, ["name"], "-") || "-"}
                          </Link>
                        </Button>
                      </TableCell>
                      <TableCell>
                        {get(component, ["data", "title"], "-") || "-"}
                      </TableCell>
                      <TableCell>
                        {" "}
                        {get(component, ["data", "description"], "-") || "-"}
                      </TableCell>
                      <TableCell>{component.current_version}</TableCell>
                      <TableCell>{component.status}</TableCell>
                      {/* <TableCell className="text-center">
                    <Button
                      variant="outline"
                      size="sm"
                      className="mr-2"
                      onClick={() => {
                        navigate(component.component_id);
                      }}
                    >
                      <Edit className="mr-2 h-4 w-4" /> Edit
                    </Button>
   
                  </TableCell> */}

                      <TableCell className="text-center">
                        <div className="flex justify-center space-x-2">
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="outline"
                                size="icon"
                                className={getCMSActionButtonColor("compare")}
                                onClick={() => {
                                  setSelectedComponent(component);
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
                                    navigate(component.component_id);
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
                        totalItems={get(data, ["total_count"], 0)}
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
        diffEntity="component"
        action="CHANGES"
        component={selectedComponent}
      />
    </>
  );
}
