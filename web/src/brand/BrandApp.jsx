import { useState } from 'react'
import { Mark, Wordmark } from '../components/Logo.jsx'
import LiquidMetal from '../components/LiquidMetal.jsx'
import { Reveal, SpotlightCard, Magnetic, Arrow } from '../components/ui.jsx'

const BASE = import.meta.env.BASE_URL

const PALETTES = [
  {
    name: 'Oliva',
    role: 'Color principal. Fondos profundos, texto sobre claro, superficies de marca.',
    steps: [
      ['50', '#f4f6ec'],
      ['100', '#e6ebd6'],
      ['200', '#cdd6ae'],
      ['300', '#b0be84'],
      ['400', '#8fa35e'],
      ['500', '#6e8540'],
      ['600', '#556b2f'],
      ['700', '#3f5023'],
      ['800', '#2a351a'],
      ['900', '#171d10'],
      ['950', '#0c0f09'],
    ],
  },
  {
    name: 'Neutros',
    role: 'Blanco hueso y grises cálidos. Fondos claros, texto secundario, líneas.',
    steps: [
      ['paper', '#fbfbf8'],
      ['bone', '#f5f4ee'],
      ['100', '#ecebe5'],
      ['200', '#d9d8d0'],
      ['300', '#bdbcb3'],
      ['400', '#9d9d94'],
      ['500', '#7b7c73'],
      ['600', '#5d5e57'],
      ['700', '#42433d'],
      ['800', '#2a2b27'],
    ],
  },
  {
    name: 'Esmeralda',
    role: 'Acento vital: estados positivos, validación, comunidad.',
    steps: [
      ['300', '#7fe3bd'],
      ['400', '#3fcf98'],
      ['500', '#17b07a'],
      ['600', '#0e8a60'],
    ],
  },
  {
    name: 'Cian',
    role: 'Acento tecnológico: datos, foco, interacción, brillos.',
    steps: [
      ['300', '#8be8ea'],
      ['400', '#4fd6dc'],
      ['500', '#1fbcc6'],
      ['600', '#128f99'],
    ],
  },
  {
    name: 'Sol',
    role: 'Acento cálido y escaso: alertas suaves, refutación, calidez humana.',
    steps: [
      ['300', '#ffc98f'],
      ['400', '#ffa95c'],
      ['500', '#f08a3c'],
      ['600', '#c8641f'],
    ],
  },
]

const GRADS = [
  { n: 'Aurora', v: 'var(--grad-aurora)', d: 'Gradiente insignia para fondos de héroe y secciones de cierre. Domina el verde; el naranja aparece solo en un borde.' },
  { n: 'Fotón', v: 'var(--grad-photon)', d: 'Lineal. Para palabras destacadas, trazos, barras de progreso y bordes finos.' },
  { n: 'Cromo oliva', v: 'var(--grad-chrome)', d: 'Superficies metálicas: chips especiales, íconos 3D, detalles de lujo técnico.' },
  { n: 'Sol', v: 'var(--grad-sun)', d: 'Solo para un acento puntual por vista.' },
]

const TYPE = [
  { k: 'Display', cls: 'display', s: 'clamp(44px → 104px) · 500 · -4,5%', t: 'Ciencia para lo común' },
  { k: 'H1', cls: 'h1', s: 'clamp(36px → 68px) · 500 · -3,5%', t: 'Capital paciente' },
  { k: 'H2', cls: 'h2', s: 'clamp(30px → 50px) · 500 · -3,5%', t: 'Enamorarse del problema' },
  { k: 'H3', cls: 'h3', s: 'clamp(20px → 26px) · 500 · -2%', t: 'Refutación experimental' },
  { k: 'Lead', cls: 'lead', s: 'clamp(17px → 21px) · 400', t: 'Co-diseñadas con quienes viven el problema y financiadas a medida que la evidencia lo justifica.' },
  { k: 'Body', cls: '', s: '16px · 400 · 1,6', t: 'Hipótesis falsables, refutar antes que confirmar y triangulación de métodos cuantitativos y cualitativos.' },
]

function copy(text, set) {
  try {
    navigator.clipboard.writeText(text)
    set(text)
    setTimeout(() => set(''), 1200)
  } catch {
    /* sin portapapeles */
  }
}

function Section({ id, n, title, intro, children, light }) {
  return (
    <section id={id} className={`b-sec ${light ? 'theme-light' : ''}`}>
      <div className="container">
        <Reveal className="b-sec__head">
          <span className="mono b-sec__n">{n}</span>
          <h2 className="h2">{title}</h2>
          {intro && <p className="lead">{intro}</p>}
        </Reveal>
        {children}
      </div>
    </section>
  )
}

export default function BrandApp() {
  const [copied, setCopied] = useState('')
  return (
    <>
      <header className="b-hero grain">
        <LiquidMetal className="b-hero__metal" />
        <div className="container b-hero__inner">
          <a href={`${BASE}../`} className="b-back mono">
            <Arrow dir="left" size={14} /> elidaincubadora.com
          </a>
          <Wordmark size={44} />
          <h1 className="display">
            Sistema de <span className="serif text-photon">marca</span>
          </h1>
          <p className="lead">
            Solarpunk deeptech: alta tecnología al servicio de lo vivo y de lo común. Este documento define cómo se ve, se lee y
            se mueve Elida. Versión 1.0, octubre 2026.
          </p>
          <nav className="b-toc mono" aria-label="Secciones">
            {['Esencia', 'Logo', 'Color', 'Gradientes', 'Tipografía', 'Superficies', 'Componentes', 'Movimiento', 'Imágenes', 'Tokens'].map((s, i) => (
              <a key={s} href={`#${s.toLowerCase()}`}>
                <span>0{i}</span>
                {s}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <Section id="esencia" n="00" title="Esencia" intro="Tres rasgos que guían cada decisión visual y de tono.">
        <div className="b-grid3">
          {[
            ['Visionaria', 'Ambición civilizatoria con pasos verificables. Protopía, no utopía: grande en el horizonte, concreta en el lunes.'],
            ['Rigurosa', 'Ciencia sin cientificismo. Mostramos el dato y el mecanismo; nunca prometemos más de lo que la evidencia sostiene.'],
            ['Comunitaria', 'La comunidad co-diseña. El tono es fraterno, cercano y en voseo; hablamos con las personas, no sobre ellas.'],
          ].map(([t, d]) => (
            <SpotlightCard key={t} className="b-card">
              <h3 className="h3">{t}</h3>
              <p className="muted">{d}</p>
            </SpotlightCard>
          ))}
        </div>
        <div className="b-voice">
          <div>
            <span className="label">Así hablamos</span>
            <ul>
              <li>“Liberamos capital a medida que la evidencia lo justifica.”</li>
              <li>“Contanos el problema, no la solución.”</li>
              <li>“Etapa inicial, y lo decimos.”</li>
            </ul>
          </div>
          <div>
            <span className="label" style={{ '--accent': 'var(--sun-400)' }}>
              Así no
            </span>
            <ul className="is-dont">
              <li>“Revolucionamos el ecosistema con soluciones disruptivas.”</li>
              <li>Métricas infladas o logos de aliados que no lo son.</li>
              <li>Tuteo neutro (“agenda”, “descubre”): usamos voseo.</li>
            </ul>
          </div>
        </div>
      </Section>

      <Section id="logo" n="01" title="Logo" intro="Logo oficial: un árbol que es a la vez circuito y crece hacia un perfil humano, dentro de un círculo con el gradiente de la marca: oliva, esmeralda, cian y un brillo cálido. Ciencia, naturaleza y personas en una sola forma." light>
        <div className="b-logos">
          <div className="b-logo b-logo--dark">
            <Wordmark size={64} />
          </div>
          <div className="b-logo b-logo--light">
            <span style={{ color: 'var(--olive-900)' }}>
              <Wordmark size={64} />
            </span>
          </div>
          <div className="b-logo b-logo--aurora">
            <Mark size={120} />
          </div>
          <div className="b-logo b-logo--light b-logo--anatomy">
            <Mark size={180} />
            <span className="b-anat b-anat--1 mono">círculo fotón</span>
            <span className="b-anat b-anat--2 mono">circuito</span>
            <span className="b-anat b-anat--3 mono">hojas</span>
            <span className="b-anat b-anat--4 mono">perfil humano</span>
          </div>
        </div>
        <div className="b-rules">
          <p>
            <strong>Área de respeto:</strong> un cuarto del diámetro del círculo a cada lado.
          </p>
          <p>
            <strong>Tamaño mínimo:</strong> 20 px el isotipo, 96 px el logotipo completo.
          </p>
          <p>
            <strong>Versiones:</strong> el círculo funciona sobre fondos oscuros, claros y aurora. El logotipo
            “elida” va en hueso sobre oscuro y en oliva-900 sobre claro.
          </p>
          <p>
            <strong>No:</strong> rotar, cambiar el gradiente del círculo, deformarlo, ponerle sombras o encerrarlo en otras formas.
          </p>
        </div>
      </Section>

      <Section id="color" n="02" title="Color" intro="Verde oliva, blanco hueso y grises cálidos como base. Esmeralda, cian y sol como acentos. Tocá un color para copiar el hex.">
        <div className="b-ratio">
          <span style={{ flex: 6, background: 'var(--olive-950)' }}>60 · Oliva profundo</span>
          <span style={{ flex: 3, background: 'var(--bone)', color: 'var(--olive-900)' }}>30 · Hueso y grises</span>
          <span style={{ flex: 1, background: 'var(--grad-photon)', color: 'var(--olive-950)' }}>10 · Acentos</span>
        </div>
        <div className="b-palettes">
          {PALETTES.map((p) => (
            <div key={p.name} className="b-pal">
              <div className="b-pal__head">
                <h3 className="h3">{p.name}</h3>
                <p className="muted">{p.role}</p>
              </div>
              <div className="b-pal__row">
                {p.steps.map(([k, hex]) => (
                  <button key={k} className="b-sw" style={{ background: hex }} onClick={() => copy(hex, setCopied)} title={`Copiar ${hex}`}>
                    <span className="b-sw__k mono">{k}</span>
                    <span className="b-sw__hex mono">{copied === hex ? 'copiado' : hex}</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section id="gradientes" n="03" title="Gradientes" intro="Siempre domina el verde. Los tonos cálidos entran como luz de atardecer, nunca como fondo completo." light>
        <div className="b-grads">
          {GRADS.map((g) => (
            <div key={g.n} className="b-grad">
              <div className="b-grad__sw grain" style={{ background: g.v }} />
              <h3 className="h3">{g.n}</h3>
              <p className="muted">{g.d}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="tipografía" n="04" title="Tipografía" intro="Instrument Sans para todo; Instrument Serif itálica para la palabra que importa; JetBrains Mono para etiquetas, datos y numeración.">
        <div className="b-fonts">
          <div className="b-font">
            <span className="b-font__aa">Aa</span>
            <div>
              <h3 className="h3">Instrument Sans</h3>
              <p className="muted">Títulos y cuerpo · 400 · 500 · 600</p>
            </div>
          </div>
          <div className="b-font">
            <span className="b-font__aa serif">Aa</span>
            <div>
              <h3 className="h3">Instrument Serif Italic</h3>
              <p className="muted">Énfasis: una o dos palabras por título, con gradiente fotón.</p>
            </div>
          </div>
          <div className="b-font">
            <span className="b-font__aa mono" style={{ fontSize: '0.7em' }}>
              Aa
            </span>
            <div>
              <h3 className="h3">JetBrains Mono</h3>
              <p className="muted">Etiquetas en mayúsculas (+14%), números de sección, datos.</p>
            </div>
          </div>
        </div>
        <div className="b-scale">
          {TYPE.map((t) => (
            <div key={t.k} className="b-scale__row">
              <div className="mono b-scale__meta">
                <strong>{t.k}</strong>
                <span>{t.s}</span>
              </div>
              <p className={t.cls} style={{ margin: 0 }}>
                {t.k === 'Display' ? (
                  <>
                    Ciencia para lo <span className="serif text-photon">común</span>
                  </>
                ) : (
                  t.t
                )}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="superficies" n="05" title="Superficies" intro="Vidrio, metal líquido y grano. Las tres juntas dan la sensación de tecnología orgánica." light>
        <div className="b-surf">
          <div className="b-surf__stage grain">
            <div className="b-surf__blob" />
            <div className="glass b-surf__glass">
              <span className="label">Glass</span>
              <p>Fondo translúcido, desenfoque 18 px, borde de 1 px y luz interior arriba.</p>
            </div>
          </div>
          <div className="b-surf__stage b-surf__stage--chrome">
            <div className="chrome b-surf__chrome" />
            <div>
              <span className="label">Cromo oliva</span>
              <p className="muted">Metal pulido con reflejos verdes. Para objetos, no para fondos de texto.</p>
            </div>
          </div>
          <div className="b-surf__stage b-surf__stage--grain grain">
            <div>
              <span className="label">Grano</span>
              <p className="muted">Ruido fractal al 11% en modo overlay sobre gradientes, para que no se vean digitales planos.</p>
            </div>
          </div>
        </div>
      </Section>

      <Section id="componentes" n="06" title="Componentes" intro="Piezas base del sitio. Pasá el cursor: todo reacciona.">
        <div className="b-comp">
          <div className="b-comp__row">
            <Magnetic className="btn btn--primary">
              Botón primario <Arrow />
            </Magnetic>
            <Magnetic className="btn btn--ghost">Botón secundario</Magnetic>
            <button className="btn btn--primary btn--sm">Chico</button>
          </div>
          <div className="b-comp__row">
            <span className="label">Etiqueta de sección</span>
            <span className="chip">
              <span className="dot" /> Chip con estado
            </span>
            <span className="chip">Sprint de 2 semanas</span>
          </div>
          <div className="b-grid3">
            <SpotlightCard className="b-card">
              <span className="mono b-sec__n">Card</span>
              <h3 className="h3">Tarjeta con luz</h3>
              <p className="muted">Vidrio con un foco que sigue al cursor y una inclinación 3D de 4°.</p>
            </SpotlightCard>
            <div className="glass ring-photon b-card">
              <span className="mono b-sec__n">Panel</span>
              <h3 className="h3">Panel destacado</h3>
              <p className="muted">Borde de 1 px con gradiente fotón para el contenido principal de una sección.</p>
            </div>
            <div className="b-card b-card--stat glass">
              <span className="b-stat">1,25×</span>
              <p className="muted">Dato grande: Instrument Sans 500, -5% de espaciado.</p>
            </div>
          </div>
        </div>
      </Section>

      <Section id="movimiento" n="07" title="Movimiento" intro="El sitio reacciona a lo que hace la persona, sin pedir atención." light>
        <div className="b-grid3">
          {[
            ['Curva', 'cubic-bezier(.22, 1, .36, 1) para entradas; .65, 0, .35, 1 para loops. Nada lineal salvo marquesinas.'],
            ['Duraciones', '180 ms para hover, 360 ms para estados, 900 ms para revelados. Nunca más de 1,2 s.'],
            ['Reactividad', 'Metal líquido que sigue al cursor, botones magnéticos, focos en tarjetas y diagramas que se activan al pasar.'],
            ['Revelado', 'Títulos palabra por palabra; párrafos con fade, 28 px de recorrido y desenfoque que se limpia.'],
            ['Datos vivos', 'Contadores que suben al entrar en pantalla y diagramas con partículas que muestran flujos.'],
            ['Accesibilidad', 'Con “reducir movimiento” todo queda estático y legible. Ninguna información depende de una animación.'],
          ].map(([t, d]) => (
            <div key={t} className="b-card glass">
              <h3 className="h3">{t}</h3>
              <p className="muted">{d}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="imágenes" n="08" title="Imágenes" intro="Preferimos lo generativo y lo real a la foto de stock.">
        <div className="b-voice">
          <div>
            <span className="label">Sí</span>
            <ul>
              <li>Renders cromados y fluidos con la paleta de marca.</li>
              <li>Macro de naturaleza: hojas, micelio, agua, luz atravesando vidrio.</li>
              <li>Fotos reales de los equipos y comunidades con quienes trabajamos.</li>
              <li>Diagramas de sistemas: nodos, flujos y ciclos.</li>
            </ul>
          </div>
          <div>
            <span className="label" style={{ '--accent': 'var(--sun-400)' }}>
              No
            </span>
            <ul className="is-dont">
              <li>Stock de gente sonriendo con un apretón de manos.</li>
              <li>Íconos genéricos de bombita, cohete u engranaje.</li>
              <li>Fotos de fábricas o paneles solares sin contexto real.</li>
            </ul>
          </div>
        </div>
      </Section>

      <Section id="tokens" n="09" title="Tokens" intro="Todo vive en variables CSS. Importá tokens.css y usá los roles semánticos en vez de los hex." light>
        <pre className="b-code">
          <code>{`/* web/src/styles/tokens.css */
background: var(--bg);           /* oliva-950 en oscuro, hueso en claro */
color: var(--text);
border: 1px solid var(--line);
accent-color: var(--accent);     /* esmeralda */

/* Secciones claras: agregar la clase */
<section class="theme-light">…</section>

/* Gradientes */
background: var(--grad-aurora);
background: var(--grad-photon);

/* Movimiento */
transition: transform var(--dur-base) var(--ease-out);`}</code>
        </pre>
      </Section>

      <footer className="b-foot">
        <div className="container">
          <Wordmark size={30} />
          <span className="mono muted">Sistema de marca v1.0 · Elida Incubadora</span>
        </div>
      </footer>
    </>
  )
}
