import type { Config } from '@netlify/functions'
import { getUser } from '@netlify/identity'
import { isStaffUser, staffRolesFromUser } from './_shared/staff-auth.mjs'

export default async () => {
  let user = null
  try {
    user = await getUser()
  } catch {
    user = null
  }

  if (!user) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  if (!isStaffUser(user)) {
    return Response.json({ error: 'Forbidden' }, { status: 403 })
  }

  return Response.json({
    email: user.email,
    name: user.name ?? user.user_metadata?.full_name ?? user.email,
    roles: staffRolesFromUser(user),
  })
}

export const config: Config = {
  path: '/api/auth/me',
}
