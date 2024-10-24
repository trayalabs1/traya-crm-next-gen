import { cn } from "@utils/shadcn";
import { Gender, SubComponents } from "cms";
import { ChevronRight } from "lucide-react";

interface Task {
  urlOrText: string;
  h2: string;
  h3: string[];
}

export default function TaskList({
  sub_components,
  gender,
}: {
  sub_components: SubComponents;
  gender: Gender;
}) {
  return (
    <section className="px-2 sm:px-4 pb-4 mx-2">
      <h2 className="text-lg sm:text-xl font-bold font-nunito text-white mb-2 sm:mb-4">
        My Tasks
      </h2>
      <ul className="space-y-2 sm:space-y-3">
        {Array.isArray(sub_components.taskList) &&
          sub_components.taskList.map((task: Task, index: number) => (
            <li
              key={index}
              className={cn(
                "rounded-xl shadow overflow-hidden",
                gender == "F" ? "bg-[#EDD2CE]" : "bg-[#F3F7DE]",
              )}
            >
              <div className="flex items-center h-20">
                <img
                  src={task.urlOrText}
                  alt={task.h2}
                  className="w-20 h-20 object-cover rounded-l-xl flex-shrink-0"
                />
                <div className="flex-grow p-2 min-w-0 h-full flex flex-col justify-center">
                  <h3 className="font-nunito text-sm leading-tight mb-1">
                    {task.h2}
                  </h3>
                  <p className="text-xs font-nunito text-gray-600">
                    {task.h3.join(", ")}
                  </p>
                </div>
                <button
                  className="p-2 text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 flex-shrink-0"
                  aria-label="View task details"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            </li>
          ))}
      </ul>
    </section>
  );
}
