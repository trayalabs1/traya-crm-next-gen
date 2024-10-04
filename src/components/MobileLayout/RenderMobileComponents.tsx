import { componentsList } from "./components";
import TrayaDoctors from "./MobileComponents/TrayaDoctors/TrayaDoctors";
import GetStartedv2 from "./MobileComponents/GetStarted/GetStartedv2";
import GoogleReview from "./MobileComponents/GoogleReview/GoogleReview";
import HowTrayaWorks from "./MobileComponents/HowTrayaWorks/HowTrayaWorks";
import TrayaHeroesScreen from "./MobileComponents/TrayaHeroesScreen/TrayaHeroesScreen";
import WhyTrustTraya from "./MobileComponents/WhyTrustTraya/WhyTrustTraya";
import HairTest from "./MobileComponents/HairTest/HairTest";
import { MobileComponent, MobileContent } from "cms";
import NotFound from "./MobileComponents/NotFound";
import { memo } from "react";
export interface GetStartedV2Props {
  contents: MobileContent[];
}

export interface HowTrayaWorksProps {
  title: string;
  contents: MobileContent[];
}

export interface TrayaHeroesScreenProps {
  title: string;
  contents: MobileContent[];
}

export interface WhyTrustTrayaProps {
  contents: MobileContent[];
}
export interface GoogleReviewsProps {
  contents: MobileContent[];
  title: string;
}

export interface TrayaDoctorsProps {
  contents: MobileContent[];
  title: string;
}

export interface HairTestProps {
  contents: MobileContent[];
  // title: string;
}

export interface NotFoundProps {
  contents: MobileContent[];
  name: string;
  title: string;
}
interface RenderComponentsProps {
  components?: MobileComponent[];
}

function RenderComponents({ components }: RenderComponentsProps) {
  if (!components) components = componentsList;
  const renderComponent = (item: MobileComponent) => {
    const { name = "", contents = [], title = "" } = item;

    const componentsMap: Record<string, React.ReactNode> = {
      namedraft: <GetStartedv2 contents={contents} />,
      howTrayaWorks: <HowTrayaWorks contents={contents} title={title} />,
      trayaheros: <TrayaHeroesScreen contents={contents} title={title} />,
      whytrusttraya: <WhyTrustTraya contents={contents} />,
      userreview: <GoogleReview contents={contents} title={title} />,
      meetourteamdoctors: <TrayaDoctors contents={contents} title={title} />,
      takehairtest: <HairTest contents={contents} />,
    };

    return (
      componentsMap[name] || (
        <NotFound contents={contents} title={title} name={name} />
      )
    );
  };

  return (
    <div>
      {Array.isArray(components) &&
        components.map((item, index) => (
          <div key={index}>{renderComponent(item)}</div>
        ))}
    </div>
  );
}

export default memo(RenderComponents);
