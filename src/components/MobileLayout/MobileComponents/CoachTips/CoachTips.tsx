import { EUCoachTipsProps } from "@components/MobileLayout/RenderMobileComponents";
import React, { useState } from "react";

const EUCoachTips: React.FC<EUCoachTipsProps> = ({ contents, title }) => {
  // Ensure contents is an array
  contents = Array.isArray(contents) ? contents : [];

  // Extract content_data from the first object in contents array
  const coachTips = contents[0]?.content_data || [];

  const [activeIndex, setActiveIndex] = useState(0);

  // Handle the pagination button click
  const handlePaginationClick = (index: number) => {
    setActiveIndex(index);
  };

  // If no content data, return null
  if (!coachTips?.length) {
    return <div>No Coach Tips Available</div>;
  }

  return (
    <div className="px-4 bg-white py-6 mb-4 w-full">
      {/* Title */}
      <h6 className="text-xl font-bold text-gray-800 mb-3">{title}</h6>

      {/* Carousel */}
      <div className="relative w-full overflow-hidden">
        <div
          className="flex transition-transform duration-500"
          style={{
            transform: `translateX(-${activeIndex * 100}%)`,
            width: `${coachTips.length * 100}%`,
          }}
        >
          {coachTips.map((item) => (
            <div
              key={item?._id}
              className="w-full flex-shrink-0 rounded-lg p-4 mx-auto max-w-full lg:max-w-xl"
              style={{
                background: `linear-gradient(135deg, ${item.color1}, ${item.color2})`,
                padding: "16px",
                boxSizing: "border-box",
                borderRadius: "16px", // Properly rounded corners
              }}
            >
              {/* Coach Info */}
              <div className="flex items-center mb-4">
                <img
                  src={item.image_url}
                  alt={item.coach_name}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <p className="text-lg font-semibold text-white">
                    {item.coach_name}
                  </p>
                  <p className="text-sm text-white">Traya Hair Coach</p>
                </div>
              </div>

              {/* Tip */}
              <p className="text-md font-medium text-white break-words leading-relaxed">
                {item.tip}
              </p>
            </div>
          ))}
        </div>

        {/* Pagination Buttons */}
        <div className="flex justify-center items-center mt-4 space-x-2">
          {coachTips.map((_, index: number) => (
            <button
              key={index}
              className={`${
                index === activeIndex
                  ? "w-3 h-1 bg-black"
                  : "w-1 h-1 bg-gray-500"
              } rounded transition-all duration-300`}
              onClick={() => handlePaginationClick(index)}
              aria-label={`Go to slide ${index + 1}`}
            ></button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EUCoachTips;
