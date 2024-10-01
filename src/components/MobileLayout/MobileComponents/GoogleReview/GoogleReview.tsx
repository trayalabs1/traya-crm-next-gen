import { Star } from "lucide-react";

import { Dialog, DialogContent, DialogTrigger } from "@components/ui/dialog";
import { ScrollArea, ScrollBar } from "@components/ui/scroll-area";
import { memo } from "react";
import { GoogleReviewsProps } from "@components/MobileLayout/RenderMobileComponents";

interface Review {
  reviewer_name?: string;
  rating?: number;
  description?: string;
}

const StarRating = ({
  rating = 0,
  size = 4,
}: {
  rating?: number;
  size?: number;
}) => {
  return (
    <div className="flex">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-${size} h-${size} ${
            i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );
};

const ReviewCard = ({ item }: { item: Review }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="w-72 border border-gray-300 rounded-2xl p-4 mr-4 mb-6 cursor-pointer flex-shrink-0">
          <h3 className="text-sm font-nunito font-bold text-gray-900 mb-3">
            {item.reviewer_name}
          </h3>
          <StarRating rating={item.rating} />
          <p className="text-sm font-nunito text-gray-700 mt-2 line-clamp-3">
            {item.description}
          </p>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <div className="pt-4 pb-24 px-4">
          <h3 className="text-sm font-nunito font-bold text-gray-900 mb-3">
            {item.reviewer_name}
          </h3>
          <StarRating rating={item.rating} />
          <p className="text-sm font-nunito text-gray-700 mt-2">
            {item.description}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const GoogleReviews: React.FC<GoogleReviewsProps> = ({ contents, title }) => {
  const usersReview = contents.map((item) => item.content_data);
  const reviewCount = { rating: 10, userCount: 100 };

  if (usersReview.length === 0) {
    return null;
  }

  return (
    <div className="mb-8">
      <h2 className="text-xl font-nunito font-bold text-gray-900 mb-4 mx-4">
        {title}
      </h2>
      <div className="flex items-center ml-4 mb-4">
        <span className="text-5xl font-nunito font-bold text-gray-900">
          {reviewCount.rating}
        </span>
        <div className="ml-3">
          <StarRating rating={5} size={4} />
          <p className="text-sm font-nunito text-gray-700 mt-2">{`${reviewCount.userCount} ratings`}</p>
        </div>
      </div>

      <ScrollArea className="w-full rounded-md border-gray-600">
        <div className="flex pb-4">
          {usersReview.map((review, index) => (
            <ReviewCard key={index} item={review} />
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};
export default memo(GoogleReviews);
