import { useState, useRef, useEffect } from "react";
import { Button } from "@components/ui/button";
import { Minimize2, Expand, X, Check } from "lucide-react";
import SegmentManager from "./SegmentManager";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@components/ui/dialog";
import { useToast } from "@hooks/use-toast";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@components/ui/input-otp";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { cn } from "@utils/shadcn";
import RenderComponents from "@components/MobileLayout/RenderMobileComponents";

export default function SplitScreen() {
  const [isRightComponentOpen, setIsRightComponentOpen] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<null | object>(null);

  const rightComponentRef = useRef<HTMLDivElement>(null);

  const handleItemClick = (item: object) => {
    setSelectedItem(item);
    setIsRightComponentOpen(!isRightComponentOpen);
  };

  const toggleFullScreen = () => {
    if (!isFullScreen) {
      if (
        rightComponentRef.current &&
        rightComponentRef.current.requestFullscreen
      ) {
        rightComponentRef.current.requestFullscreen();
        setIsFullScreen(true);
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullScreen(false);
      }
    }
  };

  useEffect(() => {
    const handleFullScreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullScreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
  }, []);

  const { toast } = useToast();
  const [isApproveDialogOpen, setIsApproveDialogOpen] = useState(false);
  const [isDiscardDialogOpen, setIsDiscardDialogOpen] = useState(false);
  const [isOtpDialogOpen, setIsOtpDialogOpen] = useState(false);

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
      variant: "success",
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

  return (
    <div className="flex h-screen overflow-hidden">
      <div className={`${isFullScreen ? "hidden" : "flex-1"} overflow-auto`}>
        <SegmentManager onItemClick={handleItemClick} />
      </div>
      <div
        ref={rightComponentRef}
        className={`bg-background transition-all duration-300 ease-in-out ${
          isRightComponentOpen
            ? isFullScreen
              ? "w-full fixed inset-0 z-50"
              : "w-1/2"
            : "w-0"
        } overflow-hidden`}
      >
        {isRightComponentOpen && (
          <div className="p-4 h-full flex flex-col">
            <div
              className={cn(
                "flex justify-between items-center mb-4",
                isFullScreen ? "mx-20 mt-6" : "",
              )}
            >
              <h2 className="text-2xl font-bold font-openSans text-nowrap">
                Diff Checker
              </h2>
              <div className="flex justify-end space-x-4">
                {isFullScreen ? null : (
                  <>
                    <Dialog
                      open={isDiscardDialogOpen}
                      onOpenChange={setIsDiscardDialogOpen}
                    >
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          className="shadow-md hover:shadow-lg transition-shadow duration-200"
                        >
                          <X className="mr-2 h-5 w-5" /> Discard
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>
                            Are you sure you want to discard?
                          </DialogTitle>
                          <DialogDescription>
                            This action cannot be undone. This will permanently
                            discard the new version.
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
                        <Button className="shadow-md hover:shadow-lg transition-shadow duration-20 bg-green-500 hover:bg-green-700">
                          <Check className="mr-2 h-5 w-5" /> Approve
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>
                            Are you sure you want to approve?
                          </DialogTitle>
                          <DialogDescription>
                            This will approve the new version. You will need to
                            enter an OTP to confirm.
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
                  </>
                )}

                {isRightComponentOpen && (
                  <Button
                    onClick={toggleFullScreen}
                    variant="outline"
                    size="icon"
                    aria-label={
                      isFullScreen ? "Exit full screen" : "Enter full screen"
                    }
                  >
                    {isFullScreen ? (
                      <Minimize2 className="h-4 w-4" />
                    ) : (
                      <Expand className="h-4 w-4" />
                    )}
                  </Button>
                )}
              </div>
            </div>

            {isOtpDialogOpen ? (
              <DialogOtpComponent
                isOpen={isOtpDialogOpen}
                onSubmit={handleOtpSubmit}
                onClose={() => setIsOtpDialogOpen(false)}
              />
            ) : null}
            <div className="overflow-x-auto flex flex-wrap justify-center items-center gap-2">
              <div className="">
                <h3 className="font-bold my-2 text-center">Current Version</h3>
                <PhoneLayout>
                  {selectedItem && <RenderComponents />}
                </PhoneLayout>
              </div>
              <div className="">
                <h3 className="font-bold my-2 text-center">New Version</h3>
                <PhoneLayout>
                  {selectedItem && <RenderComponents />}
                </PhoneLayout>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
interface PhoneLayoutProps {
  children: React.ReactNode;
}

export function PhoneLayout({ children }: PhoneLayoutProps) {
  return (
    <div className="flex-shrink-0 w-[360px] h-[720px] bg-white rounded-[2.5rem] shadow-xl overflow-hidden border-[14px] border-gray-900 flex flex-col relative">
      <div className="bg-black text-white">
        <div className="w-32 h-6 bg-black absolute left-1/2 top-0 -translate-x-1/2 rounded-b-3xl"></div>
      </div>
      <ScrollArea className="flex-1 h-[calc(100%-40px)] overflow-auto">
        <div>{children}</div>
      </ScrollArea>
      <div className="bg-black p-1 flex justify-center">
        <div className="w-32 h-1 bg-gray-600 rounded-full"></div>
      </div>
    </div>
  );
}

const FormSchema = z.object({
  otp: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

interface DialogOtpComponentProps {
  isOpen: boolean;
  onSubmit: (formData: object) => void;
  onClose: () => void;
}
export function DialogOtpComponent({
  isOpen,
  onSubmit,
  onClose,
}: DialogOtpComponentProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      otp: "",
    },
  });

  const handleSubmit = (data: z.infer<typeof FormSchema>) => {
    onSubmit(data);
  };
  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <DialogHeader>
              <DialogTitle>Enter OTP</DialogTitle>
              <DialogDescription>
                Please enter the One-Time Password sent to your email or phone.
              </DialogDescription>
            </DialogHeader>

            <div className="py-4">
              <FormField
                control={form.control}
                name="otp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>One-Time Password</FormLabel>
                    <FormControl>
                      <InputOTP maxLength={6} {...field}>
                        <InputOTPGroup>
                          {[0, 1, 2, 3, 4, 5].map((index) => (
                            <InputOTPSlot key={index} index={index} />
                          ))}
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormDescription>
                      Please enter the one-time password sent to your phone.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">Submit</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
