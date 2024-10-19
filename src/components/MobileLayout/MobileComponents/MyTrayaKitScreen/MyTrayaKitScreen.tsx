import { MyTrayaKitScreenProps } from "@components/MobileLayout/RenderMobileComponents";
import React from "react";

const MyTrayaKitScreen: React.FC<MyTrayaKitScreenProps> = ({
  contents,
  title,
}) => {
  const contentDetails = Array.isArray(contents) ? contents : [];
  if (contentDetails.length === 0) return null;

  const contentData = Array.isArray(contentDetails[0]?.content_data)
    ? contentDetails[0]?.content_data
    : [];

  if (!contentData) return null;

  return (
    <div className="pb-8 mx-4">
      <h2 className="text-lg font-nunito font-bold text-[#212121] mb-2">
        {title}
      </h2>
      <div className="flex justify-between">
        {/* Main Video Section */}
        <div className="w-[calc(50%-15px)] h-[calc(35.5vh)] relative rounded-lg overflow-hidden shadow-lg mb-1">
          <img
            src={contentData[0]?.thumbnail}
            alt={contentData[0]?.sub_text || "Thumbnail"}
            className="w-full h-full object-cover rounded-lg"
          />
          <div className="absolute inset-0 flex flex-col justify-end p-4">
            <img
              src="https://res.cloudinary.com/dl0s1hbg2/image/upload/v1727266346/uizcztggpaplyj6mc2ab.png"
              alt="Play"
              width={30}
              height={30}
              className="mb-2"
            />
            <p className="text-white text-sm font-bold font-nunito">
              {contentData[0]?.sub_text}
            </p>
          </div>
        </div>
        {/* Additional Video Sections */}
        <div className="w-[calc(50%-15px)] space-y-1">
          {[1, 2].map((index) => (
            <div
              key={index}
              className="h-[calc(17.4vh)] relative rounded-lg overflow-hidden shadow-lg"
            >
              <img
                src={contentData[index]?.thumbnail}
                alt={contentData[index]?.sub_text || "Thumbnail"}
                className="w-full h-full object-cover rounded-lg"
              />
              <div className="absolute inset-0 flex flex-col justify-end p-4">
                <img
                  src="https://res.cloudinary.com/dl0s1hbg2/image/upload/v1727266346/uizcztggpaplyj6mc2ab.png"
                  alt="Play"
                  width={30}
                  height={30}
                  className="mb-2"
                />
                <p className="text-white text-sm font-bold font-nunito">
                  {contentData[index]?.sub_text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyTrayaKitScreen;
