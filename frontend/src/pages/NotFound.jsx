import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white px-4 py-16 sm:py-24">
      <div className="mx-auto flex max-w-lg flex-col items-center text-center">
        <p className="text-8xl font-black tabular-nums text-slate-200 sm:text-9xl">404</p>
        <h1 className="-mt-6 text-2xl font-bold tracking-tight text-slate-900 sm:-mt-8 sm:text-3xl">Page not found</h1>
        <p className="mt-3 text-base text-slate-600">
          The link may be broken or the page was removed. Head back to the home screen or sign in.
        </p>
        <div className="mt-8 flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-700"
          >
            Home
          </Link>
          <Link
            to="/login"
            className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-800 shadow-sm transition hover:bg-slate-50"
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
