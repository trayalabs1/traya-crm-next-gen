import { JourneyLookLikeProps } from "@components/MobileLayout/RenderMobileComponents";

const JourneyLookLike: React.FC<JourneyLookLikeProps> = ({
  props = {},
  contents = { showComponent: false, componentDetails: [] },
  title = "Your Journey",
}) => {
  const home = props.home;
  const contentsDetails = !Array.isArray(contents) ? contents : null;
  const componentDetails = contentsDetails?.componentDetails;

  if (!contentsDetails?.showComponent) {
    return null;
  }

  return (
    <div className="my-8">
      <h2
        className={`text-lg font-fredoka text-[#212121] mb-3 mx-4 ${home ? "" : "-mt-8"}`}
      >
        {title}
      </h2>
      <div className="border border-[#DDDDDD] mx-4 bg-white rounded-lg p-4">
        {componentDetails?.map((item, index) => (
          <div key={index} className="flex">
            <div className="flex flex-col items-center">
              <div className="w-7 h-7 rounded-full bg-[#B7D340] flex items-center justify-center">
                <img
                  src={item.img_url}
                  alt={item.title}
                  className="w-4 h-4 object-contain"
                />
              </div>
              {index !== componentDetails.length - 1 && (
                <div className="h-16 w-px bg-[#999999]"></div>
              )}
            </div>
            <div className="ml-2 w-4/5">
              <h3 className="text-lg font-fredoka text-[#B7D340]">
                {item.title}
              </h3>
              <p className="text-sm font-nunito text-[#212121]">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JourneyLookLike;
