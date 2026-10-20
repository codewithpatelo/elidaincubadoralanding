import { useId } from 'react'

/**
 * Isotipo "Brote-circuito": un tallo que nace del suelo y se bifurca
 * en una hoja (comunidad, vida) y una traza con nodo (ciencia, tecnología),
 * dentro de un anillo que se abre como una semilla.
 */
export function Mark({ size = 36, mono = false, className = '', title = 'Elida Incubadora' }) {
  const id = useId().replace(/:/g, '')
  const stroke = mono ? 'currentColor' : `url(#g-${id})`
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      role="img"
      aria-label={title}
    >
      {!mono && (
        <defs>
          <linearGradient id={`g-${id}`} x1="6" y1="42" x2="44" y2="6" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#b0be84" />
            <stop offset="0.38" stopColor="#3fcf98" />
            <stop offset="0.72" stopColor="#4fd6dc" />
            <stop offset="1" stopColor="#ffa95c" />
          </linearGradient>
        </defs>
      )}
      {/* anillo-semilla abierto arriba a la derecha */}
      <path
        d="M33.5 6.9A20 20 0 1 0 43.1 18"
        stroke={stroke}
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      {/* tallo */}
      <path d="M22 42V22" stroke={stroke} strokeWidth="2.6" strokeLinecap="round" />
      {/* hoja */}
      <path
        d="M22 31c-7.2 0-10.6-4.7-10.2-11.2 6.6-.2 10.2 4.1 10.2 11.2Z"
        fill={stroke}
      />
      {/* traza de circuito */}
      <path
        d="M22 26l7.5-7.5h6"
        stroke={stroke}
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="38.6" cy="18.5" r="3.1" fill={stroke} />
      <circle cx="22" cy="18.4" r="2.4" fill={stroke} />
    </svg>
  )
}

export function Wordmark({ size = 34, mono = false, sub = true }) {
  return (
    <span className="wordmark" style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
      <Mark size={size} mono={mono} />
      <span style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
        <span
          style={{
            fontWeight: 600,
            fontSize: size * 0.62,
            letterSpacing: '-0.04em',
          }}
        >
          elida
        </span>
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
