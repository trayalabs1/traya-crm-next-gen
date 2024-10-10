import React, { useState } from "react";
import PhoneLayout from "./PhoneLayout";
import RenderComponents from "@components/MobileLayout/RenderMobileComponents";
import CommonDialog from "../Dialogs/CommonDialog";
import { Button } from "@components/ui/button";
import { Check, SendHorizontal, X } from "lucide-react";
import { OTPDialog } from "../Dialogs/OTPDialog";
import { useToast } from "@hooks/use-toast";
import { PhoneProgress } from "./PhoneProgress";
import { motion } from "framer-motion";
import {
  Component,
  Content,
  EntitiyActionBody,
  EntitiyActionDiscardBody,
  EntitiyType,
  Segment,
} from "cms";
import { useAuth } from "src/context/useAuth";
import { ROLES } from "@utils/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  approvalByChecker,
  approvalByPublisher,
  discard,
  generateOtp,
  publishByPublisher,
  retryOtp,
  submitByChecker,
  verifyOtp,
} from "@services/cmsServices";
import _ from "lodash";
import { EntityError } from "./EntityError";
import { useDiffCheckerStore } from "../store/useCmsStore";
export interface DiffCheckerProps {
  action?: "VIEW" | "CHANGES";
  toggleDrawer: () => void;
  segment?: Segment | null;
  component?: Component | null;
  content?: Content | null;
}

function getDiffEntityName({
  segment,
  component,
  content,
}: Pick<DiffCheckerProps, "segment" | "component" | "content">) {
  if (segment) {
    return segment.name;
  } else if (component) {
    return "Component Name";
  } else if (content) {
    return "Content";
  } else {
    return "Unknown Piece";
  }
}

interface Entities {
  segment?: Segment | null;
  component?: Component | null;
  content?: Content | null;
}

function getEntity(entities: Entities, diffEntity: EntitiyType | null) {
  if (!diffEntity) return;

  return entities[diffEntity] ?? null;
}

const DiffChecker: React.FC<DiffCheckerProps> = ({
  toggleDrawer,
  action = "VIEW",
  segment,
  component,
  content,
}) => {
  const { user } = useAuth();
  const [isDiscardDialogOpen, setIsDiscardDialogOpen] = useState(false);
  const [isApproveDialogOpen, setIsApproveDialogOpen] = useState(false);
  const [isSubmitDialogOpen, setIsSubmitDialogOpen] = useState(false);
  const [otp, setOtp] = useState<string | null>(null);
  const [isOtpDialogOpen, setIsOtpDialogOpen] = useState(false);
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const {
    currentVersion,
    newVersion,
    entityType: diffEntity,
  } = useDiffCheckerStore();

  const handleApprove = async () => {
    await generateOtpMutation.mutateAsync(userId);

    setIsApproveDialogOpen(false);
    setIsOtpDialogOpen(true);
    await invalidateQueries();
  };

  const entities: Entities = {
    segment: segment ?? null,
    component: component ?? null,
    content: content ?? null,
  };

  const entity = getEntity(entities, diffEntity);

  const handleOtpSubmit = async (data: { otp: string }) => {
    await verifyOtpMutation.mutateAsync({ userId: userId, otp: data.otp });

    let typeId: string;
    if (diffEntity === "segment" && segment) {
      typeId = segment.segment_id;
    } else if (diffEntity === "component" && component) {
      typeId = component.component_id;
    } else if (diffEntity === "content" && content) {
      typeId = content.content_id;
    } else {
      typeId = "InvalidID";
    }

    const body: EntitiyActionBody = {
      type: "segment",
      type_id: "",
      user_id: "",
    };

    if (_.isNil(diffEntity) || _.isEmpty(user)) return;
    body.type = diffEntity;
    body.type_id = typeId;
    body.user_id = user.id;

    if (user?.role === "maker") {
      await submitMutation.mutateAsync(body);
    }

    if (user?.role === "checker") {
      await approveByCheckerMutation.mutateAsync(body);
    }

    if (user?.role === "publisher") {
      await approveByPublisherMutation.mutateAsync(body);
      await publishByPublisherMutation.mutateAsync(body);
    }

    await invalidateQueries();
    setIsOtpDialogOpen(false);
  };

  const discardMutation = useMutation({
    mutationFn: (data: EntitiyActionDiscardBody) => discard(data),
    onSuccess: () => {
      toggleDrawer();
      //Hide Drawer
      toast({
        variant: "success",
        title: _.startCase(diffEntity || "unknown") + " is discard",
      });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: `Unable to discard the ${_.startCase(diffEntity || "unknown")}`,
        description: "Please try again.",
      });
    },
  });

  const handleDiscard = async () => {
    const body: EntitiyActionDiscardBody = {
      type: "segment",
      type_id: "",
      user_id: "",
      role: "MAKER",
    };

    let typeId: string;
    if (diffEntity === "segment" && segment) {
      typeId = segment.segment_id;
    } else if (diffEntity === "component" && component) {
      typeId = component.component_id;
    } else if (diffEntity === "content" && content) {
      typeId = content.content_id;
    } else {
      typeId = "InvalidID";
    }

    if (_.isNil(diffEntity) || _.isEmpty(user)) return;
    body.type = diffEntity;
    body.type_id = typeId;
    body.user_id = user.id;
    body.role = _.toUpper(user.role);
    await discardMutation.mutateAsync(body);
    setIsDiscardDialogOpen(false);
    await invalidateQueries();
  };

  const userId = user?.id || ":userId";

  const generateOtpMutation = useMutation({
    mutationFn: (userId: string) => generateOtp(userId),
    onSuccess: (data) => {
      setIsSubmitDialogOpen(false);
      setIsOtpDialogOpen(true);
      if (data.status === "success") setOtp(data.otp);
      toast({
        variant: "success",
        title: "OTP Sent",
        description: "Please check your email or phone for the OTP.",
      });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Unable to send OTP",
        description: "Please try again.",
      });
    },
  });

  const resendOtpMutation = useMutation({
    mutationFn: (userId: string) => retryOtp(userId),
    onSuccess: (data) => {
      if (data?.status === "success") setOtp(data?.otp);
      setIsSubmitDialogOpen(false);
      setIsOtpDialogOpen(true);
      toast({
        variant: "success",
        title: "OTP have resend",
        description: "Please check your email or phone for the OTP.",
      });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Unable to send OTP",
        description: "Please try again.",
      });
    },
  });

  const verifyOtpMutation = useMutation({
    mutationFn: ({ userId, otp }: { userId: string; otp: string }) =>
      verifyOtp(userId, otp),
    onSuccess: () => {
      toast({
        variant: "success",
        title: "OTP Verified successfully",
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: error.message || "Unable to verify OTP",
        description: "Please try again.",
      });
    },
  });

  const submitMutation = useMutation({
    mutationFn: (data: EntitiyActionBody) => submitByChecker(data),
    onSuccess: () => {
      toggleDrawer();
      //Hide Drawer
      toast({
        variant: "success",
        title: "Draft Submitted",
        description: "The draft has been submitted to checker.",
      });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Unable to submitted the draft",
        description: "Please try again.",
      });
    },
  });

  const approveByCheckerMutation = useMutation({
    mutationFn: (data: EntitiyActionBody) => approvalByChecker(data),
    onSuccess: () => {
      toggleDrawer();
      //Hide Drawer

      toast({
        variant: "success",
        title: _.startCase(diffEntity || "unknown") + " is approved",
      });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: `Unable to approve the ${_.startCase(diffEntity || "unknown")}`,
        description: "Please try again.",
      });
    },
  });

  const approveByPublisherMutation = useMutation({
    mutationFn: (data: EntitiyActionBody) => approvalByPublisher(data),
    onSuccess: () => {
      toggleDrawer();
      //Hide Drawer
      toast({
        variant: "success",
        title: _.startCase(diffEntity || "unknown") + " is approved",
      });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: `Unable to approve the ${_.startCase(diffEntity || "unknown")}`,
        description: "Please try again.",
      });
    },
  });

  const publishByPublisherMutation = useMutation({
    mutationFn: (data: EntitiyActionBody) => publishByPublisher(data),
    onSuccess: () => {
      toast({
        variant: "success",
        title: _.startCase(diffEntity || "unknown") + " is published.",
      });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: `Unable to publish the ${_.startCase(diffEntity || "unknown")}`,
        description: "Please try again.",
      });
    },
  });

  const invalidateQueries = async () => {
    await queryClient.invalidateQueries({
      queryKey: ["getSegments"],
    });
    await queryClient.invalidateQueries({ queryKey: ["getComponents"] });
    await queryClient.invalidateQueries({ queryKey: ["getContents"] });
  };
  const handleResendOTP = async () => {
    await resendOtpMutation.mutateAsync(userId);
  };
  const handleSubmit = async () => {
    //Hide Drawer
    await generateOtpMutation.mutateAsync(userId);
    setIsSubmitDialogOpen(false);
  };

  const [progress, setProgress] = useState(0);

  if (!diffEntity) return <EntityError />;

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
            {(user?.role === "checker" && entity?.status === "submitted") ||
            (user?.role === "publisher" &&
              entity?.status === "approved_by_checker") ? (
              <CommonDialog
                isOpen={isApproveDialogOpen}
                setIsDialogOpen={setIsApproveDialogOpen}
                onConfirm={() => handleApprove()}
                onCancel={() => setIsApproveDialogOpen(false)}
                confirmLabel="Approve"
                title="Are you sure you want to approve?"
                description="This will approve. You will need to enter an OTP to confirm."
                trigger={
                  <Button className="shadow-md hover:shadow-lg transition-shadow duration-20 bg-green-500 hover:bg-green-700">
                    <Check className="mr-2 h-5 w-5" /> Approve
                  </Button>
                }
              />
            ) : null}

            {ROLES.maker === user?.role && entity?.status === "draft" ? (
              <CommonDialog
                isOpen={isSubmitDialogOpen}
                setIsDialogOpen={setIsSubmitDialogOpen}
                onConfirm={handleSubmit}
                onCancel={() => setIsSubmitDialogOpen(false)}
                confirmLabel="Submit"
                title="Are you sure you want to submit?"
                description={`Are you sure you want to submit the ${getDiffEntityName({ segment, component, content })} (${_.startCase(diffEntity)}) for approval? It will be reviewed by the checker. You will need to enter an OTP to confirm.`}
                trigger={
                  <Button className="shadow-md hover:shadow-lg transition-shadow duration-20 bg-blue-500 hover:bg-blue-700">
                    <SendHorizontal className="mr-2 h-5 w-5" /> Submit
                  </Button>
                }
              />
            ) : null}

            {isOtpDialogOpen ? (
              <OTPDialog
                isOpen={isOtpDialogOpen}
                onSubmit={handleOtpSubmit}
                onClose={() => setIsOtpDialogOpen(false)}
                onResend={handleResendOTP}
                otp={otp}
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
                  <RenderComponents components={currentVersion} />
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
                  <RenderComponents components={newVersion} />
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
