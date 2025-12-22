import { connectDB } from "../config/db.js";
import { User } from "../models/User.js";
import { Project } from "../models/Project.js";
import { Portfolio } from "../models/Portfolio.js";
import { hashPassword } from "../utils/password.js";
import { config } from "../config/env.js";

async function seed() {
  console.log("🌱 Starting database seed...");

  try {
    await connectDB();
    console.log("✅ Connected to MongoDB");

    // Check if admin already exists
    const existingAdmin = await User.findOne({ role: "admin" });
    if (existingAdmin) {
      console.log("⚠️  Admin user already exists:");
      console.log(`   Email: ${existingAdmin.email}`);
      console.log(`   Name: ${existingAdmin.name}`);
    } else {
      // Create admin user
      const adminEmail = "admin@vortex.io";
      const adminPassword = "admin123456"; // Change this after first login!
      const adminName = "VORTEX Admin";

      const passwordHash = await hashPassword(adminPassword);
      const admin = await User.create({
        email: adminEmail,
        passwordHash,
        name: adminName,
        role: "admin",
      });

      console.log("✅ Admin user created successfully:");
      console.log(`   Email: ${adminEmail}`);
      console.log(`   Password: ${adminPassword}`);
      console.log(`   Name: ${adminName}`);
      console.log(
        "\n⚠️  IMPORTANT: Change the password after your first login!"
      );
    }

    // Seed portfolio info (upsert to ensure new fields exist)
    const defaultPortfolio = {
      name: "VORTEX",
      role: "Lead Software Architect",
      bio: "Engineering high-performance distributed systems and design-driven interfaces. Focused on scalability, accessibility, and pixel-perfect implementation.",
      headline: "ENGINEERING FOR THE INFINITE SCALE",
      tagline:
        "Architecting robust digital infrastructure with a focus on low-latency, scalability, and human-centric design.",
      location: "San Francisco, CA",
      email: "engineering@vortex.io",
      stats: {
        uptime: "99.99%",
        commits: 2481,
        visitors: 12402,
        lighthouse: 100,
      },
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
      ],
      languages: [
        {
          id: "l1",
          name: "English",
          proficiency: "Native",
        },
        {
          id: "l2",
          name: "Spanish",
          proficiency: "Fluent",
        },
        {
          id: "l3",
          name: "Japanese",
          proficiency: "Limited",
        },
      ],
      socialLinks: {
        github: "https://github.com/vortex",
        linkedin: "https://linkedin.com/in/vortex",
        twitter: "https://twitter.com/vortex_dev",
        website: "https://vortex.io",
      },
      testimonials: [
        {
          id: "t1",
          name: "Sarah Jenkins",
          role: "Director of Engineering",
          company: "Tech Inc",
          content:
            "Vortex delivered production-grade systems with impeccable UX and reliability.",
          verified: true,
        },
      ],
    };

    const portfolio = await Portfolio.findOneAndUpdate(
      {},
      { $set: defaultPortfolio },
      { new: true, upsert: true }
    );
    console.log(
      portfolio
        ? "✅ Portfolio info created/updated"
        : "⚠️  Portfolio upsert skipped"
    );

    // Seed sample projects
    const projectCount = await Project.countDocuments();
    if (projectCount === 0) {
      await Project.insertMany([
        {
          title: "HyperNode Pro",
          description:
            "A low-latency event streaming platform built for real-time financial transaction processing.",
          tags: ["Rust", "WASM", "gRPC"],
          link: "#",
          github: "https://github.com",
          image:
            "https://images.unsplash.com/photo-1558494949-ef010cbdcc51?w=800",
          featured: true,
          version: "v4.2.0",
          status: "production",
          metrics: { stars: 1200, forks: 84, coverage: "98%" },
          likes: 42,
          comments: [],
        },
        {
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
      ]);
      console.log("✅ Sample projects created");
    } else {
      console.log(`⚠️  ${projectCount} project(s) already exist`);
    }

    console.log("\n✅ Database seed completed!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seed failed:", error);
    process.exit(1);
  }
}

seed();
