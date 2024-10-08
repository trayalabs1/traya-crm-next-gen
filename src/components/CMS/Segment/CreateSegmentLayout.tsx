import { useNavigate } from "react-router-dom";
import CreateSegment from "./CreateSegment";
import { useToast } from "@hooks/use-toast";
import { SegmentMutationBody, SegmentMutationPayload } from "cms";
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
    mutationFn: (payload: SegmentMutationBody) => createSegment(payload),
    onSuccess: () => handleSuccess({ message: "Segmemt Create successfully" }),
    onError: () => handleError({ message: "Unable to create segment" }),
  });

  const updateSegmentQuery = useMutation({
    mutationFn: (payload: { id?: string; payload: SegmentMutationBody }) =>
      updateSegment(payload),
    onSuccess: () => handleSuccess({ message: "Segmemt update successfully" }),
    onError: () => handleError({ message: "Unable to update segment" }),
  });

  const navigate = useNavigate();
  const onSubmit = async ({ id, payload }: SegmentMutationPayload) => {
    const body: SegmentMutationBody = {
      name: "",
      gender: "",
      component_ids: [],
    };
    const components = _.get(payload, ["components"]);
    const weeks_in_program = _.map(payload.weeksInProgram, "value");
    const recommended_products = _.map(payload.recommendedProducts, "value");
    const order_counts = _.get(payload, ["orderCounts"]);

    _.set(body, "name", payload.name);
    // Add Keys
    _.set(body, "component_ids", components);
    _.set(body, "gender", _.get(payload, ["gender", "value"]));
    _.set(body, "weeks_in_program", weeks_in_program);
    _.set(body, "recommended_products", recommended_products);
    _.set(body, "order_counts", order_counts);

    //For Coins
    if (payload.coins?.value === "yes") {
      _.set(body, "have_coins", true);
    } else {
      _.set(body, "have_coins", false);
    }

    //For Form Status
    if (payload.formStatus?.value) {
      _.set(body, "form_status", payload.formStatus.value);
    }

    // For Stages
    if (!_.isEmpty(payload.stages)) {
      const stages = payload.stages?.map((stage) => Number(stage.value));
      _.set(body, "stages", stages);
    }

    //For Streaks
    if (!_.isEmpty(payload.streaks)) {
      const streaks = payload.streaks?.map((stage) => Number(stage.value));
      _.set(body, "streak_length", streaks);
    }

    if (id === "new") {
      await createSegmentQuery.mutateAsync(body);
    } else {
      await updateSegmentQuery.mutateAsync({ id, payload: body });
    }
  };
  const onBack = () => {
    navigate(-1);
  };
  return <CreateSegment onSubmit={onSubmit} onBack={onBack} />;
}

export default CreateSegmentLayout;
