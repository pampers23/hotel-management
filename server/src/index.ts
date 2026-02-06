import 'dotenv/config'

import { Hono } from 'hono'
import { errorHandlerMiddleware } from './middlewares/error-handle'
import { routes } from './routes/routes'
import { cors } from 'hono/cors'

const app = new Hono()

app.use(
  "*",
  cors({
    origin: ["http://localhost:5173", "https://lumie-re-hotel.vercel.app"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
    credentials: true, // only if you use cookies; safe to keep false otherwise
  })
);

app.options('*', (c) => c.body(null, 204))

app.onError(errorHandlerMiddleware)

routes.forEach((route) => {
  app.route('/auth', route)
})

routes.forEach((route) => {
  app.route("/auth", route);
});

app.get("/health", (c) => c.text("ok"));

export default app;

