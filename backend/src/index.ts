import express from "express";
import { config } from "./config/env.js";
import { connectDB } from "./config/db.js";
import { applySecurityMiddleware } from "./middleware/security.js";
import { requestId } from "./middleware/requestId.js";
import { errorHandler } from "./middleware/errorHandler.js";
import morgan from "morgan";
import cors, { type CorsOptions } from "cors";
import compression from "compression";
import { router as authRouter } from "./routes/authRoutes.js";
import { router as projectRouter } from "./routes/projectRoutes.js";
import { router as contactRouter } from "./routes/contactRoutes.js";
import { router as portfolioRouter } from "./routes/portfolioRoutes.js";

const app = express();

// Core middleware
app.disable("x-powered-by");
app.use(requestId);
app.use(compression());
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(morgan("tiny"));

const corsOptions: CorsOptions = {
  origin: config.CORS_ORIGIN,
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));
applySecurityMiddleware(app);

// Root route (optional convenience)
app.get("/", (_req, res) => {
  res.status(200).send("Portfolio API is running. Try /api/health");
});

// Health check
app.get("/api/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

// Routes
app.use("/api/auth", authRouter);
app.use("/api/projects", projectRouter);
app.use("/api/contact", contactRouter);
app.use("/api/portfolio", portfolioRouter);

// Fallback aliases (support clients calling without /api prefix)
app.use("/auth", authRouter);
app.use("/projects", projectRouter);
app.use("/contact", contactRouter);
app.use("/portfolio", portfolioRouter);

// Error handler
app.use(errorHandler);

// Start server
connectDB()
  .then(() => {
    app.listen(config.PORT, () => {
      console.log(`Server listening on port ${config.PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to DB", err);
    process.exit(1);
  });
