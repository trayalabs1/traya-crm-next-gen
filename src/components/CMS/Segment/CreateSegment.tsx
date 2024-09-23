import React, { useState } from "react";
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { Label } from "@components/ui/label";
import Select, { StylesConfig } from "react-select";
import { ArrowLeft } from "lucide-react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@components/ui/input-otp";
import { useParams } from "react-router-dom";

type CreateSegmentProps = {
  onSubmit: (content: unknown) => void;
  onBack?: () => void;
};

const contents = [
  { label: "Option 1", value: "option1" },
  { label: "Option 2", value: "option2" },
  { label: "Option 3", value: "option3" },
  { label: "Option 4", value: "option4" },
];

const gender = [
  { label: "Male", value: "male" },
  { label: "Female 2", value: "female" },
  { label: "NA", value: "na" },
];

const components = [
  { label: "Component 1", value: "component1" },
  { label: "Component 2", value: "component2" },
  { label: "Component 3", value: "component3" },
  { label: "Component 4", value: "component4" },
];

const weeks = [
  { label: "Week 1", value: "week1" },
  { label: "Week 2", value: "week2" },
  { label: "Week 3", value: "week3" },
  { label: "Week 4", value: "week4" },
];

type OptionType = { label: string; value: string };

const selectStyles: StylesConfig<OptionType, true> = {
  control: (styles) => ({
    ...styles,
    backgroundColor: "hsl(var(--background))",
    borderColor: "hsl(var(--border))",
    "&:hover": {
      borderColor: "hsl(var(--border-hover))",
    },
    boxShadow: "none",
  }),
  menu: (styles) => ({
    ...styles,
    backgroundColor: "hsl(var(--background))",
    borderColor: "hsl(var(--border))",
  }),
  option: (styles, { isFocused, isSelected }) => ({
    ...styles,
    backgroundColor: isSelected
      ? "hsl(var(--primary))"
      : isFocused
        ? "hsl(var(--accent))"
        : "hsl(var(--background))",
    color: isSelected
      ? "hsl(var(--primary-foreground))"
      : "hsl(var(--foreground))",
    ":active": {
      backgroundColor: "hsl(var(--accent))",
    },
  }),
  multiValue: (styles) => ({
    ...styles,
    backgroundColor: "hsl(var(--accent))",
  }),
  multiValueLabel: (styles) => ({
    ...styles,
    color: "hsl(var(--accent-foreground))",
  }),
  multiValueRemove: (styles) => ({
    ...styles,
    color: "hsl(var(--accent-foreground))",
    ":hover": {
      backgroundColor: "hsl(var(--destructive))",
      color: "hsl(var(--destructive-foreground))",
    },
  }),
};

export default function CreateSegment({
  onSubmit,
  onBack,
}: CreateSegmentProps) {
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      if (!showOtpInput) {
        setShowOtpInput(true);
      }
      onSubmit({ name });
    } catch (err) {
      setError("Invalid data structure");
    }
  };

  // const [otp, setOtp] = useState<string>("");
  const handleOtpChange = () => {};

  const [name, setTitle] = useState("");
  const [ordersCount, setOrdersCount] = useState<number>();

  const [selectedWeeks, setSelectedWeeks] = useState<OptionType[]>([]);
  const [selectedContents, setSelectedContents] = useState<OptionType[]>([]);

  const [selectedGender, setSelectedGender] = useState<OptionType[]>([]);
  const [showOtpInput, setShowOtpInput] = useState(false);
  const handleContentChange = (selectedOptions: readonly OptionType[]) => {
    setSelectedContents(selectedOptions as OptionType[]);
  };

  const handleGenderChange = (selectedGender: readonly OptionType[]) => {
    setSelectedGender(selectedGender as OptionType[]);
  };
  const handleWeeksChange = (selectedWeeks: readonly OptionType[]) => {
    setSelectedWeeks(selectedWeeks as OptionType[]);
  };

  const handleReset = () => {
    setTitle("");
    setSelectedGender([]);
    setSelectedWeeks([]);
    setOrdersCount(0);
    // setOtp("");
    setShowOtpInput(false);
  };

  const { id } = useParams();

  const isNew = id === "new";
  return (
    <>
      <div className="flex items-center m-6 ">
        <Button
          onClick={onBack}
          variant="ghost"
          size="icon"
          className="mr-2"
          aria-label="Go back"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h3 className="font-bold text-xl">
          {isNew ? "Create" : "Edit"} Segment
        </h3>
      </div>
      <div className="w-3/4 mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="gender">Select Gender</Label>
              <Select
                id="gender"
                options={gender}
                value={selectedGender}
                onChange={handleGenderChange}
                styles={selectStyles}
                placeholder="Select gender..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="weeks">Select Weeks in Program</Label>
              <Select
                id="weeks"
                options={weeks}
                value={selectedWeeks}
                onChange={handleWeeksChange}
                styles={selectStyles}
                placeholder="Select weeks..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="ordersCount">Orders Count</Label>
              <Input
                id="ordersCount"
                placeholder="Enter orders count"
                value={ordersCount}
                type="number"
                onChange={(e) => setOrdersCount(Number(e.target.value))}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="recommendedProducts">
              Select Recommended Products
            </Label>
            <Select
              id="recommendedProducts"
              isMulti
              options={contents}
              value={selectedContents}
              onChange={handleContentChange}
              styles={selectStyles}
              placeholder="Select Recommended Products..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="components">Select Components</Label>
            <Select
              id="components"
              isMulti
              options={components}
              value={selectedContents}
              onChange={handleContentChange}
              styles={selectStyles}
              placeholder="Select components..."
            />
          </div>
          {showOtpInput && (
            <div className="space-y-2">
              <Label htmlFor="otp">Enter OTP</Label>
              <InputOTP id="otp" maxLength={6} onChange={handleOtpChange}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>
          )}
          {error && <p className="text-destructive text-sm">{error}</p>}
          <div className="flex flex-wrap gap-2 justify-end">
            <Button
              type="reset"
              className="w-36"
              variant="outline"
              onClick={handleReset}
            >
              Clear
            </Button>
            <Button type="submit" className="w-36">
              {showOtpInput
                ? "Verify OTP"
                : isNew
                  ? "Create Segment"
                  : "Save Segment"}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
