/**
 * HTML and attribute encoding for untrusted strings (including attendance notes).
 * Encode on output; do not treat sanitization as a substitute for this.
 */
export function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export function escapeAttr(value) {
  return escapeHtml(value).replace(/[\r\n\u2028\u2029]/g, ' ')
}
