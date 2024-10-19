import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import { Calendar, Clock } from "lucide-react";
import { BookCallProps } from "@components/MobileLayout/RenderMobileComponents";

const BookCall: React.FC<BookCallProps> = ({ contents, gender }) => {
  contents = Array.isArray(contents) ? contents : [];
  const [isCallBooked, setIsCallBooked] = useState(false);
  const [dateTime] = useState<string | null>(new Date().toString());
  const [missedCall, setMissedCall] = useState(false);
  const [notReached, setNotReached] = useState(false);
  const [, setToggleStep] = useState(0);

  const handleButtons = () => {
    setToggleStep((prevStep) => {
      switch (prevStep) {
        case 0:
          setIsCallBooked(false);
          setMissedCall(false);
          setNotReached(false);
          break;
        case 1:
          setIsCallBooked(true);
          setMissedCall(false);
          setNotReached(false);
          break;
        case 2:
          setIsCallBooked(true);
          setMissedCall(true);
          setNotReached(false);
          break;
        case 3:
          setIsCallBooked(true);
          setMissedCall(false);
          setNotReached(true);
          break;

        default:
          break;
      }

      return (prevStep + 1) % 4;
    });
  };
  useEffect(() => {
    const interval = setInterval(handleButtons, 2000);

    return () => clearInterval(interval);
  }, []);

  const handleBookCall = () => {
    console.log("Booking call");
  };

  const handleChat = () => {
    console.log("Starting chat");
  };

  const bookACall = contents[0];

  if (!bookACall) return null;

  return (
    <div className="mb-2 bg-white rounded-lg shadow-md">
      <div className="p-4">
        {isCallBooked ? (
          <div>
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h2 className="text-xl font-bold text-gray-800">
                  {missedCall
                    ? "You missed your call!"
                    : notReached
                      ? "Sorry, we couldn't connect"
                      : "Call Scheduled"}
                </h2>
                <p className="text-sm text-gray-600 mt-2">
                  {missedCall
                    ? "The first call is always important. Let's try again?"
                    : "Your hair coach will call on your registered number"}
                </p>
                {!missedCall && !notReached && dateTime && (
                  <div className="mt-2">
                    <div className="flex items-center">
                      <Calendar className="w-5 h-5 mr-2" />
                      <span className="text-sm text-gray-600">
                        {dayjs(dateTime).format("DD MMM YYYY")}
                      </span>
                    </div>
                    <div className="flex items-center mt-2">
                      <Clock className="w-5 h-5 mr-2" />
                      <span className="text-sm text-gray-600">
                        {dayjs(dateTime).format("hh:mm A")} -{" "}
                        {dayjs(dateTime).add(30, "minute").format("hh:mm A")}
                      </span>
                    </div>
                  </div>
                )}
              </div>
              <img
                src={bookACall?.images_circle}
                alt="Call Image"
                className="w-20 h-20 rounded-full"
              />
            </div>
            <div className="flex justify-between mt-4">
              <button
                className="w-[calc(50%-0.5rem)] bg-gray-200 text-gray-800 py-2 px-4 rounded-lg font-bold"
                // onClick={() => (window.location.href = "/help-support")}
              >
                Read FAQs
              </button>
              <button
                className="w-[calc(50%-0.5rem)] border border-gray-300 text-gray-800 py-2 px-4 rounded-lg font-bold"
                onClick={handleBookCall}
              >
                {notReached ? "Call Back" : "Reschedule"}
              </button>
            </div>
          </div>
        ) : (
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-lg font-semibold font-nunito  text-gray-800">
                  {bookACall.title}
                </h2>
                <p className="text-sm font-semibold font-nunito text-gray-600">
                  {bookACall.h1}
                </p>
              </div>
              <img
                src={bookACall.images_circle}
                alt="Call Image"
                className="w-16 h-16 rounded-full"
              />
            </div>
            <div className="flex justify-between">
              {bookACall.cta2 && (
                <button
                  className="w-[calc(50%-0.5rem)] bg-gray-200 text-gray-800 py-2 px-4 rounded-lg font-bold"
                  onClick={handleChat}
                >
                  {bookACall.cta2}
                </button>
              )}
              <button
                className={`${bookACall.cta2 ? "w-[calc(50%-0.5rem)]" : "w-full"} ${gender === "F" ? "bg-[#BD5747] text-[#FFFFFF]" : "bg-[#B7D340] text-[#2C2C2A]"} text-white py-2 px-4 rounded-lg font-bold`}
                onClick={handleBookCall}
              >
                {bookACall.cta1}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookCall;
