import { useState } from "react";
import {
  PortfolioData,
  Project,
  Experience,
  Skill,
  Testimonial,
  Language,
} from "../lib/types";
import {
  createProject,
  updateProject,
  deleteProject,
  updatePortfolio,
  markMessageRead,
  markAllMessagesRead,
} from "../services/api";
import { refineText, suggestTags } from "../services/gemini";

export function useAdminEditor(
  initialData: PortfolioData,
  onUpdate: (data: PortfolioData) => void
) {
  const [localData, setLocalData] = useState<PortfolioData>(initialData);
  const [isRefining, setIsRefining] = useState<string | null>(null);
  const [isSavingIdentity, setIsSavingIdentity] = useState<boolean>(false);

  const mergePortfolio = (
    current: PortfolioData,
    updated: Partial<PortfolioData>
  ): PortfolioData => ({
    ...current,
    ...updated,
    stats: updated.stats ?? current.stats,
    experiences: updated.experiences ?? current.experiences,
    skills: updated.skills ?? current.skills,
    languages: updated.languages ?? current.languages,
    socialLinks: updated.socialLinks ?? current.socialLinks,
    testimonials: updated.testimonials ?? current.testimonials,
  });

  const persistPortfolio = async (patch: Partial<PortfolioData>) => {
    const updated = await updatePortfolio(patch);
    onUpdate(mergePortfolio(localData, updated));
  };

  // ===== FIELD UPDATES (Local State Only) =====
  const handleUpdateField = (field: keyof PortfolioData, value: any) => {
    setLocalData({ ...localData, [field]: value });
  };

  const handleUpdateStat = (statField: string, value: any) => {
    const newStats = { ...localData.stats, [statField]: value };
    setLocalData({ ...localData, stats: newStats });
  };

  const handleUpdateSocialLink = (platform: string, value: string) => {
    const updated = { ...(localData.socialLinks || {}), [platform]: value };
    setLocalData({ ...localData, socialLinks: updated });
  };

  // ===== PERSIST TO SERVER =====
  const handleSaveIdentity = async () => {
    setIsSavingIdentity(true);
    try {
      await persistPortfolio({
        name: localData.name,
        role: localData.role,
        bio: localData.bio,
        headline: localData.headline,
        tagline: localData.tagline,
        location: localData.location,
        email: localData.email,
        languages: localData.languages,
        socialLinks: localData.socialLinks,
        stats: localData.stats,
      });
      onUpdate(localData);
    } catch {
      alert("Failed to update profile");
    } finally {
      setIsSavingIdentity(false);
    }
  };

  // ===== PROJECTS =====
  const handleAddProject = async () => {
    const newProj: Omit<Project, "id"> = {
      title: "NEW_REPOSITORY",
      description: "Initialize module description...",
      tags: ["TypeScript"],
      link: "#",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
      featured: false,
      status: "beta",
      version: "v0.0.1",
      likes: 0,
      comments: [],
    };
    try {
      const created = await createProject(newProj);
      onUpdate({ ...localData, projects: [created, ...localData.projects] });
    } catch {
      alert("Failed to create project");
    }
  };

  const handleSaveProject = async (proj: Project) => {
    try {
      const updated = await updateProject(proj.id, proj);
      const newProjects = localData.projects.map((p) =>
        p.id === proj.id ? updated : p
      );
      onUpdate({ ...localData, projects: newProjects });
    } catch {
      alert("Failed to update project");
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (confirm("Terminate repository record?")) {
      try {
        await deleteProject(id);
        onUpdate({
          ...localData,
          projects: localData.projects.filter((p) => p.id !== id),
        });
      } catch {
        alert("Failed to delete project");
      }
    }
  };

  const handleAiSuggestTags = async (description: string) => {
    setIsRefining("tags");
    const suggested = await suggestTags(description);
    setIsRefining(null);
    return suggested;
  };

  // ===== EXPERIENCES =====
  const handleAddExperience = () => {
    const newExp: Experience = {
      id: Math.random().toString(36).substr(2, 9),
      company: "NEW_ORGANIZATION",
      role: "ROLE_NAME",
      period: "2024 - PRESENT",
      description: "Operational duties description...",
    };
    setLocalData({
      ...localData,
      experiences: [newExp, ...localData.experiences],
    });
    return newExp;
  };

  const handleSaveExperience = (exp: Experience) => {
    const updated = localData.experiences.map((e) =>
      e.id === exp.id ? exp : e
    );
    setLocalData({ ...localData, experiences: updated });
  };

  const handleDeleteExperience = (id: string) => {
    if (confirm("Purge historical record?")) {
      const updated = localData.experiences.filter((e) => e.id !== id);
      setLocalData({ ...localData, experiences: updated });
    }
  };

  // ===== SKILLS =====
  const handleAddSkill = () => {
    const newSkill: Skill = {
      id: crypto.randomUUID(),
      name: "NEW_SKILL",
      level: 50,
      category: "other",
      pid: Math.floor(Math.random() * 9999)
        .toString()
        .padStart(4, "0"),
    };
    setLocalData({ ...localData, skills: [newSkill, ...localData.skills] });
    return newSkill;
  };

  const handleUpdateSkill = (id: string, updates: Partial<Skill>) => {
    const next = localData.skills.map((skill) =>
      skill.id === id ? { ...skill, ...updates } : skill
    );
    setLocalData({ ...localData, skills: next });
  };

  const handleDeleteSkill = (id: string) => {
    if (confirm("Are you sure you want to delete this skill?")) {
      const next = localData.skills.filter((skill) => skill.id !== id);
      setLocalData({ ...localData, skills: next });
    }
  };

  // ===== TESTIMONIALS =====
  const handleAddTestimonial = () => {
    const newTestimonial: Testimonial = {
      id: crypto.randomUUID(),
      name: "Client Name",
      role: "Role",
      company: "Company",
      content: "Testimonial content...",
      verified: false,
    };
    return newTestimonial;
  };

  const handleSaveTestimonial = (testimonial: Testimonial) => {
    const isNew = !localData.testimonials.find((t) => t.id === testimonial.id);
    const updated = isNew
      ? [...localData.testimonials, testimonial]
      : localData.testimonials.map((t) =>
          t.id === testimonial.id ? testimonial : t
        );
    setLocalData({ ...localData, testimonials: updated });
  };

  const handleDeleteTestimonial = (id: string) => {
    if (confirm("Are you sure you want to delete this testimonial?")) {
      const updated = localData.testimonials.filter((t) => t.id !== id);
      setLocalData({ ...localData, testimonials: updated });
    }
  };

  // ===== LANGUAGES =====
  const handleAddLanguage = () => {
    const newLang: Language = {
      id: crypto.randomUUID(),
      name: "New Language",
      proficiency: "Limited",
    };
    setLocalData({
      ...localData,
      languages: [newLang, ...localData.languages],
    });
    return newLang;
  };

  const handleUpdateLanguage = (id: string, updates: Partial<Language>) => {
    const next = localData.languages.map((lang) =>
      lang.id === id ? { ...lang, ...updates } : lang
    );
    setLocalData({ ...localData, languages: next });
  };

  const handleDeleteLanguage = (id: string) => {
    const next = localData.languages.filter((lang) => lang.id !== id);
    setLocalData({ ...localData, languages: next });
  };

  // ===== MESSAGES =====
  const handleReadMessage = async (id: string) => {
    const msg = localData.messages.find((m) => m.id === id);
    if (msg && !msg.read) {
      try {
        await markMessageRead(id);
        const updated = localData.messages.map((m) =>
          m.id === id ? { ...m, read: true } : m
        );
        setLocalData({ ...localData, messages: updated });
      } catch {}
    }
    return msg;
  };

  const handleDeleteMessage = (id: string) => {
    const updated = localData.messages.filter((m) => m.id !== id);
    setLocalData({ ...localData, messages: updated });
  };

  const handleMarkAllRead = async () => {
    try {
      const updated = await markAllMessagesRead();
      setLocalData({ ...localData, messages: updated });
      onUpdate({ ...localData, messages: updated });
    } catch {
      alert("Failed to mark all messages as read");
    }
  };

  // ===== AI REFINEMENT =====
  const handleRefineBio = async () => {
    setIsRefining("bio");
    try {
      const refined = await refineText(
        localData.bio,
        "professional software architect bio"
      );
      setLocalData({ ...localData, bio: refined });
    } catch {
      alert("Failed to refine bio");
    } finally {
      setIsRefining(null);
    }
  };

  return {
    localData,
    setLocalData,
    isRefining,
    isSavingIdentity,
    // Field updates
    handleUpdateField,
    handleUpdateStat,
    handleUpdateSocialLink,
    handleSaveIdentity,
    // Projects
    handleAddProject,
    handleSaveProject,
    handleDeleteProject,
    handleAiSuggestTags,
    // Experiences
    handleAddExperience,
    handleSaveExperience,
    handleDeleteExperience,
    // Skills
    handleAddSkill,
    handleUpdateSkill,
    handleDeleteSkill,
    // Testimonials
    handleAddTestimonial,
    handleSaveTestimonial,
    handleDeleteTestimonial,
    // Languages
    handleAddLanguage,
    handleUpdateLanguage,
    handleDeleteLanguage,
    // Messages
    handleReadMessage,
    handleDeleteMessage,
    handleMarkAllRead,
    // AI
    handleRefineBio,
  };
}
