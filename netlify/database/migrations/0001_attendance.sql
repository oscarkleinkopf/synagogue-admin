-- Asistencia compartida del Shabat Infantil: cada registro es un Shabat con
-- la cantidad de niños presentes.
CREATE TABLE IF NOT EXISTS attendance (
  id SERIAL PRIMARY KEY,
  event_date DATE NOT NULL,
  count INTEGER NOT NULL,
  notes TEXT NOT NULL DEFAULT '',
  parasha TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
