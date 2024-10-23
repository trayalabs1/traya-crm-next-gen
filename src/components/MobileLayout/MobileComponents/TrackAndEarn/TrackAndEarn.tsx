import React, { useState, useEffect } from "react";

import { Button } from "@components/ui/button";
import { Progress } from "@components/ui/progress";
import { Dialog, DialogContent, DialogTrigger } from "@components/ui/dialog";
import { ScrollArea } from "@components/ui/scroll-area";
import { cn } from "@utils/shadcn";
import { Gender, MobileContent } from "cms";

interface TrackAndEarnProps {
  contents: MobileContent[] | MobileContent;
  title: string;
  gender: Gender;
}

const TrackAndEarn: React.FC<TrackAndEarnProps> = ({ gender }) => {
  const components = {
    bahBanner: {
      cta: "",
      discountTextColour: "",
      h1: "",
      h2: "",
      h3: "",
      h4: "",
      animation: "",
    },
  };
  const [streakDays, setStreakDays] = useState(0);
  const [coinData, setCoinData] = useState(0);
  const [greenBarPercentage, setGreenBarPercentage] = useState(5);
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Simulating API call
    const fetchData = async () => {
      setStreakDays(5);
      setCoinData(100);
      setGreenBarPercentage(40);
      setShow(true);
    };

    fetchData();
  }, []);

  const gradientClass =
    gender === "F"
      ? "bg-gradient-to-b from-[#FEF6F5] to-[#F8CEC9]"
      : "bg-gradient-to-br from-[#C9DEC1] to-[#EAF4EE]";

  return show ? (
    <div className={`mb-2 p-4 ${gradientClass}`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">Log & Earn</h2>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" className="text-xs">
            {streakDays} days
          </Button>
          <Button variant="outline" size="sm" className="text-xs">
            {coinData} coins
          </Button>
        </div>
      </div>

      <p className="text-sm text-center mb-4">
        {streakDays > 0
          ? "Consistency pays off! Log in to win more coins."
          : "Restart your winning streak to earn more coins!"}
      </p>

      <div className="bg-white rounded-lg p-4 mb-4">
        <div className="relative mb-8">
          <Progress value={greenBarPercentage} className={cn("h-3")} />
          <div className="absolute left-0 -top-6 transform -translate-x-1/2">
            <img
              src="/placeholder.svg"
              alt="Avatar"
              className="w-8 h-8 rounded-full"
            />
          </div>
        </div>

        <div className="flex justify-between">
          <div className="text-center">
            <img
              src="/placeholder.svg"
              alt="3 days"
              className="w-6 h-6 mx-auto"
            />
            <p className="text-xs mt-1">3 Days</p>
            {streakDays < 3 && <p className="text-xs font-bold">+100</p>}
          </div>
          <div className="text-center">
            <img
              src="/placeholder.svg"
              alt="7 days"
              className="w-6 h-6 mx-auto"
            />
            <p className="text-xs mt-1">7 Days</p>
            {streakDays < 7 && <p className="text-xs font-bold">+400</p>}
          </div>
          <div className="text-center">
            <img
              src="/placeholder.svg"
              alt="21 days"
              className="w-6 h-6 mx-auto"
            />
            <p className="text-xs mt-1">21 Days</p>
            {streakDays < 21 && <p className="text-xs font-bold">+2000</p>}
          </div>
        </div>
      </div>

      <Dialog>
        <DialogTrigger asChild>
          <Button
            className={cn(
              "w-full text-black",
              gender == "F"
                ? "bg-[#BD5747] hover:bg-[#c2847a]"
                : "bg-[#B7D340] hover:bg-[#A1BD39]",
            )}
          >
            Log & Earn
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <ScrollArea className="h-[50vh]">
            <div className="p-4">
              <h2 className="text-lg font-bold mb-4">Log Meds & Earn!</h2>
              {/* Add MedicineTrackerMain component content here */}
              <p>Medicine tracker content goes here...</p>
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  ) : (
    <div className="bg-white p-4 mb-2 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-2">
        {components?.bahBanner?.h1}
      </h2>
      <h3 className="text-xl font-bold mb-1">{components?.bahBanner?.h2}</h3>
      <p className="text-sm text-gray-500 mb-2">{components?.bahBanner?.h3}</p>
      <span className="inline-block bg-[#D5958B] text-white text-xs font-bold px-2 py-1 rounded-full mb-4">
        {components?.bahBanner?.h4}
      </span>
      <Button className="w-full bg-[#B7D340] text-black hover:bg-[#A1BD39]">
        {components?.bahBanner?.cta}
      </Button>
      <img
        src={components?.bahBanner?.animation}
        alt="Animation"
        className="w-40 h-40 mx-auto mt-4"
      />
    </div>
  );
};

export default React.memo(TrackAndEarn);
