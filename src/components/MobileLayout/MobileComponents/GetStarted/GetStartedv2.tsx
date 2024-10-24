import { GetStartedV2Props } from "@components/MobileLayout/RenderMobileComponents";
import { memo } from "react";

const GetStartedV2: React.FC<GetStartedV2Props> = ({ contents }) => {
  const first_name = "John";

  return (
    <div className="relative">
      <div
        className="h-[420px] bg-cover bg-center"
        style={{
          backgroundImage: `url(${Array.isArray(contents) && contents[0]?.content_data?.img})`,
        }}
      >
        <p className="text-lg font-nunito text-white px-4 pt-10">
          {first_name} 👋
        </p>
      </div>
    </div>
  );
};

export default memo(GetStartedV2);
