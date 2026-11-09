import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import {
  bearerToken,
  createRequireStaff,
  isStaffUser,
  tokensEqual,
} from '../netlify/functions/_shared/staff-auth.mjs'

describe('isStaffUser', () => {
  it('allows only staff or admin app roles', () => {
    assert.equal(isStaffUser({ app_metadata: { roles: ['staff'] } }), true)
    assert.equal(isStaffUser({ app_metadata: { roles: ['admin'] } }), true)
    assert.equal(isStaffUser({ roles: ['staff'] }), true)
    assert.equal(isStaffUser({ app_metadata: { roles: ['authenticated'] } }), false)
    assert.equal(isStaffUser({ role: 'authenticated' }), false)
    assert.equal(isStaffUser({ app_metadata: { roles: [] } }), false)
    assert.equal(isStaffUser(null), false)
  })
})

describe('tokensEqual', () => {
  it('rejects empty or mismatched secrets', () => {
    assert.equal(tokensEqual('secret', 'secret'), true)
    assert.equal(tokensEqual('secret', 'other'), false)
    assert.equal(tokensEqual('', ''), false)
    assert.equal(tokensEqual('secret', ''), false)
  })
})

describe('createRequireStaff', () => {
  it('denies when Identity is missing and no staff token is configured', async () => {
    const requireStaff = createRequireStaff({
      getUser: async () => null,
      getEnv: () => '',
    })
    const result = await requireStaff(new Request('https://example.test/api/attendance'))
    assert.deepEqual(result, { ok: false, status: 401, error: 'Unauthorized' })
  })

  it('denies a bearer token when STAFF_API_TOKEN is unset', async () => {
    const requireStaff = createRequireStaff({
      getUser: async () => null,
      getEnv: () => '',
    })
    const result = await requireStaff(
      new Request('https://example.test/api/attendance', {
        headers: { Authorization: 'Bearer guessable' },
      }),
    )
    assert.equal(result.ok, false)
    assert.equal(result.status, 401)
  })

  it('accepts a matching STAFF_API_TOKEN', async () => {
    const requireStaff = createRequireStaff({
      getUser: async () => null,
      getEnv: (name) => (name === 'STAFF_API_TOKEN' ? 'correct-token' : ''),
    })
    const result = await requireStaff(
      new Request('https://example.test/api/attendance', {
        headers: { Authorization: 'Bearer correct-token' },
      }),
    )
    assert.deepEqual(result, { ok: true, principal: 'staff-token' })
  })

  it('accepts a Netlify Identity user with a staff role', async () => {
    const requireStaff = createRequireStaff({
      getUser: async () => ({ email: 'monitor@kehila.test', app_metadata: { roles: ['staff'] } }),
      getEnv: () => '',
    })
    const result = await requireStaff(new Request('https://example.test/api/attendance'))
    assert.deepEqual(result, { ok: true, principal: 'monitor@kehila.test' })
  })

  it('forbids an authenticated Identity user without a staff role', async () => {
    const requireStaff = createRequireStaff({
      getUser: async () => ({ email: 'member@kehila.test', app_metadata: { roles: [] } }),
      getEnv: () => '',
    })
    const result = await requireStaff(new Request('https://example.test/api/attendance'))
    assert.deepEqual(result, { ok: false, status: 403, error: 'Forbidden' })
  })

  it('treats getUser failures as unauthenticated', async () => {
    const requireStaff = createRequireStaff({
      getUser: async () => {
        throw new Error('identity down')
      },
      getEnv: () => '',
    })
    const result = await requireStaff(new Request('https://example.test/api/attendance'))
    assert.equal(result.status, 401)
  })
})

describe('bearerToken', () => {
  it('reads a Bearer credential and ignores other schemes', () => {
    assert.equal(
      bearerToken(new Request('https://example.test', { headers: { Authorization: 'Bearer abc' } })),
      'abc',
    )
    assert.equal(
      bearerToken(new Request('https://example.test', { headers: { Authorization: 'Basic abc' } })),
      '',
    )
  })
})
