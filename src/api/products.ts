import {api} from "./client";
import type {CreateProductRequest,ProductPageResponse,ProductFilters,Product} from "../types/product";
export async function getProducts(filters:ProductFilters):Promise<ProductPageResponse>{
 const params:Record<string,string|number>={page:filters.page,size:filters.size};
 if(filters.search.trim())params.search=filters.search.trim();
 if(filters.category.trim())params.category=filters.category.trim();
 if(filters.status)params.status=filters.status;
 if(filters.minPrice!=="")params.minPrice=filters.minPrice;
 if(filters.maxPrice!=="")params.maxPrice=filters.maxPrice;
 if(filters.minStock!=="")params.minStock=filters.minStock;
 if(filters.maxStock!=="")params.maxStock=filters.maxStock;
 if(filters.sort)params.sort=filters.sort;
 return (await api.get<ProductPageResponse>("/products",{params})).data;
}
export async function createProduct(payload:CreateProductRequest):Promise<Product>{
 return (await api.post<Product>("/products",payload)).data;
}