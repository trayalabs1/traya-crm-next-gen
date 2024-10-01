import { TrayaHeroesScreenProps } from "@components/MobileLayout/RenderMobileComponents";
import { ScrollArea, ScrollBar } from "@components/ui/scroll-area";
import { memo } from "react";

const TrayaHeroesScreen: React.FC<TrayaHeroesScreenProps> = ({
  contents,
  title,
}) => {
  return (
    <div className="w-full p-2">
      <h2 className="text-lg font-nunito font-bold text-[#212121] mb-2">
        {title}
      </h2>
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex gap-3 pb-4">
          {contents.map((content) => (
            <div
              key={content.content_id}
              className="relative flex-shrink-0 w-40 h-72 rounded-lg overflow-hidden shadow-md"
            >
              <img
                src={content.content_data.thumbnail}
                alt={content.content_data.mainText}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4 flex flex-col items-start">
                <img
                  src="https://res.cloudinary.com/dl0s1hbg2/image/upload/v1727266346/uizcztggpaplyj6mc2ab.png"
                  alt="Icon"
                  className="w-10 h-10 mb-2 flex-shrink-0"
                />
                <div className="text-white w-full text-wrap">
                  <h3 className="text-lg font-nunito font-bold">
                    {content.content_data.mainText}
                  </h3>
                  <p className="text-sm whitespace-nowrap overflow-hidden">
                    - {content.content_data.subtext}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};

export default memo(TrayaHeroesScreen);
