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

  const handleSuccess = ({ duration = 1000, message = "Success" } = {}) => {
    queryClient.invalidateQueries({ queryKey: ["getComponents"] });
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

  const createComponentQuery = useMutation({
    mutationFn: (payload: ComponentMutationPayload["payload"]) =>
      createComponent(payload),
    onSuccess: () =>
      handleSuccess({ message: "Component created successfully." }),
    onError: () => handleError({ message: "Unable to create Component." }),
  });

  const updateComponentQuery = useMutation({
    mutationFn: (data: ComponentMutationPayload) => updateComponent(data),
    onSuccess: () =>
      handleSuccess({ message: "Component updated successfully." }),
    onError: () => handleError({ message: "Unable to update Component." }),
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
