import type { Config, Context } from '@netlify/functions'
import { getDatabase } from '@netlify/database'

// Asistencia compartida: lista los últimos Shabatot registrados y permite
// agregar uno nuevo. Los datos quedan en la base de datos gestionada de
// Netlify, así son los mismos para todos los monitores y dispositivos.
export default async (req: Request, _context: Context) => {
  const db = getDatabase()

  if (req.method === 'GET') {
    const rows = await db.sql`
      SELECT event_date, count, notes, parasha, created_at
      FROM attendance
      ORDER BY event_date ASC, id ASC
    `
    return Response.json(rows)
  }

  if (req.method === 'POST') {
    const body = await req.json().catch(() => null)
    const date = body?.date
    const count = Number(body?.count)
    const notes = typeof body?.notes === 'string' ? body.notes : ''
    const parasha = typeof body?.parasha === 'string' ? body.parasha : ''

    if (!date || !Number.isFinite(count) || count <= 0) {
      return Response.json({ error: 'Faltan datos válidos (fecha y cantidad).' }, { status: 400 })
    }

    const [row] = await db.sql`
      INSERT INTO attendance (event_date, count, notes, parasha)
      VALUES (${date}, ${count}, ${notes}, ${parasha})
      RETURNING event_date, count, notes, parasha, created_at
    `
    return Response.json(row, { status: 201 })
  }

  return new Response('Method not allowed', { status: 405 })
}

export const config: Config = {
  path: '/api/attendance',
}
