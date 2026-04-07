import { useEffect, useState } from "react";
import api from "../api/api";

const field =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20";

export default function RentsPage() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ tenant_id: "", property_id: "", startDate: "" });
  const [error, setError] = useState("");

  const load = async () => {
    try {
      const res = await api.get("/rents");
      setItems(res.data);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to load rents");
    }
  };

  useEffect(() => {
    load();
  }, []);

  const create = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await api.post("/rents", {
        ...form,
        tenant_id: Number(form.tenant_id),
        property_id: Number(form.property_id)
      });
      setForm({ tenant_id: "", property_id: "", startDate: "" });
      load();
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to create rent");
    }
  };

  const remove = async (id) => {
    try {
      setError("");
      await api.delete(`/rents/${id}`);
      load();
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to delete rent");
    }
  };

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Rents</h1>
        <p className="mt-1 text-sm text-slate-600 sm:text-base">
          Link a tenant to a property with a start date. Data shows as a table on larger screens.
        </p>
      </header>

      <section className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm sm:p-6">
        <h2 className="text-sm font-semibold text-slate-900">Add rent</h2>
        <form onSubmit={create} className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <input
            className={field}
            placeholder="Tenant ID"
            type="number"
            min={1}
            value={form.tenant_id}
            onChange={(e) => setForm({ ...form, tenant_id: e.target.value })}
            required
          />
          <input
            className={field}
            placeholder="Property ID"
            type="number"
            min={1}
            value={form.property_id}
            onChange={(e) => setForm({ ...form, property_id: e.target.value })}
            required
          />
          <input
            className={`${field} lg:col-span-1`}
            type="date"
            value={form.startDate}
            onChange={(e) => setForm({ ...form, startDate: e.target.value })}
            required
          />
          <button
            type="submit"
            className="sm:col-span-2 lg:col-span-3 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-indigo-600/20 transition hover:bg-indigo-700"
          >
            Add rent
          </button>
        </form>
      </section>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">{error}</div>
      )}

      <section className="rounded-2xl border border-slate-200/80 bg-white shadow-sm">
        <div className="border-b border-slate-100 px-4 py-4 sm:px-6">
          <h2 className="font-semibold text-slate-900">All rents</h2>
        </div>

        <div className="hidden md:block overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="border-b border-slate-100 bg-slate-50/90 text-xs font-semibold uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-6 py-3">ID</th>
                <th className="px-6 py-3">Tenant</th>
                <th className="px-6 py-3">Property</th>
                <th className="px-6 py-3">Start</th>
                <th className="px-6 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {items.map((item) => {
                const rowId = item.rent_id ?? item.id;
                return (
                  <tr key={rowId} className="hover:bg-slate-50/80">
                    <td className="whitespace-nowrap px-6 py-3 font-medium text-slate-900">{rowId}</td>
                    <td className="px-6 py-3 tabular-nums text-slate-700">{item.tenant_id}</td>
                    <td className="px-6 py-3 tabular-nums text-slate-700">{item.property_id}</td>
                    <td className="px-6 py-3 text-slate-600">
                      {item.startDate ? new Date(item.startDate).toLocaleDateString() : "—"}
                    </td>
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
            <li className="px-4 py-8 text-center text-sm text-slate-500">No rents yet.</li>
          ) : (
            items.map((item) => {
              const rowId = item.rent_id ?? item.id;
              return (
                <li key={rowId} className="px-4 py-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-slate-900">Rent #{rowId}</p>
                      <p className="mt-1 text-sm text-slate-600">
                        Tenant <span className="tabular-nums font-medium">{item.tenant_id}</span>
                        {" · "}Property <span className="tabular-nums font-medium">{item.property_id}</span>
                      </p>
                      <p className="mt-2 text-xs text-slate-500">
                        Starts{" "}
                        {item.startDate ? new Date(item.startDate).toLocaleDateString() : "—"}
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
