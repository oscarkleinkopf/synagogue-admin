import { timingSafeEqual } from 'node:crypto'

const STAFF_ROLES = new Set(['staff', 'admin'])

export function staffRolesFromUser(user) {
  if (!user || typeof user !== 'object') return []
  const meta = user.app_metadata && typeof user.app_metadata === 'object' ? user.app_metadata : {}
  const raw = meta.roles ?? user.roles ?? meta.role ?? user.role ?? []
  const list = Array.isArray(raw) ? raw : String(raw).split(',')
  return list.map((role) => String(role).trim().toLowerCase()).filter(Boolean)
}

export function isStaffUser(user) {
  return staffRolesFromUser(user).some((role) => STAFF_ROLES.has(role))
}

export function bearerToken(request) {
  const header = request.headers.get('authorization') || ''
  const match = header.match(/^Bearer\s+(\S+)$/i)
  return match ? match[1] : ''
}

export function tokensEqual(actual, expected) {
  if (typeof actual !== 'string' || typeof expected !== 'string') return false
  if (actual.length === 0 || expected.length === 0) return false
  const actualBuffer = Buffer.from(actual)
  const expectedBuffer = Buffer.from(expected)
  if (actualBuffer.length !== expectedBuffer.length) {
    timingSafeEqual(expectedBuffer, expectedBuffer)
    return false
  }
  return timingSafeEqual(actualBuffer, expectedBuffer)
}

function readEnv(getEnv, name) {
  if (typeof getEnv !== 'function') return ''
  const value = getEnv(name)
  return typeof value === 'string' ? value : ''
}

/**
 * Fail closed: allow only a valid STAFF_API_TOKEN or a Netlify Identity
 * user whose app_metadata.roles includes `staff` or `admin`.
 */
export function createRequireStaff({ getUser, getEnv } = {}) {
  return async function requireStaff(request) {
    const expectedToken = readEnv(getEnv, 'STAFF_API_TOKEN')
    const providedToken = bearerToken(request)

    if (tokensEqual(providedToken, expectedToken)) {
      return { ok: true, principal: 'staff-token' }
    }

    let user = null
    if (typeof getUser === 'function') {
      try {
        user = await getUser(request)
      } catch {
        user = null
      }
    }

    if (user) {
      if (isStaffUser(user)) {
        return { ok: true, principal: user.email || user.id || 'identity-staff' }
      }
      return { ok: false, status: 403, error: 'Forbidden' }
    }

    return { ok: false, status: 401, error: 'Unauthorized' }
  }
}
