import { TrayaDoctorsProps } from "@components/Home/Home";
import { ScrollArea, ScrollBar } from "@components/ui/scroll-area";
import React, { memo } from "react";

interface Doctor {
  profile_image?: string;
  doctor_name?: string;
  doctor_specialization?: string;
  experience?: string;
  language_based_description?: { [key: string]: string };
  h1Text?: string;
  h2Ttext?: string[];
}

const Card = ({ item }: { item: Doctor }) => (
  <div className="min-h-[106px] w-[310px] border border-[#DDDDDD] mr-4 rounded-lg p-4 flex mb-2.5 bg-white cursor-pointer">
    <img
      src={item.profile_image}
      alt={item.doctor_name}
      className="h-[72px] w-[72px] rounded-full bg-[#F2F4EB] mr-2"
    />
    <div>
      <h3 className="text-lg font-nunito font-bold text-[#212121]">
        {item.doctor_name}
      </h3>
      <p className="text-xs font-nunito text-[#727272]">
        {item.doctor_specialization}
      </p>
      <div className="h-px bg-[#B7D340] my-2"></div>
      <p className="text-xs font-nunito font-bold text-[#212121]">
        Experience: {item.experience}
      </p>
    </div>
  </div>
);

const TrayaDoctors: React.FC<TrayaDoctorsProps> = ({
  // txtHeader,
  // lang,
  contents,
  title,
}) => {
  const trayaDoctors = contents.map((item) => item.content_data);

  if (trayaDoctors.length === 0) {
    return null;
  }

  return (
    <div className="my-6">
      <h2 className="text-xl font-nunito font-bold text-[#212121] mb-4 mx-4">
        {title}
      </h2>
      <ScrollArea className="w-full whitespace-nowrap rounded-md">
        <div className="flex space-x-4 pb-4 px-4">
          {trayaDoctors.map((doctor, index) => (
            <Card key={index} item={doctor} />
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};

export default memo(TrayaDoctors);
