import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../components/AuthContext";

export default function LoginPage() {
  const { login, register } = useAuth();
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState({
    username: "",
    password: "",
    email: "",
    role: "tenant"
  });
  const [error, setError] = useState("");

  const onChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (isRegister) {
        await register(form);
      }
      await login(form.username, form.password);
      navigate("/dashboard");
    } catch (err) {
      setError(err?.response?.data?.message || "Authentication failed");
    }
  };

  const inputClass =
    "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/60 px-4 py-10 sm:px-6 sm:py-16">
      <div className="mx-auto flex w-full max-w-4xl flex-col overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-xl shadow-slate-200/50 lg:min-h-[calc(100vh-8rem)] lg:flex-row">
        <div className="relative flex flex-col justify-between bg-gradient-to-br from-indigo-600 to-violet-700 px-8 py-10 text-white lg:w-[42%] lg:py-12">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.06\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-90" />
          <div className="relative">
            <Link to="/" className="text-sm font-medium text-indigo-100 hover:text-white">
              ← Back home
            </Link>
            <h1 className="mt-8 text-2xl font-bold tracking-tight sm:text-3xl">Welcome back</h1>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-indigo-100">
              Secure session login — your session cookie keeps you signed in while you manage the portfolio.
            </p>
          </div>
          <p className="relative mt-10 text-xs text-indigo-200/90 lg:mt-0">
            New here? Toggle register to create a landlord or tenant account.
          </p>
        </div>

        <div className="flex flex-1 flex-col justify-center px-6 py-10 sm:px-10 lg:px-12 lg:py-12">
          <div className="mx-auto w-full max-w-md">
            <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
              {isRegister ? "Create account" : "Sign in"}
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              {isRegister ? "Register, then you’ll be signed in automatically." : "Use your username and password."}
            </p>

            <form onSubmit={onSubmit} className="mt-8 space-y-4">
              {error && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
                  {error}
                </div>
              )}
              <div>
                <label htmlFor="username" className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-slate-500">
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  placeholder="jane_doe"
                  value={form.username}
                  onChange={onChange}
                  className={inputClass}
                  required
                  autoComplete="username"
                />
              </div>
              <div>
                <label htmlFor="password" className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-slate-500">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={onChange}
                  className={inputClass}
                  required
                  autoComplete={isRegister ? "new-password" : "current-password"}
                />
              </div>
              {isRegister && (
                <>
                  <div>
                    <label htmlFor="email" className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-slate-500">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={onChange}
                      className={inputClass}
                      required
                      autoComplete="email"
                    />
                  </div>
                  <div>
                    <label htmlFor="role" className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-slate-500">
                      Role
                    </label>
                    <select id="role" name="role" value={form.role} onChange={onChange} className={inputClass}>
                      <option value="tenant">Tenant</option>
                      <option value="landlord">Landlord</option>
                    </select>
                  </div>
                </>
              )}
              <button
                type="submit"
                className="w-full rounded-xl bg-indigo-600 px-4 py-3.5 text-sm font-semibold text-white shadow-md shadow-indigo-600/25 transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                {isRegister ? "Register & sign in" : "Sign in"}
              </button>
            </form>

            <button
              type="button"
              onClick={() => {
                setIsRegister((v) => !v);
                setError("");
              }}
              className="mt-6 w-full text-center text-sm font-medium text-indigo-600 hover:text-indigo-800"
            >
              {isRegister ? "Already have an account? Sign in" : "No account? Register"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
