import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import {
  User,
  Mail,
  Lock,
  ArrowRight,
  AlertCircle,
  Sparkles,
} from "lucide-react";

export default function Register() {
  const { register } = useAuth();

  const [form, setForm] = useState({ name: "", email: "", password: "" });
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
      await register(form.name, form.email, form.password);
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

  // Password strength
  const getStrength = (pw) => {
    if (!pw) return 0;
    let score = 0;
    if (pw.length >= 8) score++;
    if (/[A-Z]/.test(pw)) score++;
    if (/[0-9]/.test(pw)) score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;
    return score;
  };

  const strength = getStrength(form.password);
  const strengthLabel = ["", "Weak", "Fair", "Good", "Strong"][strength];
  const strengthColor = [
    "",
    "bg-red-500",
    "bg-orange-400",
    "bg-yellow-400",
    "bg-emerald-400",
  ][strength];
  const strengthText = [
    "",
    "text-red-400",
    "text-orange-400",
    "text-yellow-400",
    "text-emerald-400",
  ][strength];

  const isComplete = form.name && form.email && form.password;

  return (
    <div className="min-h-screen bg-[#0d0d0f] flex items-center justify-center px-4 py-12">
      {/* Ambient blobs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-violet-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-400 to-indigo-500 shadow-lg shadow-violet-500/30 mb-4">
            <Sparkles size={22} className="text-white" />
          </div>
          <h1
            className="text-2xl font-black text-white tracking-tight"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Create account
          </h1>
          <p className="text-white/35 text-sm mt-1">
            Join MicroMarket and start selling today
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
            {/* Full Name */}
            <div className="space-y-1.5">
              <label className="block text-white/40 text-xs font-semibold uppercase tracking-widest pl-1">
                Full Name
              </label>
              <div className="relative">
                <User
                  size={15}
                  className={`absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors duration-200 ${
                    focused === "name" ? "text-violet-400" : "text-white/25"
                  }`}
                />
                <input
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  required
                  onChange={handleChange}
                  onFocus={() => setFocused("name")}
                  onBlur={() => setFocused("")}
                  className={inputClass("name")
                    .replace("amber-400/60", "violet-400/60")
                    .replace("rgba(251,191,36,0.10)", "rgba(167,139,250,0.10)")}
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label className="block text-white/40 text-xs font-semibold uppercase tracking-widest pl-1">
                Email
              </label>
              <div className="relative">
                <Mail
                  size={15}
                  className={`absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors duration-200 ${
                    focused === "email" ? "text-violet-400" : "text-white/25"
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
                  className={inputClass("email")
                    .replace("amber-400/60", "violet-400/60")
                    .replace("rgba(251,191,36,0.10)", "rgba(167,139,250,0.10)")}
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
                    focused === "password" ? "text-violet-400" : "text-white/25"
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
                  className={`${inputClass("password").replace("amber-400/60", "violet-400/60").replace("rgba(251,191,36,0.10)", "rgba(167,139,250,0.10)")} pr-12`}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/25 hover:text-white/60 text-xs font-semibold tracking-wide transition-colors"
                >
                  {showPass ? "HIDE" : "SHOW"}
                </button>
              </div>

              {/* Password strength meter */}
              {form.password && (
                <div className="pt-1 space-y-1.5">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4].map((level) => (
                      <div
                        key={level}
                        className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                          strength >= level ? strengthColor : "bg-white/[0.07]"
                        }`}
                      />
                    ))}
                  </div>
                  <p className={`text-xs font-semibold pl-0.5 ${strengthText}`}>
                    {strengthLabel} password
                  </p>
                </div>
              )}
            </div>

            {/* Terms micro-text */}
            <p className="text-white/20 text-xs leading-relaxed px-1">
              By registering, you agree to our{" "}
              <span className="text-white/40 underline cursor-pointer hover:text-white/60 transition-colors">
                Terms of Service
              </span>{" "}
              and{" "}
              <span className="text-white/40 underline cursor-pointer hover:text-white/60 transition-colors">
                Privacy Policy
              </span>
              .
            </p>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className={`group relative w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all duration-200 active:scale-[0.98] overflow-hidden ${
                isComplete
                  ? "bg-gradient-to-r from-violet-500 to-indigo-500 text-white shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 hover:scale-[1.01]"
                  : "bg-white/[0.06] text-white/30 border border-white/[0.08] cursor-not-allowed"
              }`}
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                  Creating account…
                </>
              ) : (
                <>
                  Create Account
                  <ArrowRight
                    size={15}
                    className="group-hover:translate-x-0.5 transition-transform duration-200"
                  />
                </>
              )}
              {isComplete && !loading && (
                <div className="absolute inset-0">
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/15 to-transparent skew-x-12" />
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

          {/* Login CTA */}
          <p className="text-center text-sm text-white/35">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-violet-400 font-semibold hover:text-violet-300 transition-colors"
            >
              Sign in →
            </Link>
          </p>
        </div>

        <p className="text-center text-white/15 text-xs mt-6">
          Free forever · No credit card required
        </p>
      </div>

      <style>{`@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&display=swap');`}</style>
    </div>
  );
}
