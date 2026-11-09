import type { Config } from '@netlify/functions'
import { login, logout } from '@netlify/identity'
import { isStaffUser, staffRolesFromUser } from './_shared/staff-auth.mjs'

export default async (req: Request) => {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 })
  }

  const body = await req.json().catch(() => null)
  const email = typeof body?.email === 'string' ? body.email.trim() : ''
  const password = typeof body?.password === 'string' ? body.password : ''

  if (!email || !password) {
    return Response.json({ error: 'Faltan credenciales.' }, { status: 400 })
  }

  try {
    const user = await login(email, password)
    if (!isStaffUser(user)) {
      try {
        await logout()
      } catch {
        // Ignore logout failures; the caller still must not get a staff session.
      }
      return Response.json({ error: 'Forbidden' }, { status: 403 })
    }

    return Response.json({
      email: user.email,
      name: user.name ?? user.user_metadata?.full_name ?? user.email,
      roles: staffRolesFromUser(user),
    })
  } catch {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }
}

export const config: Config = {
  path: '/api/auth/login',
}
