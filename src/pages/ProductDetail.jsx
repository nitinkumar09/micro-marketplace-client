import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import API from "../api/axios";
import {
  ArrowLeft,
  Pencil,
  Trash2,
  Store,
  Tag,
  AlertTriangle,
  ShoppingCart,
} from "lucide-react";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [imgErr, setImgErr] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await API.get(`/products/${id}`);
        setProduct(data.product);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await API.delete(`/products/${id}`);
      navigate("/");
    } catch (error) {
      console.log(error);
      setDeleting(false);
    }
  };

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

  // ── Not found state ──
  if (!product) {
    return (
      <div className="min-h-screen bg-[#0d0d0f] flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-white/20 text-6xl font-black mb-4">404</p>
          <p className="text-white/40 text-lg mb-6">Product not found</p>
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

  const isOwner =
    user &&
    (product?.user?._id?.toString() === user._id?.toString() ||
      product?.user?.toString() === user._id?.toString());

  console.log("Logged in user:", user);
  console.log("Product owner:", product?.user);

  const formattedPrice = Number(product.price).toLocaleString("en-IN");

  return (
    <>
      <div className="min-h-screen bg-[#0d0d0f] px-4 py-10">
        {/* Ambient blobs */}
        <div className="pointer-events-none fixed inset-0 overflow-hidden">
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-64 bg-amber-500/4 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-72 h-72 bg-violet-500/4 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* ── Back button ── */}
          <button
            onClick={() => navigate("/")}
            className="group flex items-center gap-2 text-white/35 hover:text-white/70 text-sm font-medium mb-8 transition-colors"
          >
            <ArrowLeft
              size={16}
              className="group-hover:-translate-x-0.5 transition-transform duration-200"
            />
            Back to Marketplace
          </button>

          {/* ── Main card ── */}
          <div className="bg-[#141418] border border-white/[0.07] rounded-2xl overflow-hidden shadow-2xl">
            <div className="grid md:grid-cols-2 gap-0">
              {/* ── Left: Image ── */}
              <div className="relative h-72 md:h-full min-h-[320px] bg-[#1a1a1f] overflow-hidden">
                {!imgErr ? (
                  <img
                    src={product.image}
                    alt={product.title}
                    onError={() => setImgErr(true)}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Store size={48} className="text-white/10" />
                  </div>
                )}
                {/* Image overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#141418]/60 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-[#141418]/40" />

                {/* Price badge on image */}
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-baseline gap-1 px-3 py-1.5 rounded-xl bg-amber-400/90 backdrop-blur-sm text-[#0d0d0f] font-black text-lg shadow-lg">
                    ₹{formattedPrice}
                  </span>
                </div>
              </div>

              {/* ── Right: Details ── */}
              <div className="p-7 sm:p-9 flex flex-col">
                {/* Category pill (decorative) */}
                <div className="inline-flex items-center gap-1.5 self-start px-2.5 py-1 rounded-lg bg-white/[0.05] border border-white/[0.07] mb-5">
                  <Tag size={11} className="text-amber-400" />
                  <span className="text-white/40 text-xs font-semibold uppercase tracking-wider">
                    Marketplace Listing
                  </span>
                </div>

                {/* Title */}
                <h1
                  className="text-2xl sm:text-3xl font-black text-white leading-tight mb-4"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  {product.title}
                </h1>

                {/* Description */}
                <p className="text-white/45 text-sm sm:text-base leading-relaxed mb-6">
                  {product.description}
                </p>

                {/* Seller info */}
                {product.user && (
                  <div className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.04] border border-white/[0.06] mb-6">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-400 to-indigo-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-violet-500/20">
                      <span className="text-white text-sm font-black uppercase">
                        {product.user?.name?.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="text-white/25 text-xs uppercase tracking-widest font-semibold">
                        Sold by
                      </p>
                      <p className="text-white/80 text-sm font-semibold mt-0.5">
                        {product.user?.name || "Anonymous"}
                      </p>
                    </div>
                  </div>
                )}

                {/* Price (desktop repeat, mobile already shown on image) */}
                <div className="flex items-baseline gap-1 mb-6 md:hidden">
                  <span className="text-white/30 text-sm">Price</span>
                  <span className="text-amber-400 font-black text-2xl ml-2">
                    ₹{formattedPrice}
                  </span>
                </div>

                {/* CTA — non-owner */}
                {!isOwner && (
                  <button className="group flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 text-[#0d0d0f] font-bold text-sm shadow-lg shadow-amber-500/20 hover:shadow-amber-500/35 hover:scale-[1.01] active:scale-[0.98] transition-all duration-200 overflow-hidden relative mt-auto">
                    <ShoppingCart size={16} />
                    Contact Seller
                    <div className="absolute inset-0">
                      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
                    </div>
                  </button>
                )}

                {/* Owner controls */}
                {isOwner && (
                  <div className="flex gap-3 mt-auto pt-2">
                    <button
                      onClick={() => navigate(`/edit/${product._id}`)}
                      className="group flex items-center justify-center gap-2 flex-1 py-3 rounded-xl bg-white/[0.06] border border-white/[0.08] text-white/60 text-sm font-semibold hover:bg-amber-400/10 hover:border-amber-400/30 hover:text-amber-400 active:scale-[0.97] transition-all duration-200"
                    >
                      <Pencil size={14} />
                      Edit
                    </button>
                    <button
                      onClick={() => setDeleteModal(true)}
                      className="group flex items-center justify-center gap-2 flex-1 py-3 rounded-xl bg-white/[0.06] border border-white/[0.08] text-white/60 text-sm font-semibold hover:bg-red-500/10 hover:border-red-500/30 hover:text-red-400 active:scale-[0.97] transition-all duration-200"
                    >
                      <Trash2 size={14} />
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Delete Confirmation Modal ── */}
      {deleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => !deleting && setDeleteModal(false)}
          />

          {/* Modal card */}
          <div className="relative bg-[#141418] border border-white/[0.08] rounded-2xl p-7 w-full max-w-sm shadow-2xl">
            <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/20 mx-auto mb-5">
              <AlertTriangle size={22} className="text-red-400" />
            </div>
            <h3
              className="text-white font-black text-center text-xl mb-2"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Delete listing?
            </h3>
            <p className="text-white/35 text-sm text-center mb-7 leading-relaxed">
              This will permanently remove{" "}
              <span className="text-white/60 font-semibold">
                {product.title}
              </span>{" "}
              from the marketplace. This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteModal(false)}
                disabled={deleting}
                className="flex-1 py-2.5 rounded-xl bg-white/[0.05] border border-white/[0.07] text-white/50 text-sm font-semibold hover:bg-white/[0.09] transition-colors disabled:opacity-40"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="flex-1 py-2.5 rounded-xl bg-red-500/90 text-white text-sm font-bold hover:bg-red-500 active:scale-[0.97] transition-all disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {deleting ? (
                  <>
                    <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                    Deleting…
                  </>
                ) : (
                  <>
                    <Trash2 size={14} />
                    Delete
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&display=swap');`}</style>
    </>
  );
}
