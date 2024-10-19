import { TrayaHolisticProps } from "@components/MobileLayout/RenderMobileComponents";
import React from "react";

const TrayaHolistic: React.FC<TrayaHolisticProps> = ({ contents, title }) => {
  const contentsDetails = Array.isArray(contents) ? contents : [];
  console.log(contentsDetails[0]?.content_data?.img, "contentsDetails");
  return (
    <div className="mb-6">
      <h2 className="text-xl font-bold font-nunito text-[#212121] mb-4 mx-4">
        {title}
      </h2>
      <div className="mx-4">
        <img
          src={contentsDetails[0]?.content_data?.img}
          alt="Traya Holistic"
          className="w-full h-[300px] object-contain mb-6"
        />
      </div>
    </div>
  );
};

export default React.memo(TrayaHolistic);
