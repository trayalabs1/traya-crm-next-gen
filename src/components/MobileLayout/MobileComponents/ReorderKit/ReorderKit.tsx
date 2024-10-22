import React from "react";
import { ScrollArea } from "@components/ui/scroll-area";
import { Button } from "@components/ui/button";
import { MobileContent } from "cms";

interface KitData {
  title: string;
  description: string;
  discountMessage?: string;
  discountTextColour?: string;
  image: string;
  cta: string;
}

interface ReorderKitProps {
  contents: MobileContent | MobileContent[];
  title: string;
}

const ReorderKit: React.FC<ReorderKitProps> = ({ contents }) => {
  contents = Array.isArray(contents) ? contents : [];

  const data: KitData = Array.isArray(contents[0].content_data)
    ? contents[0].content_data[0]
    : {};
  return (
    <div className="mb-2 bg-white p-4 md:p-6">
      <ScrollArea className="w-full">
        <div className="border border-gray-200 rounded-lg p-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex-1 mb-4 md:mb-0 md:mr-4">
              <h2 className="text-xl font-bold text-gray-800 mb-2">
                {data.title}
              </h2>
              <p className="text-sm text-gray-600 mb-2 h-[34px] overflow-hidden">
                {data.description}
              </p>
              {data.discountMessage && (
                <span
                  className="inline-block px-2 py-1 rounded-full text-xs font-bold"
                  style={{
                    backgroundColor: `${data.discountTextColour}1A`,
                    color: data.discountTextColour,
                  }}
                >
                  {data.discountMessage}
                </span>
              )}
            </div>
            <div className="w-32 h-40 relative">
              <img
                src={data.image}
                alt="Kit Image"
                className="object-contain w-full h-full"
              />
            </div>
          </div>
          <Button
            className="w-full mt-4 bg-[#B7D340] text-black hover:bg-[#A1BD39]"
            onClick={() => console.log("Reorder clicked")}
          >
            {data.cta}
          </Button>
        </div>
      </ScrollArea>
    </div>
  );
};

export default React.memo(ReorderKit);
