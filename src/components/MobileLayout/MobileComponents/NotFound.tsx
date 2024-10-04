import { AlertOctagon } from "lucide-react";
import { NotFoundProps } from "../RenderMobileComponents";
import { memo } from "react";

const NotFound: React.FC<NotFoundProps> = ({ title, name }) => {
  return (
    <div className="flex items-center p-2 my-2 bg-gray-50 border border-gray-200 rounded-md">
      <AlertOctagon className="w-5 h-5 text-amber-500 mr-2 flex-shrink-0" />
      <div className="flex-grow min-w-0">
        <p className="text-xs font-medium text-gray-600 truncate">
          <span className="text-xs text-gray-500 mt-1">{title ? title : name}</span>
        </p>
        <p className="text-xs text-gray-400">Not Found Mobile Component</p>
      </div>
    </div>
  );
};

export default memo(NotFound);
