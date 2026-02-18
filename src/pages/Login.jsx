import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { Mail, Lock, ArrowRight, AlertCircle, ShoppingBag } from "lucide-react";

export default function Login() {
  const { login } = useAuth();

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState("");
  const [showPass, setShowPass] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(form.email, form.password);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const inputClass = (name) =>
    `w-full bg-white/[0.04] border rounded-xl px-4 py-3 pl-11 text-white/90 placeholder-white/25 text-sm outline-none transition-all duration-200 ${
      focused === name
        ? "border-amber-400/60 bg-white/[0.07] shadow-[0_0_0_3px_rgba(251,191,36,0.10)]"
        : "border-white/[0.08] hover:border-white/[0.15]"
    }`;

  return (
    <div className="min-h-screen bg-[#0d0d0f] flex items-center justify-center px-4 py-12">
      {/* Ambient blobs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 -left-20 w-72 h-72 bg-violet-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 shadow-lg shadow-amber-500/30 mb-4">
            <ShoppingBag size={22} className="text-white" strokeWidth={2.2} />
          </div>
          <h1
            className="text-2xl font-black text-white tracking-tight"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Welcome back
          </h1>
          <p className="text-white/35 text-sm mt-1">
            Sign in to your MicroMarket account
          </p>
        </div>

        {/* Card */}
        <div className="bg-[#141418] border border-white/[0.07] rounded-2xl p-6 sm:p-8 shadow-2xl">
          {/* Error */}
          {error && (
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 mb-6">
              <AlertCircle size={15} className="text-red-400 flex-shrink-0" />
              <p className="text-red-400 text-sm font-medium">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div className="space-y-1.5">
              <label className="block text-white/40 text-xs font-semibold uppercase tracking-widest pl-1">
                Email
              </label>
              <div className="relative">
                <Mail
                  size={15}
                  className={`absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors duration-200 ${
                    focused === "email" ? "text-amber-400" : "text-white/25"
                  }`}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  required
                  onChange={handleChange}
                  onFocus={() => setFocused("email")}
                  onBlur={() => setFocused("")}
                  className={inputClass("email")}
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="block text-white/40 text-xs font-semibold uppercase tracking-widest pl-1">
                Password
              </label>
              <div className="relative">
                <Lock
                  size={15}
                  className={`absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors duration-200 ${
                    focused === "password" ? "text-amber-400" : "text-white/25"
                  }`}
                />
                <input
                  type={showPass ? "text" : "password"}
                  name="password"
                  placeholder="••••••••"
                  required
                  onChange={handleChange}
                  onFocus={() => setFocused("password")}
                  onBlur={() => setFocused("")}
                  className={`${inputClass("password")} pr-12`}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/25 hover:text-white/60 text-xs font-semibold tracking-wide transition-colors"
                >
                  {showPass ? "HIDE" : "SHOW"}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex items-center justify-center gap-2 py-3 mt-2 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 text-[#0d0d0f] font-bold text-sm shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 hover:scale-[1.01] active:scale-[0.98] transition-all duration-200 overflow-hidden"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 rounded-full border-2 border-[#0d0d0f]/40 border-t-[#0d0d0f] animate-spin" />
                  Signing in…
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight
                    size={15}
                    className="group-hover:translate-x-0.5 transition-transform duration-200"
                  />
                </>
              )}
              {/* Shimmer */}
              {!loading && (
                <div className="absolute inset-0">
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
                </div>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-white/[0.06]" />
            <span className="text-white/20 text-xs font-medium">OR</span>
            <div className="flex-1 h-px bg-white/[0.06]" />
          </div>

          {/* Register CTA */}
          <p className="text-center text-sm text-white/35">
            New to MicroMarket?{" "}
            <Link
              to="/register"
              className="text-amber-400 font-semibold hover:text-amber-300 transition-colors"
            >
              Create a free account →
            </Link>
          </p>
        </div>

        <p className="text-center text-white/15 text-xs mt-6">
          Protected by JWT authentication
        </p>
      </div>

      <style>{`@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&display=swap');`}</style>
    </div>
  );
}
