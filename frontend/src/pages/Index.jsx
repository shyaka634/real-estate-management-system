import { Link } from "react-router-dom";

export default function Index() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="absolute -right-40 bottom-20 h-96 w-96 rounded-full bg-violet-500/15 blur-3xl" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <header className="mb-12 flex flex-col gap-6 sm:mb-16 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-widest text-indigo-300">Property management</p>
            <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Run rentals <span className="text-indigo-300">with clarity.</span>
            </h1>
            <p className="mt-4 max-w-xl text-base text-slate-300 sm:text-lg">
              Track properties, active rents, and tenant requests in one responsive dashboard built for your backend API.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              to="/login"
              className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-lg transition hover:bg-slate-100"
            >
              Sign in
            </Link>
          </div>
        </header>

        <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Properties",
              body: "Add and browse listings with title, location, price, and landlord."
            },
            {
              title: "Rents",
              body: "Link tenants to properties with a clear start date."
            },
            {
              title: "Requests",
              body: "Track rental request status in one place."
            }
          ].map((card) => (
            <div
              key={card.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur-sm transition hover:border-white/20"
            >
              <h2 className="text-lg font-semibold text-white">{card.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">{card.body}</p>
            </div>
          ))}
        </section>

        <footer className="mt-auto pt-16 text-center text-sm text-slate-400 sm:text-left">
          Session-based auth · Works with your Express + Sequelize API
        </footer>
      </div>
    </div>
  );
}
