// import { componentsList } from "./components";
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
import GetstartedBookCall from "./MobileComponents/GetstartedBookCall/GetstartedBookCall";
import HairGrowthKit from "./MobileComponents/HairGrowthKit/HairGrowthKit";
import JourneyLookLikeFemale from "./MobileComponents/JourneyLookLikeFemale/JourneyLookLikeFemale";
import WhatHappenAfterOrder from "./MobileComponents/WhatHappenAfterOrder/WhatHappenAfterOrder";
import JourneyLookLike from "./MobileComponents/JourneyLookLike/JourneyLookLike";
export interface GetStartedV2Props {
  contents: MobileContent[] | MobileContent;
}

export interface HowTrayaWorksProps {
  title: string;
  contents: MobileContent[] | MobileContent;
}

export interface TrayaHeroesScreenProps {
  title: string;
  contents: MobileContent[] | MobileContent;
}

export interface WhyTrustTrayaProps {
  contents: MobileContent[] | MobileContent;
}
export interface GoogleReviewsProps {
  contents: MobileContent[] | MobileContent;
  title: string;
}

export interface TrayaDoctorsProps {
  contents: MobileContent[] | MobileContent;
  title: string;
}

export interface HairTestProps {
  contents: MobileContent[] | MobileContent;
  // title: string;
}

export interface NotFoundProps {
  contents: MobileContent[] | MobileContent;
  name: string;
  title: string;
}
interface RenderComponentsProps {
  components?: MobileComponent[];
  gender?: "F" | "M";
}

export interface WhatHappenAfterOrderProps {
  contents: MobileContent[] | MobileContent;
  title: string;
}

export interface RootCausesProps {
  contents: MobileContent[] | MobileContent;
  title: string;
}

export interface SubComponents {
  component_id?: string;
  component_type?: string;
  contents?: MobileContent[] | MobileContent;
  current_version?: number;
  gender?: string;
  is_sub_component?: boolean;
  language?: string;
  name?: string;
  status?: string;
}
export interface GetstartedBookCallProps {
  contents: MobileContent[] | MobileContent;
  sub_components?: SubComponents[];
  title: string;
}

export interface HairGrowthKitProps {
  contents: MobileContent[] | MobileContent;
  lang?: string;
  title: string;
}
export interface JourneyLookLikeFemaleProps {
  contents: MobileContent[] | MobileContent;
  title: string;
}

export interface JourneyLookLikeProps {
  contents: MobileContent[] | MobileContent;
  title: string;
  props?: {
    home?: string;
  };
}
function RenderComponents({ components, gender = "M" }: RenderComponentsProps) {
  // if (!components) components = componentsList;
  const renderComponent = (item: MobileComponent) => {
    const {
      name = "",
      contents = [],
      sub_components,
      // additional_data,
      title = "",
    } = item;

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
      what_happen_after_order_placed: (
        <WhatHappenAfterOrder contents={contents} title={title} />
      ),
      // what_causes_hair_loss: <RootCauses contents={contents} title={title} />,
      lead_book_a_call: (
        <GetstartedBookCall
          contents={contents}
          sub_components={sub_components}
          title={title}
        />
      ),
      your_first_month_kit: <HairGrowthKit contents={contents} title={title} />,
      hair_growth_journey:
        gender === "F" ? (
          <JourneyLookLikeFemale contents={contents} title={title} />
        ) : (
          <JourneyLookLike contents={contents} title={title} />
        ),
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
// lead_book_a_call:<GetstartedBookCall contents={contents} sub_components={sub_components} title={title} />,
// why_this_plan_work_for_me : <VideoComp contents={contents} title={title} />,
// your_first_month_kit: <HairGrowthKit contents={contents} title={title} />,
// hair_growth_journey: gender == 'F' ?  <JourneyLookLikeFemale contents={contents} title={title} /> : <JourneyLokkLike contents={contents} title={title} />,
// chat_with_us:<ChatWithHairExpert contents={contents}  title={title} />,
// traya_plan_includes:<TrayaHolistic contents={contents} title={title} />,
// whatgoesinsidemykit:<MyTrayaKitScreen contents={contents} title={title} />,
// act_now_stage_1:<Urgency contents={contents} title={title} />,
// lead_category_responses:<CategorySlider contents={contents} title={title} />,
// understand_your_concern:<SolutionHairConcern contents={contents} title={title} />,
// how_traya_works:<HowTrayaWorks contents={contents} title={title} />,
// traya_heroes:<TrayaHeroesScreen contents={contents} title={title} />,
// meet_our_team_doctors: <TrayaDoctors contents={contents} title={title} />,
// meet_our_team_of_doctors: <TrayaDoctors contents={contents} title={title} />,
// what_happen_after_order_placed:<WhatHappenAfterOrder contents={contents} title={title} />,
// user_review:<GoogleReview contents={contents} additional_data={additional_data} title={title}/>,
// retake_hair_test:<RetakeHairBanner contents={contents} title={title} />,
