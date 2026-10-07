export type ProductStatus = "ACTIVE" | "INACTIVE";
export interface Product {
  id: number;
  name: string;
  sku: string;
  category: string;
  price: number;
  stockQuantity: number;
  status: ProductStatus;
  createdAt: string;
}
export interface ProductPageResponse {
  content: Product[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
}
export interface CreateProductRequest {
  name: string;
  sku: string;
  category: string;
  price: number;
  stockQuantity: number;
  status: ProductStatus;
}
export interface ProductFilters {
  search: string;
  category: string;
  status: "" | ProductStatus;
  minPrice: string;
  maxPrice: string;
  minStock: string;
  maxStock: string;
  sort: string;
  page: number;
  size: number;
}
