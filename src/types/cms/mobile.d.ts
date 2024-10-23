export interface MobileContentData {
  img?: string;
  h1?: string;
  h2?: string | string[];
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
  color3?: string;
  icon?: string;
  root_cause_name?: string;
  callbooked?: { h1?: string; h2?: string; h3?: string };
  callnotbooked?: { h1?: string; h2?: string; h3?: string };
  cta1?: string;
  cta2?: string;
  loginImgUrl?: string;
  title?: string;
  whatsApp?: string;
  image?: string;
  bottomSheet?: {
    root_cause_name?: string;
    sub_heading?: string;
  };
  details?: {
    description?: {
      english?: string;
    };
  };
  ctaName?: string;
  key?: string;
  label?: string;
  categoryIcon?: string;
  subcategory?: object;
  time_span?: string;
  img1?: string;
  img2?: string;
  number_perc?: string;
  icon?: string;
  root_cause_name?: string;
  icon?: string;
  content?: string;
  images?: string;
  _id?: string;
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
  images_circle?: string;
  title?: string;
  h1?: string;
  cta1?: string;
  cta2?: string;
}

export interface MobileComponent {
  componentId: string;
  name: string;
  title?: string;
  description?: string;
  gender?: Gender;
  sub_components?: SubComponents[] | SubComponents;
  contents: MobileContent[] | MobileContent;
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
  taskList?: TaskList[];
}

export interface TaskList {
  userTaskDetailId: string;
  h1: string;
  h2: string;
  h3: string[];
  urlOrText: string;
  eventName: string;
  navigation: {
    button_text: string;
    url_or_text: string;
    params: {
      url: string;
    };
  }[];
  type: string;
  priority: string;
  taskName: string;
}
export type Language = "hinglish" | "english";
export type Gender = "F" | "M" | "All";
