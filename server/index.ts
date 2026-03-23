import "dotenv/config";
import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { serveStatic } from "./static";
import { createServer } from "http";
import { db } from "./db";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import path from "path";
import { exec } from "child_process";
import { promisify } from "util";
import session from "express-session";
import connectPg from "connect-pg-simple";
import pg from "pg";

const PostgresStore = connectPg(session);
const { Pool } = pg;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const execAsync = promisify(exec);
const app = express();
const httpServer = createServer(app);

app.use(
  session({
    store: new PostgresStore({
      pool: pool,
      createTableIfMissing: true,
    }),
    secret: process.env.SESSION_SECRET || "srph-mis-portal-secret",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      secure: false, // Set to true if using HTTPS
    },
  })
);

declare module "https" {
  interface IncomingMessage {
    rawBody: unknown;
  }
}

app.use(
  express.json({
    verify: (req, _res, buf) => {
      req.rawBody = buf;
    },
  }),
);

app.use(express.urlencoded({ extended: false }));

export function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  console.log(`${formattedTime} [${source}] ${message}`);
}

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  // Automatically sync schema on startup for local development
  try {
    log("Checking database connection...", "db");
    // Verify connection first
    await pool.query('SELECT 1');
    
    log("Synchronizing database schema...", "db");
    // Using db:push for seamless local development synchronization
    // We'll use a safer check to avoid redundant pushes if not needed
    const { stdout, stderr } = await execAsync("npm run db:push");
    
    if (stdout && (stdout.includes("No changes to push") || stdout.includes("is up to date"))) {
      log("Database schema is already up to date. Skipping sync.", "db");
    } else {
      if (stdout) log(`Schema sync output: ${stdout}`, "db");
      if (stderr) log(`Schema sync info: ${stderr}`, "db");
      log("Database schema synchronized successfully", "db");
    }

    // Seed initial data if tables are empty
    try {
      const configCount = await pool.query('SELECT count(*) FROM site_config');
      if (parseInt(configCount.rows[0].count) === 0) {
        log("No site configuration found. Seeding initial data...", "db");
        // The application logic or a separate seed script should handle this
        // For now, we'll just log that it's empty.
      } else {
        log("Site configuration already exists. Skipping seed.", "db");
      }
    } catch (e: any) {
      log(`Note: Could not check for existing data (might be first run): ${e.message}`, "db");
    }

  } catch (error) {
    console.error("Schema sync failed:", error);
    log("Attempting to continue with standard migrations...", "db");
    try {
      await migrate(db, { migrationsFolder: path.join(process.cwd(), "migrations") });
      log("Standard migrations completed successfully", "db");
    } catch (migError) {
      console.error("Standard migration also failed:", migError);
    }
  }

  await registerRoutes(httpServer, app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (process.env.NODE_ENV === "production") {
    serveStatic(app);
  } else {
    const { setupVite } = await import("./vite");
    await setupVite(httpServer, app);
  }

  // ALWAYS serve the app on the port specified in the environment variable PORT
  // Other ports are firewalled. Default to 5000 if not specified.
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = parseInt(process.env.PORT || "5000", 10);
  httpServer.listen(
    {
      port,
      host: "0.0.0.0",
    },
    () => {
      log(`serving on port ${port}`);
    },
  );
})();
