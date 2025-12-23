import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import NavigationLinks from "./NavigationLinks";

interface MobileMenuProps {
  isAuthenticated: boolean;
  handleLogout: () => void;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  isAuthenticated,
  handleLogout,
  onClose,
}) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsClosing(true);
        setTimeout(() => onClose(), 300);
      }
    };

    // Add delay to prevent immediate close on open
    const timeoutId = setTimeout(() => {
      document.addEventListener("mousedown", handleClickOutside);
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const handleBackdropClick = () => {
    setIsClosing(true);
    setTimeout(() => onClose(), 300);
  };

  const handleNavClick = () => {
    setIsClosing(true);
    setTimeout(() => onClose(), 300);
  };

  return (
    <>
      {/* Backdrop */}
      <div
        ref={overlayRef}
        className={`md:hidden fixed inset-0 bg-black/20 dark:bg-black/40 z-40 ${
          isClosing ? "mobile-overlay-exit" : "mobile-overlay-enter"
        }`}
        onClick={handleBackdropClick}
      />
      {/* Menu */}
      <div
        ref={menuRef}
        className={`md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 rounded-t-3xl shadow-2xl overflow-hidden max-h-[80vh] overflow-y-auto z-50 ${
          isClosing ? "mobile-menu-exit" : "mobile-menu-enter"
        }`}
      >
        <div>
          <NavigationLinks mobile onClick={handleNavClick} />
        </div>
        <div className="border-t border-zinc-100 dark:border-zinc-800 p-8 flex flex-col gap-4">
          {isAuthenticated ? (
            <>
              <Link
                to="/admin"
                className="text-sm font-bold uppercase text-indigo-600"
              >
                Admin Panel
              </Link>
              <button
                onClick={handleLogout}
                className="text-left text-sm font-bold uppercase text-red-500"
              >
                Logout Session
              </button>
            </>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default MobileMenu;
