export interface Product {
  id: number;
  name: string;
  slug: string;
  code: string;
  description: string;
  featured_image: string;
  gallery: string[];
  selectTypes: {
    id: number;
    name: string;
    slug: string;
    is_multi: number;
    values: {
      name: string;
      id: string;
      value: string | null;
    };
  }[];
  numericTypes: {
    id: number;
    name: string;
    slug: string;
    value: string;
  }[];
  seo: Record<string, string | null>;
}

export interface ApiResponse {
  status: boolean;
  message: string;
  data: Product[];
}

export interface FilterResponse {
  id: number;
  name: string;
  slug: string;
  is_multi: number;
  values: {
    id: string;
    name: string;
  }[];
}
