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

  const handleItemClick = () => {};

  return (
    <div>
      {/* <Component /> */}
      <Segment onItemClick={handleItemClick} />
    </div>
  );
};

export default Maker;
