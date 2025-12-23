import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavigationLinks from "./NavigationLinks";

interface HeaderProps {
  theme: "light" | "dark";
  toggleTheme: () => void;
  isAuthenticated: boolean;
  handleLogout: () => void;
  isMobileMenuOpen: boolean;
  onToggleMobileMenu: () => void;
}

const Header: React.FC<HeaderProps> = ({
  theme,
  toggleTheme,
  isAuthenticated,
  handleLogout,
  isMobileMenuOpen,
  onToggleMobileMenu,
}) => {
  const navigate = useNavigate();
  const [clickCount, setClickCount] = useState(0);
  const clickTimer = useRef<NodeJS.Timeout | null>(null);

  // Hidden triple-click on logo to access admin/login
  const handleLogoClick = (e: React.MouseEvent) => {
    const newCount = clickCount + 1;
    setClickCount(newCount);

    if (clickTimer.current) {
      clearTimeout(clickTimer.current);
    }

    if (newCount >= 3) {
      // Triple click detected - navigate to admin or login
      e.preventDefault();
      navigate(isAuthenticated ? "/admin" : "/login");
      setClickCount(0);
    } else {
      // Reset counter after 1 second
      clickTimer.current = setTimeout(() => {
        setClickCount(0);
      }, 1000);
    }
  };

  return (
    <header className="fixed top-4 left-0 right-0 z-100 px-4 md:px-6">
      <nav className="max-w-350 mx-auto flex items-center justify-between h-14 bg-white/70 dark:bg-black/40 backdrop-blur-xl border border-zinc-200 dark:border-zinc-800 rounded-full px-4 md:px-6 shadow-sm dark:shadow-none">
        <Link
          to="/"
          className="flex items-center gap-2 focus:outline-none focus:ring-0"
          onClick={handleLogoClick}
        >
          <span className="font-black text-zinc-900 dark:text-white tracking-tighter uppercase">
            Vortex<span className="text-indigo-600">.</span>
          </span>
        </Link>

        <div className="flex items-center gap-4 md:gap-8">
          <div className="hidden md:flex">
            <NavigationLinks />
          </div>

          <div className="h-4 w-px bg-zinc-200 dark:bg-zinc-800 hidden md:block"></div>

          <div className="flex items-center gap-2 md:gap-4">
            <button
              onClick={toggleTheme}
              className="w-8 h-8 flex items-center justify-center rounded-full border border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:text-indigo-500 cursor-pointer focus:outline-none focus:ring-0"
              aria-label="Toggle Theme"
            >
              <i
                className={`fa-solid ${
                  theme === "light" ? "fa-moon" : "fa-sun"
                }`}
              ></i>
            </button>

            {/* {isAuthenticated ? (
              <div className="hidden md:flex items-center gap-4">
                <Link
                  to="/admin"
                  className="text-[10px] font-bold uppercase text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-[10px] font-bold uppercase text-zinc-500 hover:text-red-500"
                >
                  Esc
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="hidden md:block text-[10px] font-bold uppercase text-zinc-500 hover:text-zinc-900 dark:hover:text-white border border-zinc-200 dark:border-zinc-800 px-3 py-1 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800"
              >
                Login
              </Link>
            )} */}

            {/* Mobile Menu Toggle */}
            <button
              onClick={onToggleMobileMenu}
              className="md:hidden w-8 h-8 flex items-center justify-center text-zinc-500 cursor-pointer focus:outline-none focus:ring-0"
            >
              <i
                className={`fa-solid ${
                  isMobileMenuOpen ? "fa-xmark" : "fa-bars"
                }`}
              ></i>
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
