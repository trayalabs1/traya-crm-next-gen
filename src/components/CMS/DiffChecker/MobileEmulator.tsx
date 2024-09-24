import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Battery, Signal, Wifi } from "lucide-react";

const MobileEmulator = ({
  title,
  content,
}: {
  title: string;
  content: React.ReactNode;
}) => (
  <div className="flex-1 min-w-[320px] max-w-[375px] mx-auto">
    <h2 className="text-xl font-semibold mb-4 text-center text-gray-800 dark:text-white">
      {title}
    </h2>
    <div className="border-[14px] border-gray-900 rounded-[2.5rem] overflow-hidden shadow-2xl bg-gray-900">
      <div className="bg-gray-800 text-white px-4 py-2 flex items-center justify-between text-xs">
        <span>9:41</span>
        <div className="flex items-center space-x-2">
          <Signal className="w-4 h-4" />
          <Wifi className="w-4 h-4" />
          <Battery className="w-4 h-4" />
        </div>
      </div>
      <div className="bg-gray-800 h-6 w-36 mx-auto rounded-b-3xl"></div>
      <ScrollArea className="h-[600px] w-full bg-white dark:bg-gray-900">
        <div className="p-6">{content}</div>
      </ScrollArea>
      <div className="bg-gray-800 h-1 w-32 mx-auto rounded-t-3xl mt-2"></div>
    </div>
  </div>
);

export default MobileEmulator;
