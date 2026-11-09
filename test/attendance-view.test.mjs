import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { attendanceHistoryHtml } from '../lib/attendance-view.js'

const xssNotes = '<script>alert("xss")</script><img src=x onerror=alert(1)>'

describe('attendanceHistoryHtml', () => {
  it('does not interpolate raw notes into HTML or the title attribute', () => {
    const html = attendanceHistoryHtml([
      { date: '2026-11-07', count: 12, notes: xssNotes },
    ])

    assert.equal(html.includes('<script>'), false)
    assert.equal(html.includes('<img'), false)
    assert.equal(html.includes(xssNotes), false)
    assert.match(html, /&lt;script&gt;/)
    assert.match(html, /title="[^"]*&lt;img src=x onerror=alert\(1\)&gt;"/)
  })

  it('encodes attribute breakout payloads in title', () => {
    const html = attendanceHistoryHtml([
      { date: '2026-11-07', count: 3, notes: '" onfocus="alert(1)' },
    ])

    assert.equal(html.includes('" onfocus="alert(1)'), false)
    assert.match(html, /title="&quot; onfocus=&quot;alert\(1\)"/)
  })

  it('renders an empty-state message without user content', () => {
    const html = attendanceHistoryHtml([])
    assert.match(html, /No hay registros aún/)
  })
})
