import { ScrollArea, ScrollBar } from "@components/ui/scroll-area";
import { Gender, MobileContent } from "cms";
import React from "react";

interface Product {
  id: string;
  name: string;
  image_url: {
    singleHalfImages: string;
  };
  newlyAdded?: boolean;
  cartDisplayName: string;
  product_id: string;
  webUrl?: string;
}
interface HowToUseTrayaProps {
  contents: MobileContent[] | MobileContent;
  title: string;
  gender: Gender;
}

const HowToUseTraya: React.FC<HowToUseTrayaProps> = ({
  contents,
  title,
  gender,
}) => {
  contents = Array.isArray(contents) ? contents : [];

  const howToUseData: Product[] = Array.isArray(contents[0].content_data)
    ? contents[0].content_data[0]
    : [];

  const handleProductClick = (product: Product) => {
    console.log("Product clicked:", product.name);
  };

  return (
    <div className="bg-white p-4 mb-2">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-nunito font-bold text-[#212121] mb-2">
          {title}
        </h2>
      </div>

      <ScrollArea className="w-full whitespace-nowrap rounded-md">
        <div className="flex space-x-4">
          {Array.isArray(howToUseData) &&
            howToUseData.map((product, index) => (
              <div key={product.id || index} className="w-24 flex-shrink-0">
                <button
                  onClick={() => handleProductClick(product)}
                  className="w-full text-left focus:outline-none"
                >
                  <div
                    className={`relative rounded-lg overflow-hidden mb-2 ${gender === "F" ? "bg-[#EDD2CE]" : "bg-[#E6F0BD]"}`}
                  >
                    {product.newlyAdded && (
                      <div
                        className={`absolute top-0 left-0 w-full text-center text-xs font-bold text-white py-1 ${gender === "F" ? "bg-gradient-to-r from-[#F5CAC3] via-[#BE6C5D] to-[#D28875]" : "bg-gradient-to-r from-[#B7D340] via-[#006838] to-[#006838]"}`}
                      >
                        NEWLY ADDED
                      </div>
                    )}
                    <img
                      src={product?.image_url?.singleHalfImages}
                      alt={product?.name}
                      className="w-full h-32 object-cover mt-6"
                    />
                  </div>
                  <p className="text-sm font-normal font-nunito text-wrap text-gray-800 text-center">
                    {product.name}
                  </p>
                </button>
              </div>
            ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};

export default React.memo(HowToUseTraya);
