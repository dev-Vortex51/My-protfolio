import React from "react";

import SkillsSection from "@/components/SkillsSection";
import ProjectsPreview from "@/components/ProjectsPreview";
import PortfolioFooter from "@/components/PortfolioFooter";
import { PortfolioData } from "@/lib/types";
import HeroSection from "@/components/HeroSection";
import StatsBar from "@/components/StatsBar";
import Chronology from "@/components/Chronology";
import Testimonial from "@/components/Testimonial";

interface Props {
  data: PortfolioData;
}

const PublicPortfolio: React.FC<Props> = ({ data }) => {
  return (
    <div className="max-w-350 mx-auto px-4 md:px-6 lg:px-12 pt-24 md:pt-32 space-y-24 md:space-y-48 pb-32">
      <HeroSection data={data} />
      <StatsBar data={data} />
      <SkillsSection data={data} />
      <Chronology data={data} />
      <Testimonial data={data} />
      <ProjectsPreview data={data} />
      <PortfolioFooter />
    </div>
  );
};

export default PublicPortfolio;
