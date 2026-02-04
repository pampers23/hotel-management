import { Hono } from "hono";
import { signIn, signUp } from "./auth";

const router = new Hono()
    .post("/sign-up", signUp)
    .post("/login", signIn);

export default router