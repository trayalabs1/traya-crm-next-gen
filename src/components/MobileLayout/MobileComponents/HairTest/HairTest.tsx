import React, { useState } from "react";
import { Button } from "@components/ui/button";
import { cn } from "@utils/shadcn";
import { Gender, MobileContent } from "cms";

export interface HairTestProps {
  contents: MobileContent[] | MobileContent;
  // title: string;
  gender: Gender;
}

const HairTest: React.FC<HairTestProps> = ({ contents, gender }) => {
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
          gender={gender}
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
  gender?: Gender;
}

function CustomBtn({ onPress, btnText, btnSubText, gender }: CustomBtnProps) {
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
        isPressed ? "transform scale-95" : "",
        gender === "F"
          ? "hover:bg-[#BD5747] bg-[#BD5747]"
          : "hover:bg-[#B7D340] bg-[#B7D340]",
      )}
    >
      <span className="text-[#000000] font-nunito font-medium">{btnText}</span>
      <span className="text-[#000000] font-nunito font-medium text-[9px] ml-1 -mt-4">
        {btnSubText}
      </span>
    </Button>
  );
}
