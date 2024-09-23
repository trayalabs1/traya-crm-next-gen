import { useNavigate } from "react-router-dom";
import CreateComponent from "./CreateComponent";
import { useToast } from "@hooks/use-toast";
import { ComponentMutationPayload } from "cms";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createComponent, updateComponent } from "@services/cmsServices";
import _ from "lodash";
function CreateComponentLayout() {
  const { toast } = useToast();

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const createComponentQuery = useMutation({
    mutationFn: (payload: ComponentMutationPayload["payload"]) =>
      createComponent(payload),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["getComponents"] });
      toast({
        description: "Component created successfully.",
        variant: "success",
        duration: 1000,
      });
    },
    onError() {
      toast({
        description: "Unable to create Component.",
        variant: "destructive",
        duration: 1000,
      });
    },
  });

  const updateComponentQuery = useMutation({
    mutationFn: (data: ComponentMutationPayload) => updateComponent(data),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["getComponents"] });
      toast({
        description: "Component updated successfully.",
        variant: "success",
        duration: 500,
      });
    },
    onError() {
      toast({
        description: "Unable to update Component.",
        variant: "destructive",
        duration: 500,
      });
    },
  });

  const onSubmit = async ({ id, payload }: ComponentMutationPayload) => {
    const content_ids = _.map(payload.data.contents, "value");
    _.set(payload, "data.content_ids", content_ids);
    _.unset(payload, "data.contents");
    if (id === "new") {
      await createComponentQuery.mutateAsync(payload);
    } else {
      await updateComponentQuery.mutateAsync({ id, payload });
    }
  };
  const onBack = () => {
    navigate(-1);
  };
  return <CreateComponent onSubmit={onSubmit} onBack={onBack} />;
}

export default CreateComponentLayout;
