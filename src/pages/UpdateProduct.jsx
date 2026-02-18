import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import API from "../api/axios";
import {
  Package,
  FileText,
  DollarSign,
  Image,
  ArrowLeft,
  ArrowRight,
  AlertCircle,
  RefreshCw,
  CheckCircle2,
} from "lucide-react";

export default function UpdateProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [product, setProduct] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState("");
  const [focused, setFocused] = useState("");
  const [saved, setSaved] = useState(false);

  // Fetch existing product
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await API.get(`/products/${id}`);
        setProduct(data.product);
        setTitle(data.product.title);
        setDescription(data.product.description);
        setPrice(data.product.price);
        setImage(data.product.image);
      } catch (err) {
        setError("Failed to load product");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  // Owner check
  const isOwner = user && product?.user?._id === user._id;
  if (!isOwner && !loading) navigate("/");

  const handleUpdate = async (e) => {
    e.preventDefault();
    setUpdating(true);

    if (!title || !description || !price || !image) {
      alert("All fields are required");
      setUpdating(false);
      return;
    }

    try {
      await API.put(`/products/${id}`, { title, description, price, image });
      setSaved(true);
      setTimeout(() => navigate(`/product/${id}`), 900);
    } catch (err) {
      console.log(err);
      alert("Failed to update product");
    } finally {
      setUpdating(false);
    }
  };

  const inputClass = (name) =>
    `w-full bg-white/[0.04] border rounded-xl px-4 py-3 pl-11 text-white/90 placeholder-white/25 text-sm outline-none transition-all duration-200 ${
      focused === name
        ? "border-amber-400/60 bg-white/[0.07] shadow-[0_0_0_3px_rgba(251,191,36,0.10)]"
        : "border-white/[0.08] hover:border-white/[0.15]"
    }`;

  // ── Loading state ──
  if (loading) {
    return (
      <div className="min-h-screen bg-[#0d0d0f] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 rounded-full border-2 border-amber-400/30 border-t-amber-400 animate-spin" />
          <p className="text-white/30 text-sm">Loading product…</p>
        </div>
      </div>
    );
  }

  // ── Error state ──
  if (error) {
    return (
      <div className="min-h-screen bg-[#0d0d0f] flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-4">
            <AlertCircle size={24} className="text-red-400" />
          </div>
          <p className="text-white/50 text-lg font-bold mb-5">{error}</p>
          <button
            onClick={() => navigate("/")}
            className="px-5 py-2.5 rounded-xl bg-amber-400 text-[#0d0d0f] font-bold text-sm hover:bg-amber-300 transition-colors"
          >
            Back to Marketplace
          </button>
        </div>
      </div>
    );
  }

  const isComplete = title && description && price && image;

  return (
    <div className="min-h-screen bg-[#0d0d0f] px-4 py-10">
      {/* Ambient blobs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-64 bg-amber-500/4 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-violet-500/4 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-2xl mx-auto">
        {/* ── Back button ── */}
        <button
          onClick={() => navigate(`/product/${id}`)}
          className="group flex items-center gap-2 text-white/35 hover:text-white/70 text-sm font-medium mb-8 transition-colors"
        >
          <ArrowLeft
            size={16}
            className="group-hover:-translate-x-0.5 transition-transform duration-200"
          />
          Back to Product
        </button>

        {/* ── Header ── */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-md shadow-amber-500/25">
              <RefreshCw size={15} className="text-white" strokeWidth={2.5} />
            </div>
            <p className="text-amber-400 text-xs font-bold uppercase tracking-[0.2em]">
              Edit Listing
            </p>
          </div>
          <h1
            className="text-2xl sm:text-3xl font-black text-white tracking-tight"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Update Product
          </h1>
          <p className="text-white/30 text-sm mt-1">
            Changes go live immediately after saving.
          </p>
        </div>

        {/* ── Main card ── */}
        <div className="bg-[#141418] border border-white/[0.07] rounded-2xl overflow-hidden shadow-2xl">
          {/* Image preview banner */}
          {image && (
            <div className="relative h-44 bg-[#1a1a1f] overflow-hidden">
              <img
                src={image}
                alt="Preview"
                className="w-full h-full object-cover opacity-60"
                onError={(e) => (e.target.style.display = "none")}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#141418]" />
              <div className="absolute bottom-3 left-4">
                <span className="text-white/40 text-xs font-semibold uppercase tracking-widest">
                  Image Preview
                </span>
              </div>
            </div>
          )}

          <div className="p-6 sm:p-8">
            <form onSubmit={handleUpdate} className="space-y-5">
              {/* Title */}
              <div className="space-y-1.5">
                <label className="block text-white/40 text-xs font-semibold uppercase tracking-widest pl-1">
                  Title
                </label>
                <div className="relative">
                  <Package
                    size={15}
                    className={`absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors duration-200 ${
                      focused === "title" ? "text-amber-400" : "text-white/25"
                    }`}
                  />
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    onFocus={() => setFocused("title")}
                    onBlur={() => setFocused("")}
                    placeholder="Product title"
                    className={inputClass("title")}
                  />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <label className="block text-white/40 text-xs font-semibold uppercase tracking-widest pl-1">
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
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    onFocus={() => setFocused("description")}
                    onBlur={() => setFocused("")}
                    rows={4}
                    placeholder="Describe your product…"
                    className={`${inputClass("description")} pt-3 resize-none leading-relaxed`}
                  />
                </div>
              </div>

              {/* Price */}
              <div className="space-y-1.5">
                <label className="block text-white/40 text-xs font-semibold uppercase tracking-widest pl-1">
                  Price (₹)
                </label>
                <div className="relative">
                  <DollarSign
                    size={15}
                    className={`absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors duration-200 ${
                      focused === "price" ? "text-amber-400" : "text-white/25"
                    }`}
                  />
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    onFocus={() => setFocused("price")}
                    onBlur={() => setFocused("")}
                    placeholder="0.00"
                    className={inputClass("price")}
                  />
                </div>
              </div>

              {/* Image URL */}
              <div className="space-y-1.5">
                <label className="block text-white/40 text-xs font-semibold uppercase tracking-widest pl-1">
                  Image URL
                </label>
                <div className="relative">
                  <Image
                    size={15}
                    className={`absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors duration-200 ${
                      focused === "image" ? "text-amber-400" : "text-white/25"
                    }`}
                  />
                  <input
                    type="text"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    onFocus={() => setFocused("image")}
                    onBlur={() => setFocused("")}
                    placeholder="https://example.com/image.jpg"
                    className={inputClass("image")}
                  />
                </div>
              </div>

              {/* Progress dots */}
              <div className="flex items-center gap-1.5 px-1 pt-1">
                {[title, description, price, image].map((val, i) => (
                  <div
                    key={i}
                    className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                      val ? "bg-amber-400" : "bg-white/[0.08]"
                    }`}
                  />
                ))}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={updating || saved}
                className={`group relative w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all duration-200 active:scale-[0.98] overflow-hidden ${
                  saved
                    ? "bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 cursor-default"
                    : isComplete
                      ? "bg-gradient-to-r from-amber-400 to-orange-500 text-[#0d0d0f] shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 hover:scale-[1.01]"
                      : "bg-white/[0.06] text-white/30 border border-white/[0.08] cursor-not-allowed"
                }`}
              >
                {saved ? (
                  <>
                    <CheckCircle2 size={16} />
                    Saved! Redirecting…
                  </>
                ) : updating ? (
                  <>
                    <span className="w-4 h-4 rounded-full border-2 border-[#0d0d0f]/40 border-t-[#0d0d0f] animate-spin" />
                    Saving changes…
                  </>
                ) : (
                  <>
                    Save Changes
                    <ArrowRight
                      size={15}
                      className="group-hover:translate-x-0.5 transition-transform duration-200"
                    />
                  </>
                )}

                {/* Shimmer */}
                {isComplete && !updating && !saved && (
                  <div className="absolute inset-0">
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
                  </div>
                )}
              </button>
            </form>
          </div>
        </div>

        <p className="text-center text-white/15 text-xs mt-6">
          Only the listing owner can make changes.
        </p>
      </div>

      <style>{`@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&display=swap');`}</style>
    </div>
  );
}
