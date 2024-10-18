import React, { useState, useEffect } from "react";
import dayjs from "dayjs";

import { Button } from "@components/ui/button";
import { Card, CardContent } from "@components/ui/card";
import RootCausesItems from "./RootCausesItems";
import { GetstartedBookCallProps } from "@components/MobileLayout/RenderMobileComponents";
import { useAuth } from "@context/useAuth";

interface ReportData {
  root_causes: {
    isRootCauseClickable: boolean;
  };
}
const GetstartedBookCall: React.FC<GetstartedBookCallProps> = ({
  contents,
  // title,
  sub_components,
}) => {
  const [isCallBooked, setIsCallBooked] = useState(true);
  const [dateTime] = useState<string | null>(new Date().toISOString());
  const [reportData] = useState<ReportData>();

  const componentSegmentJson = contents.map((item) => item.content_data)[0];
  const subcomponentSegmentJson = Array.isArray(sub_components)
    ? sub_components[0].contents?.map((item) => item.content_data)
    : [];

  const { user } = useAuth();

  const first_name = user?.first_name;
  const handleBookCall = () => {
    setIsCallBooked((prevState) => !prevState);
  };

  useEffect(() => {
    const interval = setInterval(handleBookCall, 2000);

    return () => clearInterval(interval);
  }, []);

  const handleChat = () => {
    console.log("Chat initiated");
  };
  return (
    <div className="pb-28 relative">
      <div
        className="w-full h-[360px] bg-cover bg-center"
        style={{ backgroundImage: `url(${componentSegmentJson?.img})` }}
      >
        <div className="pt-24 px-4 text-white">
          <h2 className="text-xl font-fredoka mb-2">
            {isCallBooked
              ? componentSegmentJson?.callbooked?.h1
              : componentSegmentJson?.callnotbooked?.h1}
          </h2>
          <p className="text-sm mb-4">
            {isCallBooked ? (
              <>
                Your call has been confirmed on{" "}
                <span className="font-bold">
                  {dayjs(dateTime).format("DD MMM YYYY hh:mm A")}
                </span>
              </>
            ) : (
              <>
                {componentSegmentJson?.callnotbooked?.h2}{" "}
                <span className="font-bold">
                  {componentSegmentJson?.callnotbooked?.h3}
                </span>
              </>
            )}
          </p>
          {componentSegmentJson?.cta1 && (
            <Button
              onClick={handleBookCall}
              className="bg-white text-black font-bold py-2 px-4 rounded mb-4"
            >
              {isCallBooked ? "Reschedule Call" : "Book A Call"}
            </Button>
          )}
          {componentSegmentJson?.cta2 && (
            <Button
              onClick={handleChat}
              variant="outline"
              className="text-white border-white font-bold py-2 px-4 rounded"
            >
              Chat With Us
            </Button>
          )}
        </div>
      </div>

      <Card className="mx-auto -mt-16 w-11/12 max-w-md">
        <CardContent className="p-4">
          <h3 className="text-lg font-fredoka text-gray-800 mb-2">
            Hi {first_name}
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            {componentSegmentJson?.h2}
          </p>
          <div className="flex items-center mb-4">
            <h4 className="text-base font-fredoka text-gray-800 mr-2">
              Your Root Causes
            </h4>
            <div className="flex-grow h-px bg-gray-300"></div>
          </div>
          <RootCausesItems
            items={subcomponentSegmentJson}
            click={reportData?.root_causes?.isRootCauseClickable}
            // screen_name="HomeScreen"
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default GetstartedBookCall;
