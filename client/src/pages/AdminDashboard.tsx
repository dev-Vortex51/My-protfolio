import React, { useState } from "react";
import {
  PortfolioData,
  Project,
  Experience,
  Testimonial,
  Message,
} from "../lib/types";
import { useAdminEditor } from "@/hooks/useAdminEditor";
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
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [editingExperience, setEditingExperience] = useState<Experience | null>(
    null
  );
  const [editingTestimonial, setEditingTestimonial] =
    useState<Testimonial | null>(null);

  const {
    localData,
    isRefining,
    isSavingIdentity,
    handleUpdateField,
    handleUpdateStat,
    handleUpdateSocialLink,
    handleSaveIdentity,
    handleAddProject,
    handleSaveProject,
    handleDeleteProject,
    handleAiSuggestTags,
    handleAddExperience,
    handleSaveExperience,
    handleDeleteExperience,
    handleAddSkill,
    handleUpdateSkill,
    handleDeleteSkill,
    handleAddTestimonial,
    handleSaveTestimonial,
    handleDeleteTestimonial,
    handleAddLanguage,
    handleUpdateLanguage,
    handleDeleteLanguage,
    handleReadMessage,
    handleDeleteMessage,
    handleMarkAllRead,
    handleRefineBio,
  } = useAdminEditor(data, onUpdate);

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
          data={localData}
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
          projects={localData.projects}
          editingProject={editingProject}
          isRefining={isRefining === "tags"}
          onAddProject={handleAddProject}
          onSaveProject={(proj) => {
            handleSaveProject(proj);
            setEditingProject(null);
          }}
          onDeleteProject={handleDeleteProject}
          onSuggestTags={(desc) => handleAiSuggestTags(desc)}
          setEditingProject={setEditingProject}
        />
      )}

      {activeTab === "arsenal" && (
        <ArsenalPanel
          skills={localData.skills}
          onAddSkill={handleAddSkill}
          onUpdateSkill={handleUpdateSkill}
          onDeleteSkill={handleDeleteSkill}
        />
      )}

      {activeTab === "timeline" && (
        <TimelinePanel
          experiences={localData.experiences}
          editingExperience={editingExperience}
          onAddExperience={() => {
            const exp = handleAddExperience();
            setEditingExperience(exp);
          }}
          onSaveExperience={(exp) => {
            handleSaveExperience(exp);
            setEditingExperience(null);
          }}
          onDeleteExperience={handleDeleteExperience}
          setEditingExperience={setEditingExperience}
        />
      )}

      {activeTab === "testimonials" && (
        <TestimonialsPanel
          testimonials={localData.testimonials}
          editingTestimonial={editingTestimonial}
          onAddTestimonial={() => {
            const test = handleAddTestimonial();
            setEditingTestimonial(test);
          }}
          onSaveTestimonial={(test) => {
            handleSaveTestimonial(test);
            setEditingTestimonial(null);
          }}
          onDeleteTestimonial={handleDeleteTestimonial}
          setEditingTestimonial={setEditingTestimonial}
        />
      )}

      {activeTab === "signals" && (
        <SignalsPanel
          messages={localData.messages}
          selectedMessage={selectedMessage}
          onReadMessage={(id) => {
            handleReadMessage(id);
            const msg = localData.messages.find((m) => m.id === id);
            setSelectedMessage(msg || null);
          }}
          onDeleteMessage={handleDeleteMessage}
          onMarkAllRead={handleMarkAllRead}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
