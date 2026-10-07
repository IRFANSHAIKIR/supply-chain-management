import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createProduct, getProducts } from "../api/products";
import type { CreateProductRequest, ProductFilters } from "../types/product";
import { ProductFilters as Filters } from "../components/ProductFilters";
import { ProductTable } from "../components/ProductTable";
import { Pagination } from "../components/Pagination";
import { CreateProductForm } from "../components/CreateProductForm";
const initial: ProductFilters = {
  search: "",
  category: "",
  status: "",
  minPrice: "",
  maxPrice: "",
  minStock: "",
  maxStock: "",
  sort: "createdAt,desc",
  page: 0,
  size: 10,
};
export function ProductsPage() {
  const [filters, setFilters] = useState(initial);
  const [open, setOpen] = useState(false);
  const qc = useQueryClient();
  const query = useQuery({
    queryKey: ["products", filters],
    queryFn: () => getProducts(filters),
    placeholderData: (p) => p,
  });
  const mutation = useMutation({
    mutationFn: (p: CreateProductRequest) => createProduct(p),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["products"] });
      setOpen(false);
    },
  });
  return (
    <main className="container">
      <header className="page-header">
        <div>
          <p className="eyebrow">Supply Chain</p>
          <h1>Products</h1>
          <p className="subtitle">
            Search, filter, sort and manage inventory products.
          </p>
        </div>
        <button onClick={() => setOpen(true)}>+ Create product</button>
      </header>
      <Filters
        filters={filters}
        onChange={setFilters}
        onSearch={() => setFilters((f) => ({ ...f, page: 0 }))}
        onReset={() => setFilters(initial)}
      />
      {query.isError && (
        <div className="error">
          Could not load products. Make sure Spring Boot is running on port
          8080.
        </div>
      )}
      <section className="card">
        <div className="card-header">
          <strong>{query.data?.totalElements ?? 0} products</strong>
          {query.isFetching && <span>Updating...</span>}
        </div>
        <ProductTable
          products={query.data?.content ?? []}
          loading={query.isLoading}
        />
        {query.data && (
          <Pagination
            page={query.data.page}
            totalPages={query.data.totalPages}
            first={query.data.first}
            last={query.data.last}
            onPageChange={(p) => setFilters((f) => ({ ...f, page: p }))}
          />
        )}
      </section>
      {open && (
        <CreateProductForm
          onCreate={(p) => mutation.mutateAsync(p)}
          onClose={() => setOpen(false)}
        />
      )}
    </main>
  );
}
