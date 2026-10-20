const BASE = import.meta.env.BASE_URL

/** Logo oficial de Elida: árbol-circuito con perfil humano en círculo verde. */
export function Mark({ size = 36, className = '', title = 'Elida Incubadora' }) {
  return (
    <img
      src={`${BASE}img/elida-logo.png`}
      width={size}
      height={size}
      alt={title}
      className={className}
      style={{ width: size, height: size, objectFit: 'contain', flex: 'none' }}
      decoding="async"
    />
  )
}

/** Glifo decorativo (nodo con brote) para íconos y separadores. No reemplaza al logo. */
export function Glyph({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="6.4" stroke="currentColor" strokeWidth="1.3" />
      <path d="M8 12.5V7.2M8 9.6 5.6 7.6M8 8.4l2.3-2.3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <circle cx="8" cy="6.2" r="1.1" fill="currentColor" />
    </svg>
  )
}

export function Wordmark({ size = 34, sub = true }) {
  return (
    <span className="wordmark" style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
      <Mark size={size} />
      <span style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
        <span style={{ fontWeight: 600, fontSize: size * 0.62, letterSpacing: '-0.04em' }}>elida</span>
        {sub && (
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: Math.max(8.5, size * 0.25),
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              opacity: 0.65,
              marginTop: 3,
            }}
          >
            incubadora
          </span>
        )}
      </span>
    </span>
  )
}
