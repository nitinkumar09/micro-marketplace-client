import { useState } from "react";
import { Link } from "react-router-dom";
import { HeartIcon as HeartOutline } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolid } from "@heroicons/react/24/solid";
import { ArrowUpRight, Store } from "lucide-react";

export default function ProductCard({ product, isFavorite, toggleFavorite }) {
  const [imgError, setImgError] = useState(false);
  const [heartBurst, setHeartBurst] = useState(false);

  const handleFavorite = (e) => {
    e.preventDefault();
    if (!isFavorite) {
      setHeartBurst(true);
      setTimeout(() => setHeartBurst(false), 600);
    }
    toggleFavorite(product._id);
  };

  // Format price with Indian locale
  const formattedPrice = Number(product.price).toLocaleString("en-IN");

  return (
    <div className="group relative flex flex-col bg-[#141418] border border-white/[0.07] rounded-2xl overflow-hidden hover:border-amber-400/30 hover:shadow-[0_8px_40px_rgba(251,191,36,0.10)] transition-all duration-300">
      {/* ── Image Container ── */}
      <div className="relative overflow-hidden h-52 sm:h-56 bg-[#1a1a1f]">
        {!imgError ? (
          <img
            src={product.image}
            alt={product.title}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#1e1e24] to-[#141418]">
            <Store size={36} className="text-white/10" />
          </div>
        )}

        {/* Dark gradient overlay at bottom of image */}
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#141418] to-transparent" />

        {/* ── Favorite Button ── */}
        <button
          onClick={handleFavorite}
          aria-label="Toggle favourite"
          className={`absolute top-3 right-3 flex items-center justify-center w-9 h-9 rounded-xl backdrop-blur-md border transition-all duration-200 active:scale-90 ${
            isFavorite
              ? "bg-red-500/20 border-red-500/40 shadow-[0_0_12px_rgba(239,68,68,0.3)]"
              : "bg-black/30 border-white/10 hover:bg-black/50"
          }`}
        >
          {/* Burst ring animation */}
          {heartBurst && (
            <span className="absolute inset-0 rounded-xl border-2 border-red-400 animate-ping opacity-75" />
          )}
          {isFavorite ? (
            <HeartSolid
              className={`w-5 h-5 text-red-400 transition-transform duration-200 ${
                heartBurst ? "scale-125" : "scale-100"
              }`}
            />
          ) : (
            <HeartOutline className="w-5 h-5 text-white/50 group-hover:text-white/80 transition-colors" />
          )}
        </button>

        {/* Price badge overlaid on image bottom-left */}
        <div className="absolute bottom-3 left-3">
          <span className="inline-flex items-baseline gap-0.5 px-2.5 py-1 rounded-lg bg-amber-400/90 backdrop-blur-sm text-[#0d0d0f] font-black text-sm shadow-lg">
            ₹<span className="text-base">{formattedPrice}</span>
          </span>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="flex flex-col flex-grow p-4 gap-3">
        {/* Title */}
        <h3
          className="text-white/90 font-bold text-base leading-snug line-clamp-2 group-hover:text-white transition-colors"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          {product.title}
        </h3>

        {/* Seller info */}
        {product.user && (
          <div className="flex items-center gap-2 mt-auto">
            <div className="w-5 h-5 rounded-md bg-gradient-to-br from-violet-400 to-indigo-500 flex items-center justify-center flex-shrink-0">
              <span className="text-white text-[9px] font-black uppercase">
                {product.user.name?.charAt(0)}
              </span>
            </div>
            <span className="text-white/35 text-xs font-medium truncate">
              {product.user.name}
            </span>
          </div>
        )}

        {/* CTA Button */}
        <Link
          to={`/product/${product._id}`}
          className="group/btn relative flex items-center justify-between w-full px-4 py-2.5 mt-1 rounded-xl bg-white/[0.06] border border-white/[0.08] hover:bg-amber-400 hover:border-amber-400 hover:shadow-[0_4px_16px_rgba(251,191,36,0.25)] transition-all duration-250 active:scale-[0.98]"
        >
          <span className="text-white/70 group-hover/btn:text-[#0d0d0f] text-sm font-semibold transition-colors">
            View Details
          </span>
          <ArrowUpRight
            size={16}
            className="text-white/30 group-hover/btn:text-[#0d0d0f] group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-all duration-200"
          />
        </Link>
      </div>

      {/* Subtle left accent bar on hover */}
      <div className="absolute left-0 top-8 bottom-8 w-[2px] rounded-full bg-amber-400 scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-center" />

      <style>{`@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&display=swap');`}</style>
    </div>
  );
}
