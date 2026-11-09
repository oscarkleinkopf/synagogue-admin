import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import {
  isIsoDate,
  parseAttendanceBody,
  sanitizeNotes,
} from '../netlify/functions/_shared/attendance-input.mjs'

describe('sanitizeNotes', () => {
  it('strips HTML tags and caps length on input', () => {
    assert.equal(sanitizeNotes('<b>hola</b>'), 'hola')
    assert.equal(sanitizeNotes('<script>alert(1)</script>visible'), 'alert(1)visible')
    assert.equal(sanitizeNotes('x'.repeat(600)).length, 500)
  })
})

describe('isIsoDate', () => {
  it('accepts real calendar days only', () => {
    assert.equal(isIsoDate('2026-11-07'), true)
    assert.equal(isIsoDate('2026-02-29'), false)
    assert.equal(isIsoDate('07/11/2026'), false)
    assert.equal(isIsoDate(''), false)
  })
})

describe('parseAttendanceBody', () => {
  it('rejects decimal counts and missing dates', () => {
    assert.equal(parseAttendanceBody({ date: '2026-11-07', count: 1.5 }).ok, false)
    assert.equal(parseAttendanceBody({ date: 'not-a-date', count: 3 }).ok, false)
    assert.equal(parseAttendanceBody({ date: '2026-11-07', count: 0 }).ok, false)
  })

  it('accepts a valid integer count and sanitized notes', () => {
    const parsed = parseAttendanceBody({
      date: '2026-11-07',
      count: 8,
      notes: '<img src=x onerror=alert(1)>tres niños',
      parasha: 'Noaj',
    })
    assert.equal(parsed.ok, true)
    assert.equal(parsed.count, 8)
    assert.equal(parsed.notes.includes('<'), false)
    assert.equal(parsed.notes.includes('tres niños'), true)
  })
})
