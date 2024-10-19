import { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { MobileContentData } from "cms";

// type RootCause = {
// loginImgUrl: string;
// title: string;
// bottomSheet?: {
//   root_cause_name: string;
//   sub_heading: string;
// };
// details?: {
//   description: {
//     english: string;
//   };
// };
// };

type RootCausesItemsProps = {
  items?: MobileContentData[];
  click?: boolean;
  screen_name?: string;
};

const RootCausesItems: React.FC<RootCausesItemsProps> = ({
  items,
  click = false,
  // screen_name = "",
}) => {
  const [visibleModal, setVisibleModal] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!Array.isArray(items)) return;
  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? items.length - 1 : prevIndex - 1,
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === items.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const ModalView = () => (
    <div className="fixed inset-0 z-50 flex items-end justify-center px-4 py-6 sm:p-0">
      <div
        className="fixed inset-0 transition-opacity"
        aria-hidden="true"
        onClick={() => setVisibleModal(false)}
      >
        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>

      <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
        <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <h3 className="text-lg font-fredoka leading-6 font-medium text-gray-900 mb-4">
            Your Root Causes
          </h3>
          <div className="relative">
            <div className="w-full">
              <div className="flex items-center mb-6">
                <img
                  src={items[currentIndex].loginImgUrl}
                  alt={items[currentIndex].title}
                  className="w-9 h-9 object-contain"
                />
                <span className="ml-2 text-lg font-fredoka text-gray-900">
                  {items[currentIndex].bottomSheet?.root_cause_name}
                </span>
              </div>
              <p className="text-base font-nunito font-bold text-gray-700 mb-6">
                {items[currentIndex].bottomSheet?.sub_heading}
              </p>
              <div className="bg-gray-100 rounded-lg p-2 mb-6">
                <p className="text-base font-nunito text-gray-900">
                  {items[currentIndex]?.details?.description?.english}
                </p>
              </div>
            </div>
            <button
              onClick={handlePrev}
              className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-white rounded-full p-1 shadow-md"
            >
              <ChevronLeftIcon className="h-6 w-6" />
            </button>
            <button
              onClick={handleNext}
              className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-white rounded-full p-1 shadow-md"
            >
              <ChevronRightIcon className="h-6 w-6" />
            </button>
          </div>
        </div>
        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <button
            type="button"
            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
            onClick={() => setVisibleModal(false)}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex justify-around">
      {items.map((item, index) => (
        <button
          key={index}
          className={`flex flex-col items-center ${items.length > 2 ? "w-1/4" : ""}`}
          onClick={() => {
            if (click) {
              setCurrentIndex(index);
              setVisibleModal(true);
            }
          }}
        >
          <img
            src={item.loginImgUrl}
            alt={item.title}
            className="w-7 h-7 object-contain"
          />
          <span
            className={`text-center font-nunito text-xs text-[#787B75] opacity-50 mt-1 ${click ? "underline" : ""}`}
          >
            {item?.title?.toUpperCase()}
          </span>
        </button>
      ))}
      {visibleModal && <ModalView />}
    </div>
  );
};

export default RootCausesItems;
