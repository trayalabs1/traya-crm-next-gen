export interface MobileContentData {
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
  h3?: string;
  color1?: string;
  color2?: string;
  icon?: string;
  root_cause_name?: string;
  callbooked?: { h1?: string; h2?: string; h3?: string };
  callnotbooked?: { h1?: string; h2?: string; h3?: string };
  cta1?: string;
  cta2?: string;
  loginImgUrl?: string;
  title?: string;
  bottomSheet?: {
    root_cause_name?: string;
    sub_heading?: string;
  };
  details?: {
    description?: {
      english?: string;
    };
  };
}

interface componentDetails {
  title?: string;
  cardNumber?: number;
  description?: string;
  img_url?: string;
  description_ln: {
    english?: string;
    hinglish?: string;
  };
}

export interface MobileContent {
  content_id: string;
  content_data: MobileContentData;
  product_id?: string;
  name?: string;
  image_url?: string;
  showComponent?: true;
  componentDetails?: componentDetails[];
}

export interface MobileComponent {
  componentId: string;
  name: string;
  title?: string;
  description?: string;
  sub_components?: object[];
  contents: MobileContent[] | MobileContent;
}
