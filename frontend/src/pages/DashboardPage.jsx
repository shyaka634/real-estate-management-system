import { Link } from "react-router-dom";
import { useAuth } from "../components/AuthContext";

const cards = [
  {
    to: "/properties",
    title: "Properties",
    description: "Listings, pricing, and landlord linkage.",
    accent: "from-emerald-500/90 to-teal-600/90"
  },
  {
    to: "/rents",
    title: "Rents",
    description: "Active tenant–property leases and start dates.",
    accent: "from-indigo-500/90 to-violet-600/90"
  },
  {
    to: "/requests",
    title: "Requests",
    description: "Rental request workflow and status.",
    accent: "from-amber-500/90 to-orange-600/90"
  }
];

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <div className="space-y-8">
      <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Dashboard</h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-600 sm:text-base">
              {user
                ? `Hi ${user.username}. Pick a section below or use the sidebar — layout adapts on phones and tablets.`
                : "Use the sidebar to manage properties, rents, and requests."}
            </p>
          </div>
          <div className="shrink-0 rounded-xl bg-slate-50 px-4 py-3 text-center sm:text-left">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Signed in as</p>
            <p className="mt-1 text-sm font-semibold text-slate-900 capitalize">{user?.role ?? "—"}</p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-500">Quick access</h2>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {cards.map(({ to, title, description, accent }) => (
            <Link
              key={to}
              to={to}
              className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition hover:border-indigo-200 hover:shadow-md"
            >
              <div
                className={`absolute right-0 top-0 h-24 w-24 translate-x-4 -translate-y-4 rounded-full bg-gradient-to-br ${accent} opacity-90 blur-2xl transition group-hover:scale-110`}
                aria-hidden
              />
              <div className="relative">
                <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{description}</p>
                <span className="mt-4 inline-flex items-center text-sm font-medium text-indigo-600 group-hover:text-indigo-800">
                  Open
                  <span className="ml-1 transition group-hover:translate-x-0.5" aria-hidden>
                    →
                  </span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-dashed border-slate-200 bg-slate-50/80 px-4 py-6 text-center text-sm text-slate-600 sm:px-6">
        Tip: on small screens, tap the menu icon (top left) to open navigation.
      </section>
    </div>
  );
}
