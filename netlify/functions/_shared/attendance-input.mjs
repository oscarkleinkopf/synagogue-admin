export const MAX_NOTES_LENGTH = 500
export const MAX_PARASHA_LENGTH = 80
export const MAX_COUNT = 999
export const MAX_ROWS = 100

export function sanitizePlainText(raw, maxLength) {
  if (typeof raw !== 'string') return ''
  const withoutTags = raw
    .replace(/\u0000/g, '')
    .replace(/<[^>]*>/g, '')
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
  return withoutTags.slice(0, maxLength)
}

export function sanitizeNotes(raw) {
  return sanitizePlainText(raw, MAX_NOTES_LENGTH)
}

export function sanitizeParasha(raw) {
  return sanitizePlainText(raw, MAX_PARASHA_LENGTH).trim()
}

export function isIsoDate(value) {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false
  const year = Number(value.slice(0, 4))
  const month = Number(value.slice(5, 7))
  const day = Number(value.slice(8, 10))
  const date = new Date(Date.UTC(year, month - 1, day))
  return (
    date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day
  )
}

export function parseCount(value) {
  if (typeof value === 'number' && Number.isInteger(value)) return value
  if (typeof value === 'string' && /^-?\d+$/.test(value)) return Number(value)
  return NaN
}

export function parseAttendanceBody(body) {
  const date = typeof body?.date === 'string' ? body.date.trim() : ''
  const count = parseCount(body?.count)
  const notes = sanitizeNotes(body?.notes)
  const parasha = sanitizeParasha(body?.parasha)

  if (!isIsoDate(date) || !Number.isInteger(count) || count < 1 || count > MAX_COUNT) {
    return { ok: false, error: 'Faltan datos válidos (fecha ISO y cantidad entera).' }
  }

  return { ok: true, date, count, notes, parasha }
}
