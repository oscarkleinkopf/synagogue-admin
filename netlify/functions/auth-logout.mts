import type { Config } from '@netlify/functions'
import { logout } from '@netlify/identity'

export default async (req: Request) => {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 })
  }

  try {
    await logout()
  } catch {
    // Clearing a missing Identity session is still a successful logout.
  }

  return Response.json({ ok: true })
}

export const config: Config = {
  path: '/api/auth/logout',
}
