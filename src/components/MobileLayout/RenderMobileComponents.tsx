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
      name_draft: <GetStartedv2 contents={contents} />,
      how_traya_works: <HowTrayaWorks contents={contents} title={title} />,
      traya_heroes: <TrayaHeroesScreen contents={contents} title={title} />,
      why_trust_traya: <WhyTrustTraya contents={contents} />,
      user_review: <GoogleReview contents={contents} title={title} />,
      meet_our_team_doctors: <TrayaDoctors contents={contents} title={title} />,
      meet_our_team_of_doctors: (
        <TrayaDoctors contents={contents} title={title} />
      ),
      take_hair_test: <HairTest contents={contents} />,
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
