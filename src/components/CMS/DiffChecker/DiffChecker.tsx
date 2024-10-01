import React, { useState } from "react";
import { PhoneLayout } from "./PhoneLayout";
import RenderComponents from "@components/MobileLayout/RenderMobileComponents";
import CommonDialog from "../Dialogs/CommonDialog";
import { Button } from "@components/ui/button";
import { Check, X } from "lucide-react";
import { OTPDialog } from "../Dialogs/OTPDialog";
import { useToast } from "@hooks/use-toast";
import { PhoneProgress } from "./PhoneProgress";
import { motion } from "framer-motion";
interface DiffCheckerProps {
  action?: "VIEW" | "CHANGES";
  currentVersion?: object;
  newVersion?: object;
  toggleDrawer: () => void;
}
const DiffChecker: React.FC<DiffCheckerProps> = ({
  currentVersion,
  newVersion,
  toggleDrawer,
  action = "VIEW",
}) => {
  const [isDiscardDialogOpen, setIsDiscardDialogOpen] = useState(false);
  const [isApproveDialogOpen, setIsApproveDialogOpen] = useState(false);
  const [isOtpDialogOpen, setIsOtpDialogOpen] = useState(false);

  const { toast } = useToast();
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
    toggleDrawer();
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
      variant: "success",
      description: "The new version has been discarded.",
    });
  };

  const [progress, setProgress] = useState(0);

  return (
    <>
      <div>
        <h2 className="text-xl font-bold font-openSans text-nowrap space-y-2">
          {newVersion && !currentVersion ? "Phone Screen View" : "Diff Checker"}
        </h2>
        {action === "CHANGES" ? (
          <div className="flex justify-end space-x-4 my-2">
            <CommonDialog
              isOpen={isDiscardDialogOpen}
              setIsDialogOpen={setIsDiscardDialogOpen}
              onConfirm={handleDiscard}
              onCancel={() => setIsDiscardDialogOpen(false)}
              title="Are you sure you want to discard?"
              description="This action cannot be undone. This will permanently discard the new version."
              confirmVariant="destructive"
              trigger={
                <Button
                  variant="outline"
                  className="shadow-md hover:shadow-lg transition-shadow duration-200"
                >
                  <X className="mr-2 h-5 w-5" /> Discard
                </Button>
              }
            />
            <CommonDialog
              isOpen={isApproveDialogOpen}
              setIsDialogOpen={setIsApproveDialogOpen}
              onConfirm={handleApprove}
              onCancel={() => setIsApproveDialogOpen(false)}
              confirmLabel="Approve"
              title="Are you sure you want to approve?"
              description="This will approve the new version. You will need to enter an OTP to confirm."
              trigger={
                <Button className="shadow-md hover:shadow-lg transition-shadow duration-20 bg-green-500 hover:bg-green-700">
                  <Check className="mr-2 h-5 w-5" /> Approve
                </Button>
              }
            />

            {isOtpDialogOpen ? (
              <OTPDialog
                isOpen={isOtpDialogOpen}
                onSubmit={handleOtpSubmit}
                onClose={() => setIsOtpDialogOpen(false)}
              />
            ) : null}
          </div>
        ) : null}
      </div>
      <div className="overflow-x-auto flex flex-wrap justify-center items-center gap-2 my-2">
        {currentVersion ? (
          <div>
            <h3 className="font-bold my-2 text-center">Current Version</h3>
            <PhoneLayout>
              {progress === 100 ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 30 }}
                  transition={{ duration: 0.5 }}
                >
                  <RenderComponents />
                </motion.div>
              ) : (
                <div className="flex flex-wrap justify-center mt-80">
                  <PhoneProgress
                    progress={progress}
                    setProgress={setProgress}
                  />
                </div>
              )}
            </PhoneLayout>
          </div>
        ) : null}
        {newVersion ? (
          <div>
            <h3 className="font-bold my-2 text-center">New Version</h3>
            <PhoneLayout>
              {progress === 100 ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 30 }}
                  transition={{ duration: 0.5 }}
                >
                  <RenderComponents />
                </motion.div>
              ) : (
                <div className="flex flex-wrap justify-center mt-80">
                  <PhoneProgress
                    progress={progress}
                    setProgress={setProgress}
                  />
                </div>
              )}
            </PhoneLayout>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default DiffChecker;
