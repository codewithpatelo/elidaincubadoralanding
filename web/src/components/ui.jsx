import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useMotionValue, useSpring, useReducedMotion } from 'motion/react'

const EASE = [0.22, 1, 0.36, 1]

/** Aparece al entrar en pantalla (fade + desplazamiento). */
export function Reveal({ children, delay = 0, y = 28, as = 'div', className, style, once = true, mount = false }) {
  const reduce = useReducedMotion()
  const M = motion[as] || motion.div
  return (
    <M
      className={className}
      style={style}
      initial={reduce ? false : { opacity: 0, y, filter: 'blur(6px)' }}
      {...(mount
        ? { animate: { opacity: 1, y: 0, filter: 'blur(0px)' } }
        : { whileInView: { opacity: 1, y: 0, filter: 'blur(0px)' }, viewport: { once, margin: '0px 0px -8% 0px' } })}
      transition={{ duration: 0.9, ease: EASE, delay }}
    >
      {children}
    </M>
  )
}

/**
 * Título que se revela palabra por palabra.
 * `parts` es un array de strings o {t, className} para resaltar fragmentos.
 */
export function SplitHeading({ parts, as = 'h2', className, delay = 0, stagger = 0.045 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' })
  const reduce = useReducedMotion()
  const Tag = as
  let i = 0
  const words = []
  parts.forEach((p, pi) => {
    const text = typeof p === 'string' ? p : p.t
    const cls = typeof p === 'string' ? undefined : p.className
    if (p === '\n') {
      words.push(<br key={`br-${pi}`} />)
      return
    }
    text.split(/(\s+)/).forEach((w, wi) => {
      if (!w) return
      if (/^\s+$/.test(w)) {
        words.push(' ')
        return
      }
      const idx = i++
      words.push(
        <span key={`${pi}-${wi}`} style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'top', paddingBottom: '0.08em', marginBottom: '-0.08em' }}>
          <motion.span
            className={cls}
            style={{ display: 'inline-block' }}
            initial={reduce ? false : { y: '105%' }}
            animate={inView ? { y: '0%' } : undefined}
            transition={{ duration: 0.9, ease: EASE, delay: delay + idx * stagger }}
          >
            {w}
          </motion.span>
        </span>
      )
    })
  })
  return (
    <Tag ref={ref} className={className}>
      {words}
    </Tag>
  )
}

/** Botón/enlace magnético: se acerca levemente al cursor. */
export function Magnetic({ children, strength = 0.25, className, href, onClick, target, rel, ariaLabel }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 })
  const onMove = (e) => {
    if (e.pointerType === 'touch') return
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * strength)
    y.set((e.clientY - (r.top + r.height / 2)) * strength)
  }
  const reset = () => {
    x.set(0)
    y.set(0)
  }
  const Comp = href ? motion.a : motion.button
  return (
    <Comp
      ref={ref}
      href={href}
      target={target}
      rel={rel}
      aria-label={ariaLabel}
      onClick={onClick}
      className={className}
      style={{ x: sx, y: sy }}
      onPointerMove={onMove}
      onPointerLeave={reset}
      whileTap={{ scale: 0.97 }}
    >
      {children}
    </Comp>
  )
}

/** Tarjeta con luz que sigue al cursor y leve inclinación 3D. */
export function SpotlightCard({ children, className = '', tilt = 4, style, as = 'div', ...rest }) {
  const ref = useRef(null)
  const rx = useMotionValue(0)
  const ry = useMotionValue(0)
  const srx = useSpring(rx, { stiffness: 150, damping: 20 })
  const sry = useSpring(ry, { stiffness: 150, damping: 20 })
  const reduce = useReducedMotion()
  const onMove = (e) => {
    const el = ref.current
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top) / r.height
    el.style.setProperty('--mx', `${px * 100}%`)
    el.style.setProperty('--my', `${py * 100}%`)
    if (!reduce && e.pointerType !== 'touch') {
      ry.set((px - 0.5) * tilt)
      rx.set(-(py - 0.5) * tilt)
    }
  }
  const reset = () => {
    rx.set(0)
    ry.set(0)
  }
  const M = motion[as] || motion.div
  return (
    <M
      ref={ref}
      className={`glass spotlight ${className}`}
      style={{ rotateX: srx, rotateY: sry, transformPerspective: 900, ...style }}
      onPointerMove={onMove}
      onPointerLeave={reset}
      {...rest}
    >
      {children}
    </M>
  )
}

/** Contador que sube al entrar en pantalla. */
export function Counter({ to, decimals = 0, prefix = '', suffix = '', duration = 1.6 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const reduce = useReducedMotion()
  const [val, setVal] = useState(reduce ? to : 0)
  useEffect(() => {
    if (reduce) {
      setVal(to)
      return
    }
    if (!inView) return
    let raf
    const start = performance.now()
    const tick = (now) => {
      const p = Math.min(1, (now - start) / (duration * 1000))
      const eased = 1 - Math.pow(1 - p, 4)
      setVal(p < 1 ? to * eased : to)
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, to, duration, reduce])
  return (
    <span ref={ref}>
      {prefix}
      {val.toLocaleString('es-AR', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}
      {suffix}
    </span>
  )
}

export function Arrow({ size = 16, dir = 'right' }) {
  const rot = { right: 0, down: 90, left: 180, up: -90, 'up-right': -45 }[dir]
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" style={{ transform: `rotate(${rot}deg)` }} aria-hidden="true">
      <path d="M2 8h11M9 3.5 13.5 8 9 12.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function SectionHead({ label, title, lead, align = 'left', className = '' }) {
  return (
    <div className={`section-head section-head--${align} ${className}`}>
      {label && (
        <Reveal>
          <span className="label">{label}</span>
        </Reveal>
      )}
      <SplitHeading parts={title} className="h2" />
      {lead && (
        <Reveal delay={0.15}>
          <p className="lead">{lead}</p>
        </Reveal>
      )}
    </div>
  )
}
