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
import { Edit, FilterX, GitCompare, Plus } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { get, map } from "lodash";
import {
  formatWithSpaces,
  genderList,
  generateQueryString,
  getCMSActionButtonColor,
  getCMSFilterStatusByRole,
  PAGINATION_CONFIG,
  ROLES_NAME,
} from "@utils/common";
import GenericPagination from "@components/ui/GenericPagination";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@components/ui/tooltip";
import { useAuth } from "src/context/useAuth";
import DiffCheckerDrawer from "../DiffChecker/DiffCheckerDrawer";
import { Component, MobileComponent } from "cms";
import { useDiffCheckerStore } from "../store/useCmsStore";
import useFilteredStatusList from "@hooks/useFilteredStatusList";

export default function ComponentManager() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [page, setPage] = useState<number>(PAGINATION_CONFIG.DEFAULT_PAGE);
  const [limit, setLimit] = useState<number>(PAGINATION_CONFIG.DEFAULT_LIMIT);
  const DEFAULT_STATUS = getCMSFilterStatusByRole(user?.role);
  const [status, setStatus] = useState<string>(DEFAULT_STATUS);
  const [gender, setGender] = useState<string>("");
  const [version, setVersion] = useState<string>("");

  const queryString = generateQueryString({
    page_number: String(page),
    page_size: String(limit),
    status,
    current_version: version,
    gender,
  });

  const { data, isLoading } = useQuery({
    queryKey: ["getComponents", queryString],
    queryFn: () => getComponents(queryString),
  });

  const {
    isDiffCheckerOpen,
    toggleDiffCheckerDrawer,
    updateDiffStates,
    fetchDiffComponentsBulk,
    fetchDiffContentsBulk,
    resetDiffCheckerStates,
  } = useDiffCheckerStore();

  const handleDiffChecker = async (component: Component) => {
    resetDiffCheckerStates();
    updateDiffStates({
      entityType: "component",
      component: component,
      currentVersion: null,
      newVersion: null,
    });

    await fetchDiffComponentsBulk({
      type: "currentVersion",
      componentIds: [component.component_id],
    });

    let dataKey = "data";
    if (component.status === "draft") {
      dataKey = "draft_data";
    }

    const contentIds = map(
      get(component, [dataKey, "content_ids"]),
      "content_id",
    );

    if (component.status !== "published") {
      const response = await fetchDiffContentsBulk({
        contentIds: contentIds,
      });

      if (response?.status === 200 && response.data) {
        const transformComponentData: MobileComponent[] = [
          {
            componentId: component.component_id,
            name: component.name,
            title: get(
              component,
              component.status === "draft" ? "draft_data.title" : "data.title",
              "",
            ),
            description: get(
              component,
              component.status === "draft"
                ? "draft_data.description"
                : "data.description",
              "",
            ),
            contents: response.data,
          },
        ];

        updateDiffStates({ newVersion: transformComponentData });
      }
    }
    toggleDiffCheckerDrawer();
  };

  function handleClearFilter() {
    setPage(PAGINATION_CONFIG.DEFAULT_PAGE);
    setLimit(PAGINATION_CONFIG.DEFAULT_LIMIT);
    setStatus(DEFAULT_STATUS);
    setVersion("");
    setGender("");
  }

  const statusOptions = useFilteredStatusList(user?.role);

  if (isLoading) return <TableSkeleton />;

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Components</CardTitle>
          <CardDescription>Manage your components</CardDescription>
        </CardHeader>
        <CardContent>
          <TooltipProvider>
            <div className="flex flex-wrap gap-2">
              {user?.role === ROLES_NAME.MAKER ? (
                <Button
                  onClick={() => {
                    navigate("new");
                  }}
                  className="mb-4"
                  disabled={user?.role !== "maker"}
                >
                  <Plus className="mr-2 h-4 w-4" /> Create Component
                </Button>
              ) : null}
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
                    {statusOptions.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Select
                onValueChange={(value) => {
                  setGender(value);
                  setPage(1);
                }}
                value={gender}
              >
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Select a Gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Gender</SelectLabel>
                    {genderList.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Select
                onValueChange={(value) => {
                  setVersion(value);
                  setPage(1);
                }}
                value={version}
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
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleClearFilter}
                  >
                    <FilterX className="h-4 w-4 text-red-600" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Clear Filter</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <ScrollArea>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>#</TableHead>
                    <TableHead className="w-[100px]">Name</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Gender</TableHead>
                    <TableHead>Current Version</TableHead>
                    <TableHead className="text-center">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data?.mainData?.map((component, index) => (
                    <TableRow key={index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell className="font-medium">
                        <Button asChild variant="link" className="no-underline">
                          <Link
                            // to={`${component.component_id}/contents`}
                            to="#"
                          >
                            {get(component, ["name"], "-") || "-"}
                          </Link>
                        </Button>
                      </TableCell>
                      <TableCell>
                        {get(component, ["data", "title"], "-") || "-"}
                      </TableCell>
                      <TableCell>
                        {get(component, ["data", "description"], "-") || "-"}
                      </TableCell>
                      <TableCell>
                        {formatWithSpaces(component.status) || "-"}
                      </TableCell>
                      <TableCell> {get(component, "gender") || "-"}</TableCell>
                      <TableCell>{component.current_version}</TableCell>
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
                                onClick={() => handleDiffChecker(component)}
                              >
                                <GitCompare className="h-4 w-4" />
                                <span className="sr-only">View</span>
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>View</p>
                            </TooltipContent>
                          </Tooltip>

                          {user?.role === ROLES_NAME.MAKER ? (
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
            </ScrollArea>
          </TooltipProvider>
        </CardContent>
      </Card>
      <DiffCheckerDrawer
        isDrawerOpen={isDiffCheckerOpen}
        toggleDrawer={toggleDiffCheckerDrawer}
        action="CHANGES"
      />
    </>
  );
}
