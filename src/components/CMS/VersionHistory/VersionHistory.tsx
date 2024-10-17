import { useEffect, useState } from "react";
import { ScrollArea } from "@components/ui/scroll-area";
import { Badge } from "@components/ui/badge";
import { Button } from "@components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@components/ui/collapsible";
import { Separator } from "@components/ui/separator";
import {
  Check,
  ChevronDown,
  ChevronUp,
  Clock,
  FileText,
  ArrowLeft,
  X,
} from "lucide-react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useVersionHistory } from "@queries/cms/others";
import { Component, Content, EntitiyType } from "cms";
import { get, isArray, isEmpty, startCase } from "lodash";
import NotDataAvailable from "@components/NoDataAvailable/NotDataAvailable";
import { Segment } from "framer-motion";
import { formatWithSpaces } from "@utils/common";

export interface Entities {
  segment?: Segment | null;
  component?: Component | null;
  content?: Content | null;
  unknown?: null;
}

function getEntity(
  entities: Entities,
  entity: EntitiyType | null,
): Segment | Component | Content | null {
  if (!entity) return null;

  return entities[entity] ?? null;
}
export default function VersionHistory() {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 150) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);
  const toggleItem = (id: string) => {
    setExpandedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const { entityId, entityType } = useParams<{
    entityType: EntitiyType;
    entityId: string;
  }>();

  const location = useLocation();
  const state = location.state as Entities;

  const entities: Entities = {
    segment: state?.segment ?? null,
    component: state?.component ?? null,
    content: state?.content ?? null,
    unknown: null,
  };

  const entity = getEntity(entities, entityType ?? "unknown");

  const { data: history } = useVersionHistory({
    entityId: entityId ?? "entityId",
    entityType: entityType ?? "unknown",
  });
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved_by_checker":
      case "approved_by_publisher":
      case "published":
        return <Check className="h-6 w-6 text-green-500" />;
      case "rejected":
        return <X className="h-6 w-6 text-red-500" />;
      default:
        return <Clock className="h-6 w-6 text-blue-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved_by_checker":
      case "approved_by_publisher":
      case "published":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-blue-100 text-blue-800";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
  };

  function onBack() {
    navigate(-1);
  }
  if (isEmpty(history)) {
    return (
      <NotDataAvailable
        message="No History Available"
        description="There is currently no version history available for this entity. Please check back later."
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8 flex items-center justify-between flex-wrap">
          <Button
            variant="ghost"
            className="flex items-center text-gray-600 hover:text-gray-900 flex-wrap"
            onClick={onBack}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            <span className="font-bold text-xl">
              Back to {startCase(entityType)}s
            </span>
          </Button>
          <h1 className="text-3xl font-bold text-gray-900">Version History</h1>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle>{startCase(entityType)} Version History</CardTitle>
              <Badge variant="outline" className="text-sm font-medium">
                {history?.length} Entries
              </Badge>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[calc(100vh-12rem)] pr-4">
                <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:h-full before:w-0.5 before:-translate-x-px before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
                  {isArray(history) &&
                    history.map((item) => (
                      <div
                        key={item._id}
                        className="relative flex items-center"
                      >
                        <div className="absolute left-0 mt-1 h-10 w-10 rounded-full border-4 border-white bg-slate-300 flex items-center justify-center">
                          {getStatusIcon(item.status)}
                        </div>
                        <div className="flex-1 ml-12">
                          <div
                            className={`p-4 rounded-lg shadow-md ${getStatusColor(item.status)}`}
                          >
                            <Collapsible
                              open={expandedItems.includes(item._id)}
                              onOpenChange={() => toggleItem(item._id)}
                            >
                              <div className="flex items-start justify-between">
                                <div>
                                  <h3 className="text-lg font-semibold">
                                    {item.user_name} has{" "}
                                    {item.status.startsWith("approve")
                                      ? "approved"
                                      : item.status}{" "}
                                    the {entityType}
                                  </h3>
                                  <p className="text-sm text-gray-600">
                                    {formatDate(item.created_at)}
                                  </p>
                                  <p className="text-sm text-gray-600 mt-1">
                                    Role: {item.role}
                                  </p>
                                  <p className="text-sm text-gray-600">
                                    Version: {item.from_version} →{" "}
                                    {item.to_version}
                                  </p>
                                </div>
                                <Badge
                                  className={`${getStatusColor(item.status)} ml-2 hover:text-white`}
                                >
                                  {formatWithSpaces(item.status)}
                                </Badge>
                              </div>
                              {item.comments && (
                                <p className="text-sm text-gray-700 mt-2">
                                  <span className="font-semibold">
                                    Comment:
                                  </span>{" "}
                                  {item.comments}
                                </p>
                              )}
                              {item.attachments &&
                                item.attachments.length > 0 && (
                                  <div className="mt-2">
                                    <span className="text-sm font-semibold">
                                      Attachments:
                                    </span>
                                    <Button
                                      variant="link"
                                      className="flex items-center mt-1 text-sm text-blue-600 hover:underline"
                                      onClick={() => {
                                        item.attachments.forEach(
                                          (url: string) => {
                                            const link =
                                              document.createElement("a");
                                            link.href = url;
                                            link.download = "";
                                            document.body.appendChild(link);
                                            link.click();
                                            document.body.removeChild(link);
                                          },
                                        );
                                      }}
                                    >
                                      <FileText className="h-4 w-4 mr-1" />
                                      View Attachments
                                    </Button>
                                  </div>
                                )}
                              <CollapsibleTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="mt-2"
                                >
                                  {expandedItems.includes(item._id) ? (
                                    <ChevronUp className="h-4 w-4 mr-2" />
                                  ) : (
                                    <ChevronDown className="h-4 w-4 mr-2" />
                                  )}
                                  {expandedItems.includes(item._id)
                                    ? "Hide Changes"
                                    : "Show Changes"}
                                </Button>
                              </CollapsibleTrigger>
                              <CollapsibleContent className="mt-2">
                                <div className="bg-white p-4 rounded-md">
                                  <h4 className="text-sm font-semibold mb-2">
                                    Changes:
                                  </h4>
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                      <h5 className="text-xs font-semibold mb-1">
                                        Old Data:
                                      </h5>
                                      <pre className="text-xs bg-gray-50 p-2 rounded border overflow-x-auto">
                                        {JSON.stringify(item.old_data, null, 2)}
                                      </pre>
                                    </div>
                                    <div>
                                      <h5 className="text-xs font-semibold mb-1">
                                        New Data:
                                      </h5>
                                      <pre className="text-xs bg-gray-50 p-2 rounded border overflow-x-auto">
                                        {JSON.stringify(item.new_data, null, 2)}
                                      </pre>
                                    </div>
                                  </div>
                                </div>
                              </CollapsibleContent>
                            </Collapsible>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
          <div className="space-y-8">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">
                  Quick Summary
                </CardTitle>
                <CardDescription>Key information</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      {startCase(entityType)} Name
                    </h3>
                    <p className="text-xl font-bold text-gray-900">
                      {get(entity, ["name"]) || "-"}
                    </p>
                  </div>
                  <Separator />
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Current Status
                    </h3>
                    <div className="flex items-center mt-1">
                      {getStatusIcon(get(entity, ["status"]) || "-")}
                      <span className="ml-2 text-xl font-semibold capitalize text-gray-900">
                        {get(entity, ["status"]) || "-"}
                      </span>
                    </div>
                  </div>
                  <Separator />
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Latest Version
                    </h3>
                    <p className="text-xl font-bold text-gray-900">
                      {get(entity, ["current_version"]) || "-"}
                    </p>
                  </div>
                  <Separator />
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Last Updated
                    </h3>
                    <p className="text-lg text-gray-900">
                      {formatDate(get(entity, ["updated_at"]) || "-")}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-bold">
                  Version Stats
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-900">
                      {history?.length}
                    </p>
                    <p className="text-sm text-gray-500">Total Changes</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-900">
                      {isArray(history) &&
                        history.filter(
                          (item) =>
                            item.status === "approved_by_checker" ||
                            item.status === "approved_by_publisher" ||
                            item.status === "published",
                        ).length}
                    </p>
                    <p className="text-sm text-gray-500">Approvals</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-900">
                      {isArray(history) &&
                        history.filter(
                          (item) =>
                            item.status === "rejected" ||
                            item.status === "discarded",
                        ).length}
                    </p>
                    <p className="text-sm text-gray-500">Rejections</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-900">
                      {
                        new Set(
                          isArray(history)
                            ? history.map((item) => item.user_id)
                            : [],
                        ).size
                      }
                    </p>
                    <p className="text-sm text-gray-500">Contributors</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      {showScrollTop && (
        <Button
          className="fixed bottom-8 right-8 rounded-full p-2"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <ChevronUp className="h-6 w-6" />
        </Button>
      )}
    </div>
  );
}
