import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { escapeAttr, escapeHtml } from '../lib/html-escape.js'

describe('escapeHtml', () => {
  it('encodes markup so notes cannot be executed as HTML', () => {
    assert.equal(
      escapeHtml('<script>alert(1)</script>'),
      '&lt;script&gt;alert(1)&lt;/script&gt;',
    )
    assert.equal(
      escapeHtml('<img src=x onerror=alert(1)>'),
      '&lt;img src=x onerror=alert(1)&gt;',
    )
  })

  it('encodes quotes used to break out of attributes', () => {
    assert.equal(escapeHtml('" onclick="alert(1)'), '&quot; onclick=&quot;alert(1)')
    assert.equal(escapeHtml("' onmouseover='alert(1)"), '&#39; onmouseover=&#39;alert(1)')
  })
})

describe('escapeAttr', () => {
  it('encodes quotes and strips newlines that could break a title attribute', () => {
    assert.equal(escapeAttr('ok\n<img src=x onerror=alert(1)>'), 'ok &lt;img src=x onerror=alert(1)&gt;')
  })
})
