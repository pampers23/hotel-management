import { Hono, type Context } from "hono";
import { supabaseAnon, supabaseAdmin } from "../../lib/supabase";
import { BadRequestError, UnauthorizedError } from "../../utils/error";


// sign up
export async function signUp(c: Context) {
  const { email, password, name } = await c.req.json()

  if (!email || !password || !name) throw new BadRequestError('Missing required fields')

  const { data, error } = await supabaseAnon.auth.signUp({
    email,
    password,
    options: { data: { name, role: 'customer' } },
  })
  if (error) throw new BadRequestError(error.message)

  const { error: insertError } = await supabaseAdmin.from('users').insert([
    { id: data.user?.id, email, name, role: 'customer' },
  ])
  if (insertError) throw new BadRequestError(insertError.message)

  return c.json({ message: 'Sign up successful, please verify your email', user: data.user }, 201)
}

// sign in
export async function signIn(c: Context) {
  const { email, password } = await c.req.json()

  if (!email || !password) throw new BadRequestError('Missing required fields')

  const { data, error } = await supabaseAnon.auth.signInWithPassword({ email, password })

  if (error) throw new UnauthorizedError('Invalid credentials')
  if (!data.user || !data.session) throw new UnauthorizedError('User not found')

  return c.json({
    message: 'Sign in successful',
    user: {
      id: data.user.id,
      email: data.user.email,
      name: data.user.user_metadata?.name,
      role: data.user.user_metadata?.role || 'customer',
    },
    session: data.session, // contains access_token + refresh_token
  })
}
