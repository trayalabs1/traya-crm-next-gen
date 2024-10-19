import { doubleQuotesRemover } from "@utils/common";
import React, { useState } from "react";
import { COLORS } from "../colors";
import { cn } from "@utils/shadcn";
import { HowTrayaWorksProps } from "@components/MobileLayout/RenderMobileComponents";

const HowTrayaWorks: React.FC<HowTrayaWorksProps> = ({ contents, title }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // const nextSlide = () => {
  //   setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
  // };

  // const prevSlide = () => {
  //   setCurrentIndex((prevIndex) =>
  //     prevIndex === 0 ? items.length - 1 : prevIndex - 1,
  //   );
  // };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="p-2">
      <h2 className="text-lg font-nunito font-bold text-[#212121] mb-2">
        {title}
      </h2>
      <div className="w-full border border-gray-300 rounded-lg overflow-hidden">
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {Array.isArray(contents) &&
            contents.map((item) => (
              <div key={item.content_id} className="min-w-full flex p-4">
                <div
                  className={cn(
                    "max-w-20 max-h-20 p-5 bg-[#F2F4EB] border rounded-xl flex items-center justify-center",
                    `bg-[${doubleQuotesRemover(COLORS.greyF2F4EB)}]`,
                  )}
                >
                  <img
                    className="w-full h-auto max-h-10 object-contain"
                    src={item.content_data.icon}
                    alt={item.content_data.h1_text}
                  />
                </div>
                <div className="flex flex-col space-y-1 ml-4">
                  <p className="font-nunito font-normal text-[#727272]">
                    {item.content_data.step_text}
                  </p>
                  <h1 className="font-nunito font-bold text-[#212121]">
                    {item.content_data.h1_text}
                  </h1>
                  <p className="text-left text-ellipsis font-nunito text-[#212121]">
                    {item.content_data.description}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className="flex justify-center items-center mt-4 space-x-2">
        {Array.isArray(contents) &&
          contents.map((_, index) => (
            <button
              key={index}
              className={`${
                index === currentIndex
                  ? "w-3 h-1 bg-black"
                  : "w-1 h-1 bg-gray-500"
              } rounded transition-all duration-300`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            ></button>
          ))}
      </div>
    </div>
  );
};

export default HowTrayaWorks;
