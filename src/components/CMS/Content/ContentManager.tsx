import { Button } from "@components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@components/ui/card";
import GenericPagination from "@components/ui/GenericPagination";
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
import { Edit, GitCompare, Plus } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetContents } from "src/queries";
import { get } from "lodash";
import {
  generateQueryString,
  getCMSActionButtonColor,
  PAGINATION_CONFIG,
} from "@utils/common";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@components/ui/tooltip";
import { ROLES } from "@utils/user";
import { useAuth } from "src/context/useAuth";
import { Content } from "cms";
import DiffCheckerDrawer from "../DiffChecker/DiffCheckerDrawer";
const statusList = [
  { label: "Draft", value: "draft" },
  { label: "Submitted", value: "submitted" },
  { label: "Approved By Checker", value: "approved_by_checker" },
  { label: "Approved By Publisher", value: "approved_by_publisher" },
  { label: "Published", value: "published" },
];
export default function ContentManager() {
  const navigate = useNavigate();

  const [page, setPage] = useState<number>(PAGINATION_CONFIG.DEFAULT_PAGE);
  const [limit] = useState<number>(PAGINATION_CONFIG.DEFAULT_LIMIT);
  const [status, setStatus] = useState<string>("");
  const [currentVersion, setCurrentVersion] = useState<string>("");

  const queryString = generateQueryString({
    page_number: String(page),
    page_size: String(limit),
    status,
    current_version: currentVersion,
  });

  const { user } = useAuth();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [selectedContent, setSelectedContent] = useState<Content | null>(null);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const { data, isLoading } = useGetContents(queryString);

  if (isLoading) return <TableSkeleton />;
  return (
    <>
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
                      {/* <TableCell className="text-center">
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
                    <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => {}}
                      >
                        <Trash2 className="mr-2 h-4 w-4" /> Delete
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
                                  setSelectedContent(content);
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
                                    navigate(content.content_id);
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
        diffEntity="content"
        action="CHANGES"
        content={selectedContent}
      />
    </>
  );
}
