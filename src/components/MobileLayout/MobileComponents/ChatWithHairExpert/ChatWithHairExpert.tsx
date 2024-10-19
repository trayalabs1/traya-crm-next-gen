import React from "react";
import { MessageCircle } from "lucide-react";
import { ChatWithHairExpertProps } from "@components/MobileLayout/RenderMobileComponents";

const ChatWithHairExpert: React.FC<ChatWithHairExpertProps> = ({
  contents,
  gender,
}) => {
  const content = Array.isArray(contents) ? contents[0]?.content_data : null;

  if (!content) return null;

  return (
    <div className="mb-8">
      {content?.whatsApp ? (
        <div className="bg-white border border-[#DDDDDD] rounded-xl p-4 mx-4 mb-8">
          <div className="flex justify-between items-center">
            <div className="w-2/3">
              <h2 className="text-lg font-bold font-nunito text-[#2C2C2A]">
                {content.h1}
              </h2>
              <p className="text-base font-nunito text-[#5E5E5A] mt-1 mb-2">
                {content.h2}
              </p>
            </div>
            <img
              src={content?.image}
              alt="Chat"
              className="w-20 h-20 object-contain"
            />
          </div>
          <div
            className={`flex items-center justify-center mt-2 py-2 px-3 rounded-lg ${gender === "F" ? "bg-[#EDD2CE]" : "bg-[#E6F0BD]"}`}
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="#40413E">
              <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM12 6C9.79 6 8 7.79 8 10V14C8 16.21 9.79 18 12 18C14.21 18 16 16.21 16 14V10C16 7.79 14.21 6 12 6ZM14 14C14 15.1 13.1 16 12 16C10.9 16 10 15.1 10 14V10C10 8.9 10.9 8 12 8C13.1 8 14 8.9 14 10V14Z" />
            </svg>
            <span className="text-sm font-bold font-nunito text-[#40413E]">
              {content.cta}
            </span>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between bg-white border border-[#DDDDDD] rounded-lg py-5 px-4 mx-4 mb-8">
          <h2 className="text-base font-bold font-nunito text-[#212121]">
            {content.h1}
          </h2>
          <div className="flex items-center">
            <MessageCircle className="w-5 h-5 mr-2" />
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="#B7D340">
              <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatWithHairExpert;
