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

export default function DepthParallax({
  src,
  depthSrc,
  intensity = 0.5,
  displacement = 0.4,
  className,
  style,
  alt,
}) {
  const containerRef = useRef(null)
  const threeRef = useRef(null)
  const mouseCurrent = useRef({ x: 0, y: 0 })
  const intensityRef = useRef(intensity)
  const displacementRef = useRef(displacement)
  const initedRef = useRef(false)
  const [supported, setSupported] = useState(true)

  useEffect(() => { intensityRef.current = intensity }, [intensity])
  useEffect(() => { displacementRef.current = displacement }, [displacement])

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

    // Scene
    const scene = new THREE.Scene()

    // Camera — perspective for true parallax
    const fov = 50
    const camera = new THREE.PerspectiveCamera(fov, aspect, 0.1, 100)
    const vFovRad = (fov * Math.PI) / 180
    const dist = 1 / Math.tan(vFovRad / 2)
    camera.position.set(0, 0, dist)
    camera.lookAt(0, 0, 0)

    // Renderer
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

    // Plane geometry — overscan hides edges during camera movement
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

    // Apply initial displacement
    const dScale = displacementRef.current
    for (let i = 0; i < baseZ.length; i++) {
      pos[i * 3 + 2] = baseZ[i] * dScale
    }
    geometry.attributes.position.needsUpdate = true
    geometry.computeVertexNormals()

    // Material — unlit, just the image texture
    const material = new THREE.MeshBasicMaterial({ map: texture })
    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    initedRef.current = true
    threeRef.current = { scene, camera, renderer, mesh, material, geometry, texture, dist, baseZ, pos }

    // Render loop on GSAP ticker
    const render = () => {
      const t = threeRef.current
      if (!t) return

      // Update displacement if changed
      const ds = displacementRef.current
      for (let i = 0; i < t.baseZ.length; i++) {
        t.pos[i * 3 + 2] = t.baseZ[i] * ds
      }
      t.geometry.attributes.position.needsUpdate = true

      // Camera parallax from mouse
      const strength = intensityRef.current * 0.3
      t.camera.position.x = mouseCurrent.current.x * strength
      t.camera.position.y = -mouseCurrent.current.y * strength
      t.camera.position.z = t.dist
      t.camera.lookAt(0, 0, 0)

      t.renderer.render(t.scene, t.camera)
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
      gsap.to(mouseCurrent.current, {
        x, y,
        duration: 0.4,
        ease: 'power2.out',
        overwrite: true,
      })
    }
    const onLeave = () => {
      gsap.to(mouseCurrent.current, {
        x: 0, y: 0,
        duration: 0.6,
        ease: 'power2.out',
        overwrite: true,
      })
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
