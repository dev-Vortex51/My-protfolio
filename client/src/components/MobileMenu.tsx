import React from "react";
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
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 rounded-t-3xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-4 duration-300 max-h-[80vh] overflow-y-auto z-50">
      <div>
        <NavigationLinks mobile onClick={onClose} />
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
  );
};

export default MobileMenu;
