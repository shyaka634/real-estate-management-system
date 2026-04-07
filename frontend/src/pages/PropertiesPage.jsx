import { useEffect, useState } from "react";
import api from "../api/api";

const field =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20";

export default function PropertiesPage() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ title: "", location: "", price: "", landlord_id: "" });
  const [error, setError] = useState("");

  const load = async () => {
    try {
      const res = await api.get("/properties");
      setItems(res.data);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to load properties");
    }
  };

  useEffect(() => {
    load();
  }, []);

  const create = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await api.post("/properties", {
        ...form,
        price: Number(form.price),
        landlord_id: Number(form.landlord_id)
      });
      setForm({ title: "", location: "", price: "", landlord_id: "" });
      load();
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to create property");
    }
  };

  const remove = async (id) => {
    try {
      setError("");
      await api.delete(`/properties/${id}`);
      load();
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to delete property");
    }
  };

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Properties</h1>
        <p className="mt-1 text-sm text-slate-600 sm:text-base">
          Create listings and review everything in a table on desktop or cards on mobile.
        </p>
      </header>

      <section className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm sm:p-6">
        <h2 className="text-sm font-semibold text-slate-900">Add property</h2>
        <form onSubmit={create} className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <input
            className={field}
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />
          <input
            className={field}
            placeholder="Location"
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
            required
          />
          <input
            className={field}
            placeholder="Price"
            type="number"
            min={0}
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            required
          />
          <input
            className={field}
            placeholder="Landlord ID"
            type="number"
            min={1}
            value={form.landlord_id}
            onChange={(e) => setForm({ ...form, landlord_id: e.target.value })}
            required
          />
          <button
            type="submit"
            className="sm:col-span-2 lg:col-span-4 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-indigo-600/20 transition hover:bg-indigo-700"
          >
            Add property
          </button>
        </form>
      </section>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">{error}</div>
      )}

      <section className="rounded-2xl border border-slate-200/80 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 px-4 py-4 sm:px-6">
          <h2 className="font-semibold text-slate-900">All properties</h2>
          <span className="text-xs text-slate-500 md:hidden">Card list on small screens</span>
        </div>

        <div className="hidden md:block overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="border-b border-slate-100 bg-slate-50/90 text-xs font-semibold uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-6 py-3">ID</th>
                <th className="px-6 py-3">Title</th>
                <th className="px-6 py-3">Location</th>
                <th className="px-6 py-3">Price</th>
                <th className="px-6 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {items.map((item) => {
                const rowId = item.property_id ?? item.id;
                return (
                  <tr key={rowId} className="hover:bg-slate-50/80">
                    <td className="whitespace-nowrap px-6 py-3 font-medium text-slate-900">{rowId}</td>
                    <td className="px-6 py-3 text-slate-700">{item.title}</td>
                    <td className="px-6 py-3 text-slate-600">{item.location}</td>
                    <td className="px-6 py-3 tabular-nums text-slate-700">{item.price}</td>
                    <td className="px-6 py-3 text-right">
                      <button
                        type="button"
                        onClick={() => remove(rowId)}
                        className="text-sm font-medium text-red-600 hover:text-red-800"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <ul className="divide-y divide-slate-100 md:hidden">
          {items.length === 0 ? (
            <li className="px-4 py-8 text-center text-sm text-slate-500">No properties yet.</li>
          ) : (
            items.map((item) => {
              const rowId = item.property_id ?? item.id;
              return (
                <li key={rowId} className="px-4 py-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate font-semibold text-slate-900">{item.title}</p>
                      <p className="mt-1 text-sm text-slate-600">{item.location}</p>
                      <p className="mt-2 text-xs text-slate-500">
                        ID {rowId} · <span className="tabular-nums font-medium text-slate-700">{item.price}</span>
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => remove(rowId)}
                      className="shrink-0 rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-medium text-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              );
            })
          )}
        </ul>
      </section>
    </div>
  );
}
