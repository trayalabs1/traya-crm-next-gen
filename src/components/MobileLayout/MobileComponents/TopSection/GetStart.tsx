import React from "react";
import TaskList from "./TaskList";
import { useAuth } from "@context/useAuth";
import { cn } from "@utils/shadcn";
import { GetStartProps } from "@components/MobileLayout/RenderMobileComponents";
const GetStart: React.FC<GetStartProps> = ({
  contents,
  //   title,
  sub_components,
  gender,
}) => {
  contents = Array.isArray(contents) ? contents : [];

  const { user } = useAuth();

  const gradientStyle: React.CSSProperties = {
    background:
      gender === "F"
        ? "linear-gradient(to right, #D88673, #D88673, #C4695B)"
        : "linear-gradient(to right, #0B713FE5, #3BA773)",
  };

  const subComponents = Array.isArray(sub_components)
    ? sub_components[0]
    : sub_components;

  return (
    <div className={cn("min-h-[140px] mb-2.5")} style={gradientStyle}>
      <div className="flex justify-between items-start pt-10 px-4">
        <div className="flex-grow pr-2">
          <h2 className="text-xl font-bold text-white font-nunito">
            {user?.first_name || "Unknown Name"} 👋
          </h2>
          <p className="text-xs text-white mt-2.5 mb-6 font-nunito truncate">
            {contents[0]?.content_data?.h1}
          </p>
        </div>
      </div>

      {subComponents?.taskList?.length ? (
        <TaskList gender={gender} sub_components={subComponents} />
      ) : null}
    </div>
  );
};

export default React.memo(GetStart);
