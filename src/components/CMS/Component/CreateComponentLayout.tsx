import { useNavigate } from "react-router-dom";
import CreateComponent from "./CreateComponent";
import { useToast } from "@hooks/use-toast";
import {
  ComponentMutationBody,
  ComponentMutationPayload,
  ComponentMutationUpdateBody,
} from "cms";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createComponent, updateComponent } from "@services/cmsServices";
import _ from "lodash";
import { getErrorMessage } from "@utils/common";
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
    mutationFn: (payload: ComponentMutationBody) => createComponent(payload),
    onSuccess: () =>
      handleSuccess({ message: "Component created successfully." }),
    onError: (error) => handleError({ message: getErrorMessage(error) }),
  });

  const updateComponentQuery = useMutation({
    mutationFn: (data: { id?: string; payload: ComponentMutationUpdateBody }) =>
      updateComponent(data),
    onSuccess: () =>
      handleSuccess({ message: "Component updated successfully." }),
    onError: () => handleError({ message: "Unable to update Component." }),
  });

  const onSubmit = async ({ id, payload }: ComponentMutationPayload) => {
    const body: ComponentMutationBody & { data?: object } = {
      name: "",
      gender: "",
    };

    _.set(body, "name", payload.name);
    _.set(body, "gender", _.get(payload, ["gender", "value"]) || "");
    _.set(body, "language", _.get(payload, ["language", "value"]) || "");
    _.set(
      body,
      "component_type",
      _.get(payload, ["componentType", "value"]) || "",
    );
    _.set(body, "data.title", _.get(payload, ["data", "title"]) || "");
    _.set(
      body,
      "data.description",
      _.get(payload, ["data", "description"]) || "",
    );
    _.set(body, "data.content_ids", _.get(payload, ["data", "contents"]));

    if (id === "new") {
      await createComponentQuery.mutateAsync(body);
    } else {
      ///Shape the body for update component
      const updateBody = _.get(body, "data") || {};

      await updateComponentQuery.mutateAsync({ id, payload: updateBody });
    }
  };
  const onBack = () => {
    navigate(-1);
  };
  return <CreateComponent onSubmit={onSubmit} onBack={onBack} />;
}

export default CreateComponentLayout;
