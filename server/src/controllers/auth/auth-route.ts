import { Hono } from "hono";
import { login, signUp } from "./auth";

const router = new Hono()
    .post("/sign-up", signUp)
    .post("/login", login);

export default router