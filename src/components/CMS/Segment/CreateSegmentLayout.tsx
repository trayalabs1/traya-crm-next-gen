import { useNavigate } from "react-router-dom";
import CreateSegment from "./CreateSegment";
import { useToast } from "@hooks/use-toast";

function CreateSegmentLayout() {
  const { toast } = useToast();

  const navigate = useNavigate();
  const onSubmit = () => {
    toast({
      description: "Segment created successfully.",
      variant: "success",
    });
  };
  const onBack = () => {
    navigate(-1);
  };
  return <CreateSegment onSubmit={onSubmit} onBack={onBack} />;
}

export default CreateSegmentLayout;
