export function readNetlifyEnv(name) {
  try {
    const fromNetlify = globalThis.Netlify?.env?.get?.(name)
    if (typeof fromNetlify === 'string' && fromNetlify.length > 0) return fromNetlify
  } catch {
    // Netlify.env is only defined in the Functions runtime.
  }
  const fromProcess = process.env[name]
  return typeof fromProcess === 'string' ? fromProcess : ''
}
