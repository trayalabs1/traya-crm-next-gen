import { StayConsistentProps } from "@components/MobileLayout/RenderMobileComponents";
import { MobileContent } from "cms";
import React, { useEffect, useState } from "react";
interface Content {
  thumbnail: string;
  mainText: string;
}

const StayConsistent: React.FC<StayConsistentProps> = ({ contents }) => {
  const [data, setData] = useState<Content[]>([]);
  const transformContents = (
    contents: MobileContent[] | MobileContent,
  ): Content[] => {
    const contentArray = Array.isArray(contents) ? contents : [contents];
    return contentArray.map((item: MobileContent) => ({
      thumbnail: item.content_data.thumbnail || item.image_url || "", // Adjust based on the actual structure of `MobileContentData`
      mainText: item.content_data.h1 || item.name || "Default Text", // Adjust based on `MobileContentData`
    }));
  };
  useEffect(() => {
    setData(transformContents(contents));
  }, [contents]);
  if (!data || data.length === 0) {
    return null;
  }

  return (
    <div className="bg-white p-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-800 py-2">
          Learn and Explore
        </h2>
      </div>
      <div className="flex overflow-x-auto space-x-4 py-2">
        {data.map((item, index) => (
          <div key={index} className="relative">
            <img
              src={item.thumbnail}
              alt="Thumbnail"
              className="w-38 h-64 rounded-lg object-cover"
            />
            <div className="absolute inset-0 flex justify-center items-center">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-black"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14.752 11.168l-5.197-2.6A1 1 0 008 9.467v5.066a1 1 0 001.555.832l5.197-2.6a1 1 0 000-1.664z"
                  />
                </svg>
              </div>
            </div>
            <p className="absolute top-44 left-3 text-white text-sm font-bold w-36">
              {item.mainText}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StayConsistent;
