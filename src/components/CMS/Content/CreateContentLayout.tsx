import { useNavigate } from "react-router-dom";
import CreateContent from "./CreateContent";
import { useToast } from "@hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createContent, updateContent } from "@services/cmsServices";
import { ContentMutationPayload, UpdateContentPayload } from "cms";
import { get } from "lodash";

function CreateContentLayout() {
  const { toast } = useToast();

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleSuccess = ({ duration = 1000, message = "Success" } = {}) => {
    queryClient.invalidateQueries({ queryKey: ["getContents"] });
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

  const createContentQuery = useMutation({
    mutationFn: (payload: ContentMutationPayload["payload"]) =>
      createContent(payload),
    onSuccess: () =>
      handleSuccess({ message: "Content created successfully." }),
    onError: () => handleError({ message: "Unable to create Content." }),
  });

  const updateContentQuery = useMutation({
    mutationFn: (data: UpdateContentPayload) => updateContent(data),
    onSuccess: () => handleSuccess({ message: "Content update successfully." }),
    onError: () => handleError({ message: "Unable to update Content." }),
  });

  const onSubmit = async ({ id, payload }: ContentMutationPayload) => {
    if (id === "new") {
      await createContentQuery.mutateAsync(payload);
    } else {
      // Delete the name and type for update content
      const updateBody = get(payload, ["data"]);
      await updateContentQuery.mutateAsync({ id, payload: updateBody });
    }
  };
  const onBack = () => {
    navigate(-1);
  };
  return <CreateContent onSubmit={onSubmit} onBack={onBack} />;
}

export default CreateContentLayout;
