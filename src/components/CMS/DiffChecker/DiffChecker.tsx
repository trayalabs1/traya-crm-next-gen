import { useState } from "react";
import { Button } from "@components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  Laptop,
  Smartphone,
  X,
  Check,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@components/ui/dialog";
import { Input } from "@components/ui/input";
import { Label } from "@components/ui/label";
import { useToast } from "@hooks/use-toast";
import MobileEmulator from "./MobileEmulator";
import DesktopEmulator from "./DesktopEmulator";

interface ContentItem {
  type: string;
  content: string | string[] | { [key: string]: string };
}

interface VersionContent {
  [key: string]: ContentItem;
}

interface DifferenceCheckerProps {
  currentVersion: VersionContent;
  newVersion: VersionContent;
}

export default function DifferenceChecker({
  currentVersion,
  newVersion,
}: DifferenceCheckerProps) {
  const { toast } = useToast();
  const [activeSlide, setActiveSlide] = useState(0);
  const [isApproveDialogOpen, setIsApproveDialogOpen] = useState(false);
  const [isDiscardDialogOpen, setIsDiscardDialogOpen] = useState(false);
  const [isOtpDialogOpen, setIsOtpDialogOpen] = useState(false);
  const [otp, setOtp] = useState("");
  const [viewMode, setViewMode] = useState<"mobile" | "desktop">("mobile");

  console.log(activeSlide);
  const renderContent = (
    content: VersionContent,
    otherContent: VersionContent,
  ) => {
    return Object.entries(content).map(([key, item]) => {
      const otherItem = otherContent[key];
      return (
        <div
          key={key}
          className={`mb-6 ${item.type !== otherItem?.type || JSON.stringify(item.content) !== JSON.stringify(otherItem?.content) ? "bg-yellow-100 dark:bg-yellow-900 p-4 rounded-lg shadow-md" : ""}`}
        >
          {renderContentItem(item, otherItem)}
        </div>
      );
    });
  };

  const renderContentItem = (item: ContentItem, otherItem?: ContentItem) => {
    switch (item.type) {
      case "h1":
        return (
          <h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">
            {highlightDifferences(
              item.content as string,
              otherItem?.content as string,
            )}
          </h1>
        );
      case "p":
        return (
          <p className="mb-4 text-gray-600 dark:text-gray-300 leading-relaxed">
            {highlightDifferences(
              item.content as string,
              otherItem?.content as string,
            )}
          </p>
        );
      case "image":
      case "full_image":
      case "full_width_image":
        return (
          <div className="relative h-64 w-full mb-6 rounded-lg overflow-hidden shadow-lg">
            <img
              src={item.content as string}
              alt="Content image"
              className="rounded-lg object-cover w-full h-full transition-transform duration-300 hover:scale-105"
            />
          </div>
        );
      case "banner":
        return (
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-lg mb-6 shadow-lg transform hover:scale-102 transition-transform duration-300">
            <p className="text-xl font-semibold">
              {highlightDifferences(
                item.content as string,
                otherItem?.content as string,
              )}
            </p>
          </div>
        );
      case "carousel":
        return (
          <div className="relative mb-6">
            <div className="flex overflow-x-auto snap-x snap-mandatory">
              {(item.content as string[]).map((src: string, index: number) => (
                <div key={index} className="flex-shrink-0 w-full snap-center">
                  <img
                    src={src}
                    alt={`Carousel image ${index + 1}`}
                    className="rounded-lg object-cover w-full h-64 transition-opacity duration-300 hover:opacity-90"
                  />
                </div>
              ))}
            </div>
            <div className="absolute inset-y-0 left-0 flex items-center">
              <Button
                size="sm"
                variant="ghost"
                className="h-10 w-10 rounded-full bg-white/80 shadow-md hover:bg-white"
                onClick={() =>
                  setActiveSlide(
                    (prev) =>
                      (prev - 1 + (item.content as string[]).length) %
                      (item.content as string[]).length,
                  )
                }
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center">
              <Button
                size="sm"
                variant="ghost"
                className="h-10 w-10 rounded-full bg-white/80 shadow-md hover:bg-white"
                onClick={() =>
                  setActiveSlide(
                    (prev) => (prev + 1) % (item.content as string[]).length,
                  )
                }
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </div>
          </div>
        );
      case "cta":
      case "cta_button":
        return (
          <Button className="w-full mb-4 shadow-md text-lg py-6 bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 transition-all duration-300 transform hover:scale-105">
            {highlightDifferences(
              item.content as string,
              otherItem?.content as string,
            )}
          </Button>
        );
      default:
        return (
          <div className="mb-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md">
            Unsupported content type: {item.type}
          </div>
        );
    }
  };

  const highlightDifferences = (
    text: string,
    otherText: string | undefined,
  ) => {
    if (!otherText) return text;
    const words = text.split(" ");
    const otherWords = otherText.split(" ");

    return words.map((word, index) => {
      if (word !== otherWords[index]) {
        return (
          <span
            key={index}
            className="bg-yellow-300 dark:bg-yellow-700 px-2 py-1 rounded-md inline-block transform hover:scale-110 transition-transform duration-200"
          >
            {word}
          </span>
        );
      }
      return <span key={index}>{word} </span>;
    });
  };

  const ViewToggle = () => (
    <div className="flex justify-center mb-8">
      <Button
        variant="outline"
        size="lg"
        onClick={() =>
          setViewMode(viewMode === "mobile" ? "desktop" : "mobile")
        }
        className="flex items-center space-x-2 bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow duration-200"
      >
        {viewMode === "mobile" ? (
          <>
            <Laptop className="w-5 h-5" />
            <span>Switch to Desktop View</span>
          </>
        ) : (
          <>
            <Smartphone className="w-5 h-5" />
            <span>Switch to Mobile View</span>
          </>
        )}
      </Button>
    </div>
  );

  const handleApprove = () => {
    setIsApproveDialogOpen(false);
    setIsOtpDialogOpen(true);
    toast({
      title: "OTP Sent",
      description: "Please check your email or phone for the OTP.",
    });
  };

  const handleOtpSubmit = () => {
    setIsOtpDialogOpen(false);
    toast({
      title: "Changes Approved",
      description: "The new version has been approved and published.",
    });
  };

  const handleDiscard = () => {
    setIsDiscardDialogOpen(false);
    toast({
      title: "Changes Discarded",
      description: "The new version has been discarded.",
    });
  };

  const Emulator = viewMode === "mobile" ? MobileEmulator : DesktopEmulator;

  return (
    <div className="w-full max-w-7xl mx-auto p-8 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 min-h-screen">
      <h1 className="text-5xl font-bold text-center mb-12 text-gray-800 dark:text-white">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">
          Diff Checker
        </span>
      </h1>
      <ViewToggle />
      <div className="flex justify-end mb-8 space-x-4">
        <Dialog
          open={isDiscardDialogOpen}
          onOpenChange={setIsDiscardDialogOpen}
        >
          <DialogTrigger asChild>
            <Button
              variant="outline"
              size="lg"
              className="shadow-md hover:shadow-lg transition-shadow duration-200"
            >
              <X className="mr-2 h-5 w-5" /> Discard
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you sure you want to discard?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently discard the
                new version.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsDiscardDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleDiscard}>
                Discard
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Dialog
          open={isApproveDialogOpen}
          onOpenChange={setIsApproveDialogOpen}
        >
          <DialogTrigger asChild>
            <Button
              size="lg"
              className="shadow-md hover:shadow-lg transition-shadow duration-200 bg-green-500 hover:bg-green-600"
            >
              <Check className="mr-2 h-5 w-5" /> Approve
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you sure you want to approve?</DialogTitle>
              <DialogDescription>
                This will publish the new version. You will need to enter an OTP
                to confirm.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsApproveDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleApprove}>Approve</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <Dialog open={isOtpDialogOpen} onOpenChange={setIsOtpDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enter OTP</DialogTitle>
            <DialogDescription>
              Please enter the One-Time Password sent to your email or phone.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="otp" className="text-right">
                OTP
              </Label>
              <Input
                id="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsOtpDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleOtpSubmit}>Submit</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <div className="flex flex-col lg:flex-row space-y-12 lg:space-y-0 lg:space-x-12 justify-center items-start">
        <Emulator
          title="Current Version"
          content={renderContent(currentVersion, newVersion)}
        />
        <Emulator
          title="New Version"
          content={renderContent(newVersion, currentVersion)}
        />
      </div>
    </div>
  );
}

// const currentVersion = {
//     title: { type: "h1", content: "Welcome to Our App" },
//     banner: { type: "banner", content: "Special offer: 20% off all items!" },
//     intro: { type: "p", content: "Discover amazing products and great deals." },
//     mainImage: {
//       type: "image",
//       content: "/placeholder.svg?height=200&width=300",
//     },
//     carousel: {
//       type: "carousel",
//       content: [
//         "/placeholder.svg?height=200&width=300&text=Slide+1",
//         "/placeholder.svg?height=200&width=300&text=Slide+2",
//         "/placeholder.svg?height=200&width=300&text=Slide+3",
//       ],
//     },
//   };

//   const newVersion = {
//     title: { type: "h1", content: "Welcome to Our Updated App" },
//     banner: { type: "banner", content: "New offer: 25% off all items!" },
//     intro: {
//       type: "p",
//       content: "Explore our latest collection and exclusive deals.",
//     },
//     mainImage: {
//       type: "image",
//       content: "/placeholder.svg?height=200&width=300&text=New+Image",
//     },
//     carousel: {
//       type: "carousel",
//       content: [
//         "/placeholder.svg?height=200&width=300&text=New+Slide+1",
//         "/placeholder.svg?height=200&width=300&text=New+Slide+2",
//         "/placeholder.svg?height=200&width=300&text=New+Slide+3",
//         "/placeholder.svg?height=200&width=300&text=New+Slide+4",
//       ],
//     },
//   };

//   export default function DifferenceCheckerDemo() {
//     return (
//       <EnhancedMobileDifferenceChecker
//         currentVersion={currentVersion}
//         newVersion={newVersion}
//       />
//     );
//   }
