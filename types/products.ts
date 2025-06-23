export interface Product {
  id: number;
  name: string;
  slug: string;
  code: string;
  description: string;
  featured_image: string;
  gallery: string[];
  selectTypes: any[];
  numericTypes: any[];
}

export interface ApiResponse {
  status: boolean;
  message: string;
  data: Product[];
}
