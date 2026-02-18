import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Package,
  DollarSign,
  Image,
  FileText,
  ArrowRight,
  AlertCircle,
  Sparkles,
} from "lucide-react";

export default function CreateProduct() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    price: "",
    description: "",
    image: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [focused, setFocused] = useState("");
  const [imagePreview, setImagePreview] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    if (name === "image") setImagePreview(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await axios.post(
        "https://micro-marketplace-server.onrender.com/products",
        form,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
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

  const fields = [
    {
      name: "title",
      type: "text",
      placeholder: "Product title",
      icon: Package,
      label: "Title",
    },
    {
      name: "price",
      type: "number",
      placeholder: "0.00",
      icon: DollarSign,
      label: "Price (₹)",
    },
    {
      name: "image",
      type: "text",
      placeholder: "https://example.com/image.jpg",
      icon: Image,
      label: "Image URL",
    },
  ];

  const isComplete = form.title && form.price && form.image && form.description;

  return (
    <div className="min-h-screen bg-[#0d0d0f] flex items-center justify-center px-4 py-12">
      {/* Background glow blobs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-violet-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-lg">
        {/* ── Header ── */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 shadow-lg shadow-amber-500/30 mb-4">
            <Sparkles size={22} className="text-white" />
          </div>
          <h1
            className="text-2xl font-black text-white tracking-tight"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            List a Product
          </h1>
          <p className="text-white/35 text-sm mt-1">
            Fill in the details to start selling
          </p>
        </div>

        {/* ── Card ── */}
        <div className="bg-[#141418] border border-white/[0.07] rounded-2xl p-6 sm:p-8 shadow-2xl">
          {/* Error banner */}
          {error && (
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 mb-6">
              <AlertCircle size={16} className="text-red-400 flex-shrink-0" />
              <p className="text-red-400 text-sm font-medium">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Single-line fields */}
            {fields.map(({ name, type, placeholder, icon: Icon, label }) => (
              <div key={name} className="space-y-1.5">
                <label className="block text-white/45 text-xs font-semibold uppercase tracking-widest pl-1">
                  {label}
                </label>
                <div className="relative">
                  <Icon
                    size={15}
                    className={`absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors duration-200 ${
                      focused === name ? "text-amber-400" : "text-white/25"
                    }`}
                  />
                  <input
                    type={type}
                    name={name}
                    placeholder={placeholder}
                    value={form[name]}
                    onChange={handleChange}
                    onFocus={() => setFocused(name)}
                    onBlur={() => setFocused("")}
                    required
                    className={inputClass(name)}
                  />
                </div>

                {/* Image preview strip */}
                {name === "image" && imagePreview && (
                  <div className="mt-2 rounded-xl overflow-hidden h-32 bg-white/[0.04] border border-white/[0.06]">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                      onError={(e) => (e.target.style.display = "none")}
                    />
                  </div>
                )}
              </div>
            ))}

            {/* Description */}
            <div className="space-y-1.5">
              <label className="block text-white/45 text-xs font-semibold uppercase tracking-widest pl-1">
                Description
              </label>
              <div className="relative">
                <FileText
                  size={15}
                  className={`absolute left-3.5 top-3.5 transition-colors duration-200 ${
                    focused === "description"
                      ? "text-amber-400"
                      : "text-white/25"
                  }`}
                />
                <textarea
                  name="description"
                  placeholder="Describe your product..."
                  value={form.description}
                  onChange={handleChange}
                  onFocus={() => setFocused("description")}
                  onBlur={() => setFocused("")}
                  required
                  rows={4}
                  className={`${inputClass("description")} pl-11 pt-3 resize-none leading-relaxed`}
                />
              </div>
            </div>

            {/* Progress dots */}
            <div className="flex items-center gap-1.5 px-1">
              {["title", "price", "image", "description"].map((f) => (
                <div
                  key={f}
                  className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                    form[f] ? "bg-amber-400" : "bg-white/[0.08]"
                  }`}
                />
              ))}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className={`group relative w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all duration-200 active:scale-[0.98] ${
                isComplete
                  ? "bg-gradient-to-r from-amber-400 to-orange-500 text-[#0d0d0f] shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 hover:scale-[1.01]"
                  : "bg-white/[0.06] text-white/30 border border-white/[0.08] cursor-not-allowed"
              }`}
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin" />
                  Publishing…
                </>
              ) : (
                <>
                  List Product
                  <ArrowRight
                    size={16}
                    className="group-hover:translate-x-0.5 transition-transform duration-200"
                  />
                </>
              )}

              {/* Shimmer on hover when complete */}
              {isComplete && !loading && (
                <div className="absolute inset-0 rounded-xl overflow-hidden">
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
                </div>
              )}
            </button>
          </form>
        </div>

        {/* Footer note */}
        <p className="text-center text-white/20 text-xs mt-6">
          Your listing goes live immediately after submission.
        </p>
      </div>

      <style>{`@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&display=swap');`}</style>
    </div>
  );
}
