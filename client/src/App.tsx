import React, { useState, useEffect } from "react";
import { BrowserRouter, useLocation } from "react-router-dom";
import Preloader from "./components/Preloader";
import Header from "./components/Header";
import MobileMenu from "./components/MobileMenu";
import AppRoutes from "./routes/AppRoutes";
import { PortfolioData } from "./lib/types";
import { INITIAL_DATA } from "./constants";
import { useRevealOnScroll } from "./hooks/useRevealOnScroll";
import {
  loginRequest,
  getPortfolio,
  listProjects,
  listMessages,
} from "./services/api";

const AppContent: React.FC = () => {
  const [data, setData] = useState<PortfolioData>(INITIAL_DATA);

  const [theme, setTheme] = useState<"light" | "dark">(() => {
    return (localStorage.getItem("theme") as "light" | "dark") || "dark";
  });

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return Boolean(sessionStorage.getItem("access_token"));
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Load initial data from backend
  useEffect(() => {
    async function loadData() {
      try {
        const [portfolio, projects, messages] = await Promise.all([
          getPortfolio(),
          listProjects(),
          isAuthenticated ? listMessages() : Promise.resolve([]),
        ]);

        setData((prev) => ({
          ...prev,
          name: portfolio.name,
          role: portfolio.role,
          bio: portfolio.bio,
          location: portfolio.location,
          email: portfolio.email,
          stats: portfolio.stats,
          projects,
          messages,
        }));
      } catch (error) {
        console.error("Failed to load data:", error);
      }
    }
    loadData();
  }, [isAuthenticated]);

  useEffect(() => {
    localStorage.setItem("portfolio_data", JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

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
  };
  return (
    <>
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      <div className="min-h-screen flex flex-col selection:bg-indigo-500 selection:text-white bg-white dark:bg-[#09090b] text-zinc-900 dark:text-zinc-50 transition-colors duration-300">
        <div className="fixed top-0 left-0 right-0 h-1 bg-zinc-100 dark:bg-zinc-900 z-110">
          <div
            className="h-full bg-indigo-600 animate-[progress_2s_ease-in-out_infinite]"
            style={{ width: "30%" }}
          ></div>
        </div>

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
