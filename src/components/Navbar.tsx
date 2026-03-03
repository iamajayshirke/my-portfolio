import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { Menu, X, Code2, LogOut, User as UserIcon } from "lucide-react";
import { useAppDispatch } from "../store/hooks";
import { logout } from "../store/authSlice";

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const location = useLocation();
  const { username } = useParams(); // Detects if we are on a portfolio page
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    // 1. Clear Redux state & localStorage via the slice
    dispatch(logout());

    // 2. Clear any other SaaS-specific data if needed
    // localStorage.clear(); // Use only if you want to wipe EVERYTHING

    // 3. Redirect to Landing Page
    navigate("/");

    // 4. Optional: Close mobile menu if open
    setIsMobileMenuOpen(false);
  };

  // --- Dynamic Link Logic ---
  const isLanding = location.pathname === "/";
  const isAdmin = location.pathname.startsWith("/admin");
  const isPortfolio = !!username && !isAdmin;

  const getNavLinks = () => {
    if (isAdmin) {
      return [
        // { name: "Dashboard", href: "/admin/manage" },
        // { name: "Settings", href: "/admin/settings" },
      ];
    }
    if (isPortfolio) {
      return [
        { name: "Projects", href: "#projects" },
        { name: "Experience", href: "#experience" },
        { name: "Skills", href: "#tech" },
        { name: "Contact", href: "#contact" },
      ];
    }
    // Default Landing Links
    return [
      // { name: 'Features', href: '#features' },
      // { name: 'Showcase', href: '#showcase' },
    ];
  };

  const navLinks = getNavLinks();

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-slate-950/80 backdrop-blur-md border-b border-slate-800 py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Brand - Dynamic Logo text */}
        <Link
          to="/"
          className="flex items-center gap-2 text-xl font-bold tracking-tighter"
        >
          <div className="bg-blue-600 p-1.5 rounded-lg">
            <Code2 size={20} className="text-white" />
          </div>
          <span className="bg-linear-to-r from-white to-slate-400 bg-clip-text text-transparent">
            {isPortfolio ? `${username}.` : "PortfolioSaaS."}
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) =>
            // Use <a> for hash links on portfolio, <Link> for internal routes
            link.href.startsWith("#") ? (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-slate-400 hover:text-blue-400 transition-colors"
              >
                {link.name}
              </a>
            ) : (
              <Link
                key={link.name}
                to={link.href}
                className="text-sm font-medium text-slate-400 hover:text-blue-400 transition-colors"
              >
                {link.name}
              </Link>
            ),
          )}

          {/* Dynamic Action Button */}
          {isLanding && (
            <Link
              to="/admin-portal-xyz"
              className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold rounded-full transition-all"
            >
              Get Started
            </Link>
          )}

          {isAdmin && (
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-red-400 hover:text-red-300 text-sm font-medium transition-colors"
            >
              <LogOut size={16} /> Logout
            </button>
          )}

          {isPortfolio && (
            <Link
              to="/admin-portal-xyz"
              className="p-2 bg-slate-800 hover:bg-slate-700 rounded-full text-slate-300"
            >
              <UserIcon size={18} />
            </Link>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-slate-300"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu logic... (Similar dynamic map as above) */}
      {/* {isAdmin && (
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-red-400 w-full p-2 hover:bg-red-400/10 rounded-lg"
        >
          <LogOut size={20} /> Logout
        </button>
      )} */}
    </nav>
  );
};

export default Navbar;
