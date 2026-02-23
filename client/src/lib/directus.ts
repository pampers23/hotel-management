import type { DirectusSchema } from "@/lib/directus-schema";
import { createDirectus, rest } from "@directus/sdk";


export const directus = createDirectus<DirectusSchema>(
  import.meta.env.VITE_DIRECTUS_URL  
).with(rest())