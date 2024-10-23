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
import { Edit, FilterX, GitCompare, History } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { get, isArray, map, isEmpty } from "lodash";
import {
  customerTypeList,
  formatWithSpaces,
  genderList,
  generateQueryString,
  getCMSActionButtonColor,
  getCMSFilterStatusByRole,
  PAGINATION_CONFIG,
  ROLES_NAME,
} from "@utils/common";
import GenericPagination from "@components/ui/GenericPagination";
import { useAuth } from "src/context/useAuth";
import DiffCheckerDrawer from "../DiffChecker/DiffCheckerDrawer";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@components/ui/tooltip";
import { Segment } from "cms";
import { useDiffCheckerStore } from "../store/useCmsStore";
import useFilteredStatusList from "@hooks/useFilteredStatusList";
import { cn } from "@utils/shadcn";
import { Input } from "@components/ui/input";
import useDebounce from "@hooks/use-debounce";
import { useLoader } from "@providers/LoaderProvider";
export default function SegmentManager() {
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(PAGINATION_CONFIG.DEFAULT_PAGE);
  const [limit, setLimit] = useState<number>(PAGINATION_CONFIG.DEFAULT_LIMIT);
  const { user } = useAuth();
  const DEFAULT_STATUS = getCMSFilterStatusByRole(user?.role);
  const [status, setStatus] = useState<string>(DEFAULT_STATUS);
  const [version, setVersion] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [customerType, setCustomerType] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const debouncedSearch = useDebounce(search, 600);

  const queryString = generateQueryString({
    page_number: String(page),
    page_size: String(limit),
    status,
    current_version: version,
    gender,
    customer_type: customerType,
    search: debouncedSearch,
  });
  const { data, isLoading } = useQuery({
    queryKey: ["getSegments", queryString],
    queryFn: () => getSegments(queryString),
  });

  const statusOptions = useFilteredStatusList(user?.role);

  const {
    isDiffCheckerOpen,
    toggleDiffCheckerDrawer,
    fetchDiffSegment,
    fetchDiffComponentsBulk,
    updateDiffStates,
    resetDiffCheckerStates,
  } = useDiffCheckerStore();
  const loader = useLoader();

  const handleDiffChecker = async (segment: Segment) => {
    loader.start();
    resetDiffCheckerStates();
    updateDiffStates({
      entityType: "segment",
      segment,
      currentVersion: null,
      newVersion: null,
      data: segment.data,
      draftData: segment.draft_data,
    });

    //Check for new segement, Not have data
    if (!(segment.status === "draft" && isEmpty(segment.data))) {
      await fetchDiffSegment({
        type: "currentVersion",
        segmentId: segment.segment_id,
      });
    }

    if (segment.status !== "published") {
      const componentIds = map(
        get(segment, ["draft_data", "component_ids"]),
        "component_id",
      );

      await fetchDiffComponentsBulk({
        type: "newVersion",
        componentIds: componentIds,
      });
    }
    toggleDiffCheckerDrawer();
    loader.stop();
  };

  function handleClearFilter() {
    setPage(PAGINATION_CONFIG.DEFAULT_PAGE);
    setLimit(PAGINATION_CONFIG.DEFAULT_LIMIT);
    setStatus(DEFAULT_STATUS);
    setVersion("");
    setGender("");
    setCustomerType("");
    setSearch("");
  }
  if (isLoading) return <TableSkeleton />;
  return (
    <>
      <Card className="h-full">
        <CardHeader>
          <CardTitle>Segments</CardTitle>
          <CardDescription>Manage your segments</CardDescription>
        </CardHeader>
        <CardContent>
          <TooltipProvider>
            <div className="flex flex-wrap gap-2">
              {/* {user?.role === ROLES_NAME.MAKER ? (
                <Button
                  disabled
                  onClick={() => {
                    navigate("new");
                  }}
                  className="mb-4"
                >
                  <Plus className="mr-2 h-4 w-4" /> Add Segment
                </Button>
              ) : null} */}
              {/* Search Input Field */}
              <Input
                placeholder="Search Segments"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1); // Reset to first page on search
                }}
                className="w-[200px]"
              />
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
                    {genderList
                      .filter((gender) => gender.label !== "Both")
                      .map((item) => (
                        <SelectItem key={item.value} value={item.value}>
                          {item.label}
                        </SelectItem>
                      ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Select
                onValueChange={(value) => {
                  setCustomerType(value);
                  setPage(1);
                }}
                value={customerType}
              >
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Select a Customer Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Customer Type</SelectLabel>
                    {customerTypeList.map((item) => (
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
                    <TableHead>Status</TableHead>
                    <TableHead>Gender</TableHead>
                    {/* <TableHead>Week In Program</TableHead> */}
                    <TableHead>Customer Type</TableHead>
                    <TableHead>Current Version</TableHead>
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
                            className={cn(
                              "no-underline",
                              user?.role !== ROLES_NAME.MAKER
                                ? "cursor-not-allowed"
                                : "",
                            )}
                          >
                            <Link
                              to={
                                user?.role !== ROLES_NAME.MAKER
                                  ? "#"
                                  : segment.segment_id
                              }
                            >
                              {segment.name}
                            </Link>
                          </Button>
                        </TableCell>
                        <TableCell>
                          {formatWithSpaces(segment.status) || "-"}
                        </TableCell>
                        <TableCell>{segment.gender}</TableCell>
                        <TableCell>{segment.customer_type}</TableCell>

                        {/* <TableCell>{segment.weeks_in_program}</TableCell>*/}

                        <TableCell>{segment.current_version}</TableCell>
                        <TableCell className="text-center">
                          <div className="flex justify-center space-x-2">
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="icon"
                                  asChild
                                  className="text-white bg-teal-400 hover:bg-teal-600 focus:bg-teal-600"
                                >
                                  <Link
                                    to={`/cms/version-history/segment/${segment.segment_id}`}
                                    state={{ segment }}
                                  >
                                    <History />
                                  </Link>
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Version History</p>
                              </TooltipContent>
                            </Tooltip>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className={getCMSActionButtonColor("compare")}
                                  onClick={() => handleDiffChecker(segment)}
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
