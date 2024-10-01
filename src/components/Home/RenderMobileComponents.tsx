import { componentsList } from "./components";
import TrayaDoctors from "./MobileComponents/TrayaDoctors/TrayaDoctors";
import GetStartedv2 from "./MobileComponents/GetStarted/GetStartedv2";
import GoogleReview from "./MobileComponents/GoogleReview/GoogleReview";
import HowTrayaWorks from "./MobileComponents/HowTrayaWorks/HowTrayaWorks";
import TrayaHeroesScreen from "./MobileComponents/TrayaHeroesScreen/TrayaHeroesScreen";
import WhyTrustTraya from "./MobileComponents/WhyTrustTraya/WhyTrustTraya";
import HairTest from "./MobileComponents/HairTest/HairTest";
export interface GetStartedV2Props {
  contents: Content[];
}

export interface HowTrayaWorksProps {
  title: string;
  contents: Content[];
}

export interface TrayaHeroesScreenProps {
  title: string;
  contents: Content[];
}

export interface WhyTrustTrayaProps {
  contents: Content[];
}
export interface GoogleReviewsProps {
  contents: Content[];
  title: string;
}

export interface TrayaDoctorsProps {
  contents: Content[];
  title: string;
}

export interface HairTestProps {
  contents: Content[];
  // title: string;
}

interface ContentData {
  img?: string;
  h1?: string;
  h2?: string;
  cta?: string;
  prefix?: string;
  doctor_name?: string;
  profile_image?: string;
  doctor_specialization?: string;
  experience?: string;
  description?: string;
  mainText?: string;
  subtext?: string;
  thumbnail?: string;
  videoId?: string;
  step_text?: string;
  title?: string;
  h1_text?: string;
  cta_upper_text?: string;
  icon?: string;
  is_active?: boolean;
  reviewer_name?: string;
  rating?: number;
  language_based_description?: { [key: string]: string };
  h1Text?: string;
  h2Ttext?: string[];
}

interface Content {
  content_id: string;
  content_data: ContentData;
}

interface Component {
  componentId: string;
  name: string;
  title?: string;
  description?: string;
  contents: Content[];
}

interface RenderComponentsProps {
  components?: Component[];
}

export default function RenderComponents({
  components,
}: RenderComponentsProps) {
  if (!components) components = componentsList;
  const renderComponent = (item: Component) => {
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

    return componentsMap[name] || null; // Return null if the component is not found
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
