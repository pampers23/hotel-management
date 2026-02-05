import { Hono } from "hono";
import { cors } from "hono/cors";
import { errorHandlerMiddleware } from "./middlewares/error-handle";
import { routes } from "./routes/routes";

const app = new Hono();

app.use(
  "*",
  cors({
    // allow local + your production site + previews
    origin: (origin) =>
      !origin ||
      origin === "http://localhost:5173" ||
      origin === "https://lumie-re-hotel.vercel.app" ||
      origin.endsWith(".vercel.app"),
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
  })
);

app.onError(errorHandlerMiddleware);

// mount your auth routes at /auth/...
routes.forEach((route) => {
  app.route("/auth", route);
});

// quick health check
app.get("/health", (c) => c.text("ok"));

export default app;
