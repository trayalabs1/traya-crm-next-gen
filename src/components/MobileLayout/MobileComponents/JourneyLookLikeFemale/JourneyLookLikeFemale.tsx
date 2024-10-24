import React, { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { JourneyLookLikeFemaleProps } from "@components/MobileLayout/RenderMobileComponents";

// type JourneyItem = {
//   img_url: string;
//   title: string;
//   description: string;
// };

// type JourneyLookLikeFemaleProps = {
//   contents: {
//     showComponent: boolean;
//     componentDetails: JourneyItem[];
//   };
//   title: string;
// };

const JourneyLookLikeFemale: React.FC<JourneyLookLikeFemaleProps> = ({
  contents = { showComponent: false, componentDetails: [] },
  title = "Your Journey",
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const contentsDetails = !Array.isArray(contents) ? contents : null;

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => {
      const length = contentsDetails?.componentDetails?.length || 0;
      return prevIndex === 0 ? length - 1 : prevIndex - 1;
    });
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => {
      const length = contentsDetails?.componentDetails?.length || 0;
      return prevIndex === length - 1 ? 0 : prevIndex + 1;
    });
  };

  if (!contentsDetails?.showComponent) {
    return null;
  }

  const Card = () => {
    const componentDetails = contentsDetails?.componentDetails;

    const item = Array.isArray(componentDetails)
      ? componentDetails[currentIndex]
      : null;
    return (
      <div className="relative">
        <img
          src={item?.img_url}
          alt={item?.title}
          className="w-full h-[270px] object-contain"
        />
        <div className="bg-[#FFE6E0] rounded-lg mx-4 -mt-20 mb-2.5 p-2.5 min-h-[90px] flex flex-col items-center">
          <div className="bg-[#D88673] mt-3.5 py-0.5 px-2.5 rounded-lg">
            <p className="text-base font-fredoka text-white mb-2 mt-0.75">
              {item?.title}
            </p>
          </div>
          <p className="text-sm font-nunito text-[#212121] w-3/4 text-center mt-1.25">
            {item?.description}
          </p>
        </div>
      </div>
    );
  };
  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold font-nunito text-[#212121] mb-8 mx-4">
        {title}
      </h2>
      <div className="relative">
        <Card />
        <button
          onClick={handlePrev}
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md"
        >
          <ChevronLeftIcon className="h-6 w-6" />
        </button>
        <button
          onClick={handleNext}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md"
        >
          <ChevronRightIcon className="h-6 w-6" />
        </button>
      </div>
      <div className="flex justify-center mt-4">
        {contentsDetails?.componentDetails?.map((_, index) => (
          <div
            key={index}
            className={`h-1.5 rounded-full mx-1 ${
              index === currentIndex ? "w-4 bg-black" : "w-1.5 bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default JourneyLookLikeFemale;
