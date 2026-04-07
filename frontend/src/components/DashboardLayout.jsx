import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const links = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/properties", label: "Properties" },
  { to: "/rents", label: "Rents" },
  { to: "/requests", label: "Requests" }
];

export default function DashboardLayout({ children }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    setMenuOpen(false);
    await logout();
    navigate("/login");
  };

  const navClass = ({ isActive }) =>
    [
      "flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
      isActive
        ? "bg-indigo-600 text-white shadow-sm"
        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
    ].join(" ");

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50/80 text-slate-900">
      <header className="sticky top-0 z-40 h-14 shrink-0 border-b border-slate-200/80 bg-white/90 shadow-sm backdrop-blur-lg">
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <div className="flex min-w-0 items-center gap-3">
            <button
              type="button"
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 shadow-sm lg:hidden"
              aria-expanded={menuOpen}
              aria-label="Open menu"
              onClick={() => setMenuOpen((o) => !o)}
            >
              <span className="sr-only">Menu</span>
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
            <Link
              to="/dashboard"
              className="truncate text-base font-semibold tracking-tight text-slate-900 sm:text-lg"
            >
              <span className="text-indigo-600">Re</span>al Estate
            </Link>
          </div>
          <div className="hidden min-w-0 text-right text-sm text-slate-600 sm:block">
            {user ? (
              <p className="truncate">
                <span className="font-medium text-slate-900">{user.username}</span>
                <span className="text-slate-400"> · </span>
                <span className="capitalize">{user.role}</span>
              </p>
            ) : (
              <span>Not signed in</span>
            )}
          </div>
        </div>
      </header>

      {menuOpen && (
        <button
          type="button"
          className="fixed inset-0 z-30 bg-slate-900/40 backdrop-blur-[2px] lg:hidden"
          aria-label="Close menu"
          onClick={() => setMenuOpen(false)}
        />
      )}

      <div className="mx-auto flex max-w-7xl gap-0 px-4 py-6 sm:px-6 lg:gap-8 lg:px-8">
        <aside
          className={[
            "fixed left-0 top-14 z-40 h-[calc(100dvh-3.5rem)] w-72 max-w-[85vw] transform overflow-y-auto border-r border-slate-200 bg-white p-4 shadow-xl transition-transform duration-200 ease-out lg:static lg:top-auto lg:z-0 lg:h-auto lg:w-60 lg:max-w-none lg:shrink-0 lg:transform-none lg:self-start lg:overflow-visible lg:rounded-2xl lg:border lg:p-4 lg:shadow-sm",
            menuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          ].join(" ")}
        >
          <nav className="space-y-1" onClick={() => setMenuOpen(false)}>
            {links.map(({ to, label }) => (
              <NavLink key={to} to={to} className={navClass} end={to === "/dashboard"}>
                {label}
              </NavLink>
            ))}
          </nav>
          <button
            type="button"
            onClick={handleLogout}
            className="mt-6 w-full rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-sm font-medium text-red-700 transition-colors hover:bg-red-100"
          >
            Log out
          </button>
        </aside>

        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  );
}
