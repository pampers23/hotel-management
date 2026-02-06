import 'dotenv/config'

import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { errorHandlerMiddleware } from './middlewares/error-handle'
import { routes } from './routes/routes'
import { cors } from 'hono/cors'

const app = new Hono()

app.use(
  '*',
  cors({
<<<<<<< HEAD
    origin: ['http://localhost:5173', 'https://lumie-re-hotel.vercel.app'],
=======
    origin: ['http://localhost:5173', "https://lumie-re-hotel.vercel.app"],
>>>>>>> 7274e0a97a41c3d10e9a06020bfa84445adc4732
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization'],
  })
)

app.onError(errorHandlerMiddleware)

routes.forEach((route) => {
  app.route('/auth', route)
})

<<<<<<< HEAD
app.get('/health', (c) => c.text('ok'))

serve(
  {
    fetch: app.fetch,
    port: Number(process.env.PORT ?? 3000),
  },
  (info) => console.log(`Server running on http://localhost:${info.port}`)
)
=======
// quick health check
app.get("/health", (c) => c.text("ok"));
>>>>>>> 7274e0a97a41c3d10e9a06020bfa84445adc4732
