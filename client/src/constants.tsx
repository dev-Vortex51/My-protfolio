import { PortfolioData } from "./lib/types";

export const INITIAL_DATA: PortfolioData = {
  name: "VORTEX",
  role: "Lead Software Architect",
  bio: "Engineering high-performance distributed systems and design-driven interfaces. Focused on scalability, accessibility, and pixel-perfect implementation.",
  location: "Kwara, Nigeria",
  email: "qudusbello51@gmail.com",
  stats: {
    uptime: "99.99%",
    commits: 2481,
    visitors: 12402,
    lighthouse: 100,
  },
  messages: [
    {
      id: "m1",
      sender: "Sarah Jenkins",
      email: "sarah@tech-inc.com",
      subject: "Collaboration Opportunity",
      body: "We are looking for an architect for our next-gen cloud platform. Your work on HyperNode Pro caught our eye.",
      priority: "Urgent",
      timestamp: new Date().toISOString(),
      read: false,
    },
    {
      id: "m2",
      sender: "System Monitor",
      email: "root@vortex.io",
      subject: "Weekly Analytics Report",
      body: "System uptime remains at 99.99%. Repository traffic increased by 14% this cycle.",
      priority: "Low",
      timestamp: new Date(Date.now() - 86400000).toISOString(),
      read: true,
    },
  ],
  projects: [
    {
      id: "1",
      title: "HyperNode Pro",
      description:
        "A low-latency event streaming platform built for real-time financial transaction processing.",
      tags: ["Rust", "WASM", "gRPC"],
      link: "#",
      github: "https://github.com",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc51?w=800",
      featured: true,
      version: "v4.2.0",
      status: "production",
      metrics: { stars: 1200, forks: 84, coverage: "98%" },
      likes: 42,
      comments: [
        {
          id: "c1",
          author: "Guest User",
          text: "This is exactly what our infra team needed. Great work!",
          timestamp: new Date().toISOString(),
        },
      ],
    },
    {
      id: "2",
      title: "Stratos UI",
      description:
        "A design system engine that generates cross-platform components from Figma tokens.",
      tags: ["TypeScript", "Tailwind", "Canvas"],
      link: "#",
      github: "https://github.com",
      image:
        "https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=800",
      featured: true,
      version: "v1.0.5-beta",
      status: "beta",
      metrics: { stars: 450, forks: 12, coverage: "92%" },
      likes: 18,
      comments: [],
    },
  ],
  experiences: [
    {
      id: "e1",
      company: "Linear",
      role: "Senior Frontend Engineer",
      period: "2022 - PRESENT",
      description:
        "Leading the core interactions team, focusing on high-performance desktop-grade web experiences.",
    },
    {
      id: "e2",
      company: "Stripe",
      role: "Software Engineer",
      period: "2020 - 2022",
      description:
        "Architected scalable payment dashboards processing millions of requests per second.",
    },
  ],
  skills: [
    {
      id: "s1",
      name: "REACT CORE",
      level: 98,
      category: "frontend",
      pid: "8821",
    },
    {
      id: "s2",
      name: "RUST SYSTEMS",
      level: 85,
      category: "backend",
      pid: "4112",
    },
    {
      id: "s3",
      name: "KUBERNETES",
      level: 90,
      category: "devops",
      pid: "1092",
    },
    {
      id: "s4",
      name: "GLSL / SHADERS",
      level: 75,
      category: "other",
      pid: "3310",
    },
  ],
  testimonials: [
    {
      id: "t1",
      name: "Marcus Thorne",
      role: "CTO",
      company: "Stripe",
      content:
        "Vortex delivered architectural patterns that redefined our throughput capabilities. A rare blend of deep technical insight and product vision.",
      verified: true,
    },
    {
      id: "t2",
      name: "Elena Rodriguez",
      role: "Principal Engineer",
      company: "Linear",
      content:
        "The level of precision in the frontend implementation surpassed our highest benchmarks. Total mastery over the modern web stack.",
      verified: true,
    },
  ],
};
