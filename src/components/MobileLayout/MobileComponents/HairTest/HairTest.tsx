import React, { useState } from "react";
import { Button } from "@components/ui/button";
import { COLORS } from "../colors";
import { cn } from "@utils/shadcn";
import { HairTestProps } from "@components/MobileLayout/RenderMobileComponents";

const HairTest: React.FC<HairTestProps> = ({ contents }) => {
  // const saleTheme = { isOn: true };

  return (
    <div className="">
      <h1 className="text-lg font-nunito font-bold text-[#212121] p-4 text-ellipsis">
        {Array.isArray(contents) && contents[0]?.content_data?.h1}
      </h1>
      <p className="text-base font-nunito text-[#212121] px-4 text-ellipsis">
        {Array.isArray(contents) && contents[0]?.content_data?.h2}
      </p>

      <div className="p-4">
        <CustomBtn
          onPress={() => {}}
          btnText={
            Array.isArray(contents) ? contents[0]?.content_data?.cta : ""
          }
          btnSubText={
            Array.isArray(contents) ? contents[0]?.content_data?.prefix : ""
          }
        />
      </div>
    </div>
  );
};

export default HairTest;
interface CustomBtnProps {
  onPress: () => void;
  btnText?: string;
  btnSubText?: string;
}

function CustomBtn({ onPress, btnText, btnSubText }: CustomBtnProps) {
  const [isPressed, setIsPressed] = useState<boolean>(false);
  const handleMouseDown = () => {
    setIsPressed(true);
  };

  const handleMouseUp = () => {
    setIsPressed(false);
  };
  return (
    <Button
      onClick={() => {
        onPress();
        setIsPressed(true);
      }}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={() => setIsPressed(false)}
      className={cn(
        "p-4 w-full transition-transform duration-200",
        `bg-[${COLORS.greenB7D340}]`,
        `hover:bg-[${COLORS.greenB7D340}]`,
        isPressed ? "transform scale-95" : "",
      )}
    >
      <span className="text-[#000000] font-nunito font-medium">{btnText}</span>
      <span className="text-[#000000] font-nunito font-medium text-[9px] ml-1 -mt-4">
        {btnSubText}
      </span>
    </Button>
  );
}
