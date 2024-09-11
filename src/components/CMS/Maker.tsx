import { useQuery } from "@tanstack/react-query";
import { getSegments } from "src/services";

const Maker = () => {
  const { data } = useQuery({
    queryKey: ["segments"],
    queryFn: () => getSegments(),
  });

  return <div>Maker {data}</div>;
};

export default Maker;
