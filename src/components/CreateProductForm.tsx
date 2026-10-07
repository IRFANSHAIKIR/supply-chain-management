import { useState } from "react";
import type { CreateProductRequest, ProductStatus } from "../types/product";
const initial: CreateProductRequest = {
  name: "",
  sku: "",
  category: "",
  price: 0,
  stockQuantity: 0,
  status: "ACTIVE",
};
export function CreateProductForm({
  onCreate,
  onClose,
}: {
  onCreate: (p: CreateProductRequest) => Promise<void>;
  onClose: () => void;
}) {
  const [form, setForm] = useState(initial);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const update = <K extends keyof CreateProductRequest>(
    k: K,
    v: CreateProductRequest[K],
  ) => setForm((f) => ({ ...f, [k]: v }));
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!form.name.trim() || !form.sku.trim() || !form.category.trim()) {
      setError("Name, SKU and category are required.");
      return;
    }
    if (form.price <= 0) {
      setError("Price must be greater than 0.");
      return;
    }
    if (form.stockQuantity < 0) {
      setError("Stock cannot be negative.");
      return;
    }
    try {
      setSaving(true);
      await onCreate({
        ...form,
        name: form.name.trim(),
        sku: form.sku.trim(),
        category: form.category.trim(),
      });
      setForm(initial);
    } catch {
      setError("Could not create product. Check the backend response.");
    } finally {
      setSaving(false);
    }
  }
  return (
    <div className="modal-backdrop">
      <form className="modal" onSubmit={submit}>
        <div className="modal-header">
          <h2>Create product</h2>
          <button type="button" className="icon-button" onClick={onClose}>
            ×
          </button>
        </div>
        {error && <div className="error">{error}</div>}
        <label>
          Product name
          <input
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
          />
        </label>
        <label>
          SKU
          <input
            value={form.sku}
            onChange={(e) => update("sku", e.target.value)}
          />
        </label>
        <label>
          Category
          <input
            value={form.category}
            onChange={(e) => update("category", e.target.value)}
          />
        </label>
        <div className="two-col">
          <label>
            Price
            <input
              type="number"
              min="0.01"
              step="0.01"
              value={form.price}
              onChange={(e) => update("price", Number(e.target.value))}
            />
          </label>
          <label>
            Stock quantity
            <input
              type="number"
              min="0"
              value={form.stockQuantity}
              onChange={(e) => update("stockQuantity", Number(e.target.value))}
            />
          </label>
        </div>
        <label>
          Status
          <select
            value={form.status}
            onChange={(e) => update("status", e.target.value as ProductStatus)}
          >
            <option value="ACTIVE">Active</option>
            <option value="INACTIVE">Inactive</option>
          </select>
        </label>
        <div className="modal-actions">
          <button type="button" className="secondary" onClick={onClose}>
            Cancel
          </button>
          <button disabled={saving}>
            {saving ? "Creating..." : "Create product"}
          </button>
        </div>
      </form>
    </div>
  );
}
