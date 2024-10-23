import React from "react";
import { ScrollArea } from "@components/ui/scroll-area";
import { Button } from "@components/ui/button";
import { Gender, MobileContent } from "cms";
import { cn } from "@utils/shadcn";

interface ReorderKitProps {
  contents: MobileContent | MobileContent[];
  title: string;
  gender: Gender;
}

const ReorderKit: React.FC<ReorderKitProps> = ({ contents, gender }) => {
  contents = Array.isArray(contents) ? contents : [];
  const data = contents[0]?.content_data ?? {};
  return (
    <div className="mb-2 p-4">
      <ScrollArea className="w-full">
        <div className="border border-gray-200 rounded-lg p-4">
          <div className="flex justify-between items-center">
            <div className="flex-1 mb-4">
              <h2 className="text-md font-bold font-nunito text-gray-800">
                {data?.title}
              </h2>
              <p className="text-sm font-nunito my-3 text-gray-600 h-[34px] text-wrap">
                {data?.description}
              </p>
              {data?.discountMessage && (
                <span
                  className="inline-block px-2 py-1 rounded-full text-xs font-bold mt-4"
                  style={{
                    backgroundColor: "#E85C4B1A",
                    color: data?.discountTextColour ?? "#E85C4B",
                  }}
                >
                  {data?.discountMessage}
                </span>
              )}
            </div>
            <div className="w-32 h-40">
              <img
                src={data?.image}
                alt="Kit Image"
                className="object-contain w-full h-full"
              />
            </div>
          </div>
          <Button
            className={cn(
              "w-full mt-4 text-black",
              gender === "F"
                ? "bg-[#BD5747] hover:bg-[#bb594a]"
                : "bg-[#B7D340] hover:bg-[#bad447]",
            )}
            onClick={() => console.log("Reorder clicked")}
          >
            {data?.cta}
          </Button>
        </div>
      </ScrollArea>
    </div>
  );
};

export default React.memo(ReorderKit);
