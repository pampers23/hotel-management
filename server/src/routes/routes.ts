import authRoutes from "../controllers/auth/auth-route"

export const routes = [authRoutes] as const 

export type AppRoutes = (typeof routes)[number];