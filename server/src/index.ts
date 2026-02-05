import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import 'dotenv/config'
import { errorHandlerMiddleware } from './middlewares/error-handle'
import { routes } from './routes/routes';
import { cors } from 'hono/cors';

const app = new Hono()

// cors (allow vite dev server)
app.use(
  '*',
  cors({
    origin: ['http://localhost:5173', "https://lumie-re-hotel.vercel.app"],
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization'],
  })
)

// handle error
app.onError(errorHandlerMiddleware);

// routes
routes.forEach((route) => {
  app.route('/auth', route);
})

serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
