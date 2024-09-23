import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";

// Mock data for demonstration
const mockApprovalLogs = [
  {
    _id: "1",
    entity_type: "content",
    entity_id: "60d5ecb74f421abcdef12345",
    from_version: 1,
    to_version: 2,
    diff_id: "diff_123",
    status: "approved_by_checker",
    approver_id: "60d5ecb74f421abcdef67890",
    approver_role: "checker",
    approver_comments: "Looks good",
    attachments: ["file1.pdf"],
    created_at: new Date("2023-06-15T10:00:00Z"),
  },
  {
    _id: "2",
    entity_type: "segment",
    entity_id: "60d5ecb74f421abcdef23456",
    from_version: 2,
    to_version: 3,
    diff_id: "diff_456",
    status: "approved_by_publisher",
    approver_id: "60d5ecb74f421abcdef78901",
    approver_role: "publisher",
    approver_comments: "Approved for publication",
    attachments: [],
    created_at: new Date("2023-06-16T14:30:00Z"),
  },
  {
    _id: "3",
    entity_type: "component",
    entity_id: "60d5ecb74f421abcdef34567",
    from_version: 1,
    to_version: 2,
    diff_id: "diff_789",
    status: "rejected",
    approver_id: "60d5ecb74f421abcdef89012",
    approver_role: "checker",
    approver_comments: "Needs revision",
    attachments: ["file2.docx", "file3.png"],
    created_at: new Date("2023-06-17T09:15:00Z"),
  },
];

export default function ApprovalLogUI() {
  const [entityTypeFilter, setEntityTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredLogs = mockApprovalLogs.filter(
    (log) =>
      (entityTypeFilter === "all" || log.entity_type === entityTypeFilter) &&
      (statusFilter === "all" || log.status === statusFilter),
  );

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Approval Logs</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-4 mb-4">
          <Select onValueChange={setEntityTypeFilter} defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by Entity Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Entity Types</SelectItem>
              <SelectItem value="content">Content</SelectItem>
              <SelectItem value="segment">Segment</SelectItem>
              <SelectItem value="component">Component</SelectItem>
            </SelectContent>
          </Select>
          <Select onValueChange={setStatusFilter} defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="approved_by_checker">
                Approved by Checker
              </SelectItem>
              <SelectItem value="approved_by_publisher">
                Approved by Publisher
              </SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Entity Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>From Version</TableHead>
              <TableHead>To Version</TableHead>
              <TableHead>Approver Role</TableHead>
              <TableHead>Created At</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLogs.map((log) => (
              <TableRow key={log._id}>
                <TableCell>{log.entity_type}</TableCell>
                <TableCell>{log.status}</TableCell>
                <TableCell>{log.from_version}</TableCell>
                <TableCell>{log.to_version}</TableCell>
                <TableCell>{log.approver_role}</TableCell>
                <TableCell>{log.created_at.toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
