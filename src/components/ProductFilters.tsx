import type { ProductFilters as FiltersType } from "../types/product";
interface Props {
  filters: FiltersType;
  onChange: (v: FiltersType) => void;
  onSearch: () => void;
  onReset: () => void;
}
export function ProductFilters({
  filters,
  onChange,
  onSearch,
  onReset,
}: Props) {
  const update = (key: keyof FiltersType, value: string | number) =>
    onChange({ ...filters, [key]: value, page: 0 });
  return (
    <section className="filters">
      <div className="filter-grid">
        <label>
          Search
          <input
            value={filters.search}
            placeholder="Name or SKU"
            onChange={(e) => update("search", e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onSearch()}
          />
        </label>
        <label>
          Category
          <input
            value={filters.category}
            placeholder="Electronics"
            onChange={(e) => update("category", e.target.value)}
          />
        </label>
        <label>
          Status
          <select
            value={filters.status}
            onChange={(e) => update("status", e.target.value)}
          >
            <option value="">All</option>
            <option value="ACTIVE">Active</option>
            <option value="INACTIVE">Inactive</option>
          </select>
        </label>
        <label>
          Min price
          <input
            type="number"
            min="0"
            step="0.01"
            value={filters.minPrice}
            onChange={(e) => update("minPrice", e.target.value)}
          />
        </label>
        <label>
          Max price
          <input
            type="number"
            min="0"
            step="0.01"
            value={filters.maxPrice}
            onChange={(e) => update("maxPrice", e.target.value)}
          />
        </label>
        <label>
          Min stock
          <input
            type="number"
            min="0"
            value={filters.minStock}
            onChange={(e) => update("minStock", e.target.value)}
          />
        </label>
        <label>
          Max stock
          <input
            type="number"
            min="0"
            value={filters.maxStock}
            onChange={(e) => update("maxStock", e.target.value)}
          />
        </label>
        <label>
          Sort
          <select
            value={filters.sort}
            onChange={(e) => update("sort", e.target.value)}
          >
            <option value="createdAt,desc">Newest</option>
            <option value="name,asc">Name A-Z</option>
            <option value="price,asc">Price low-high</option>
            <option value="price,desc">Price high-low</option>
            <option value="stockQuantity,desc">Stock high-low</option>
          </select>
        </label>
      </div>
      <div className="filter-actions">
        <button onClick={onSearch}>Apply filters</button>
        <button className="secondary" onClick={onReset}>
          Reset
        </button>
      </div>
    </section>
  );
}
