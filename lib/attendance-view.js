import { escapeAttr, escapeHtml } from './html-escape.js'

export function attendanceHistoryHtml(records) {
  if (!Array.isArray(records) || records.length === 0) {
    return '<p style="color: var(--text-muted); font-size: 13px; text-align: center; padding: 12px;">No hay registros aún.</p>'
  }

  return records
    .slice()
    .reverse()
    .map((record) => {
      const date = escapeHtml(record?.date ?? '')
      const count = escapeHtml(record?.count ?? '')
      const notes = record?.notes ? String(record.notes) : ''
      const notesLabel = escapeHtml(notes || '—')
      const notesTitle = escapeAttr(notes)
      return `<div class="attendance-history-item">
            <span class="att-date">${date}</span>
            <span class="att-count">${count} niños</span>
            <span class="att-notes" title="${notesTitle}">${notesLabel}</span>
        </div>`
    })
    .join('')
}
