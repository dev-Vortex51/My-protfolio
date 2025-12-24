import type {
  Project,
  Message,
  Experience,
  Skill,
  Testimonial,
  Language,
  SocialLinks,
} from "../lib/types";

export const API_BASE_URL =
  import.meta.env.VITE_API_URL ?? "http://localhost:5000/api";

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
    name: string;
    role: "admin" | "user";
    createdAt: string;
  };
}

export interface PortfolioInfo {
  id: string;
  name: string;
  role: string;
  bio: string;
  headline?: string;
  tagline?: string;
  location: string;
  email: string;
  stats: {
    uptime: string;
    commits: number;
    visitors: number;
    lighthouse: number;
  };
  experiences: Experience[];
  skills: Skill[];
  languages: Language[];
  socialLinks: SocialLinks;
  testimonials: Testimonial[];
}

// Helper to get auth headers
function getAuthHeaders(): HeadersInit {
  const token = sessionStorage.getItem("access_token");
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

// ===== AUTH =====
export async function loginRequest(
  email: string,
  password: string
): Promise<LoginResponse> {
  const res = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    let message = "Login failed";
    try {
      const body = await res.json();
      if (body?.error) message = body.error;
    } catch {
      // ignore JSON parse errors
    }
    throw new Error(message);
  }

  return res.json();
}

// ===== PORTFOLIO =====
export async function getPortfolio(): Promise<PortfolioInfo> {
  const res = await fetch(`${API_BASE_URL}/portfolio`, {
    headers: getAuthHeaders(),
  });

  if (!res.ok) {
    throw new Error("Failed to fetch portfolio");
  }

  return res.json();
}

export async function updatePortfolio(
  data: Partial<PortfolioInfo>
): Promise<PortfolioInfo> {
  const res = await fetch(`${API_BASE_URL}/portfolio`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to update portfolio");
  }

  return res.json();
}

// ===== PROJECTS =====
export async function listProjects(): Promise<Project[]> {
  const res = await fetch(`${API_BASE_URL}/projects`, {
    headers: getAuthHeaders(),
  });

  if (!res.ok) {
    throw new Error("Failed to fetch projects");
  }

  return res.json();
}

export async function createProject(
  data: Omit<Project, "id">
): Promise<Project> {
  const res = await fetch(`${API_BASE_URL}/projects`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to create project");
  }

  return res.json();
}

export async function updateProject(
  id: string,
  data: Partial<Project>
): Promise<Project> {
  const res = await fetch(`${API_BASE_URL}/projects/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to update project");
  }

  return res.json();
}

export async function deleteProject(id: string): Promise<void> {
  const res = await fetch(`${API_BASE_URL}/projects/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  if (!res.ok) {
    throw new Error("Failed to delete project");
  }
}

// ===== PROJECT INTERACTIONS =====
export async function likeProject(id: string): Promise<Project> {
  const res = await fetch(`${API_BASE_URL}/projects/${id}/like`, {
    method: "POST",
    headers: getAuthHeaders(),
  });

  if (!res.ok) {
    throw new Error("Failed to like project");
  }

  return res.json();
}

export async function addCommentToProject(
  id: string,
  author: string,
  text: string
): Promise<Project> {
  const res = await fetch(`${API_BASE_URL}/projects/${id}/comments`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({ author, text }),
  });

  if (!res.ok) {
    throw new Error("Failed to add comment");
  }

  return res.json();
}

// ===== CONTACT / MESSAGES =====
export async function sendContactMessage(data: {
  sender: string;
  email: string;
  subject: string;
  body: string;
  priority?: "Low" | "Normal" | "Urgent";
}): Promise<Message> {
  const res = await fetch(`${API_BASE_URL}/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to send message");
  }

  return res.json();
}

export async function listMessages(): Promise<Message[]> {
  const res = await fetch(`${API_BASE_URL}/contact`, {
    headers: getAuthHeaders(),
  });

  if (!res.ok) {
    throw new Error("Failed to fetch messages");
  }

  return res.json();
}

export async function markMessageRead(id: string): Promise<Message> {
  const res = await fetch(`${API_BASE_URL}/contact/${id}/read`, {
    method: "POST",
    headers: getAuthHeaders(),
  });

  if (!res.ok) {
    throw new Error("Failed to mark message as read");
  }

  return res.json();
}

export async function markAllMessagesRead(): Promise<Message[]> {
  const res = await fetch(`${API_BASE_URL}/contact/mark-all-read`, {
    method: "POST",
    headers: getAuthHeaders(),
  });

  if (!res.ok) {
    throw new Error("Failed to mark all messages as read");
  }

  return res.json();
}

export async function deleteMessage(id: string): Promise<void> {
  const res = await fetch(`${API_BASE_URL}/contact/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  if (!res.ok) {
    throw new Error("Failed to delete message");
  }
}
