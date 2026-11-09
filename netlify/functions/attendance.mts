import type { Config } from '@netlify/functions'
import { getDatabase } from '@netlify/database'
import { getUser } from '@netlify/identity'
import { handleAttendanceRequest } from './_shared/handle-attendance.mjs'
import { readNetlifyEnv } from './_shared/read-env.mjs'
import { createRequireStaff } from './_shared/staff-auth.mjs'

const requireStaff = createRequireStaff({
  getUser,
  getEnv: readNetlifyEnv,
})

export default async (req: Request) =>
  handleAttendanceRequest(req, {
    getDatabase,
    requireStaff,
  })

export const config: Config = {
  path: '/api/attendance',
}
