import { useEffect, useState } from "react";
import API from "../api/axios";
import ProductCard from "../components/ProductCard";
import { useAuth } from "../context/AuthContext";
import { Search, ChevronLeft, ChevronRight, PackageSearch } from "lucide-react";

export default function Products() {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch products
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data } = await API.get(
        `/products?search=${search}&page=${page}&limit=6`,
      );
      setProducts(data.products);
      setPages(data.pages);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch user favorites
  const fetchFavorites = async () => {
    if (!user) return;
    try {
      const { data } = await API.get("/favorites");
      setFavorites(data.favorites.map((f) => f._id));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchFavorites();
  }, [search, page, user]);

  // Toggle favorite
  const toggleFavorite = async (productId) => {
    try {
      if (!user) return alert("Login to favorite products");
      if (favorites.includes(productId)) {
        await API.delete(`/favorites/${productId}`);
        setFavorites(favorites.filter((f) => f !== productId));
      } else {
        await API.post(`/favorites/${productId}`);
        setFavorites([...favorites, productId]);
      }
    } catch (err) {
      console.error("Failed to toggle favorite", err);
    }
  };

  return (
    <div className="min-h-screen bg-[#0d0d0f] py-10 px-4">
      {/* Ambient blobs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-56 bg-amber-500/4 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-0 w-80 h-80 bg-violet-500/4 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* ── Page header ── */}
        <div className="mb-10">
          <p className="text-amber-400 text-xs font-bold uppercase tracking-[0.2em] mb-2">
            Browse Listings
          </p>
          <h1
            className="text-3xl sm:text-4xl font-black text-white tracking-tight"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Marketplace
          </h1>
          <p className="text-white/30 text-sm mt-1">
            Discover products from sellers around you
          </p>
        </div>

        {/* ── Search bar ── */}
        <div className="relative mb-8 max-w-xl">
          <Search
            size={16}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/25 pointer-events-none"
          />
          <input
            type="text"
            placeholder="Search products…"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="w-full bg-[#141418] border border-white/[0.08] rounded-xl pl-11 pr-4 py-3 text-white/80 placeholder-white/25 text-sm outline-none focus:border-amber-400/50 focus:bg-white/[0.06] focus:shadow-[0_0_0_3px_rgba(251,191,36,0.08)] transition-all duration-200"
          />
        </div>

        {/* ── Products grid ── */}
        {loading ? (
          // Skeleton grid
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="bg-[#141418] border border-white/[0.05] rounded-2xl overflow-hidden animate-pulse"
              >
                <div className="h-52 bg-white/[0.04]" />
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-white/[0.05] rounded-lg w-3/4" />
                  <div className="h-3 bg-white/[0.04] rounded-lg w-1/2" />
                  <div className="h-9 bg-white/[0.04] rounded-xl mt-2" />
                </div>
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          // Empty state
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-16 h-16 rounded-2xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center mb-5">
              <PackageSearch size={28} className="text-white/15" />
            </div>
            <h3
              className="text-white/50 text-lg font-bold mb-1"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              No products found
            </h3>
            <p className="text-white/20 text-sm">
              Try a different search term or check back later.
            </p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
            {products.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                user={user}
                isFavorite={favorites.includes(product._id)}
                toggleFavorite={toggleFavorite}
              />
            ))}
          </div>
        )}

        {/* ── Pagination ── */}
        {pages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-12 flex-wrap">
            {/* Prev */}
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1}
              className="flex items-center justify-center w-9 h-9 rounded-xl bg-[#141418] border border-white/[0.08] text-white/40 hover:text-white/80 hover:border-white/[0.18] disabled:opacity-25 disabled:cursor-not-allowed active:scale-95 transition-all duration-150"
            >
              <ChevronLeft size={16} />
            </button>

            {/* Page numbers */}
            {Array.from({ length: pages }, (_, i) => i + 1).map((num) => (
              <button
                key={num}
                onClick={() => setPage(num)}
                className={`flex items-center justify-center w-9 h-9 rounded-xl text-sm font-bold transition-all duration-150 active:scale-95 ${
                  page === num
                    ? "bg-amber-400 text-[#0d0d0f] shadow-lg shadow-amber-400/25"
                    : "bg-[#141418] border border-white/[0.08] text-white/35 hover:text-white/70 hover:border-white/[0.18]"
                }`}
              >
                {num}
              </button>
            ))}

            {/* Next */}
            <button
              onClick={() => setPage((p) => Math.min(p + 1, pages))}
              disabled={page === pages}
              className="flex items-center justify-center w-9 h-9 rounded-xl bg-[#141418] border border-white/[0.08] text-white/40 hover:text-white/80 hover:border-white/[0.18] disabled:opacity-25 disabled:cursor-not-allowed active:scale-95 transition-all duration-150"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        )}

        {/* Page label */}
        {pages > 1 && (
          <p className="text-center text-white/20 text-xs mt-3">
            Page {page} of {pages}
          </p>
        )}
      </div>

      <style>{`@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&display=swap');`}</style>
    </div>
  );
}
