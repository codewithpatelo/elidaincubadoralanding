import { useEffect, useRef } from 'react'

/**
 * Gota de metal líquido iridiscente (WebGL, sin dependencias).
 * Reacciona al cursor: se deforma hacia él y el reflejo sigue la luz.
 * Si WebGL no está disponible o el usuario pidió menos movimiento,
 * queda un fallback estático en CSS.
 */
const VERT = `
attribute vec2 a_pos;
void main(){ gl_Position = vec4(a_pos, 0.0, 1.0); }
`

const FRAG = `
precision highp float;
uniform vec2 u_res;
uniform float u_time;
uniform vec2 u_mouse;      // en píxeles del canvas
uniform vec2 u_center;     // centro de la gota en coordenadas normalizadas
uniform float u_radius;
uniform float u_energy;    // 0..1 velocidad del cursor

float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453123); }
float noise(vec2 p){
  vec2 i = floor(p), f = fract(p);
  vec2 u = f*f*(3.0-2.0*f);
  return mix(mix(hash(i), hash(i+vec2(1.0,0.0)), u.x),
             mix(hash(i+vec2(0.0,1.0)), hash(i+vec2(1.0,1.0)), u.x), u.y);
}
float fbm(vec2 p){
  float v = 0.0, a = 0.5;
  mat2 m = mat2(1.6, 1.2, -1.2, 1.6);
  for (int i = 0; i < 5; i++){ v += a*noise(p); p = m*p; a *= 0.5; }
  return v;
}
float field(vec2 p){
  float t = u_time;
  vec2 q = vec2(fbm(p + 0.05*t), fbm(p + vec2(5.2,1.3) - 0.045*t));
  vec2 r = vec2(fbm(p + 3.0*q + vec2(1.7,9.2) + 0.07*t), fbm(p + 3.0*q + vec2(8.3,2.8) - 0.05*t));
  return fbm(p + 2.4*r);
}

// Paleta de marca: oliva profundo -> oliva -> esmeralda -> cian -> sol
vec3 pal(float t){
  t = fract(t);
  vec3 c0 = vec3(0.10,0.13,0.07);
  vec3 c1 = vec3(0.43,0.52,0.25);
  vec3 c2 = vec3(0.25,0.81,0.60);
  vec3 c3 = vec3(0.31,0.84,0.86);
  vec3 c4 = vec3(0.94,0.62,0.36);
  vec3 c5 = vec3(0.92,0.94,0.88);
  if (t < 0.2) return mix(c0, c1, t/0.2);
  if (t < 0.4) return mix(c1, c2, (t-0.2)/0.2);
  if (t < 0.6) return mix(c2, c3, (t-0.4)/0.2);
  if (t < 0.78) return mix(c3, c5, (t-0.6)/0.18);
  if (t < 0.9) return mix(c5, c4, (t-0.78)/0.12);
  return mix(c4, c0, (t-0.9)/0.1);
}

void main(){
  vec2 p = (gl_FragCoord.xy - 0.5*u_res) / u_res.y;
  vec2 m = (u_mouse - 0.5*u_res) / u_res.y;
  vec2 c = u_center;

  // la gota se inclina levemente hacia el cursor
  vec2 toM = m - c;
  c += toM * 0.06;

  vec2 d = p - c;
  float dist = length(d);
  float ang = atan(d.y, d.x);
  vec2 dir = d / max(dist, 1e-4);
  float wob = (noise(dir*1.4 + vec2(u_time*0.12, -u_time*0.09)) - 0.5) * 0.30
            + (noise(dir*2.6 - vec2(u_time*0.07, u_time*0.11)) - 0.5) * 0.12
            + 0.04*sin(ang*3.0 + u_time*0.5);
  float R = u_radius * (1.0 + wob);

  // abultamiento hacia el cursor
  float pull = exp(-pow(length(p - m), 2.0) * 7.0) * (0.035 + 0.22*u_energy);
  float sdf = dist - R - pull*u_radius*1.4;

  float alpha = 1.0 - smoothstep(-0.004, 0.004, sdf);

  // superficie: domo + detalle fluido
  vec2 dome = d / max(R, 1e-3);
  vec2 sp = p*1.15 + vec2(0.0, u_time*0.02);
  float e = 0.004;
  float h  = field(sp);
  float hx = field(sp + vec2(e, 0.0));
  float hy = field(sp + vec2(0.0, e));
  vec2 grad = vec2(h - hx, h - hy) / e;
  float z = sqrt(max(0.04, 1.0 - dot(dome, dome)));
  vec3 n = normalize(vec3(dome*1.25 + grad*0.065, z));

  vec3 v = vec3(0.0, 0.0, 1.0);
  vec3 r = reflect(-v, n);

  // luz principal sigue al cursor
  vec3 L = normalize(vec3(m - p + vec2(0.0, 0.25), 0.9));
  float spec = pow(max(dot(r, L), 0.0), 36.0);
  float spec2 = pow(max(dot(r, normalize(vec3(-0.6, 0.7, 0.6))), 0.0), 18.0);
  float fres = pow(1.0 - max(n.z, 0.0), 2.2);

  float t = h*1.25 + r.x*0.35 + r.y*0.22 + u_time*0.015;
  vec3 irid = pal(t);
  // entorno tipo estudio: cielo claro arriba, piso oscuro abajo, horizonte nítido
  float sky = smoothstep(-0.05, 0.35, r.y);
  vec3 chromeBase = mix(vec3(0.03,0.04,0.03), vec3(0.86,0.89,0.82), sky);
  chromeBase += vec3(0.25,0.3,0.22) * exp(-pow((r.y-0.02)*9.0, 2.0));
  vec3 col = mix(chromeBase, irid, 0.42 + 0.4*fres);
  col *= 0.6 + 0.55*z;
  col += spec * vec3(1.0, 0.98, 0.93) * 1.1;
  col += spec2 * vec3(0.75, 0.95, 0.9) * 0.35;
  col += fres * pal(t + 0.3) * 0.5;

  // halo exterior suave
  float halo = exp(-max(sdf, 0.0) * 9.0) * (1.0 - alpha);
  vec3 haloCol = mix(vec3(0.25,0.81,0.6), vec3(0.31,0.84,0.86), 0.5 + 0.5*sin(ang + u_time*0.3));
  float haloA = halo * 0.28;

  // grano
  float g = (hash(gl_FragCoord.xy + fract(u_time)) - 0.5) * 0.06;
  col += g;

  vec3 outC = col*alpha + haloCol*haloA;
  float outA = clamp(alpha + haloA, 0.0, 1.0);
  gl_FragColor = vec4(outC, outA);
}
`

function compile(gl, type, src) {
  const s = gl.createShader(type)
  gl.shaderSource(s, src)
  gl.compileShader(s)
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    console.warn(gl.getShaderInfoLog(s))
    gl.deleteShader(s)
    return null
  }
  return s
}

export default function LiquidMetal({ className = '', layout = 'right' }) {
  const canvasRef = useRef(null)
  const fallbackRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const gl = canvas.getContext('webgl', { premultipliedAlpha: false, alpha: true, antialias: true })
    if (!gl) {
      fallbackRef.current.style.display = 'block'
      canvas.style.display = 'none'
      return
    }
    const vs = compile(gl, gl.VERTEX_SHADER, VERT)
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG)
    if (!vs || !fs) {
      fallbackRef.current.style.display = 'block'
      canvas.style.display = 'none'
      return
    }
    const prog = gl.createProgram()
    gl.attachShader(prog, vs)
    gl.attachShader(prog, fs)
    gl.linkProgram(prog)
    gl.useProgram(prog)

    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW)
    const loc = gl.getAttribLocation(prog, 'a_pos')
    gl.enableVertexAttribArray(loc)
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)
    gl.enable(gl.BLEND)
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)

    const u = {
      res: gl.getUniformLocation(prog, 'u_res'),
      time: gl.getUniformLocation(prog, 'u_time'),
      mouse: gl.getUniformLocation(prog, 'u_mouse'),
      center: gl.getUniformLocation(prog, 'u_center'),
      radius: gl.getUniformLocation(prog, 'u_radius'),
      energy: gl.getUniformLocation(prog, 'u_energy'),
    }

    let w = 0
    let h = 0
    let dpr = 1
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 }
    let energy = 0
    let lastMove = { x: 0, y: 0 }
    let center = [0.42, 0.02]
    let radius = 0.36

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      // renderizamos a menor resolución para cuidar la GPU
      const scale = rect.width < 700 ? 0.7 : 0.62
      w = Math.max(2, Math.floor(rect.width * dpr * scale))
      h = Math.max(2, Math.floor(rect.height * dpr * scale))
      canvas.width = w
      canvas.height = h
      gl.viewport(0, 0, w, h)
      const aspect = rect.width / rect.height
      if (layout === 'center' || rect.width < 900) {
        center = [rect.width < 900 ? 0.09 : 0, rect.width < 900 ? 0.3 : 0]
        radius = rect.width < 900 ? 0.125 : 0.3
      } else {
        center = [Math.min(0.5 * aspect - 0.34, 0.6), -0.02]
        radius = 0.25
      }
      if (!mouse.tx) {
        mouse.x = mouse.tx = rect.width < 900 ? w * 0.3 : w * 0.7
        mouse.y = mouse.ty = rect.width < 900 ? h * 0.97 : h * 0.55
      }
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      const px = ((e.clientX - rect.left) / rect.width) * w
      const py = (1 - (e.clientY - rect.top) / rect.height) * h
      const dx = e.clientX - lastMove.x
      const dy = e.clientY - lastMove.y
      lastMove = { x: e.clientX, y: e.clientY }
      energy = Math.min(1, energy + Math.hypot(dx, dy) / 140)
      mouse.tx = px
      mouse.ty = py
    }
    window.addEventListener('pointermove', onMove, { passive: true })

    let visible = true
    const io = new IntersectionObserver(([en]) => {
      visible = en.isIntersecting
    })
    io.observe(canvas)

    let raf = 0
    const start = performance.now()
    let t = 0
    const loop = (now) => {
      raf = requestAnimationFrame(loop)
      if (!visible) return
      t = reduce ? 6 : (now - start) / 1000
      mouse.x += (mouse.tx - mouse.x) * 0.08
      mouse.y += (mouse.ty - mouse.y) * 0.08
      energy *= 0.94
      gl.clearColor(0, 0, 0, 0)
      gl.clear(gl.COLOR_BUFFER_BIT)
      gl.uniform2f(u.res, w, h)
      gl.uniform1f(u.time, t)
      gl.uniform2f(u.mouse, mouse.x, mouse.y)
      gl.uniform2f(u.center, center[0], center[1])
      gl.uniform1f(u.radius, radius)
      gl.uniform1f(u.energy, energy)
      gl.drawArrays(gl.TRIANGLES, 0, 6)
      if (reduce) cancelAnimationFrame(raf)
    }
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      window.removeEventListener('pointermove', onMove)
    }
  }, [layout])

  return (
    <div className={className} aria-hidden="true">
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />
      <div
        ref={fallbackRef}
        style={{
          display: 'none',
          position: 'absolute',
          right: '8%',
          top: '20%',
          width: '40vmin',
          height: '40vmin',
          borderRadius: '42% 58% 55% 45% / 48% 40% 60% 52%',
          background:
            'radial-gradient(circle at 35% 30%, #f4f6ec 0%, #8fa35e 18%, #17b07a 40%, #1fbcc6 62%, #f08a3c 85%, #171d10 100%)',
          filter: 'saturate(1.1)',
        }}
      />
    </div>
  )
}
