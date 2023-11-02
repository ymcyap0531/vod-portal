export interface Categories {
  data: Category[];
  error: {
    message: string;
  };
}

export interface Category {
  id: number;
  attributes: {
    name: string;
  };
}

export interface Movie {
  id: number;
  attributes: {
    title: string;
    description: string;
    year: number;
    director: string;
    duration: string;
    imdb_url: string;
    movie_url: string;
    poster_url: string;
    sample_url: string;
    starring: string;
    categories: { category: Category[] };
  };
}

export interface Movies {
  data: Movie[];
  error: {
    message: string;
  };
  meta: {
    pagination: {
      pageCount: number;
      page: number;
    };
  };
}

export interface User {
  username: string;
  password: string;
  email: string;
  blocked: boolean;
  domain: string;
}

export interface Faqs {
  data: Faq[];
}

export interface Faq {
  id: number;
  attributes: {
    question: string;
    answer: string;
    questionType: string;
  };
}

export interface Brands {
  data: Brand[];
}

export interface Brand {
  id: number;
  attributes: {
    address:          string;
    name:             string;
    privacyPolicy:    string;
    tAndC:            string;
    supportEmail:     string;
    domainName:       string;
    template:         string;
    supportNumber:    string;
    metaKeywords:     string;
    metaDescription:  string;
    trial:      { days: number, campaign_id: number, product_id: number, amount: number, currency: string, currencySymbol: string, signupDescription: string, signupTitle: string };
    membership: { days: number, campaign_id: number, product_id: number, amount: number, currency: string, currencySymbol: string, signupDescription: string, signupTitle: string };
    fallback?:  { days: number, campaign_id: number, product_id: number, amount: number, currency: string, currencySymbol: string, signupDescription: string, signupTitle: string };
  };
}

export interface BrandConfigs {
  data: BrandConfig[];
}

export interface BrandConfig {
  id: number;
  attributes: {
    country_code:       string;
    sign_up_url:        string;
    api_sub_check_url:  string;
    filter_categories:  boolean;
    phone_details:      { phoneRegex: string, phoneLength: number, phonePrefix: number};
    lpId:               number;
    partnerId:          string;
    partner_api_url:    string;
  };
}

export interface Articles {
  data: Article[];
}

export interface Article {
  id: number;
  attributes: {
    name: string;
    content: string;
  };
}

export interface TextTranslations {
  data: TextTranslation[];
}

export interface TextTranslation {
  id: number;
  attributes: {
    text: string;
  };
}

export interface SpecialCategories {
  data: SpecialCategory[];
}

export interface SpecialCategory {
  id: number;
  attributes: {
    name: string;
    display_name: string;
    movies: Movies;
  };
}
