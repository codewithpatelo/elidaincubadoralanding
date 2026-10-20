import { useEffect } from 'react'
import Lenis from 'lenis'
import { Nav, Hero, Bridge, Audiences, Offer } from './sections/Top.jsx'
import { Method, Capital, Compare } from './sections/Middle.jsx'
import { Projects, Multiplier, Science, Now, Contact, Footer } from './sections/Bottom.jsx'

function useSmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true })
    let raf
    const loop = (t) => {
      lenis.raf(t)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    const onClick = (e) => {
      const a = e.target.closest('a[href^="#"]')
      if (!a) return
      const id = a.getAttribute('href')
      if (id.length < 2) return
      const el = document.querySelector(id)
      if (!el) return
      e.preventDefault()
      lenis.scrollTo(el, { offset: id === '#top' ? 0 : -20 })
      history.replaceState(null, '', id)
    }
    document.addEventListener('click', onClick)
    return () => {
      cancelAnimationFrame(raf)
      document.removeEventListener('click', onClick)
      lenis.destroy()
    }
  }, [])
}

export default function App() {
  useSmoothScroll()
  return (
    <>
      <a href="#main" className="skip">
        Ir al contenido
      </a>
      <Nav />
      <main id="main">
        <Hero />
        <Bridge />
        <Audiences />
        <Offer />
        <Method />
        <Capital />
        <Compare />
        <Projects />
        <Multiplier />
        <Science />
        <Now />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
