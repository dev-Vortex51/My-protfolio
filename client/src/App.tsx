import React, { useState, useEffect } from "react";
import { BrowserRouter, useLocation, useNavigate } from "react-router-dom";
import Preloader from "./components/Preloader";
import Header from "./components/Header";
import MobileMenu from "./components/MobileMenu";
import AppRoutes from "./routes/AppRoutes";
import { PortfolioData } from "./lib/types";
import { useRevealOnScroll } from "./hooks/useRevealOnScroll";
import {
  loginRequest,
  getPortfolio,
  listProjects,
  listMessages,
} from "./services/api";

const EMPTY_DATA: PortfolioData = {
  name: "",
  role: "",
  bio: "",
  headline: "",
  tagline: "",
  location: "",
  email: "",
  projects: [],
  experiences: [],
  skills: [],
  languages: [],
  socialLinks: {},
  messages: [],
  testimonials: [],
  stats: {
    uptime: "0%",
    commits: 0,
    visitors: 0,
    lighthouse: 0,
  },
};

const AppContent: React.FC = () => {
  const [data, setData] = useState<PortfolioData>(EMPTY_DATA);

  const [theme, setTheme] = useState<"light" | "dark">(() => {
    return (localStorage.getItem("theme") as "light" | "dark") || "dark";
  });

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return Boolean(sessionStorage.getItem("access_token"));
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Load initial data from backend
  useEffect(() => {
    async function loadData() {
      try {
        const [portfolio, projects] = await Promise.all([
          getPortfolio(),
          listProjects(),
        ]);

        setData((prev) => ({
          ...prev,
          name: portfolio.name,
          role: portfolio.role,
          bio: portfolio.bio,
          headline: portfolio.headline,
          tagline: portfolio.tagline,
          location: portfolio.location,
          email: portfolio.email,
          stats: portfolio.stats,
          experiences: portfolio.experiences ?? [],
          skills: portfolio.skills ?? [],
          testimonials: portfolio.testimonials ?? [],
          projects,
        }));
      } catch (error) {
        console.error("Failed to load data:", error);
      }
    }
    loadData();
  }, []);

  // Load messages when authenticated
  useEffect(() => {
    async function loadMessages() {
      if (isAuthenticated) {
        try {
          const messages = await listMessages();
          setData((prev) => ({ ...prev, messages }));
        } catch (error) {
          console.error("Failed to load messages:", error);
        }
      } else {
        setData((prev) => ({ ...prev, messages: [] }));
      }
    }
    loadMessages();
  }, [isAuthenticated]);

  useEffect(() => {
    const root = window.document.documentElement;

    // Enable transitions while changing theme
    root.classList.add("theme-transitioning");

    root.classList.remove("light", "dark");
    root.classList.add(theme);
    localStorage.setItem("theme", theme);

    // Disable transitions after change completes
    const timer = setTimeout(() => {
      root.classList.remove("theme-transitioning");
    }, 100);

    return () => clearTimeout(timer);
  }, [theme]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // Hidden keyboard shortcut: Ctrl+Shift+L to access admin/login
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === "L") {
        e.preventDefault();
        navigate(isAuthenticated ? "/admin" : "/login");
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [isAuthenticated, navigate]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const handleLogin = async (credentials: {
    email: string;
    password: string;
  }): Promise<boolean> => {
    try {
      const res = await loginRequest(
        credentials.email.trim(),
        credentials.password
      );
      sessionStorage.setItem("access_token", res.accessToken);
      sessionStorage.setItem("refresh_token", res.refreshToken);
      sessionStorage.setItem("user_email", res.user.email);
      setIsAuthenticated(true);
      return true;
    } catch (err) {
      console.error("Login failed", err);
      setIsAuthenticated(false);
      return false;
    }
  };

  const handleLogout = (): void => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("access_token");
    sessionStorage.removeItem("refresh_token");
    sessionStorage.removeItem("user_email");
    navigate("/", { replace: true });
  };
  return (
    <>
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      <div className="min-h-screen flex flex-col selection:bg-indigo-500 selection:text-white bg-white dark:bg-[#09090b] text-zinc-900 dark:text-zinc-50">
        <Header
          theme={theme}
          toggleTheme={toggleTheme}
          isAuthenticated={isAuthenticated}
          handleLogout={handleLogout}
          isMobileMenuOpen={isMobileMenuOpen}
          onToggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        />

        {isMobileMenuOpen && (
          <MobileMenu
            isAuthenticated={isAuthenticated}
            handleLogout={handleLogout}
            onClose={() => setIsMobileMenuOpen(false)}
          />
        )}

        <main className="grow">
          <AppRoutes
            data={data}
            onUpdateData={setData}
            isAuthenticated={isAuthenticated}
            onLogin={handleLogin}
            onLogout={handleLogout}
          />
        </main>
      </div>
    </>
  );
};

const App: React.FC = () => {
  useRevealOnScroll();
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

export default App;
