import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useInView, useReducedMotion } from 'motion/react'
import { Reveal, SpotlightCard, SectionHead, Arrow } from '../components/ui.jsx'
import { CYCLES, PROCESS, RUBRIC, COMPARISON } from '../content.js'

const EASE = [0.22, 1, 0.36, 1]

/* ------------------------------------------------------------------ */
/* Método CUESDA                                                       */
/* ------------------------------------------------------------------ */
const CDT = [
  { k: 'Cuestionar', q: '¿Cómo podría ser?' },
  { k: 'Desafiar', q: '¿Cómo debería ser, y con qué evidencia?' },
  { k: 'Transformar', q: '¿Qué hacemos el lunes para acercarnos?' },
]

function CycleStepper() {
  const [active, setActive] = useState(0)
  const [auto, setAuto] = useState(true)
  const ref = useRef(null)
  const inView = useInView(ref, { margin: '-20% 0px -20% 0px' })
  const reduce = useReducedMotion()

  useEffect(() => {
    if (!auto || !inView || reduce) return
    const id = setInterval(() => setActive((a) => (a + 1) % CYCLES.length), 4800)
    return () => clearInterval(id)
  }, [auto, inView, reduce])

  const pick = (i) => {
    setAuto(false)
    setActive(i)
  }
  const c = CYCLES[active]

  return (
    <div className="stepper" ref={ref}>
      <div className="stepper__rail" role="tablist" aria-label="Ciclos del método">
        <div className="stepper__line">
          <motion.div
            className="stepper__fill"
            animate={{ scaleX: active / (CYCLES.length - 1) }}
            transition={{ duration: 0.8, ease: EASE }}
          />
        </div>
        {CYCLES.map((cy, i) => (
          <button
            key={cy.n}
            role="tab"
            aria-selected={active === i}
            className={`stepper__step ${active === i ? 'is-active' : ''} ${i < active ? 'is-done' : ''}`}
            onClick={() => pick(i)}
          >
            <span className="stepper__dot">
              <span className="mono">{cy.n}</span>
            </span>
            <span className="stepper__name">{cy.name}</span>
          </button>
        ))}
      </div>

      <div className="stepper__panel glass ring-photon">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 14, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
            transition={{ duration: 0.45, ease: EASE }}
            className="stepper__content"
          >
            <div>
              <span className="label">Ciclo {c.n}</span>
              <h3 className="h3 stepper__q">{c.q}</h3>
              <div className="stepper__tools">
                {c.tools.map((t) => (
                  <span key={t} className="chip">
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div className="stepper__gate">
              <span className="mono">Compuerta para pasar</span>
              <p>{c.gate}</p>
              <span className="stepper__unlock">
                <span className="dot" /> Libera la siguiente micro-ronda de capital
              </span>
            </div>
          </motion.div>
        </AnimatePresence>
        {auto && !reduce && inView && <motion.div key={`bar-${active}`} className="stepper__timer" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 4.8, ease: 'linear' }} />}
      </div>
    </div>
  )
}

export function Method() {
  return (
    <section id="metodo" className="section method grain">
      <div className="method__glow" aria-hidden="true" />
      <div className="container">
        <SectionHead
          label="Método CUESDA"
          title={['Antes de validar una solución, ', { t: 'cuestionamos', className: 'serif text-photon' }, ' la estructura que produce el problema']}
          lead="CUESDA es nuestro marco propio de I+D+i+d: investigación, desarrollo, innovación y divulgación. Toma lo mejor de Lean, Agile, Design Sprint y el diseño de futuros, y lo pone al servicio de una pregunta: ¿qué estructura produce este problema y quién gana con que siga igual?"
        />

        <div className="cdt">
          {CDT.map((x, i) => (
            <Reveal key={x.k} delay={i * 0.1} className="cdt__item">
              <span className="mono cdt__n">0{i + 1}</span>
              <span className="cdt__k">{x.k}</span>
              <span className="cdt__q muted">{x.q}</span>
              {i < CDT.length - 1 && (
                <span className="cdt__arrow" aria-hidden="true">
                  <Arrow />
                </span>
              )}
            </Reveal>
          ))}
        </div>

        <Reveal>
          <CycleStepper />
        </Reveal>

        <Reveal>
          <p className="method__note">
            <span className="mono">↺</span>
            Si un experimento refuta una presunción crítica, el proyecto vuelve a Cuestión profunda. Perder un ciclo es más
            barato que financiar una solución a un problema mal entendido. Trabajamos en sprints de dos semanas, con
            planificación, demostración y retrospectiva.
          </p>
        </Reveal>

        <div className="process">
          <Reveal>
            <span className="label">Con cada proyecto</span>
          </Reveal>
          <div className="process__grid">
            {PROCESS.map((p, i) => (
              <Reveal key={p.t} delay={i * 0.08}>
                <SpotlightCard className="process__card">
                  <span className="process__n">{i + 1}</span>
                  <h3 className="h3">{p.t}</h3>
                  <p className="muted">{p.d}</p>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Capital paciente: simulador + rúbrica                               */
/* ------------------------------------------------------------------ */
function CapitalSim() {
  // Ejemplo ilustrativo: un primer aporte para arrancar y después micro-rondas por experimento.
  const START = [
    { id: 0, amt: 1000, res: 'start', cycle: 0 },
    { id: 1, amt: 200, res: 'micro', cycle: 1 },
  ]
  const [rounds, setRounds] = useState(START)
  const last = rounds[rounds.length - 1]
  const max = Math.max(...rounds.map((r) => r.amt))
  const usd = (a) => `${a === 1000 || a === 200 ? '' : '≈'}${(Math.round(a / 10) * 10).toLocaleString('es-AR')}`

  const step = (ok) => {
    setRounds((rs) => {
      const l = rs[rs.length - 1]
      const next = ok
        ? { id: l.id + 1, amt: l.amt * 1.25, res: 'ok', cycle: Math.min(l.cycle + 1, 4) }
        : { id: l.id + 1, amt: l.amt * 0.8, res: 'ko', cycle: 1 }
      const out = [...rs, next]
      // el aporte inicial queda siempre a la vista como referencia
      return out.length > 8 ? [out[0], ...out.slice(out.length - 7)] : out
    })
  }

  const cycleName = CYCLES[last.cycle].name

  return (
    <div className="sim glass">
      <div className="sim__head">
        <div>
          <span className="label">Simulador</span>
          <p className="sim__title">¿Qué pasa con el capital en cada experimento?</p>
        </div>
        <button className="sim__reset mono" onClick={() => setRounds(START)}>
          Reiniciar
        </button>
      </div>
      <div className="sim__chart" aria-live="polite">
        <AnimatePresence initial={false}>
          {rounds.map((r) => (
            <motion.div
              key={r.id}
              layout
              className={`sim__bar sim__bar--${r.res}`}
              initial={{ opacity: 0, scaleY: 0 }}
              animate={{ opacity: 1, scaleY: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
              style={{ height: `${Math.max(4, (r.amt / max) * 100)}%` }}
            >
              <span className="sim__val mono">{usd(r.amt)}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <div className="sim__legend mono">
        <span><i className="sim__sw sim__sw--start" />Aporte inicial</span>
        <span><i className="sim__sw sim__sw--micro" />Micro-ronda</span>
        <span><i className="sim__sw sim__sw--ok" />Tras validar</span>
        <span><i className="sim__sw sim__sw--ko" />Tras refutar</span>
      </div>
      <div className="sim__status">
        <span>
          Ciclo actual: <strong>{cycleName}</strong>
        </span>
        <span className="mono muted">
          {last.res === 'ok' && 'Validó → la próxima micro-ronda crece, del orden de 1,25×'}
          {last.res === 'ko' && 'Refutó → micro-ronda más chica y vuelta a Cuestión profunda'}
          {last.res === 'micro' && 'Primera micro-ronda de experimentación'}
        </span>
      </div>
      <div className="sim__actions">
        <button className="btn btn--primary btn--sm" onClick={() => step(true)}>
          El experimento valida
        </button>
        <button className="btn btn--ghost btn--sm" onClick={() => step(false)}>
          El experimento refuta
        </button>
      </div>
      <p className="sim__note muted">Montos de ejemplo en USD. Son estimativos: cada micro-ronda se dimensiona según lo que haya que validar.</p>
    </div>
  )
}

const GRADES = ['D', 'C', 'B', 'A']

function Rubric() {
  const [grades, setGrades] = useState([3, 2, 2, 3, 2, 1])
  const [hover, setHover] = useState(-1)
  const N = RUBRIC.length
  const R = 120
  const cx = 160
  const cy = 160
  const pt = (i, r) => {
    const a = (Math.PI * 2 * i) / N - Math.PI / 2
    return [cx + Math.cos(a) * r, cy + Math.sin(a) * r]
  }
  const poly = grades.map((g, i) => pt(i, ((g + 1) / 4) * R).join(',')).join(' ')
  const passes = grades.every((g) => g >= 2)
  const bump = (i) => setGrades((gs) => gs.map((g, j) => (j === i ? (g + 1) % 4 : g)))

  return (
    <div className="rubric glass">
      <div className="sim__head">
        <div>
          <span className="label">Rúbrica de 6 criterios</span>
          <p className="sim__title">Tocá cada criterio para cambiar su nota</p>
        </div>
        <span className={`rubric__badge ${passes ? 'is-pass' : ''}`}>{passes ? 'Pasa la compuerta' : 'Todavía no pasa'}</span>
      </div>
      <div className="rubric__body">
        <svg viewBox="0 0 320 320" className="rubric__svg" role="img" aria-label="Gráfico radar de la rúbrica">
          {[1, 2, 3, 4].map((l) => (
            <polygon
              key={l}
              points={RUBRIC.map((_, i) => pt(i, (l / 4) * R).join(',')).join(' ')}
              className={`rubric__ring ${l === 3 ? 'is-gate' : ''}`}
            />
          ))}
          {RUBRIC.map((_, i) => {
            const [x, y] = pt(i, R)
            return <line key={i} x1={cx} y1={cy} x2={x} y2={y} className="rubric__axis" />
          })}
          <motion.polygon
            points={poly}
            className="rubric__shape"
            animate={{ points: poly }}
            transition={{ duration: 0.5, ease: EASE }}
          />
          {grades.map((g, i) => {
            const [x, y] = pt(i, ((g + 1) / 4) * R)
            return <motion.circle key={i} r={hover === i ? 7 : 5} className="rubric__pt" animate={{ cx: x, cy: y }} transition={{ duration: 0.5, ease: EASE }} />
          })}
        </svg>
        <ul className="rubric__list">
          {RUBRIC.map((r, i) => (
            <li key={r.k}>
              <button
                onClick={() => bump(i)}
                onPointerEnter={() => setHover(i)}
                onPointerLeave={() => setHover(-1)}
                className={`rubric__item ${grades[i] < 2 ? 'is-low' : ''}`}
              >
                <span>
                  <strong>{r.k}</strong>
                  <span className="muted"> · {r.dim}</span>
                </span>
                <span className="rubric__grade mono">{GRADES[grades[i]]}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
      <p className="rubric__foot muted">La compuerta del ciclo de refutación pide B- o más.</p>
    </div>
  )
}

export function Capital() {
  return (
    <section className="section capital theme-light">
      <div className="container">
        <SectionHead
          label="Capital paciente"
          title={['Cada peso se libera contra ', { t: 'un resultado medido', className: 'serif text-photon' }, ', no contra una promesa']}
          lead="Un primer aporte pone el proyecto en marcha. Después liberamos micro-rondas por experimento: si valida, la siguiente crece en múltiplos (del orden de 1,25×); si falla, se achica. Los montos son estimativos y se ajustan a lo que haya que validar. Usamos instrumentos con expiración (acciones de voto limitado o regalías) que se cancelan al alcanzar un múltiplo pactado: el proyecto no queda atado para siempre."
        />
        <div className="capital__grid">
          <Reveal>
            <CapitalSim />
          </Reveal>
          <Reveal delay={0.1}>
            <Rubric />
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Diferencial                                                         */
/* ------------------------------------------------------------------ */
export function Compare() {
  const [active, setActive] = useState(0)
  return (
    <section className="section compare theme-light">
      <div className="container">
        <SectionHead
          label="En qué nos diferenciamos"
          title={['Lo que otros modelos ', { t: 'dejan afuera', className: 'serif text-photon' }]}
        />
        <div className="compare__wrap">
          <div className="compare__tabs" role="tablist" aria-label="Alternativas">
            {COMPARISON.map((c, i) => (
              <button
                key={c.alt}
                role="tab"
                aria-selected={active === i}
                className={`compare__tab ${active === i ? 'is-active' : ''}`}
                onClick={() => setActive(i)}
                onPointerEnter={(e) => e.pointerType === 'mouse' && setActive(i)}
              >
                {active === i && <motion.span layoutId="cmp-pill" className="compare__pill" transition={{ duration: 0.45, ease: EASE }} />}
                <span>{c.alt}</span>
              </button>
            ))}
          </div>
          <SpotlightCard className="compare__card" tilt={2}>
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                className="compare__cols"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease: EASE }}
              >
                <div>
                  <span className="mono">Qué optimiza</span>
                  <p>{COMPARISON[active].opt}</p>
                </div>
                <div>
                  <span className="mono">Qué le falta</span>
                  <p>{COMPARISON[active].lack}</p>
                </div>
                <div className="compare__elida">
                  <span className="mono">Qué hace Elida distinto</span>
                  <p>{COMPARISON[active].elida}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </SpotlightCard>
        </div>
      </div>
    </section>
  )
}
