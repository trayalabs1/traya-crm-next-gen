import React, { memo, useState } from "react";
import { MobileContent } from "cms"; // Assuming this is the correct import for MobileContent

// Define the types for props
interface SuccessStoryProps {
  contents: MobileContent[]; // Expecting the contents array here
  title: string;
}

// Get viewport width for responsive design
const viewPortWidth = window.innerWidth;

const SuccesStories: React.FC<SuccessStoryProps> = ({ contents, title }) => {
  const [activeSlide, setActiveSlide] = useState(0); // Tracks the current active slide

  // Handler for changing slides
  const handleNextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % contents.length);
    console.log("Swiped in success stories");
  };

  const handlePrevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + contents.length) % contents.length);
    console.log("Swiped in success stories");
  };

  return contents.length > 0 ? (
    <div className="bg-white mb-2">
      <div className="pb-5">
        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-900 mt-5 mb-2 mx-4">
          {title}
        </h2>

        {/* Custom Carousel */}
        <div className="relative w-full overflow-hidden h-[450px] mt-3">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${activeSlide * 100}%)`,
            }}
          >
            {contents.map((item, index) => (
              <div key={index} className="min-w-full box-border text-center">
                <img
                  src={
                    item.content_data?.img ?? item.content_data?.thumbnail ?? ""
                  }
                  alt={`Success Story ${index}`}
                  className="w-full h-[450px] object-cover rounded-lg"
                  style={{ maxWidth: viewPortWidth - 32 }}
                />
              </div>
            ))}
          </div>

          {/* Left and Right navigation buttons */}
          <button
            onClick={handlePrevSlide}
            className="absolute top-1/2 left-3 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full w-10 h-10 flex items-center justify-center"
          >
            &#8249;
          </button>
          <button
            onClick={handleNextSlide}
            className="absolute top-1/2 right-3 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full w-10 h-10 flex items-center justify-center"
          >
            &#8250;
          </button>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center mt-4">
          {contents.map((_, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full mx-1 ${
                i === activeSlide ? "bg-gray-800" : "bg-gray-300"
              }`}
            ></div>
          ))}
        </div>
      </div>
    </div>
  ) : null;
};

export default memo(SuccesStories);
