import { useNavigate } from "react-router-dom";
import CreateContent from "./CreateContent";
import { useToast } from "@hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createContent, updateContent } from "@services/cmsServices";
import { ContentMutationPayload } from "cms";

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
    mutationFn: (data: ContentMutationPayload) => updateContent(data),
    onSuccess: () => handleSuccess({ message: "Content update successfully." }),
    onError: () => handleError({ message: "Unable to update Content." }),
  });

  const onSubmit = async ({ id, payload }: ContentMutationPayload) => {
    if (id === "new") {
      await createContentQuery.mutateAsync(payload);
    } else {
      await updateContentQuery.mutateAsync({ id, payload });
    }
  };
  const onBack = () => {
    navigate(-1);
  };
  return <CreateContent onSubmit={onSubmit} onBack={onBack} />;
}

export default CreateContentLayout;
