import React from "react";
import { Link } from "react-router-dom";

interface NavigationLinksProps {
  mobile?: boolean;
  onClick?: () => void;
}

const NavigationLinks: React.FC<NavigationLinksProps> = ({
  mobile,
  onClick,
}) => (
  <div
    className={`${
      mobile ? "flex flex-col gap-6 text-xl p-8" : "flex items-center gap-8"
    } font-mono text-[10px] uppercase tracking-widest text-zinc-500`}
  >
    <Link
      to="/"
      onClick={onClick}
      className="hover:text-zinc-900 dark:hover:text-white focus:outline-none focus:ring-0"
    >
      Index
    </Link>
    <Link
      to="/projects"
      onClick={onClick}
      className="hover:text-zinc-900 dark:hover:text-white focus:outline-none focus:ring-0"
    >
      Projects
    </Link>
    <Link
      to="/resume"
      onClick={onClick}
      className="hover:text-zinc-900 dark:hover:text-white focus:outline-none focus:ring-0"
    >
      Resume
    </Link>
    <Link
      to="/contact"
      onClick={onClick}
      className="hover:text-zinc-900 dark:hover:text-white focus:outline-none focus:ring-0"
    >
      Contact
    </Link>
  </div>
);

export default NavigationLinks;
