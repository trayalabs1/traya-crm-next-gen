import React from "react";
import { ScrollArea, ScrollBar } from "@components/ui/scroll-area";
import { cn } from "@utils/shadcn";
import { SolutionHairConcernProps } from "@components/MobileLayout/RenderMobileComponents";
import { Gender, MobileContentData } from "cms";

type HairSolutionItem = Pick<
  MobileContentData,
  "h1" | "description" | "images"
>;

interface CardProps {
  item: HairSolutionItem;
  gender: Gender;
}
const Card = ({ item, gender }: CardProps) => (
  <div
    className={cn(
      "h-[138px] w-[310px] mr-4 rounded-lg p-3 flex mb-2.5",
      gender === "F" ? "bg-[#f7f3f2]" : "bg-[#F2F4EB]",
    )}
  >
    <div className="w-[58%]">
      <h3 className="text-xl font-nunito text-[#212121]">{item?.h1}</h3>
      <p className="text-sm font-nunito text-[#212121] text-wrap">
        {item?.description}
      </p>
    </div>
    <img
      src={item?.images}
      alt={item?.h1}
      className="h-[110px] w-[110px] rounded-full object-cover"
    />
  </div>
);

const SolutionHairConcern: React.FC<SolutionHairConcernProps> = ({
  contents,
  title,
  gender,
}) => {
  contents = Array.isArray(contents) ? contents : [];

  const hairSolution = contents.map((item) => item?.content_data);

  if (hairSolution.length === 0) return null;

  return (
    <div className="mb-8">
      <h2 className="text-lg font-bold font-nunito text-[#212121] mb-4 mx-4">
        {title}
      </h2>

      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex space-x-4 pb-4 px-4">
          {hairSolution.map((item, index) => (
            <Card key={index} item={item} gender={gender} />
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};

export default React.memo(SolutionHairConcern);
