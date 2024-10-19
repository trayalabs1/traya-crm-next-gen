import { RetakeHairBannerProps } from "@components/MobileLayout/RenderMobileComponents";
import React from "react";

const RetakeHairBanner: React.FC<RetakeHairBannerProps> = ({
  contents,
  gender,
}) => {
  const content = Array.isArray(contents) ? contents : [];

  const contentData = content.length ? content[0].content_data : null;
  if (content.length === 0 || Object.keys(contentData || {}).length === 0) {
    return null;
  }

  return (
    <div
      className="rounded-xl h-[167px] mx-4 mb-8 p-4 flex justify-between"
      style={{
        background: `linear-gradient(to bottom right, ${contentData?.color1}, ${contentData?.color2}, ${contentData?.color3})`,
      }}
    >
      <div className="w-[63%]">
        <h2 className="text-lg font-fredoka text-white">{contentData?.h1}</h2>
        <p className="text-sm font-nunito text-white leading-5 mt-0.5">
          {contentData?.h2}
        </p>
        <button
          className={`h-10 ${gender === "F" ? "bg-[#EDD2CE]" : "bg-[#E6F0BD]"} rounded-lg mt-2.5 flex items-center justify-center`}
          onClick={() => {
            // Navigation and event logging would go here
          }}
        >
          <span className="text-sm font-bold font-nunito text-[#212121]">
            {contentData?.ctaName}
          </span>
        </button>
      </div>
      <img
        src={contentData?.image}
        alt="Phone"
        className="w-[103px] h-[151px] object-contain"
      />
    </div>
  );
};

export default React.memo(RetakeHairBanner);
