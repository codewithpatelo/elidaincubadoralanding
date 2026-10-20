import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import { Reveal, SpotlightCard, SectionHead, SplitHeading, Magnetic, Arrow, Counter } from '../components/ui.jsx'
import { Wordmark, Mark, Glyph } from '../components/Logo.jsx'
import { PROJECTS, MULTIPLIER, BENEFITS, CREDENTIALS, DISCIPLINES, MANIFESTO, CONTACT, NAV } from '../content.js'

const EASE = [0.22, 1, 0.36, 1]
const BASE = import.meta.env.BASE_URL

/* ------------------------------------------------------------------ */
/* Proyectos incubados                                                 */
/* ------------------------------------------------------------------ */
function BinsaiVisual() {
  return (
    <div className="pv pv--binsai" aria-hidden="true">
      <svg viewBox="0 0 400 260" className="pv__orbits">
        {[0, 1, 2].map((i) => (
          <ellipse key={i} cx="200" cy="130" rx={150 - i * 10} ry={46 + i * 6} transform={`rotate(${-25 + i * 30} 200 130)`} className="pv__orbit" style={{ animationDelay: `${i * -4}s` }} />
        ))}
        {[0, 1, 2].map((i) => (
          <circle key={`p${i}`} r="4" className="pv__electron">
            <animateMotion dur={`${7 + i * 2}s`} repeatCount="indefinite" rotate="auto" path={`M50,130 a150,${46 + i * 6} 0 1,0 300,0 a150,${46 + i * 6} 0 1,0 -300,0`} />
          </circle>
        ))}
      </svg>
      <img src={`${BASE}img/binsai-mark.png`} alt="" className="pv__logo" loading="lazy" />
    </div>
  )
}

function CasaVisual() {
  const sw = ['#c8641f', '#f08a3c', '#ffc98f', '#e6ebd6', '#8fa35e', '#3f5023']
  return (
    <div className="pv pv--casa" aria-hidden="true">
      <div className="pv__badge">
        <img src={`${BASE}img/casa-creativa.png`} alt="" loading="lazy" />
      </div>
      <div className="pv__swatches">
        {sw.map((c, i) => (
          <span key={c} style={{ background: c, animationDelay: `${i * 0.12}s` }} />
        ))}
      </div>
    </div>
  )
}

export function Projects() {
  return (
    <section id="proyectos" className="section projects grain">
      <div className="projects__glow" aria-hidden="true" />
      <div className="container">
        <SectionHead
          label="Proyectos incubados"
          title={['Dos casos ', { t: 'vidriera', className: 'serif text-photon' }, ' para mostrar la tesis en marcha']}
          lead="Uno nace de investigación propia y se vuelve bien común. El otro es una empresa social que busca pasar de audiencia a ingresos estables."
        />
        <div className="projects__grid">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.key} delay={i * 0.12}>
              <SpotlightCard className={`project project--${p.key}`} tilt={3}>
                {p.key === 'binsai' ? <BinsaiVisual /> : <CasaVisual />}
                <div className="project__body">
                  <div className="project__meta">
                    <span className="mono">{p.kicker}</span>
                    <span className="project__status">
                      <span className="dot" />
                      {p.status}
                    </span>
                  </div>
                  <h3 className="project__name">{p.name}</h3>
                  <p className="project__title">{p.title}</p>
                  <p className="muted">{p.body}</p>
                  {p.lineage && (
                    <ol className="project__lineage">
                      {p.lineage.map((l) => (
                        <li key={l} className="mono">
                          {l}
                        </li>
                      ))}
                    </ol>
                  )}
                  <div className="project__foot">
                    <div className="project__tags">
                      {p.tags.map((t) => (
                        <span key={t} className="chip">
                          {t}
                        </span>
                      ))}
                    </div>
                    <a href={p.link} target="_blank" rel="noopener noreferrer" className="project__link">
                      {p.linkLabel} <Arrow dir="up-right" />
                    </a>
                  </div>
                  {p.disclosure && <p className="project__disclosure">{p.disclosure}</p>}
                </div>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <div className="projects__next glass">
            <span className="label">Próxima cohorte</span>
            <p>¿Tu organización o tu grupo de investigación podría ser el tercer caso?</p>
            <Magnetic href="#contacto" className="btn btn--ghost btn--sm">
              Postular un proyecto <Arrow />
            </Magnetic>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Modelo de impacto multiplicador                                     */
/* ------------------------------------------------------------------ */
function Loop({ active, setActive }) {
  const reduce = useReducedMotion()
  const pos = [
    [200, 68],
    [314.3, 266],
    [85.7, 266],
  ]
  return (
    <div className="loop">
      <svg viewBox="0 0 400 360" className="loop__svg" role="img" aria-label="Ciclo de impacto multiplicador">
        <defs>
          <linearGradient id="loop-g" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#3fcf98" />
            <stop offset=".55" stopColor="#4fd6dc" />
            <stop offset="1" stopColor="#ffa95c" />
          </linearGradient>
        </defs>
        <circle cx="200" cy="200" r="132" className="loop__track" />
        <circle cx="200" cy="200" r="132" className="loop__flow" stroke="url(#loop-g)" />
        {!reduce && (
          <circle r="5" className="loop__spark">
            <animateMotion dur="6s" repeatCount="indefinite" path="M200,68 a132,132 0 1,1 -0.1,0" />
          </circle>
        )}
        <g className="loop__center">
          <circle cx="200" cy="200" r="58" />
          <text x="200" y="196" textAnchor="middle">
            Comunidad
          </text>
          <text x="200" y="216" textAnchor="middle">
            Elida
          </text>
        </g>
        {MULTIPLIER.map((m, i) => (
          <g
            key={m.t}
            transform={`translate(${pos[i][0]} ${pos[i][1]})`}
            className={`loop__node ${active === i ? 'is-active' : ''}`}
            onPointerEnter={() => setActive(i)}
            onClick={() => setActive(i)}
            tabIndex={0}
            role="button"
            aria-label={m.t}
            onFocus={() => setActive(i)}
          >
            <circle r="30" />
            <text y="6" textAnchor="middle" className="mono">
              0{i + 1}
            </text>
          </g>
        ))}
      </svg>
    </div>
  )
}

export function Multiplier() {
  const [active, setActive] = useState(0)
  return (
    <section id="comunidad" className="section multiplier">
      <div className="multiplier__aurora" aria-hidden="true" />
      <div className="container">
        <SectionHead
          label="Modelo de impacto multiplicador"
          title={['Cada proyecto incubado ', { t: 'fortalece al siguiente', className: 'serif text-photon' }]}
          lead="Nuestro sistema combina tres elementos que potencian la intercooperación."
        />
        <div className="multiplier__grid">
          <Reveal>
            <Loop active={active} setActive={setActive} />
          </Reveal>
          <div className="multiplier__list">
            {MULTIPLIER.map((m, i) => (
              <Reveal key={m.t} delay={i * 0.08}>
                <button
                  className={`mult-item ${active === i ? 'is-active' : ''}`}
                  onPointerEnter={() => setActive(i)}
                  onClick={() => setActive(i)}
                >
                  <span className="mono">0{i + 1}</span>
                  <span>
                    <strong>{m.t}</strong>
                    <span className="mult-item__d">{m.d}</span>
                  </span>
                </button>
              </Reveal>
            ))}
            <Reveal delay={0.3}>
              <Magnetic href="#contacto" className="btn btn--primary">
                Quiero ser parte de este modelo <Arrow />
              </Magnetic>
            </Reveal>
          </div>
        </div>

        <div className="benefits">
          <Reveal>
            <span className="label">Beneficios para los proyectos</span>
          </Reveal>
          <div className="benefits__grid">
            {BENEFITS.map((b, i) => (
              <Reveal key={b.t} delay={i * 0.06}>
                <SpotlightCard className="benefit" tilt={3}>
                  <span className="benefit__icon" aria-hidden="true">
                    <Glyph size={18} />
                  </span>
                  <h3>{b.t}</h3>
                  <p className="muted">{b.d}</p>
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
/* Ciencia y credenciales                                              */
/* ------------------------------------------------------------------ */
export function Science() {
  return (
    <section className="section science theme-light">
      <div className="container">
        <SectionHead
          label="Ciencia detrás del método"
          title={['Rigor científico, ', { t: 'sin cientificismo', className: 'serif text-photon' }]}
          lead="Hipótesis falsables, refutar antes que confirmar y triangulación de métodos cuantitativos y cualitativos. Lo que aprendemos se publica y se vuelve bien común."
        />
        <div className="science__grid">
          {CREDENTIALS.map((c, i) => (
            <Reveal key={c.k} delay={i * 0.07}>
              <SpotlightCard className="cred" tilt={3}>
                <span className="cred__k">{c.k}</span>
                <p className="muted">{c.d}</p>
              </SpotlightCard>
            </Reveal>
          ))}
          <Reveal delay={0.1} className="science__years">
            <SpotlightCard className="cred cred--big" tilt={2}>
              <span className="cred__num">
                +<Counter to={10} />
              </span>
              <p>años en el ecosistema deeptech argentino</p>
            </SpotlightCard>
          </Reveal>
        </div>

        <Reveal>
          <div className="tool glass">
            <div className="tool__text">
              <span className="label">Herramienta propia</span>
              <h3 className="h3">Cyberseren</h3>
              <p className="muted">
                Plataforma de innovación participativa y abierta inspirada en Cybersyn, el proyecto de Stafford Beer en Chile.
                Las empresas escuchan para vender mejor; Cyberseren escucha para decidir qué producir. Lee lo que la gente ya
                escribió, como reseñas y reclamos, para hacer un diagnóstico colectivo de problemas y soluciones.
              </p>
            </div>
            <div className="tool__img">
              <img src={`${BASE}img/cyberseren.webp`} alt="Pantalla de Cyberseren con problemas reportados por la comunidad" loading="lazy" />
            </div>
          </div>
        </Reveal>
      </div>

      <div className="marquee" aria-label="Disciplinas de referencia">
        <div className="marquee__track">
          {[...DISCIPLINES, ...DISCIPLINES].map((d, i) => (
            <span key={i} className="marquee__item">
              {d}
              <Glyph size={18} />
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Dónde estamos hoy + manifiesto                                      */
/* ------------------------------------------------------------------ */
export function Now() {
  const [i, setI] = useState(0)
  const reduce = useReducedMotion()
  useEffect(() => {
    if (reduce) return
    const id = setInterval(() => setI((x) => (x + 1) % MANIFESTO.length), 4200)
    return () => clearInterval(id)
  }, [reduce])
  return (
    <section className="section now grain">
      <div className="now__aurora" aria-hidden="true" />
      <div className="container">
        <div className="now__grid">
          <div>
            <SectionHead
              label="Dónde estamos hoy"
              title={['Etapa inicial, ', { t: 'y lo decimos', className: 'serif text-photon' }]}
            />
            <Reveal delay={0.1}>
              <p className="lead">
                Hoy incubamos dos proyectos con capital paciente propio, en micro-rondas de experimentación. Para crecer
                estamos armando un financiamiento híbrido: alianzas público-privadas, competencias, subvenciones,
                coinversiones y bootstrap.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="now__ask">
                Buscamos los primeros aliados: organizaciones con un problema que nadie resuelve, grupos de investigación con
                ganas de salir del paper y financiadores que quieran capital atado a evidencia.
              </p>
            </Reveal>
          </div>
          <div className="stats">
            {[
              { v: <Counter to={2} />, l: 'proyectos en incubación' },
              { v: <Counter to={5} />, l: 'ciclos con compuerta de evidencia' },
              { v: <Counter to={6} />, l: 'criterios de evaluación' },
              { v: <Counter to={1.25} decimals={2} prefix="≈" suffix="×" />, l: 'de crecimiento orientativo por micro-ronda validada' },
            ].map((s, k) => (
              <Reveal key={k} delay={k * 0.08}>
                <div className="stat glass">
                  <span className="stat__v">{s.v}</span>
                  <span className="stat__l muted">{s.l}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="manifesto">
          <span className="label label--plain">Manifiesto</span>
          <div className="manifesto__stage" aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.p
                key={i}
                className="manifesto__line serif"
                initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -30, filter: 'blur(8px)' }}
                transition={{ duration: 0.7, ease: EASE }}
              >
                “{MANIFESTO[i]}”
              </motion.p>
            </AnimatePresence>
          </div>
          <div className="manifesto__dots">
            {MANIFESTO.map((_, k) => (
              <button key={k} className={k === i ? 'is-active' : ''} onClick={() => setI(k)} aria-label={`Frase ${k + 1}`} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Contacto                                                            */
/* ------------------------------------------------------------------ */
export function Contact() {
  const [loadCal, setLoadCal] = useState(false)
  return (
    <section id="contacto" className="section contact theme-light">
      <div className="container contact__grid">
        <div className="contact__text">
          <Reveal>
            <span className="label">Contacto</span>
          </Reveal>
          <SplitHeading
            className="h1"
            parts={['¿Tenés un problema que el mercado no atiende? ', { t: 'Empecemos por entenderlo.', className: 'serif text-photon' }]}
          />
          <Reveal delay={0.15}>
            <p className="lead">
              Agendá una llamada de diagnóstico de 15 minutos, sin costo. Contanos el problema, no la solución: eso lo
              resolvemos juntos.
            </p>
          </Reveal>
          <Reveal delay={0.25} className="contact__links">
            <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" className="contact__link glass">
              <span className="mono">WhatsApp</span>
              <span>{CONTACT.phone}</span>
              <Arrow dir="up-right" />
            </a>
            <a href={CONTACT.instagram} target="_blank" rel="noopener noreferrer" className="contact__link glass">
              <span className="mono">Instagram</span>
              <span>@pensemos.idi</span>
              <Arrow dir="up-right" />
            </a>
          </Reveal>
        </div>
        <Reveal delay={0.1}>
          <div className="cal glass ring-photon" data-cta="contacto">
            {loadCal ? (
              <iframe title="Agendar una llamada con Elida" src={CONTACT.calendly} loading="lazy" className="cal__frame" />
            ) : (
              <div className="cal__placeholder">
                <Mark size={56} />
                <p className="h3">Llamada de diagnóstico</p>
                <p className="muted">15 minutos · por videollamada · sin costo</p>
                <button className="btn btn--primary" onClick={() => setLoadCal(true)}>
                  Ver horarios disponibles <Arrow />
                </button>
                <a className="cal__alt mono" href={CONTACT.calendly.split('?')[0]} target="_blank" rel="noopener noreferrer">
                  o abrir el calendario en otra pestaña
                </a>
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Footer                                                              */
/* ------------------------------------------------------------------ */
export function Footer() {
  return (
    <footer className="footer grain">
      <div className="container">
        <div className="footer__big" aria-hidden="true">
          elida
        </div>
        <div className="footer__grid">
          <div>
            <Wordmark size={34} />
            <p className="muted footer__tag">
              Incubadora de capital paciente que convierte ciencia en soluciones de interés público.
            </p>
          </div>
          <div>
            <span className="mono footer__h">Sitio</span>
            {NAV.map((n) => (
              <a key={n.href} href={n.href}>
                {n.label}
              </a>
            ))}
          </div>
          <div>
            <span className="mono footer__h">Contacto</span>
            <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer">
              WhatsApp
            </a>
            <a href={CONTACT.instagram} target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
            <a href={`${BASE}brand/`}>Sistema de marca</a>
          </div>
        </div>
        <div className="footer__bottom mono">
          <span>© {new Date().getFullYear()} Elida Incubadora</span>
          <span>Buenos Aires · Latinoamérica</span>
        </div>
      </div>
    </footer>
  )
}
