import { useNavigate } from "react-router-dom";
import CreateContent from "./CreateContent";
import { useToast } from "@hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createContent, updateContent } from "@services/cmsServices";
import { ContentMutationPayload } from "cms";
// import { ContentMutationPayload } from "@types/cms/content";

function CreateContentLayout() {
  const { toast } = useToast();

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const createContentQuery = useMutation({
    mutationFn: (payload: ContentMutationPayload["payload"]) =>
      createContent(payload),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["getContents"] });
      toast({
        description: "Content created successfully.",
        variant: "success",
        duration: 500,
      });
    },
    onError() {
      toast({
        description: "Unable to create Content.",
        variant: "destructive",
        duration: 500,
      });
    },
  });

  const updateContentQuery = useMutation({
    mutationFn: (data: ContentMutationPayload) => updateContent(data),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["getContents"] });
      toast({
        description: "Content updated successfully.",
        variant: "success",
        duration: 500,
      });
    },
    onError() {
      toast({
        description: "Unable to update Content.",
        variant: "destructive",
        duration: 500,
      });
    },
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
