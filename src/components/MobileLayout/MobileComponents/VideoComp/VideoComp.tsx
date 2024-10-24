import { PlayIcon } from "lucide-react";
import { VideoCompProps } from "@components/MobileLayout/RenderMobileComponents";

export default function VideoComp({ contents }: VideoCompProps) {
  contents = Array.isArray(contents) ? contents : [];
  const contentData = contents[0].content_data;
  const handlePressed = () => {
    console.log("Video pressed:");
  };

  return (
    <div className="mx-4 my-8 relative">
      <button onClick={handlePressed} className="w-full relative group">
        <img
          src={contentData?.thumbnail}
          alt={contentData?.mainText}
          className="w-full h-[185px] object-cover rounded-[10px]"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center group-hover:bg-opacity-50 transition-opacity rounded-[10px]">
          <PlayIcon className="w-8 h-8 text-white" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <p className="text-white text-xl font-bold font-nunito leading-tight">
            {contentData?.mainText}?
          </p>
        </div>
      </button>
    </div>
  );
}
