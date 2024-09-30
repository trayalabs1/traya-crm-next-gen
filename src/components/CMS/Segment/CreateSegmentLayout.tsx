import { useNavigate } from "react-router-dom";
import CreateSegment from "./CreateSegment";
import { useToast } from "@hooks/use-toast";
import { SegmentMutationPayload } from "cms";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createSegment, updateSegment } from "@services/cmsServices";
import _ from "lodash";
function CreateSegmentLayout() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const handleSuccess = ({ duration = 1000, message = "Success" } = {}) => {
    queryClient.invalidateQueries({ queryKey: ["getSegments"] });
    toast({
      description: message,
      variant: "success",
      duration,
    });
    onBack();
  };

  const handleError = ({ duration = 1000, message = "Error" } = {}) => {
    toast({
      description: message,
      variant: "destructive",
      duration: duration,
    });
  };

  const createSegmentQuery = useMutation({
    mutationFn: (payload: SegmentMutationPayload["payload"]) =>
      createSegment(payload),
    onSuccess: () => handleSuccess({ message: "Segmemt Create successfully" }),
    onError: () => handleError({ message: "Unable to create segment" }),
  });

  const updateSegmentQuery = useMutation({
    mutationFn: (payload: SegmentMutationPayload) => updateSegment(payload),
    onSuccess: () => handleSuccess({ message: "Segmemt update successfully" }),
    onError: () => handleError({ message: "Unable to update segment" }),
  });

  const navigate = useNavigate();
  const onSubmit = async ({ id, payload }: SegmentMutationPayload) => {
    const component_ids = _.map(payload.components, "value");
    const weeks_in_program = _.map(payload.weeksInProgram, "value");
    const recommended_products = _.map(payload.recommendedProducts, "value");
    const order_counts = _.get(payload, ["orderCounts"]);

    // Add Keys
    _.set(payload, "component_ids", component_ids);
    _.set(payload, "gender", _.get(payload, ["gender", "value"]));
    _.set(payload, "weeks_in_program", weeks_in_program);
    _.set(payload, "recommended_products", recommended_products);
    _.set(payload, "order_counts", order_counts);

    //Delete Keys
    _.unset(payload, "components");
    _.unset(payload, "weeksInProgram");
    _.unset(payload, "recommendedProducts");
    _.unset(payload, "orderCounts");
    //Delete Temp.
    _.unset(payload, "phases");
    _.unset(payload, "streaks");
    _.unset(payload, "coins");
    _.unset(payload, "formStatus");
    _.unset(payload, "daysSinceLatestFormFilled");
    _.unset(payload, "stages");

    if (id === "new") {
      await createSegmentQuery.mutateAsync(payload);
    } else {
      await updateSegmentQuery.mutateAsync({ id, payload });
    }
  };
  const onBack = () => {
    navigate(-1);
  };
  return <CreateSegment onSubmit={onSubmit} onBack={onBack} />;
}

export default CreateSegmentLayout;
