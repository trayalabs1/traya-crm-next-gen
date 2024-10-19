import { DietPlanOldProps } from "@components/MobileLayout/RenderMobileComponents";
import { cn } from "@utils/shadcn";
import { useState, useEffect } from "react";

const DietPlanOld: React.FC<DietPlanOldProps> = ({
  contents = [],
  title = "Diet Plan",
  gender,
}) => {
  contents = Array.isArray(contents) ? contents : [];
  const [isDietPlan, setIsDietPlan] = useState(false);

  const getDietPlan = async () => {
    setIsDietPlan((prevState) => !prevState);
  };

  useEffect(() => {
    const interval = setInterval(getDietPlan, 2000);

    return () => clearInterval(interval);
  }, []);
  const myPlan = () => {
    if (!isDietPlan) {
      console.log("Navigate to SmartDietPlan");
    } else {
      console.log("Navigate to ShortVideoScreen");
    }
  };

  return (
    <div className="mb-2 bg-white py-6">
      <h2 className="text-xl font-semibold font-nunito text-gray-800 mb-2.5 mx-4">
        {title}
      </h2>

      <div className="relative h-46 mx-4">
        <img
          src={
            contents[0]?.content_data?.image ||
            "/placeholder.svg?height=184&width=328"
          }
          alt="Diet Plan"
          className="rounded-lg object-cover w-full h-full"
        />

        <div className="absolute top-5 left-4 w-3/5">
          <p className="text-lg text-gray-700 font-normal font-nunito mb-4">
            {contents[0]?.content_data?.content ||
              "Customize your diet plan for better hair health"}
          </p>

          <button
            onClick={myPlan}
            className={cn(
              "absolute h-10 w-44 rounded-lg flex items-center justify-center",
              gender === "F" ? "bg-[#BD5747]" : "bg-[#B7D340]",
            )}
          >
            <span
              className={cn(
                "text-base font-bold font-nunito",
                gender === "F" ? "text-[#FFFFFF]" : "text-[#2C2C2A]",
              )}
            >
              {isDietPlan ? "View my plan" : "Build my plan"}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DietPlanOld;
