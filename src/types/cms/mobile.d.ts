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
}

export interface MobileContent {
  content_id: string;
  content_data: MobileContentData;
}

export interface MobileComponent {
  componentId: string;
  name: string;
  title?: string;
  description?: string;
  contents: MobileContent[];
}
