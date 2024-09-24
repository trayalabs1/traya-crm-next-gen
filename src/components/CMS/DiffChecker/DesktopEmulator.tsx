import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { ShoppingCart } from "lucide-react";

const DesktopEmulator = ({
  title,
  content,
}: {
  title: string;
  content: React.ReactNode;
}) => (
  <div className="flex-1 w-full max-w-4xl mx-auto">
    <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800 dark:text-white">
      {title}
    </h2>
    <div className="border-[14px] border-gray-900 rounded-lg overflow-hidden shadow-2xl bg-gray-900">
      <div className="bg-gray-800 text-white px-6 py-3 flex items-center justify-between">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <span className="text-sm font-medium">Browser</span>
        <div className="flex items-center space-x-4">
          <Button
            size="sm"
            variant="ghost"
            className="text-white hover:text-blue-300 transition-colors duration-200"
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            Order Now
          </Button>
          <Input
            className="w-48 bg-gray-700 border-gray-600 text-white"
            placeholder="Search..."
          />
        </div>
      </div>
      <ScrollArea className="h-[600px] w-full bg-white dark:bg-gray-900">
        <div className="p-8 max-w-3xl mx-auto">{content}</div>
      </ScrollArea>
    </div>
  </div>
);

export default DesktopEmulator;
