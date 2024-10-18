import { memo } from 'react';
import CustomCarousel from './CustomCarousel';
import { EUCoachTipsProps } from '@components/MobileLayout/RenderMobileComponents';


// Extract viewport width for web
const viewPortWidth = window.innerWidth;
const cardWidthStory = viewPortWidth;

const EUCoachTips: React.FC<EUCoachTipsProps> = ({ contents, title }) => {
  // Transform MobileContentData to the format expected by the component
  const transformContentForCoachTips = (contents: EUCoachTipsProps['contents']) => {
    return contents.map((content) => ({
      content_data: [{
        coach_name: content.content_data.doctor_name || 'Unknown Coach',
        image_url: content.content_data.profile_image || '',
        tip: content.content_data.description || 'No tip available',
        color1: '#000000', // Static or based on some content property
        color2: '#FFFFFF', // Static or based on some content property
      }]
    }));
  };

  // Apply the transformation to the content before rendering
  const CoachTips = transformContentForCoachTips(contents)[0]?.content_data;

  return (
    <div className="px-4 py-6 bg-white mb-2">
      <h2 className="text-2xl font-bold text-gray-800 mb-3">{title}</h2>

      <CustomCarousel
        data={CoachTips}
        autoplay={true}
        loop={true}
        PaginationInActiveDot={{
          width: '6px',
          height: '6px',
          borderRadius: '3px',
          backgroundColor: '#000',
        }}
        PaginationActiveDot={{
          width: '16px',
          height: '6px',
          borderRadius: '5px',
          backgroundColor: '#000',
        }}
        renderItem={({ item }) => (
          <div
            className="rounded-lg mb-2 w-[93%]"
            style={{
              background: `linear-gradient(135deg, ${item.color1}, ${item.color2})`,
            }}
          >
            <div className="flex items-center py-4">
              <img
                src={item.image_url}
                alt={item.coach_name}
                className="w-10 h-10 rounded-full ml-4"
              />
              <div className="ml-3">
                <p className="text-lg font-bold text-gray-800">{item.coach_name}</p>
                <p className="text-sm font-regular text-gray-600">Traya Hair Coach</p>
              </div>
            </div>
            <p className="px-4 pb-4 text-lg font-bold text-gray-800">{item.tip}</p>
          </div>
        )}
        sliderWidth={cardWidthStory}
        itemWidth={viewPortWidth}
        showPagination={true}
      />
    </div>
  );
};

export default memo(EUCoachTips);
