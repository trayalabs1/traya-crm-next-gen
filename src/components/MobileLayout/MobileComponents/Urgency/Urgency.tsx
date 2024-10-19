import React from "react";
import { ArrowDown } from "lucide-react";
import { UrgencyProps } from "@components/MobileLayout/RenderMobileComponents";
import { MobileContentData } from "cms";

type UrgencyItem = Pick<
  MobileContentData,
  "time_span" | "img1" | "h1" | "img2" | "number_perc" | "h2"
>;

const Card = ({
  item,
  color,
  show,
  lang,
}: {
  item: UrgencyItem;
  color: string;
  show: boolean;
  lang: string;
}) => (
  <div
    className={`w-1/3 rounded-lg px-1.5 pt-5 pb-4 items-center bg-[#EAF4F1] border relative mt-2.5 mx-1`}
    style={{ borderColor: color }}
  >
    <div
      className={`absolute -top-2.5 py-0.5 px-2 rounded-lg text-white text-xs font-nunito text-center`}
      style={{ backgroundColor: color }}
    >
      {show
        ? lang === "hinglish"
          ? "Aap yahan hain"
          : "You're here"
        : item.time_span}
    </div>
    <div className="flex flex-col justify-between h-full">
      <div className="flex flex-col items-center">
        <img
          src={item.img1}
          alt=""
          className="h-14 w-14 mb-2 rounded-full mt-2.5"
        />
        <p className="text-base font-nunito text-[#212121] mb-1 text-center">
          {item.h1}
        </p>
      </div>
      <div className="flex flex-col items-center">
        <ArrowDown size={21} color={color} />
        <img src={item.img2} alt="" className="h-14 w-14 my-2" />
        <p className={`text-xl font-bold font-nunito mb-2`} style={{ color }}>
          {item.number_perc}
        </p>
        <p className="text-xs font-nunito text-[#414042] text-center">
          {item.h2}
        </p>
      </div>
    </div>
  </div>
);

const Urgency: React.FC<UrgencyProps> = ({ lang, contents, title }) => {
  const contentsDetails = Array.isArray(contents) ? contents : [];

  const contentData = contentsDetails.map((item) => item.content_data);
  if (contentData.length === 0) return null;

  return (
    <div>
      <h2 className="text-xl font-bold font-nunito text-[#212121] mb-4 mx-4">
        {title}
      </h2>
      <div className="bg-white mb-2 pb-5">
        <div className="flex justify-between px-4 bg-white py-5">
          <Card item={contentData[0]} color="#76BC5D" show={true} lang={lang} />
          <Card
            item={contentData[1]}
            color="#F6B450"
            show={false}
            lang={lang}
          />
          <Card
            item={contentData[2]}
            color="#DA7872"
            show={false}
            lang={lang}
          />
        </div>
      </div>
    </div>
  );
};

export default React.memo(Urgency);
