// import { useQuery } from "@tanstack/react-query";
// import { getSegments } from "src/services";
// import CreateContent from "./CreateContent";

// import Component from "./Component/Component";
import Segment from "./Segment/SegmentManager";

const Maker = () => {
  // const { data } = useQuery({
  //   queryKey: ["segments"],
  //   queryFn: () => getSegments(),
  // });

  return (
    <div>
      {/* <Component /> */}
      <Segment />
    </div>
  );
};

export default Maker;
