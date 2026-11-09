import { parseAttendanceBody, sanitizeNotes, sanitizeParasha } from './attendance-input.mjs'

function json(data, status = 200) {
  return Response.json(data, {
    status,
    headers: {
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff',
    },
  })
}

function publicRow(row) {
  return {
    event_date: row.event_date,
    count: row.count,
    notes: sanitizeNotes(row.notes || ''),
    parasha: sanitizeParasha(row.parasha || ''),
    created_at: row.created_at,
  }
}

export async function handleAttendanceRequest(req, deps) {
  if (req.method !== 'GET' && req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 })
  }

  const auth = await deps.requireStaff(req)
  if (!auth || auth.ok !== true) {
    const status = auth?.status === 403 ? 403 : 401
    return json({ error: status === 403 ? 'Forbidden' : 'Unauthorized' }, status)
  }

  if (req.method === 'GET') {
    const db = deps.getDatabase()
    const rows = await db.sql`
      SELECT event_date, count, notes, parasha, created_at
      FROM attendance
      ORDER BY event_date DESC, id DESC
      LIMIT 100
    `
    const list = Array.isArray(rows) ? rows : []
    return json(list.map(publicRow).reverse())
  }

  const body = await req.json().catch(() => null)
  const parsed = parseAttendanceBody(body)
  if (!parsed.ok) {
    return json({ error: parsed.error }, 400)
  }

  const db = deps.getDatabase()
  const [row] = await db.sql`
    INSERT INTO attendance (event_date, count, notes, parasha)
    VALUES (${parsed.date}, ${parsed.count}, ${parsed.notes}, ${parsed.parasha})
    RETURNING event_date, count, notes, parasha, created_at
  `
  return json(publicRow(row || parsed), 201)
}
