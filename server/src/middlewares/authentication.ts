
import type { Context, Next } from "hono"
import { UnauthorizedError } from "../utils/error";

export async function authenticationMiddleware(c: Context, next: Next) {
    const acessToken = c.req.header("Authorization")?.split("Bearer")[1];

    if (!acessToken) {
        throw new UnauthorizedError("Access token is required");
    }
    await next();
}   