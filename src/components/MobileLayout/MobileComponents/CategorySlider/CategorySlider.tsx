import React from "react";
import { ChevronRight } from "lucide-react";
import { CategorySliderProps } from "@components/MobileLayout/RenderMobileComponents";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { ScrollBar } from "@components/ui/scroll-area";

const CategorySlider: React.FC<CategorySliderProps> = ({ contents, title }) => {
  const contentsDetails = Array.isArray(contents) ? contents : [];
  const ticketCategories = contentsDetails.map((item) => item.content_data);

  return (
    <div className="mb-2 bg-white pb-6">
      <div className="mx-4 flex justify-between">
        <h2 className="text-xl font-bold font-nunito text-[#212121] mt-4">
          {title}
        </h2>
      </div>

      <ScrollArea>
        <div className="flex overflow-x-auto mt-4 pl-1 pr-4 pb-2">
          {ticketCategories.map((item, index) => (
            <button
              key={index}
              className="flex items-center bg-[#E1DCEA] rounded-lg ml-2.5 h-14 px-3 shrink-0"
            >
              <img
                src={item.categoryIcon}
                alt={item.label}
                className="h-6 w-6 mr-2"
              />
              <span className="font-bold font-nunito text-sm text-[#212121] w-24 text-left">
                {item.label}
              </span>
              <ChevronRight className="w-6 h-6 text-[#212121]" />
            </button>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};

export default React.memo(CategorySlider);
