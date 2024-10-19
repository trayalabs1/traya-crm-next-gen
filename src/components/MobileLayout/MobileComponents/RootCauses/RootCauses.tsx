import { RootCausesProps } from "@components/MobileLayout/RenderMobileComponents";
import { MobileContentData } from "cms";
import { XIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useState } from "react";
import { ScrollArea, ScrollBar } from "@components/ui/scroll-area";

type RootCause = Pick<
  MobileContentData,
  "root_cause_name" | "icon" | "color1" | "color2"
>;
const RootCauses: React.FC<RootCausesProps> = ({
  contents = [],
  title = "Root Causes",
}) => {
  contents = Array.isArray(contents) ? contents : [];
  const [visibleModal, setVisibleModal] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? contents.length - 1 : prevIndex - 1,
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === contents.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const Modal = () => {
    return (
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
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold leading-6 text-gray-900">
                {title}
              </h3>
              <button onClick={() => setVisibleModal(false)}>
                <XIcon className="h-6 w-6" />
              </button>
            </div>
            <div className="relative">
              <div className="w-full">
                <div className="flex items-center mb-6">
                  <div
                    className={`w-14 h-14 rounded-full flex items-center justify-center bg-gradient-to-br from-${contents[currentIndex].content_data.color1} to-${contents[currentIndex].content_data.color2}`}
                  >
                    <img
                      src={contents[currentIndex]?.content_data?.icon}
                      alt={
                        contents[currentIndex]?.content_data?.root_cause_name
                      }
                      className="w-9 h-9"
                    />
                  </div>
                  <span className="ml-2 text-lg font-bold text-gray-900">
                    {contents[currentIndex]?.content_data?.root_cause_name}
                  </span>
                </div>
                <div className="bg-gray-100 rounded-lg p-2 mb-6">
                  <p className="text-base text-gray-700">
                    {contents[currentIndex]?.content_data?.description}
                  </p>
                </div>
                <h4 className="font-bold text-brown-700 mb-2">
                  {contents[currentIndex]?.content_data?.h1}
                </h4>
                <ul className="list-disc pl-5">
                  {Array.isArray(contents[currentIndex].content_data?.h2) ? (
                    <>
                      {contents[currentIndex].content_data.h2.map(
                        (point, idx) => (
                          <li key={idx} className="text-gray-700">
                            {point}
                          </li>
                        ),
                      )}
                    </>
                  ) : null}
                </ul>
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
        </div>
      </div>
    );
  };

  const Card = ({ item, index }: { item: RootCause; index: number }) => {
    const gradientStyle = {
      backgroundImage: `linear-gradient(to right, ${item.color1}, ${item.color2})`,
    };

    return (
      <button
        className="mb-4 mr-3"
        onClick={() => {
          setVisibleModal(true);
          setCurrentIndex(index);
        }}
      >
        <div
          className={`h-32 w-28 rounded-lg p-2 flex flex-col items-center justify-between`}
          style={gradientStyle}
        >
          <h3 className="text-sm font-semibold font-nunito text-black text-center mt-2">
            {item?.root_cause_name}
          </h3>
          <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center mb-2">
            <img
              src={item?.icon}
              alt={item?.root_cause_name}
              className="w-9 h-9"
            />
          </div>
        </div>
      </button>
    );
  };
  if (contents.length === 0) {
    return null;
  }

  return (
    <div className="mb-4">
      <h2 className="text-xl font-semibold font-nunito text-gray-800 mb-4 mx-4">
        {title}
      </h2>
      {/* {contents.h1 && (
        <p className="text-sm font-nunito text-gray-700 mx-4 mb-4">
          {contents.h1}
        </p>
      )} */}
      <div className="flex overflow-x-auto">
        <ScrollArea className="w-full">
          <div className="flex pl-4">
            {contents.map((item, index) => (
              <Card key={index} item={item.content_data} index={index} />
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>

      {visibleModal && <Modal />}
    </div>
  );
};

export default RootCauses;
