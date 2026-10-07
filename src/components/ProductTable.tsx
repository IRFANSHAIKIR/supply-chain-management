import type { Product } from "../types/product";
export function ProductTable({
  products,
  loading,
}: {
  products: Product[];
  loading: boolean;
}) {
  if (loading) return <div className="state">Loading products...</div>;
  if (!products.length) return <div className="state">No products found.</div>;
  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            {[
              "ID",
              "Product",
              "SKU",
              "Category",
              "Price",
              "Stock",
              "Status",
            ].map((x) => (
              <th key={x}>{x}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.name}</td>
              <td>{p.sku}</td>
              <td>{p.category}</td>
              <td>
                ₹{p.price.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
              </td>
              <td>{p.stockQuantity.toLocaleString("en-IN")}</td>
              <td>
                <span className={`status ${p.status.toLowerCase()}`}>
                  {p.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
