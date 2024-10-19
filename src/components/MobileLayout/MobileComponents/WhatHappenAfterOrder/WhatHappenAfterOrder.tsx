import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { WhatHappenAfterOrderProps } from "@components/MobileLayout/RenderMobileComponents";

interface OrderItem {
  item: {
    h1?: string;
    h2?: string;
    h3?: string;
  };
}
const Card = ({ item }: OrderItem) => (
  <div className="h-[150px] border border-[#DDDDDD] mx-4 rounded-lg p-4 mb-2.5">
    <div className="flex items-center">
      <span className="text-[80px] font-fredoka text-[#F7DBD4] -mt-2.5">
        {item?.h1}
      </span>
      <h3 className="text-2xl font-fredoka text-[#414042] font-normal ml-4 w-4/5">
        {item?.h2}
      </h3>
    </div>
    <p className="text-sm font-nunito text-[#2C2C2A] -mt-2.5">{item?.h3}</p>
  </div>
);

const WhatHappenAfterOrder: React.FC<WhatHappenAfterOrderProps> = ({
  contents,
  title,
}) => {
  const whatHappenAfterOrder = Array.isArray(contents)
    ? contents.map((item) => item.content_data)
    : [];
  const [currentIndex, setCurrentIndex] = useState(0);

  if (whatHappenAfterOrder.length === 0) return null;

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === whatHappenAfterOrder.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? whatHappenAfterOrder.length - 1 : prevIndex - 1,
    );
  };

  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold font-nunito text-[#212121] mb-4 mx-4">
        {title}
      </h2>
      <div className="relative">
        <Card item={whatHappenAfterOrder[currentIndex]} />
        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white rounded-full p-1"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white rounded-full p-1"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
      <div className="flex justify-center mt-4">
        {whatHappenAfterOrder.map((_, index) => (
          <div
            key={index}
            className={`w-1.5 h-1.5 rounded-full mx-1 ${
              index === currentIndex ? "bg-[#2C2C2A]" : "bg-black"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default React.memo(WhatHappenAfterOrder);
