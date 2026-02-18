import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  Menu,
  X,
  ShoppingBag,
  Plus,
  LogOut,
  User,
  Sparkles,
} from "lucide-react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      {/* ── Navbar ── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#0d0d0f]/95 backdrop-blur-xl shadow-[0_1px_0_rgba(255,255,255,0.06)] py-3"
            : "bg-transparent py-5"
        }`}
      >
        {/* Subtle top accent line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber-400/60 to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* ── Logo ── */}
            <Link
              to="/"
              className="flex items-center gap-2.5 group select-none"
            >
              <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 shadow-lg shadow-amber-500/30 group-hover:shadow-amber-500/50 transition-shadow duration-300">
                <ShoppingBag
                  size={18}
                  className="text-white"
                  strokeWidth={2.2}
                />
                <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-emerald-400 rounded-full border-2 border-[#0d0d0f]" />
              </div>
              <div className="flex flex-col leading-none">
                <span
                  className="text-lg font-black tracking-tight text-white"
                  style={{
                    fontFamily: "'Syne', 'DM Sans', sans-serif",
                    letterSpacing: "-0.03em",
                  }}
                >
                  Micro<span className="text-amber-400">Market</span>
                </span>
                <span className="text-[9px] font-semibold text-white/30 tracking-[0.15em] uppercase">
                  Marketplace
                </span>
              </div>
            </Link>

            {/* ── Desktop Menu ── */}
            <div className="hidden md:flex items-center gap-3">
              {user && (
                <Link
                  to="/create"
                  className="group relative flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 text-white text-sm font-bold shadow-md shadow-amber-500/25 hover:shadow-amber-500/45 hover:scale-[1.03] active:scale-[0.98] transition-all duration-200"
                >
                  <Plus size={15} strokeWidth={3} />
                  Sell Product
                  <div className="absolute inset-0 rounded-xl bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                </Link>
              )}

              {user ? (
                <div className="flex items-center gap-3">
                  {/* User pill */}
                  <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/[0.06] border border-white/[0.08]">
                    <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-violet-400 to-indigo-500 flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-[10px] font-black uppercase">
                        {user.name?.charAt(0)}
                      </span>
                    </div>
                    <span className="text-white/80 text-sm font-medium pr-0.5">
                      {user.name}
                    </span>
                  </div>

                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/[0.06] border border-white/[0.08] text-white/60 text-sm font-medium hover:bg-red-500/10 hover:border-red-500/30 hover:text-red-400 active:scale-95 transition-all duration-200"
                  >
                    <LogOut size={14} />
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link
                    to="/login"
                    className="px-4 py-2 rounded-xl text-white/60 text-sm font-medium hover:text-white hover:bg-white/[0.06] transition-all duration-200"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white text-[#0d0d0f] text-sm font-bold hover:bg-amber-400 hover:shadow-lg hover:shadow-amber-400/25 active:scale-95 transition-all duration-200"
                  >
                    <Sparkles size={13} strokeWidth={2.5} />
                    Join Free
                  </Link>
                </div>
              )}
            </div>

            {/* ── Mobile Hamburger ── */}
            <button
              className="md:hidden relative flex items-center justify-center w-10 h-10 rounded-xl bg-white/[0.06] border border-white/[0.08] text-white/70 hover:text-white hover:bg-white/[0.10] transition-all duration-200 active:scale-95"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              <span
                className={`absolute transition-all duration-300 ${isOpen ? "opacity-100 rotate-0" : "opacity-0 rotate-90"}`}
              >
                <X size={18} />
              </span>
              <span
                className={`absolute transition-all duration-300 ${isOpen ? "opacity-0 -rotate-90" : "opacity-100 rotate-0"}`}
              >
                <Menu size={18} />
              </span>
            </button>
          </div>
        </div>

        {/* ── Mobile Dropdown ── */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="mx-4 mt-2 mb-3 rounded-2xl bg-[#141418] border border-white/[0.08] shadow-2xl overflow-hidden">
            <div className="p-3 space-y-1.5">
              {user && (
                <>
                  {/* Mobile user info */}
                  <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.06] mb-1">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-400 to-indigo-500 flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs font-black uppercase">
                        {user.name?.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="text-white text-sm font-semibold leading-none">
                        {user.name}
                      </p>
                      <p className="text-white/40 text-xs mt-0.5">
                        Marketplace Member
                      </p>
                    </div>
                  </div>

                  <Link
                    to="/create"
                    className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 text-white text-sm font-bold shadow-md shadow-amber-500/20 active:scale-[0.98] transition-transform"
                  >
                    <Plus size={15} strokeWidth={3} />
                    Sell a Product
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl bg-white/[0.05] border border-white/[0.07] text-red-400/80 text-sm font-medium hover:bg-red-500/10 hover:text-red-400 transition-colors active:scale-[0.98]"
                  >
                    <LogOut size={14} />
                    Logout
                  </button>
                </>
              )}

              {!user && (
                <>
                  <Link
                    to="/login"
                    className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl bg-white/[0.05] border border-white/[0.07] text-white/70 text-sm font-medium hover:text-white transition-colors"
                  >
                    <User size={14} />
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl bg-white text-[#0d0d0f] text-sm font-bold hover:bg-amber-400 transition-colors active:scale-[0.98]"
                  >
                    <Sparkles size={13} strokeWidth={2.5} />
                    Join Free
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* ── Spacer so page content isn't hidden under fixed nav ── */}
      <div className="h-[68px]" />

      {/* Google Fonts for Syne */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&display=swap');
      `}</style>
    </>
  );
}
