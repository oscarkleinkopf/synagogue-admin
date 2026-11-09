import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { handleAttendanceRequest } from '../netlify/functions/_shared/handle-attendance.mjs'
import { createRequireStaff } from '../netlify/functions/_shared/staff-auth.mjs'

function staffDeps({ token = 'secret-staff-token', user = null, db } = {}) {
  let dbCalls = 0
  const database = db || {
    sql: async () => {
      dbCalls += 1
      return []
    },
  }
  return {
    deps: {
      getDatabase: () => {
        dbCalls += 1
        return database
      },
      requireStaff: createRequireStaff({
        getUser: async () => user,
        getEnv: (name) => (name === 'STAFF_API_TOKEN' ? token : ''),
      }),
    },
    dbCalls: () => dbCalls,
    database,
  }
}

function authed(url, init = {}) {
  return new Request(url, {
    ...init,
    headers: {
      Authorization: 'Bearer secret-staff-token',
      ...(init.headers || {}),
    },
  })
}

describe('handleAttendanceRequest auth', () => {
  it('rejects unauthenticated GET without touching the database', async () => {
    const { deps, dbCalls } = staffDeps()
    const res = await handleAttendanceRequest(
      new Request('https://example.test/api/attendance'),
      deps,
    )
    assert.equal(res.status, 401)
    assert.equal(dbCalls(), 0)
    const body = await res.json()
    assert.equal(body.error, 'Unauthorized')
  })

  it('rejects unauthenticated POST without inserting rows', async () => {
    const inserts = []
    const { deps, dbCalls } = staffDeps({
      db: {
        sql: async (_strings, ...values) => {
          inserts.push(values)
          return [{}]
        },
      },
    })
    const res = await handleAttendanceRequest(
      new Request('https://example.test/api/attendance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          date: '2026-11-07',
          count: 4,
          notes: '<script>alert(1)</script>',
        }),
      }),
      deps,
    )
    assert.equal(res.status, 401)
    assert.equal(dbCalls(), 0)
    assert.equal(inserts.length, 0)
  })

  it('forbids Identity users without a staff role', async () => {
    const { deps, dbCalls } = staffDeps({
      token: '',
      user: { email: 'visitor@kehila.test', app_metadata: { roles: ['member'] } },
    })
    const res = await handleAttendanceRequest(
      new Request('https://example.test/api/attendance'),
      deps,
    )
    assert.equal(res.status, 403)
    assert.equal(dbCalls(), 0)
  })
})

describe('handleAttendanceRequest XSS and validation', () => {
  it('stores sanitized notes and returns them without raw markup', async () => {
    const inserted = []
    const { deps } = staffDeps({
      db: {
        sql: async (_strings, ...values) => {
          inserted.push(values)
          return [
            {
              event_date: values[0],
              count: values[1],
              notes: values[2],
              parasha: values[3],
              created_at: '2026-11-07T12:00:00.000Z',
            },
          ]
        },
      },
    })

    const payload = {
      date: '2026-11-07',
      count: 6,
      notes: '<script>alert("xss")</script>tres niños',
      parasha: 'Noaj',
    }
    const res = await handleAttendanceRequest(
      authed('https://example.test/api/attendance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }),
      deps,
    )

    assert.equal(res.status, 201)
    const body = await res.json()
    assert.equal(body.notes.includes('<script>'), false)
    assert.equal(body.notes.includes('<'), false)
    assert.match(body.notes, /tres niños/)
    assert.equal(inserted[0][2].includes('<script>'), false)
  })

  it('rejects a non-ISO date before inserting', async () => {
    const { deps, dbCalls } = staffDeps()
    const res = await handleAttendanceRequest(
      authed('https://example.test/api/attendance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ date: '07-11-2026', count: 3, notes: 'ok' }),
      }),
      deps,
    )
    assert.equal(res.status, 400)
    assert.equal(dbCalls(), 0)
  })

  it('allows staff GET after authentication', async () => {
    const { deps } = staffDeps({
      db: {
        sql: async () => [
          {
            event_date: '2026-11-07',
            count: 5,
            notes: '<b>hola</b>',
            parasha: 'Noaj',
            created_at: '2026-11-07T12:00:00.000Z',
          },
        ],
      },
    })
    const res = await handleAttendanceRequest(authed('https://example.test/api/attendance'), deps)
    assert.equal(res.status, 200)
    const rows = await res.json()
    assert.equal(rows[0].notes, 'hola')
    assert.equal(res.headers.get('Cache-Control'), 'no-store')
  })
})
