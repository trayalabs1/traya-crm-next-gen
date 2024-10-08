import { useState } from "react";
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@components/ui/table";
import {
  Dialog,
  //   DialogContent,
  //   DialogDescription,
  //   DialogFooter,
  //   DialogHeader,
  //   DialogTitle,
  DialogTrigger,
} from "@components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";
import { Badge } from "@components/ui/badge";
import { Plus, Filter, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { FilterDialog } from "./FilterDialog";

const mockUsers = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    phone: "123-456-7890",
    alternateEmail: "john.alt@example.com",
    role: "admin",
    language: "English",
    team: "Sales",
    description: "Senior sales representative",
    tips: "Excellent at closing deals",
    house: "inhouse",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "987-654-3210",
    alternateEmail: "jane.alt@example.com",
    role: "manager",
    language: "Spanish",
    team: "Marketing",
    description: "Marketing team lead",
    tips: "Creative campaign designer",
    house: "inhouse",
  },
  {
    id: 3,
    name: "Bob Johnson",
    email: "bob@example.com",
    phone: "456-789-0123",
    alternateEmail: "bob.alt@example.com",
    role: "developer",
    language: "French",
    team: "IT",
    description: "Senior full-stack developer",
    tips: "Expertise in React and Node.js",
    house: "outsource",
  },
];

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  alternateEmail?: string;
  role: string;
  language: string;
  team: string;
  description: string;
  tips: string;
  house: string;
}

export type FilterUser = Pick<
  User,
  "name" | "email" | "phone" | "role" | "language" | "team" | "house"
>;
export default function Users() {
  const [users] = useState<User[]>(mockUsers);
  const [filteredUsers, setFilteredUsers] = useState<User[]>(mockUsers);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);
  const navigate = useNavigate();
  const usersPerPage = 10;

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const handleFilterApply = (filters: FilterUser) => {
    let result = users;

    if (filters.name) {
      result = result.filter((user) =>
        user.name.toLowerCase().includes(filters.name.toLowerCase()),
      );
    }
    if (filters.role) {
      result = result.filter((user) => user.role === filters.role);
    }
    if (filters.house) {
      result = result.filter((user) => user.house === filters.house);
    }

    setFilteredUsers(result);
    setCurrentPage(1);
    setIsFilterDialogOpen(false);
  };

  const handleFilterClear = () => {
    setFilteredUsers(users);
    setCurrentPage(1);
    setIsFilterDialogOpen(false);
  };

  return (
    <div className="container mx-auto py-10">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Users Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Input
                placeholder="Search users..."
                className="w-64"
                onChange={(e) => {
                  const searchTerm = e.target.value.toLowerCase();
                  const filtered = users.filter(
                    (user) =>
                      user.name.toLowerCase().includes(searchTerm) ||
                      user.email.toLowerCase().includes(searchTerm),
                  );
                  setFilteredUsers(filtered);
                  setCurrentPage(1);
                }}
              />
              <Dialog
                open={isFilterDialogOpen}
                onOpenChange={setIsFilterDialogOpen}
              >
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <Filter className="mr-2 h-4 w-4" /> Filters
                  </Button>
                </DialogTrigger>
                <FilterDialog
                  onApply={handleFilterApply}
                  onClear={handleFilterClear}
                />
              </Dialog>
            </div>
            <Button onClick={() => navigate("/users/new")}>
              <Plus className="mr-2 h-4 w-4" /> Create User
            </Button>
          </div>
        </CardContent>
      </Card>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Team</TableHead>
            <TableHead>House</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentUsers.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.phone}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>{user.team}</TableCell>
              <TableCell>
                <Badge
                  variant={user.house === "inhouse" ? "default" : "secondary"}
                >
                  {user.house}
                </Badge>
              </TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  onClick={() => navigate(`/users/${user.id}`)}
                >
                  Edit
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex items-center justify-between space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>
        <div className="text-sm text-muted-foreground">
          Page {currentPage} of {totalPages}
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
