import { useState } from "react";
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { Label } from "@components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@components/ui/dialog";
import { FilterUser } from "./Users";

type FilterDialogProps = {
  onApply: (filters: FilterUser) => void;
  onClear: () => void;
};

export function FilterDialog({ onApply, onClear }: FilterDialogProps) {
  const [filters, setFilters] = useState<FilterUser>({
    name: "",
    email: "",
    phone: "",
    role: "",
    language: "",
    team: "",
    house: "",
  });

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Filter Users</DialogTitle>
        <DialogDescription>
          Apply filters to narrow down the user list. Click apply when you're
          done.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Name
          </Label>
          <Input
            id="name"
            value={filters.name}
            onChange={(e) => handleFilterChange("name", e.target.value)}
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="email" className="text-right">
            Email
          </Label>
          <Input
            id="email"
            value={filters.email}
            onChange={(e) => handleFilterChange("email", e.target.value)}
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="phone" className="text-right">
            Phone
          </Label>
          <Input
            id="phone"
            value={filters.phone}
            onChange={(e) => handleFilterChange("phone", e.target.value)}
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="role" className="text-right">
            Role
          </Label>
          <Select onValueChange={(value) => handleFilterChange("role", value)}>
            <SelectTrigger className="col-span-3">
              <SelectValue placeholder="Select role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="manager">Manager</SelectItem>
              <SelectItem value="developer">Developer</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="language" className="text-right">
            Language
          </Label>
          <Select
            onValueChange={(value) => handleFilterChange("language", value)}
          >
            <SelectTrigger className="col-span-3">
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="English">English</SelectItem>
              <SelectItem value="Spanish">Spanish</SelectItem>
              <SelectItem value="French">French</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="team" className="text-right">
            Team
          </Label>
          <Input
            id="team"
            value={filters.team}
            onChange={(e) => handleFilterChange("team", e.target.value)}
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="house" className="text-right">
            House
          </Label>
          <Select onValueChange={(value) => handleFilterChange("house", value)}>
            <SelectTrigger className="col-span-3">
              <SelectValue placeholder="Select house" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="inhouse">In-house</SelectItem>
              <SelectItem value="outsource">Outsource</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <DialogFooter>
        <Button variant="outline" onClick={onClear}>
          Clear Filters
        </Button>
        <Button onClick={() => onApply(filters)}>Apply Filters</Button>
      </DialogFooter>
    </DialogContent>
  );
}
