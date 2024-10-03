import { WhyTrustTrayaProps } from "@components/MobileLayout/RenderMobileComponents";

const WhyTrustTraya: React.FC<WhyTrustTrayaProps> = ({ contents }) => {
  return (
    <div>
      <img src={contents[0]?.content_data?.img} className="object-cover" />
    </div>
  );
};

export default WhyTrustTraya;
