import React, { useState } from "react";
import {
  PortfolioData,
  Project,
  Experience,
  Skill,
  Testimonial,
  Message,
  Language,
} from "../lib/types";
import { refineText, suggestTags } from "../services/gemini";
import {
  createProject,
  updateProject,
  deleteProject,
  markMessageRead,
  markAllMessagesRead,
  updatePortfolio,
} from "../services/api";
import AdminHeader from "@/components/AdminHeader";
import AdminNav, { Tab } from "@/components/AdminNav";
import OverviewPanel from "@/components/OverviewPanel";
import IdentityPanel from "@/components/IdentityPanel";
import RepositoriesPanel from "@/components/RepositoriesPanel";
import ArsenalPanel from "@/components/ArsenalPanel";
import TimelinePanel from "@/components/TimelinePanel";
import TestimonialsPanel from "@/components/TestimonialsPanel";
import SignalsPanel from "@/components/SignalsPanel";

interface Props {
  data: PortfolioData;
  onUpdate: (data: PortfolioData) => void;
  onLogout: () => void;
}

const AdminDashboard: React.FC<Props> = ({ data, onUpdate, onLogout }) => {
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [isRefining, setIsRefining] = useState<string | null>(null);
  const [isSavingIdentity, setIsSavingIdentity] = useState<boolean>(false);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [editingExperience, setEditingExperience] = useState<Experience | null>(
    null
  );
  const [editingTestimonial, setEditingTestimonial] =
    useState<Testimonial | null>(null);

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
    onUpdate(mergePortfolio(data, updated));
  };

  const handleUpdateField = async (field: keyof PortfolioData, value: any) => {
    const next = { ...data, [field]: value } as PortfolioData;
    onUpdate(next);
    try {
      await persistPortfolio({ [field]: value } as Partial<PortfolioData>);
    } catch {
      alert("Failed to update portfolio");
    }
  };

  const handleUpdateStat = async (statField: string, value: any) => {
    const newStats = { ...data.stats, [statField]: value };
    onUpdate({ ...data, stats: newStats });
    try {
      await persistPortfolio({ stats: newStats });
    } catch {
      alert("Failed to update stats");
    }
  };

  const handleSaveIdentity = async () => {
    setIsSavingIdentity(true);
    try {
      await persistPortfolio({
        name: data.name,
        role: data.role,
        bio: data.bio,
        headline: data.headline,
        tagline: data.tagline,
        location: data.location,
        email: data.email,
        languages: data.languages,
        socialLinks: data.socialLinks,
        stats: data.stats,
      });
    } catch {
      alert("Failed to update profile");
    } finally {
      setIsSavingIdentity(false);
    }
  };

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
      onUpdate({ ...data, projects: [created, ...data.projects] });
      setEditingProject(created);
    } catch (err) {
      alert("Failed to create project");
    }
  };

  const handleSaveProject = async (proj: Project) => {
    try {
      const updated = await updateProject(proj.id, proj);
      const newProjects = data.projects.map((p) =>
        p.id === proj.id ? updated : p
      );
      onUpdate({ ...data, projects: newProjects });
      setEditingProject(null);
    } catch {
      alert("Failed to update project");
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (confirm("Terminate repository record?")) {
      try {
        await deleteProject(id);
        onUpdate({
          ...data,
          projects: data.projects.filter((p) => p.id !== id),
        });
      } catch {
        alert("Failed to delete project");
      }
    }
  };

  const handleAiSuggestTags = async (description: string, id: string) => {
    setIsRefining(`tags-${id}`);
    const suggested = await suggestTags(description);
    if (editingProject && editingProject.id === id) {
      setEditingProject({ ...editingProject, tags: suggested });
    }
    setIsRefining(null);
  };

  const handleAddExperience = async () => {
    const newExp: Experience = {
      id: Math.random().toString(36).substr(2, 9),
      company: "NEW_ORGANIZATION",
      role: "ROLE_NAME",
      period: "2024 - PRESENT",
      description: "Operational duties description...",
    };
    const next = [newExp, ...data.experiences];
    onUpdate({ ...data, experiences: next });
    setEditingExperience(newExp);
    try {
      await persistPortfolio({ experiences: next });
    } catch {
      alert("Failed to add experience");
    }
  };

  const handleSaveExperience = async (exp: Experience) => {
    const updated = data.experiences.map((e) => (e.id === exp.id ? exp : e));
    onUpdate({ ...data, experiences: updated });
    setEditingExperience(null);
    try {
      await persistPortfolio({ experiences: updated });
    } catch {
      alert("Failed to save experience");
    }
  };

  const handleDeleteExperience = async (id: string) => {
    if (confirm("Purge historical record?")) {
      const updated = data.experiences.filter((e) => e.id !== id);
      onUpdate({ ...data, experiences: updated });
      try {
        await persistPortfolio({ experiences: updated });
      } catch {
        alert("Failed to delete experience");
      }
    }
  };

  const handleReadMessage = async (id: string) => {
    const msg = data.messages.find((m) => m.id === id);
    if (msg) {
      setSelectedMessage(msg);
      if (!msg.read) {
        try {
          await markMessageRead(id);
          const updated = data.messages.map((m) =>
            m.id === id ? { ...m, read: true } : m
          );
          handleUpdateField("messages", updated);
        } catch {}
      }
    }
  };

  const handleDeleteMessage = (id: string) => {
    handleUpdateField(
      "messages",
      data.messages.filter((m) => m.id !== id)
    );
    if (selectedMessage?.id === id) setSelectedMessage(null);
  };

  const handleMarkAllRead = async () => {
    try {
      const updated = await markAllMessagesRead();
      onUpdate({ ...data, messages: updated });
    } catch {
      alert("Failed to mark all messages as read");
    }
  };

  const handleRefineBio = async () => {
    setIsRefining("bio");
    const refined = await refineText(
      data.bio,
      "professional software architect bio"
    );
    try {
      await updatePortfolio({ bio: refined });
      handleUpdateField("bio", refined);
    } catch {
      alert("Failed to update bio");
    }
    setIsRefining(null);
  };

  const handleAddSkill = async () => {
    const newSkill: Skill = {
      id: crypto.randomUUID(),
      name: "NEW_SKILL",
      level: 50,
      category: "other",
      pid: Math.floor(Math.random() * 9999)
        .toString()
        .padStart(4, "0"),
    };
    const next = [newSkill, ...data.skills];
    onUpdate({ ...data, skills: next });
    try {
      await persistPortfolio({ skills: next });
    } catch {
      alert("Failed to add skill");
    }
  };

  const handleUpdateSkill = async (
    id: string,
    updates: Partial<Skill>
  ): Promise<void> => {
    const next = data.skills.map((skill) =>
      skill.id === id ? { ...skill, ...updates } : skill
    );
    onUpdate({ ...data, skills: next });
    try {
      await persistPortfolio({ skills: next });
    } catch {
      alert("Failed to update skill");
    }
  };

  const handleDeleteSkill = async (id: string): Promise<void> => {
    if (confirm("Are you sure you want to delete this skill?")) {
      const next = data.skills.filter((skill) => skill.id !== id);
      onUpdate({ ...data, skills: next });
      try {
        await persistPortfolio({ skills: next });
      } catch {
        alert("Failed to delete skill");
      }
    }
  };

  const handleAddTestimonial = async () => {
    const newTestimonial: Testimonial = {
      id: crypto.randomUUID(),
      name: "Client Name",
      role: "Role",
      company: "Company",
      content: "Testimonial content...",
      verified: false,
    };
    setEditingTestimonial(newTestimonial);
  };

  const handleSaveTestimonial = async (
    testimonial: Testimonial
  ): Promise<void> => {
    const isNew = !data.testimonials.find((t) => t.id === testimonial.id);
    const updated = isNew
      ? [...data.testimonials, testimonial]
      : data.testimonials.map((t) =>
          t.id === testimonial.id ? testimonial : t
        );

    onUpdate({ ...data, testimonials: updated });
    setEditingTestimonial(null);
    try {
      await persistPortfolio({ testimonials: updated });
    } catch {
      alert("Failed to save testimonial");
    }
  };

  const handleDeleteTestimonial = async (id: string): Promise<void> => {
    if (confirm("Are you sure you want to delete this testimonial?")) {
      const updated = data.testimonials.filter((t) => t.id !== id);
      onUpdate({ ...data, testimonials: updated });
      try {
        await persistPortfolio({ testimonials: updated });
      } catch {
        alert("Failed to delete testimonial");
      }
    }
  };

  const handleAddLanguage = async () => {
    const newLang: Language = {
      id: crypto.randomUUID(),
      name: "New Language",
      proficiency: "Limited",
    };
    const updated = [...(data.languages || []), newLang];
    onUpdate({ ...data, languages: updated });
    try {
      await persistPortfolio({ languages: updated });
    } catch {
      alert("Failed to add language");
    }
  };

  const handleUpdateLanguage = async (
    id: string,
    updates: Partial<Language>
  ): Promise<void> => {
    const updated = (data.languages || []).map((lang) =>
      lang.id === id ? { ...lang, ...updates } : lang
    );
    onUpdate({ ...data, languages: updated });
    try {
      await persistPortfolio({ languages: updated });
    } catch {
      alert("Failed to update language");
    }
  };

  const handleDeleteLanguage = async (id: string): Promise<void> => {
    const updated = (data.languages || []).filter((lang) => lang.id !== id);
    onUpdate({ ...data, languages: updated });
    try {
      await persistPortfolio({ languages: updated });
    } catch {
      alert("Failed to delete language");
    }
  };

  const handleUpdateSocialLink = async (
    platform: string,
    value: string
  ): Promise<void> => {
    const updated = { ...(data.socialLinks || {}), [platform]: value };
    onUpdate({ ...data, socialLinks: updated });
    try {
      await persistPortfolio({ socialLinks: updated });
    } catch {
      alert("Failed to update social link");
    }
  };

  return (
    <div className="max-w-350 mx-auto px-4 md:px-6 py-12 space-y-8 mt-16 md:mt-24 pb-32">
      <AdminHeader onLogout={onLogout} />
      <AdminNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        unreadCount={data.messages.filter((m) => !m.read).length}
      />

      {activeTab === "overview" && <OverviewPanel stats={data.stats} />}

      {activeTab === "identity" && (
        <IdentityPanel
          data={data}
          isRefining={isRefining === "bio"}
          onUpdateField={handleUpdateField}
          onUpdateStat={handleUpdateStat}
          onUpdateLanguage={handleUpdateLanguage}
          onAddLanguage={handleAddLanguage}
          onDeleteLanguage={handleDeleteLanguage}
          onUpdateSocialLink={handleUpdateSocialLink}
          onRefineBio={handleRefineBio}
          onSaveAll={handleSaveIdentity}
          isSaving={isSavingIdentity}
        />
      )}

      {activeTab === "repositories" && (
        <RepositoriesPanel
          projects={data.projects}
          editingProject={editingProject}
          isRefining={isRefining === `tags-${editingProject?.id}`}
          onAddProject={handleAddProject}
          onSaveProject={handleSaveProject}
          onDeleteProject={handleDeleteProject}
          onSuggestTags={handleAiSuggestTags}
          setEditingProject={setEditingProject}
        />
      )}

      {activeTab === "arsenal" && (
        <ArsenalPanel
          skills={data.skills}
          onAddSkill={handleAddSkill}
          onUpdateSkill={handleUpdateSkill}
          onDeleteSkill={handleDeleteSkill}
        />
      )}

      {activeTab === "timeline" && (
        <TimelinePanel
          experiences={data.experiences}
          editingExperience={editingExperience}
          onAddExperience={handleAddExperience}
          onSaveExperience={handleSaveExperience}
          onDeleteExperience={handleDeleteExperience}
          setEditingExperience={setEditingExperience}
        />
      )}

      {activeTab === "testimonials" && (
        <TestimonialsPanel
          testimonials={data.testimonials}
          editingTestimonial={editingTestimonial}
          onAddTestimonial={handleAddTestimonial}
          onSaveTestimonial={handleSaveTestimonial}
          onDeleteTestimonial={handleDeleteTestimonial}
          setEditingTestimonial={setEditingTestimonial}
        />
      )}

      {activeTab === "signals" && (
        <SignalsPanel
          messages={data.messages}
          selectedMessage={selectedMessage}
          onReadMessage={handleReadMessage}
          onDeleteMessage={handleDeleteMessage}
          onMarkAllRead={handleMarkAllRead}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
