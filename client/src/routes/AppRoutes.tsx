import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import PublicPortfolio from "../pages/PublicPortfolio";
import ProjectsPage from "../pages/ProjectsPage";
import ContactPage from "../pages/ContactPage";
import AdminDashboard from "../pages/AdminDashboard";
import Login from "../pages/Login";
import { PortfolioData } from "../lib/types";
import ResumePage from "@/pages/ResumePage";

interface AppRoutesProps {
  data: PortfolioData;
  onUpdateData: (data: PortfolioData) => void;
  isAuthenticated: boolean;
  onLogin: (credentials: {
    email: string;
    password: string;
  }) => Promise<boolean>;
  onLogout: () => void;
}

const AppRoutes: React.FC<AppRoutesProps> = ({
  data,
  onUpdateData,
  isAuthenticated,
  onLogin,
  onLogout,
}) => {
  return (
    <Routes>
      <Route path="/" element={<PublicPortfolio data={data} />} />
      <Route
        path="/projects"
        element={<ProjectsPage data={data} onUpdate={onUpdateData} />}
      />
      <Route path="/contact" element={<ContactPage data={data} />} />
      <Route path="/resume" element={<ResumePage data={data} />} />
      <Route
        path="/login"
        element={
          isAuthenticated ? (
            <Navigate to="/admin" replace />
          ) : (
            <Login onLogin={onLogin} />
          )
        }
      />
      <Route
        path="/admin/*"
        element={
          isAuthenticated ? (
            <AdminDashboard
              data={data}
              onUpdate={onUpdateData}
              onLogout={onLogout}
            />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
    </Routes>
  );
};

export default AppRoutes;
