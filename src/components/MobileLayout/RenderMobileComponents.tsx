// import { componentsList } from "./components";
import TrayaDoctors from "./MobileComponents/TrayaDoctors/TrayaDoctors";
import GetStartedv2 from "./MobileComponents/GetStarted/GetStartedv2";
import GoogleReview from "./MobileComponents/GoogleReview/GoogleReview";
import HowTrayaWorks from "./MobileComponents/HowTrayaWorks/HowTrayaWorks";
import TrayaHeroesScreen from "./MobileComponents/TrayaHeroesScreen/TrayaHeroesScreen";
import WhyTrustTraya from "./MobileComponents/WhyTrustTraya/WhyTrustTraya";
import HairTest from "./MobileComponents/HairTest/HairTest";
import {
  Gender,
  Language,
  MobileComponent,
  MobileContent,
  SubComponents,
} from "cms";
import NotFound from "./MobileComponents/NotFound";
import { memo } from "react";
import GetstartedBookCall from "./MobileComponents/GetstartedBookCall/GetstartedBookCall";
import HairGrowthKit from "./MobileComponents/HairGrowthKit/HairGrowthKit";
import JourneyLookLikeFemale from "./MobileComponents/JourneyLookLikeFemale/JourneyLookLikeFemale";
import WhatHappenAfterOrder from "./MobileComponents/WhatHappenAfterOrder/WhatHappenAfterOrder";
import JourneyLookLike from "./MobileComponents/JourneyLookLike/JourneyLookLike";
import MyTrayaKitScreen from "./MobileComponents/MyTrayaKitScreen/MyTrayaKitScreen";
import ChatWithHairExpert from "./MobileComponents/ChatWithHairExpert/ChatWithHairExpert";
import TrayaHolistic from "./MobileComponents/TrayaHolistic/TrayaHolistic";
import CategorySlider from "./MobileComponents/CategorySlider/CategorySlider";
import Urgency from "./MobileComponents/Urgency/Urgency";
import RootCauses from "./MobileComponents/RootCauses/RootCauses";
// import HowToUseTraya from "./MobileComponents/HowToUseKIt/HowToUseKIt";
import VideoComp from "./MobileComponents/VideoComp/VideoComp";
import DietPlanOld from "./MobileComponents/DietPlan/DietPlanOld";
import SolutionHairConcern from "./MobileComponents/SolutionHairConcern/SolutionHairConcern";
import BookCall from "./MobileComponents/BookCall/BookCall";
import GetStart from "./MobileComponents/TopSection/GetStart";
import StayConsistent from "./MobileComponents/StayConsistent/StayConsistent";
import EUCoachTips from "./MobileComponents/CoachTips/CoachTips";
import RetakeHairBanner from "./MobileComponents/RetakeHairBanner/RetakeHairBanner";
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
  gender?: Gender;
  lang?: Language;
}

export interface WhatHappenAfterOrderProps {
  contents: MobileContent[] | MobileContent;
  title: string;
}

export interface RootCausesProps {
  contents: MobileContent[] | MobileContent;
  title: string;
}

export interface GetstartedBookCallProps {
  contents: MobileContent[] | MobileContent;
  sub_components?: SubComponents[] | SubComponents;
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

export interface MyTrayaKitScreenProps {
  contents: MobileContent[] | MobileContent;
  title: string;
}

export interface ChatWithHairExpertProps {
  contents: MobileContent[] | MobileContent;
  title: string;
  gender: string;
}

export interface TrayaHolisticProps {
  contents: MobileContent[] | MobileContent;
  title: string;
}

export interface RetakeHairBannerProps {
  contents: MobileContent[] | MobileContent;
  title: string;
  gender: string;
}

export interface CategorySliderProps {
  contents: MobileContent[] | MobileContent;
  title: string;
}
export interface UrgencyProps {
  contents: MobileContent[] | MobileContent;
  title: string;
  lang: Language;
}

export interface RootCausesProps {
  contents: MobileContent[] | MobileContent;
  title: string;
}

export interface VideoCompProps {
  contents: MobileContent[] | MobileContent;
  title: string;
}

export interface DietPlanOldProps {
  contents: MobileContent[] | MobileContent;
  title: string;
  gender: Gender;
}

export interface SolutionHairConcernProps {
  contents: MobileContent[] | MobileContent;
  title: string;
  gender: Gender;
}

export interface BookCallProps {
  contents: MobileContent[] | MobileContent;
  title: string;
  gender: Gender;
}

export interface GetStartProps {
  contents: MobileContent[] | MobileContent;
  title: string;
  gender: Gender;
  sub_components?: SubComponents[] | SubComponents;
}

export interface StayConsistentProps {
  contents: MobileContent[] | MobileContent;
}

export interface EUCoachTipsProps {
  contents: MobileContent[] | MobileContent;
  title: string;
}

function RenderComponents({
  components,
  gender = "M",
  lang = "english",
}: RenderComponentsProps) {
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
      take_hair_test: <HairTest contents={contents} />,
      complete_hair_test: <HairTest contents={contents} />,
      why_trust_traya: <WhyTrustTraya contents={contents} />,
      what_causes_hair_loss: <RootCauses contents={contents} title={title} />,
      lead_book_a_call: (
        <GetstartedBookCall
          contents={contents}
          sub_components={sub_components}
          title={title}
        />
      ),
      why_this_plan_work_for_me: (
        <VideoComp contents={contents} title={title} />
      ),
      hair_growth_journey:
        gender === "F" ? (
          <JourneyLookLikeFemale contents={contents} title={title} />
        ) : (
          <JourneyLookLike contents={contents} title={title} />
        ),
      your_first_month_kit: <HairGrowthKit contents={contents} title={title} />,
      chat_with_us: (
        <ChatWithHairExpert gender={gender} contents={contents} title={title} />
      ),
      traya_plan_includes: <TrayaHolistic contents={contents} title={title} />,
      whatgoesinsidemykit: (
        <MyTrayaKitScreen contents={contents} title={title} />
      ),
      act_now_stage_1: (
        <Urgency lang={lang} contents={contents} title={title} />
      ),
      act_now_stage_2: (
        <Urgency lang={lang} contents={contents} title={title} />
      ),
      lead_category_responses: (
        <CategorySlider contents={contents} title={title} />
      ),
      understand_your_concern: (
        <SolutionHairConcern
          gender={gender}
          contents={contents}
          title={title}
        />
      ),

      how_traya_works: <HowTrayaWorks contents={contents} title={title} />,
      traya_heroes: <TrayaHeroesScreen contents={contents} title={title} />,
      meet_our_team_doctors: <TrayaDoctors contents={contents} title={title} />,
      meet_our_team_of_doctors: (
        <TrayaDoctors contents={contents} title={title} />
      ),
      what_happen_after_order_placed: (
        <WhatHappenAfterOrder contents={contents} title={title} />
      ),
      user_review: <GoogleReview contents={contents} title={title} />,
      retake_hair_test: (
        <RetakeHairBanner gender={gender} contents={contents} title={title} />
      ),
      customer_category_responses: (
        <CategorySlider contents={contents} title={title} />
      ),
      customer_book_a_call: (
        <BookCall gender={gender} contents={contents} title={title} />
      ),

      // how_to_use_kit:<HowToUseTraya contents={contents} title={title} />,

      diet_plan: (
        <DietPlanOld gender={gender} contents={contents} title={title} />
      ),
      top_section_text: (
        <GetStart
          gender={gender}
          contents={contents}
          sub_components={sub_components}
          title={title}
        />
      ),
      coach_tips: <EUCoachTips contents={contents} title={title} />,
      stay_consistent_order_O1: <StayConsistent contents={contents} />,
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
