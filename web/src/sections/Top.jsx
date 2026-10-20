import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useScroll, useSpring, useReducedMotion } from 'motion/react'
import { Wordmark } from '../components/Logo.jsx'
import LiquidMetal from '../components/LiquidMetal.jsx'
import { Reveal, SplitHeading, Magnetic, SpotlightCard, Arrow, SectionHead } from '../components/ui.jsx'
import { NAV, AUDIENCES, OFFER, FIELDS } from '../content.js'

/* ------------------------------------------------------------------ */
/* Navegación                                                          */
/* ------------------------------------------------------------------ */
export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24 })

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
  }, [open])

  return (
    <>
      <motion.div className="progress" style={{ scaleX: progress }} />
      <header className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
        <div className="nav__inner glass">
          <a href="#top" className="nav__brand" aria-label="Elida Incubadora, inicio">
            <Wordmark size={30} />
          </a>
          <nav className="nav__links" aria-label="Principal">
            {NAV.map((n) => (
              <a key={n.href} href={n.href} className="nav__link">
                {n.label}
              </a>
            ))}
          </nav>
          <Magnetic href="#contacto" className="btn btn--primary btn--sm nav__cta">
            Agendar llamada
          </Magnetic>
          <button
            className="nav__burger"
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            <span className={open ? 'is-open' : ''} />
          </button>
        </div>
      </header>
      <AnimatePresence>
        {open && (
          <motion.div
            className="menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <nav aria-label="Menú móvil">
              {NAV.map((n, i) => (
                <motion.a
                  key={n.href}
                  href={n.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.05, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span className="mono">0{i + 1}</span>
                  {n.label}
                </motion.a>
              ))}
            </nav>
            <a href="#contacto" className="btn btn--primary" onClick={() => setOpen(false)}>
              Agendar una llamada <Arrow />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

/* ------------------------------------------------------------------ */
/* Hero                                                                */
/* ------------------------------------------------------------------ */
export function Hero() {
  const reduce = useReducedMotion()
  return (
    <section id="top" className="hero grain">
      <div className="hero__aurora" aria-hidden="true" />
      <LiquidMetal className="hero__metal" />
      <div className="hero__grid" aria-hidden="true" />
      <div className="container hero__content">
        <motion.span
          className="label"
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          Incubadora deeptech de interés público · Buenos Aires
        </motion.span>
        <SplitHeading
          as="h1"
          className="display hero__title"
          delay={0.2}
          stagger={0.06}
          parts={['Convertimos ciencia en soluciones de ', { t: 'interés público', className: 'serif text-photon' }]}
        />
        <Reveal mount delay={0.7}>
          <p className="lead hero__lead">
            Co-diseñadas con quienes viven el problema y financiadas a medida que la evidencia lo justifica. Para
            cooperativas, municipios, empresas sociales y grupos de investigación de Latinoamérica.
          </p>
        </Reveal>
        <Reveal mount delay={0.85} className="hero__ctas">
          <Magnetic href="#contacto" className="btn btn--primary">
            Agendar una llamada <Arrow />
          </Magnetic>
          <Magnetic href="#metodo" className="btn btn--ghost">
            Conocer el método
          </Magnetic>
        </Reveal>
      </div>
      <Reveal mount delay={1.1} className="container hero__meta">
        <div>
          <span className="mono">01</span>
          <p>
            <strong>Capital paciente</strong> liberado por evidencia
          </p>
        </div>
        <div>
          <span className="mono">02</span>
          <p>
            <strong>Método CUESDA</strong> en cinco ciclos
          </p>
        </div>
        <div>
          <span className="mono">03</span>
          <p>
            <strong>Co-diseño</strong> desde el día uno
          </p>
        </div>
        <a href="#enfoque" className="hero__scroll" aria-label="Bajar a Enfoque">
          <Arrow dir="down" />
        </a>
      </Reveal>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Enfoque: el puente / tríada                                         */
/* ------------------------------------------------------------------ */
const TRIAD = {
  estado: {
    label: 'Estado',
    text: 'Políticas, compras públicas y financiamiento que no siempre encuentran una contraparte organizada.',
    pos: [300, 70],
  },
  comunidad: {
    label: 'Comunidades productivas',
    text: 'Cooperativas, organizaciones y emprendimientos que viven problemas que el mercado deja sin atender.',
    pos: [90, 420],
  },
  ciencia: {
    label: 'Ciencia',
    text: 'Conocimiento de frontera que todavía no sale del paper.',
    pos: [510, 420],
  },
  elida: {
    label: 'Elida',
    text: 'Método y capital paciente en los agujeros estructurales: donde viven las fallas de coordinación y la capacidad ociosa.',
    pos: [300, 300],
  },
}

function Triad() {
  const [active, setActive] = useState('elida')
  const reduce = useReducedMotion()
  const c = TRIAD.elida.pos
  const outer = ['estado', 'comunidad', 'ciencia']
  return (
    <div className="triad">
      <svg viewBox="0 0 600 500" className="triad__svg" role="img" aria-label="Tríada Estado, ciencia y comunidades con Elida en el centro">
        <defs>
          <linearGradient id="tri-g" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#b0be84" />
            <stop offset=".5" stopColor="#3fcf98" />
            <stop offset="1" stopColor="#4fd6dc" />
          </linearGradient>
          <radialGradient id="tri-core">
            <stop offset="0" stopColor="#4fd6dc" stopOpacity=".55" />
            <stop offset="1" stopColor="#4fd6dc" stopOpacity="0" />
          </radialGradient>
        </defs>
        {/* lados del triángulo: conexiones débiles */}
        {[
          ['estado', 'comunidad'],
          ['comunidad', 'ciencia'],
          ['ciencia', 'estado'],
        ].map(([a, b]) => (
          <line
            key={a + b}
            x1={TRIAD[a].pos[0]}
            y1={TRIAD[a].pos[1]}
            x2={TRIAD[b].pos[0]}
            y2={TRIAD[b].pos[1]}
            className="triad__weak"
          />
        ))}
        {/* radios hacia Elida */}
        {outer.map((k) => (
          <g key={k}>
            <path
              id={`ray-${k}`}
              d={`M${TRIAD[k].pos[0]} ${TRIAD[k].pos[1]} L${c[0]} ${c[1]}`}
              className={`triad__ray ${active === k ? 'is-active' : ''}`}
            />
            {!reduce &&
              [0, 1, 2].map((i) => (
                <circle key={i} r="3" className="triad__particle">
                  <animateMotion dur={`${2.6 + i * 0.3}s`} begin={`${i * 0.9}s`} repeatCount="indefinite" keyPoints="0;1;0" keyTimes="0;0.5;1" calcMode="linear">
                    <mpath href={`#ray-${k}`} />
                  </animateMotion>
                </circle>
              ))}
          </g>
        ))}
        <circle cx={c[0]} cy={c[1]} r="90" fill="url(#tri-core)" />
        {Object.entries(TRIAD).map(([k, n]) => {
          const isCore = k === 'elida'
          return (
            <g
              key={k}
              className={`triad__node ${active === k ? 'is-active' : ''} ${isCore ? 'is-core' : ''}`}
              transform={`translate(${n.pos[0]} ${n.pos[1]})`}
              onPointerEnter={() => setActive(k)}
              onFocus={() => setActive(k)}
              onClick={() => setActive(k)}
              tabIndex={0}
              role="button"
              aria-label={n.label}
            >
              <circle r={isCore ? 34 : 22} className="triad__dot" />
              {isCore ? (
                <circle r="44" className="triad__orbit" />
              ) : (
                <circle r="30" className="triad__halo" />
              )}
              <text y={isCore ? 5 : k === 'estado' ? -42 : 54} textAnchor="middle" className="triad__label">
                {n.label}
              </text>
            </g>
          )
        })}
      </svg>
      <AnimatePresence mode="wait">
        <motion.p
          key={active}
          className="triad__caption"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
        >
          <span className="mono">{TRIAD[active].label}</span>
          {TRIAD[active].text}
        </motion.p>
      </AnimatePresence>
    </div>
  )
}

export function Bridge() {
  return (
    <section id="enfoque" className="section bridge">
      <div className="container bridge__grid">
        <div>
          <SectionHead
            label="Enfoque"
            title={['Conectamos dos mundos que ', { t: 'hoy no se encuentran', className: 'serif text-photon' }]}
            lead="De un lado, comunidades con problemas irresueltos. Del otro, conocimiento científico sin aplicar. En el medio ponemos método y capital paciente, solo cuando hay evidencia."
          />
          <Reveal delay={0.2}>
            <p className="bridge__body muted">
              Trabajamos sobre la tríada de Sabato: Estado, ciencia y comunidades productivas. Cada mundo está bien conectado
              por dentro y mal conectado con los otros. En esos agujeros estructurales viven las fallas de coordinación y la
              capacidad ociosa. Ahí intervenimos.
            </p>
          </Reveal>
        </div>
        <Reveal delay={0.1}>
          <Triad />
        </Reveal>
      </div>
      <div className="container">
        <Reveal>
          <blockquote className="statement">
            <span className="label label--plain">A diferencia de aceleradoras y filantropía</span>
            <p>
              No buscamos escalar un producto. Transformamos los <em className="serif">incentivos</em>, la{' '}
              <em className="serif">gobernanza</em> y los <em className="serif">flujos</em> que reproducen el problema.
            </p>
          </blockquote>
        </Reveal>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* A quién servimos                                                    */
/* ------------------------------------------------------------------ */
export function Audiences() {
  return (
    <section className="section theme-light audiences">
      <div className="container">
        <SectionHead
          label="A quién servimos"
          title={['Para quienes trabajan en ', { t: 'lo común', className: 'serif text-photon' }]}
          lead="Organizaciones de interés colectivo que enfrentan problemas complejos que el mercado no atiende, y la ciencia que puede resolverlos."
        />
        <div className="aud-grid">
          {AUDIENCES.map((a, i) => (
            <Reveal key={a.key} delay={i * 0.08}>
              <SpotlightCard className="aud-card" style={{ '--c': a.color }}>
                <div className="aud-card__top">
                  <span className="mono aud-card__n">0{i + 1}</span>
                  <span className="aud-card__pulse" />
                </div>
                <h3 className="h3">{a.name}</h3>
                <p className="aud-card__who">{a.who}</p>
                <dl className="aud-card__dl">
                  <div>
                    <dt className="mono">Hoy</dt>
                    <dd>{a.pain}</dd>
                  </div>
                  <div>
                    <dt className="mono">Con Elida</dt>
                    <dd>{a.gain}</dd>
                  </div>
                </dl>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Qué ofrecemos                                                       */
/* ------------------------------------------------------------------ */
export function Offer() {
  const [open, setOpen] = useState(0)
  return (
    <section className="section theme-light offer">
      <div className="container offer__grid">
        <div className="offer__intro">
          <SectionHead
            label="Qué ofrecemos"
            title={['Del diagnóstico ', { t: 'al capital', className: 'serif text-photon' }]}
            lead="Cinco piezas que trabajan juntas. No vendemos una consultoría ni una ronda: acompañamos el proceso completo y ponemos piel en el juego."
          />
          <Reveal delay={0.2} className="fields">
            <span className="label">Campos de trabajo</span>
            {FIELDS.map((f) => (
              <div key={f.t} className="field">
                <strong>{f.t}</strong>
                <span className="muted">{f.d}</span>
              </div>
            ))}
          </Reveal>
        </div>
        <div className="offer__list">
          {OFFER.map((o, i) => {
            const isOpen = open === i
            return (
              <Reveal key={o.t} delay={i * 0.06}>
                <button
                  className={`offer-item ${isOpen ? 'is-open' : ''}`}
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  onPointerEnter={(e) => e.pointerType === 'mouse' && setOpen(i)}
                  aria-expanded={isOpen}
                >
                  <span className="mono offer-item__n">0{i + 1}</span>
                  <span className="offer-item__body">
                    <span className="offer-item__t">{o.t}</span>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.span
                          className="offer-item__d"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                        >
                          <span style={{ display: 'block', paddingTop: 10 }}>{o.d}</span>
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </span>
                  <span className="offer-item__icon" aria-hidden="true" />
                </button>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
