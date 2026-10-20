// Todo el texto del sitio vive acá, alineado con el Documento Fundacional
// y el Marco CUESDA. Cambiar el copy no requiere tocar componentes.

export const CONTACT = {
  calendly:
    'https://calendly.com/pensemosidi/15min?hide_event_type_details=1&hide_gdpr_banner=1&background_color=f5f4ee&text_color=171d10&primary_color=556b2f',
  whatsapp: 'https://wa.me/541165673881',
  phone: '+54 11 6567 3881',
  instagram: 'https://www.instagram.com/pensemos.idi',
}

export const NAV = [
  { href: '#enfoque', label: 'Enfoque' },
  { href: '#metodo', label: 'Método' },
  { href: '#proyectos', label: 'Proyectos' },
  { href: '#comunidad', label: 'Comunidad' },
  { href: '#contacto', label: 'Contacto' },
]

export const AUDIENCES = [
  {
    key: 'comunidades',
    name: 'Comunidades y organizaciones',
    who: 'Cooperativas, mutuales, sindicatos, asociaciones civiles, municipios y empresas públicas.',
    pain: 'Problemas que explotan antes de verse, ideas sin método y dependencia de los ciclos electorales.',
    gain: 'Diagnóstico de raíz, experimentos baratos y capital por etapas.',
    color: 'var(--emerald-400)',
  },
  {
    key: 'emprendimientos',
    name: 'Emprendimientos sociales',
    who: 'Empresas sociales en etapa temprana, con propósito claro e ingresos todavía inestables.',
    pain: 'Una audiencia que no se convierte en ingresos estables y un modelo frágil, difícil de escalar.',
    gain: 'Propuesta de valor validada, ingresos previsibles y un camino hacia la escala.',
    color: 'var(--sun-400)',
  },
  {
    key: 'ciencia',
    name: 'Ciencia',
    who: 'Grupos de investigación, universidades, CONICET, INTI y laboratorios.',
    pain: 'Resultados que no salen del paper y una vinculación sin rumbo.',
    gain: 'Problemas reales, una contraparte organizada y transferencia con impacto medible.',
    color: 'var(--cyan-400)',
  },
  {
    key: 'financiadores',
    name: 'Financiadores y aliados',
    who: 'Estado, bancos de desarrollo, fondos de impacto y federaciones cooperativas.',
    pain: 'Hay financiamiento pero falta know-how, y el riesgo sistémico es difícil de medir.',
    gain: 'Capital que se libera atado a evidencia y una rúbrica de 6 criterios para evaluarlo.',
    color: 'var(--olive-300)',
  },
]

export const OFFER = [
  {
    t: 'Investigación profunda de problema',
    d: 'Diagnóstico de causas raíz con métodos cuantitativos y cualitativos: ciencia de datos, IA, investigación-acción participativa, etnografía y trabajo de campo.',
  },
  {
    t: 'Puente ciencia–comunidad',
    d: 'Vinculamos el problema validado con la línea de investigación que puede resolverlo.',
  },
  {
    t: 'Diseño de la intervención',
    d: 'Rediseñamos incentivos, gobernanza y flujos; no solo el producto.',
  },
  {
    t: 'Capital paciente iterativo',
    d: 'Micro-rondas que crecen si el experimento valida y se achican si falla, con instrumentos que expiran al alcanzar un múltiplo pactado.',
  },
  {
    t: 'Comunidad recíproca',
    d: 'Banco solidario de tiempo, finanzas solidarias rotativas y una red de proyectos incubados.',
  },
]

export const FIELDS = [
  {
    t: 'Innovación pública',
    d: 'Govtech, ciudades inteligentes, democracia digital, política basada en evidencia, gobierno abierto y ciencia ciudadana.',
  },
  {
    t: 'Innovación social',
    d: 'Cooperativas y regenerativas, empresas sociales, sindicatos y asociaciones civiles.',
  },
  {
    t: 'Transferencia científica',
    d: 'Proyectos de base científica con cadenas de valor regenerativas.',
  },
]

export const CYCLES = [
  {
    n: '0',
    name: 'Sentido',
    q: '¿Para qué y para quién trabajamos?',
    tools: ['Pregunta creativo-genésica', 'Lienzo de búsqueda de sentido', 'Cadena de sentido', 'Propósito matriz transformador'],
    gate: 'Propósito, nicho y beneficiarios escritos en una página.',
  },
  {
    n: '1',
    name: 'Cuestión profunda',
    q: '¿Cuál es el problema real y qué lo perpetúa?',
    tools: ['Mapa de actores', 'Entrevistas de problema', 'Amplitud · profundidad · urgencia', '5 por qué', 'Diagrama causal'],
    gate: 'Problema validado con quienes lo viven y mecanismo raíz nombrado.',
  },
  {
    n: '2',
    name: 'Diseño de intervención',
    q: '¿Qué palanca cambiamos y qué asumimos al hacerlo?',
    tools: ['Señales de cambio', 'Futuros posibles y preferibles', 'Las 4 preguntas', 'Sprint de diseño', '6 sombreros'],
    gate: 'Hipótesis de intervención y mapa de presunciones priorizado por riesgo.',
  },
  {
    n: '3',
    name: 'Refutación experimental',
    q: '¿Qué de lo que asumimos es falso?',
    tools: ['Sprints de 2 semanas', 'Plan de métricas', 'Entrevistas de solución', 'Piloto con MVP'],
    gate: 'Rúbrica de 6 criterios en B- o más; presunciones críticas convertidas en conocimiento.',
  },
  {
    n: '4',
    name: 'Consolidación y réplica',
    q: '¿Cómo se sostiene y se copia sin nosotros?',
    tools: ['Lienzo regenerativo', 'Teoría del cambio', 'Diseño de gobernanza', 'Divulgación'],
    gate: 'Re-valuación, inversión mayor y primer caso de réplica.',
  },
]

export const PROCESS = [
  { t: 'Diagnóstico', d: 'Análisis integral del proyecto, su contexto y sus capacidades organizacionales.' },
  { t: 'Evaluación', d: 'De lo económico a lo socioambiental, con la rúbrica de 6 criterios.' },
  { t: 'Valuación', d: 'Modelado financiero y necesidades de capital por etapas.' },
  { t: 'Acompañamiento', d: 'Soporte estratégico y liberación iterativa de capital según los hitos alcanzados.' },
]

export const RUBRIC = [
  { k: 'Solvencia', dim: 'Económico' },
  { k: 'Factibilidad', dim: 'Técnico' },
  { k: 'Replicabilidad', dim: 'Operativo' },
  { k: 'Trascendencia', dim: 'Socioambiental' },
  { k: 'Viabilidad', dim: 'Organizacional' },
  { k: 'Originalidad', dim: 'Diferencial' },
]

export const COMPARISON = [
  {
    alt: 'Aceleradora / venture capital',
    opt: 'Crecimiento exponencial y salida',
    lack: 'Paciencia; problemas sin mercado obvio',
    elida: 'Capital paciente; éxito medido en transformación y solvencia',
  },
  {
    alt: 'Filantropía / ONG',
    opt: 'Impacto social inmediato',
    lack: 'Sostenibilidad económica; causas raíz',
    elida: 'Organizaciones solventes que atacan la raíz',
  },
  {
    alt: 'Consultoría',
    opt: 'Diagnóstico y recomendación',
    lack: 'Piel en el juego; continuidad',
    elida: 'Capital propio atado a resultados',
  },
  {
    alt: 'Vinculación tecnológica clásica',
    opt: 'Del paper a la industria',
    lack: 'Participación de quienes viven el problema',
    elida: 'Co-diseño con la comunidad desde el día uno',
  },
]

export const PROJECTS = [
  {
    key: 'binsai',
    name: 'Binsai',
    kicker: 'Sabiduría artificial · Código abierto',
    title: 'IA que decide por qué, cuándo y si conviene actuar',
    body: 'Biblioteca de Python de código abierto (GPL-3.0) que suma regulación bio-inspirada a agentes de IA: motivaciones, puntos de equilibrio y autorregulación, sobre los frameworks que ya existen. Es investigación propia convertida en bien común y el primer prototipo de lo que llamamos sabiduría artificial.',
    tags: ['IA agéntica', 'Cibernética', 'GPL-3.0'],
    status: 'MVP 1 · v0.3.0',
    link: 'https://github.com/codewithpatelo/binsai.py',
    linkLabel: 'Ver en GitHub',
    lineage: ['Springer CCIS · 2019', 'ICML 2026 · LatinX in AI', 'RSLA · 2026'],
  },
  {
    key: 'casa',
    name: 'Casa Creativa',
    kicker: 'Empresa social · Economía circular',
    title: 'Decoración accesible asistida por IA',
    body: 'Asesorías de decoración con IA para transformar la casa con lo que ya tenés: renovar un mueble, rearmar un ambiente o construir una paleta. Continuidad de MagiaDecoLab. Con CUESDA trabajamos el paso de audiencia a ingresos estables.',
    tags: ['Empresa social', 'Suprareciclaje', 'IA aplicada'],
    status: 'En incubación',
    link: 'https://www.lacasacreativaia.com/',
    linkLabel: 'Visitar sitio',
    disclosure: 'Transparencia: Casa Creativa es liderada por Ceci Gerpe, hermana del fundador de Elida.',
  },
]

export const MULTIPLIER = [
  {
    t: 'Finanzas solidarias rotativas',
    d: 'Las ganancias de los emprendimientos se reinyectan en futuros proyectos, generando un círculo virtuoso de desarrollo.',
  },
  {
    t: 'Cadenas de favores',
    d: 'Al ser incubado, cada proyecto recibe horas de mentoría sin costo, siempre que se comprometa a ofrecerlas a futuras generaciones. Así se forma un círculo de apoyo: el banco solidario de tiempo.',
  },
  {
    t: 'Red de apoyo',
    d: 'Quien forma parte de la comunidad Elida accede a una red de emprendedores que acompañan el desarrollo de sus proyectos.',
  },
]

export const BENEFITS = [
  { t: 'Reducción de riesgos', d: 'Validación rigurosa que minimiza riesgos sistémicos y garantiza impacto real.' },
  { t: 'Capital previsible', d: 'Financiamiento por etapas, alineado con el cumplimiento de hitos.' },
  { t: 'Acompañamiento especializado', d: 'Mentoría estratégica con quienes entienden las necesidades del sector social.' },
  { t: 'Adaptación local', d: 'Metodologías ajustadas al contexto latinoamericano.' },
  { t: 'Conexión con actores clave', d: 'Vínculos con científicos, universidades, empresas y profesionales.' },
]

export const CREDENTIALS = [
  { k: 'Springer', d: 'Publicación en CCIS (2019) sobre agentes declarativos: el origen de la línea de investigación detrás de Binsai.' },
  { k: 'ICML 2026', d: 'Trabajo presentado en el workshop LatinX in AI sobre regulación de agentes.' },
  { k: 'UBA', d: 'Formación en la Maestría en Ciencia de Datos de la Universidad de Buenos Aires.' },
  { k: 'Hult Prize', d: 'Know-how emprendedor del programa global Hult Prize Business Accelerator.' },
]

export const DISCIPLINES = [
  'Teoría de sistemas',
  'Cibernética',
  'Ciencias de la complejidad',
  'Ecología',
  'Ciencia de datos e IA',
  'Investigación operativa',
  'Economía comportamental',
  'Ciencias cognitivas',
  'Investigación-acción participativa',
  'Diseño de futuros',
]

export const MANIFESTO = [
  'Estamos equivocados; solo que todavía no sabemos cómo.',
  'Solo nos va bien si les va bien a quienes servimos.',
  'No aspiramos a ser los mejores del mundo, sino los mejores para el mundo.',
]
