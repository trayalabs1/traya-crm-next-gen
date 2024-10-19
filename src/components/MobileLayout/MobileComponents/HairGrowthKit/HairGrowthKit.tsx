import React, { useState } from "react";
import { XIcon } from "lucide-react";
import { ScrollArea, ScrollBar } from "@components/ui/scroll-area";
import { HairGrowthKitProps } from "@components/MobileLayout/RenderMobileComponents";

const HairGrowthKit: React.FC<HairGrowthKitProps> = ({
  // home = false,
  lang = "english",
  contents = [],
  title = "What's in your Hair growth kit?",
}) => {
  const totalProductIds = Array.isArray(contents) ? contents.length : 0;

  if (totalProductIds === 0) {
    return null;
  }

  return (
    <div className="pb-5">
      <h2 className="text-[#212121] text-lg font-bold font-nunito m-4">
        {lang === "hinglish"
          ? `Aapki Hair growth kit mein kya kya hai? - (${totalProductIds} products)`
          : `${title} - (${totalProductIds} products)`}
      </h2>
      <ScrollArea className="w-full whitespace-nowrap rounded-md border">
        <div className="flex w-max space-x-4 p-4">
          {Array.isArray(contents) &&
            contents.map((item) => (
              <Product key={item.product_id} item={item} />
            ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};

export default HairGrowthKit;
interface Product {
  item: { product_id?: string; name?: string; image_url?: string };
}
const Product: React.FC<Product> = ({ item }) => {
  const [visibleModal, setVisibleModal] = useState(false);

  return (
    <div className="flex-shrink-0">
      <button
        onClick={() => setVisibleModal(true)}
        className="focus:outline-none"
      >
        <div className="text-center">
          <img
            src={item.image_url}
            alt={`Product ${item.product_id}`}
            className="h-[450px] w-[250px] object-cover"
          />
        </div>
      </button>
      {visibleModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setVisibleModal(false)}
        >
          <div
            className="bg-white p-4 rounded-lg max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Product Details</h2>
              <button onClick={() => setVisibleModal(false)}>
                <XIcon className="h-6 w-6" />
              </button>
            </div>
            <p>Product ID: {item.product_id}</p>
          </div>
        </div>
      )}
    </div>
  );
};
