'use client'

import { useRef, useEffect, useState, useCallback } from 'react'
import * as THREE from 'three'
import gsap from 'gsap'

function loadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = url
  })
}

function getDepthData(img) {
  const canvas = document.createElement('canvas')
  canvas.width = img.width
  canvas.height = img.height
  const ctx = canvas.getContext('2d')
  ctx.drawImage(img, 0, 0)
  return ctx.getImageData(0, 0, canvas.width, canvas.height)
}

const POST_VERTEX = `
  varying vec2 v_uv;
  void main() {
    v_uv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const POST_FRAGMENT = `
  precision highp float;
  varying vec2 v_uv;
  uniform sampler2D u_scene;
  uniform sampler2D u_depth;
  uniform vec2 u_mouse;
  uniform float u_dof;
  uniform float u_ca;
  uniform float u_vig;
  uniform float u_light;

  #define TAU 6.28318530718

  float sampleDepth(vec2 uv) {
    return texture2D(u_depth, clamp(uv, 0.0, 1.0)).r;
  }

  void main() {
    vec2 uv = v_uv;
    vec3 color = texture2D(u_scene, uv).rgb;
    float depth = sampleDepth(uv);

    // Chromatic aberration — stronger on background, radiates from center
    if (u_ca > 0.001) {
      vec2 fromCenter = uv - 0.5;
      float dist = length(fromCenter);
      vec2 caOffset = fromCenter * dist * u_ca * 0.02 * (1.0 - depth);
      color.r = texture2D(u_scene, uv + caOffset).r;
      color.b = texture2D(u_scene, uv - caOffset).b;
    }

    // Depth of field — disc blur on background
    if (u_dof > 0.001) {
      float blurRadius = smoothstep(0.45, 0.0, depth) * u_dof * 0.008;
      if (blurRadius > 0.0005) {
        vec3 blurred = vec3(0.0);
        float total = 0.0;
        for (float a = 0.0; a < TAU; a += TAU / 10.0) {
          for (float w = 1.0; w <= 4.0; w += 1.0) {
            vec2 off = vec2(cos(a), sin(a)) * (w * 0.25) * blurRadius;
            blurred += texture2D(u_scene, uv + off).rgb;
            total += 1.0;
          }
        }
        color = mix(color, blurred / total, smoothstep(0.45, 0.0, depth));
      }
    }

    // Normal-derived lighting — soft directional light follows the mouse
    if (u_light > 0.001) {
      float eps = 0.004;
      float dL = sampleDepth(uv - vec2(eps, 0.0));
      float dR = sampleDepth(uv + vec2(eps, 0.0));
      float dU = sampleDepth(uv + vec2(0.0, eps));
      float dD = sampleDepth(uv - vec2(0.0, eps));
      float dx = (abs(dL - depth) < abs(dR - depth)) ? (depth - dL) : (dR - depth);
      float dy = (abs(dD - depth) < abs(dU - depth)) ? (depth - dD) : (dU - depth);
      vec3 normal = normalize(vec3(dx, dy, eps * 2.0));
      vec3 lightDir = normalize(vec3(u_mouse * 0.7, 0.5));
      float diffuse = max(dot(normal, lightDir), 0.0);
      float ambient = 1.0 - u_light * 0.25;
      color *= ambient + u_light * 0.25 * diffuse;
    }

    // Vignette
    if (u_vig > 0.001) {
      vec2 away = uv * (1.0 - uv);
      float vig = away.x * away.y * 16.0;
      color *= mix(1.0, clamp(pow(vig, u_vig * 0.4), 0.0, 1.0), u_vig);
    }

    gl_FragColor = vec4(color, 1.0);
  }
`

export default function DepthParallax({
  src,
  depthSrc,
  intensity = 0.5,
  displacement = 0.4,
  dof = 0,
  chromaticAberration = 0,
  vignette = 0,
  lighting = 0,
  className,
  style,
  alt,
}) {
  const containerRef = useRef(null)
  const threeRef = useRef(null)
  const mouseCurrent = useRef({ x: 0, y: 0 })
  const propsRef = useRef({ intensity, displacement, dof, chromaticAberration, vignette, lighting })
  const initedRef = useRef(false)
  const [supported, setSupported] = useState(true)

  useEffect(() => {
    propsRef.current = { intensity, displacement, dof, chromaticAberration, vignette, lighting }
  }, [intensity, displacement, dof, chromaticAberration, vignette, lighting])

  const init = useCallback(async () => {
    if (initedRef.current) return
    const container = containerRef.current
    if (!container) return

    let img, depthImg
    try {
      ;[img, depthImg] = await Promise.all([loadImage(src), loadImage(depthSrc)])
    } catch (err) {
      console.error('DepthParallax: failed to load images', err)
      setSupported(false)
      return
    }

    const depthData = getDepthData(depthImg)
    const width = container.clientWidth
    const height = container.clientHeight
    const aspect = width / height

    // ── Main scene: displaced mesh ──
    const scene = new THREE.Scene()
    const fov = 50
    const camera = new THREE.PerspectiveCamera(fov, aspect, 0.1, 100)
    const vFovRad = (fov * Math.PI) / 180
    const dist = 1 / Math.tan(vFovRad / 2)
    camera.position.set(0, 0, dist)
    camera.lookAt(0, 0, 0)

    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(width, height)
    renderer.setClearColor(0x000000)
    container.appendChild(renderer.domElement)

    // Image texture
    const texture = new THREE.Texture(img)
    texture.needsUpdate = true
    texture.minFilter = THREE.LinearFilter
    texture.magFilter = THREE.LinearFilter
    texture.colorSpace = THREE.SRGBColorSpace

    // Depth texture (for post-processing pass)
    const depthTexture = new THREE.Texture(depthImg)
    depthTexture.needsUpdate = true
    depthTexture.minFilter = THREE.LinearFilter
    depthTexture.magFilter = THREE.LinearFilter

    // Plane sized with overscan to hide edges during camera movement
    const imgAspect = img.width / img.height
    const overscan = 1.12
    let planeW, planeH
    if (imgAspect > aspect) {
      planeH = 2 * overscan
      planeW = planeH * imgAspect
    } else {
      planeW = 2 * aspect * overscan
      planeH = planeW / imgAspect
    }

    const segments = 512
    const geometry = new THREE.PlaneGeometry(planeW, planeH, segments, segments)

    // CPU vertex displacement from depth map
    const pos = geometry.attributes.position.array
    const uvs = geometry.attributes.uv.array
    const depthW = depthData.width
    const depthH = depthData.height
    const depthPixels = depthData.data
    const baseZ = new Float32Array(pos.length / 3)

    for (let i = 0; i < pos.length / 3; i++) {
      const u = uvs[i * 2]
      const v = uvs[i * 2 + 1]
      const px = Math.min(Math.floor(u * depthW), depthW - 1)
      const py = Math.min(Math.floor((1 - v) * depthH), depthH - 1)
      const idx = (py * depthW + px) * 4
      baseZ[i] = depthPixels[idx] / 255
    }

    const dScale = propsRef.current.displacement
    for (let i = 0; i < baseZ.length; i++) {
      pos[i * 3 + 2] = baseZ[i] * dScale
    }
    geometry.attributes.position.needsUpdate = true
    geometry.computeVertexNormals()

    const material = new THREE.MeshBasicMaterial({ map: texture })
    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    // ── Render target for post-processing ──
    const dpr = renderer.getPixelRatio()
    const rtWidth = Math.floor(width * dpr)
    const rtHeight = Math.floor(height * dpr)
    const renderTarget = new THREE.WebGLRenderTarget(rtWidth, rtHeight, {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
    })

    // ── Post-processing scene ──
    const postScene = new THREE.Scene()
    const postCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)
    const postGeometry = new THREE.PlaneGeometry(2, 2)
    const postMaterial = new THREE.ShaderMaterial({
      vertexShader: POST_VERTEX,
      fragmentShader: POST_FRAGMENT,
      uniforms: {
        u_scene: { value: renderTarget.texture },
        u_depth: { value: depthTexture },
        u_mouse: { value: new THREE.Vector2(0, 0) },
        u_dof: { value: 0 },
        u_ca: { value: 0 },
        u_vig: { value: 0 },
        u_light: { value: 0 },
      },
    })
    const postMesh = new THREE.Mesh(postGeometry, postMaterial)
    postScene.add(postMesh)

    initedRef.current = true
    threeRef.current = {
      scene, camera, renderer, mesh, material, geometry, texture, depthTexture,
      dist, baseZ, pos,
      renderTarget, postScene, postCamera, postMaterial, postGeometry, postMesh,
    }

    const render = () => {
      const t = threeRef.current
      if (!t) return
      const p = propsRef.current

      // Update displacement if changed
      const ds = p.displacement
      for (let i = 0; i < t.baseZ.length; i++) {
        t.pos[i * 3 + 2] = t.baseZ[i] * ds
      }
      t.geometry.attributes.position.needsUpdate = true

      // Camera parallax from mouse
      const strength = p.intensity * 0.3
      t.camera.position.x = mouseCurrent.current.x * strength
      t.camera.position.y = -mouseCurrent.current.y * strength
      t.camera.position.z = t.dist
      t.camera.lookAt(0, 0, 0)

      const hasPostFx = p.dof > 0.001 || p.chromaticAberration > 0.001 || p.vignette > 0.001 || p.lighting > 0.001

      if (hasPostFx) {
        // Render scene to offscreen target, then apply post-processing
        t.renderer.setRenderTarget(t.renderTarget)
        t.renderer.render(t.scene, t.camera)
        t.renderer.setRenderTarget(null)

        const pu = t.postMaterial.uniforms
        pu.u_mouse.value.set(mouseCurrent.current.x, mouseCurrent.current.y)
        pu.u_dof.value = p.dof
        pu.u_ca.value = p.chromaticAberration
        pu.u_vig.value = p.vignette
        pu.u_light.value = p.lighting
        t.renderer.render(t.postScene, t.postCamera)
      } else {
        // No post-processing — render directly
        t.renderer.setRenderTarget(null)
        t.renderer.render(t.scene, t.camera)
      }
    }

    gsap.ticker.add(render)
    threeRef.current.render = render
  }, [src, depthSrc])

  // IntersectionObserver lazy init
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          init()
          observer.disconnect()
        }
      },
      { rootMargin: '200px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [init])

  // Mouse tracking with GSAP smoothing
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const onMove = (e) => {
      const rect = el.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1
      const y = ((e.clientY - rect.top) / rect.height) * 2 - 1
      gsap.to(mouseCurrent.current, { x, y, duration: 0.4, ease: 'power2.out', overwrite: true })
    }
    const onLeave = () => {
      gsap.to(mouseCurrent.current, { x: 0, y: 0, duration: 0.6, ease: 'power2.out', overwrite: true })
    }
    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  // Resize
  useEffect(() => {
    const onResize = () => {
      const t = threeRef.current
      const el = containerRef.current
      if (!t || !el) return
      const w = el.clientWidth
      const h = el.clientHeight
      t.camera.aspect = w / h
      t.camera.updateProjectionMatrix()
      t.renderer.setSize(w, h)
      const dpr = t.renderer.getPixelRatio()
      t.renderTarget.setSize(Math.floor(w * dpr), Math.floor(h * dpr))
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // Cleanup
  useEffect(() => {
    return () => {
      const t = threeRef.current
      if (!t) return
      if (t.render) gsap.ticker.remove(t.render)
      t.geometry.dispose()
      t.material.dispose()
      t.texture.dispose()
      t.depthTexture.dispose()
      t.renderTarget.dispose()
      t.postGeometry.dispose()
      t.postMaterial.dispose()
      t.renderer.dispose()
      if (t.renderer.domElement.parentNode) {
        t.renderer.domElement.parentNode.removeChild(t.renderer.domElement)
      }
      threeRef.current = null
      initedRef.current = false
    }
  }, [])

  if (!supported) {
    return <img src={src} alt={alt || ''} className={className} style={style} />
  }

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ position: 'relative', overflow: 'hidden', ...style }}
    />
  )
}
