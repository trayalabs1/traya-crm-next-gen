type Props = {
  className?: string;
};

import starfleet from "@assets/starfleet.png";

export const StarFleet: React.FC<Props> = (
  props: Props & React.HTMLProps<HTMLImageElement>,
) => {
  return <img src={starfleet} {...props} />;
};
