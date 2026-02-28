'use client'

import { useState } from 'react'
import DepthParallax from '@/components/DepthParallax'

const PRESETS = {
  none: { intensity: 0.5, displacement: 0.4, dof: 0, ca: 0, vig: 0, light: 0 },
  subtle: { intensity: 0.5, displacement: 0.4, dof: 0.3, ca: 0.2, vig: 0.25, light: 0.2 },
  cinematic: { intensity: 0.5, displacement: 0.4, dof: 0.6, ca: 0.4, vig: 0.5, light: 0.35 },
  dramatic: { intensity: 0.7, displacement: 0.5, dof: 0.9, ca: 0.6, vig: 0.7, light: 0.5 },
}

const sliderStyle = { width: '180px', accentColor: '#666' }
const labelStyle = { minWidth: '90px', color: '#888', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }
const valueStyle = { minWidth: '44px', textAlign: 'right', color: '#ccc', fontSize: '13px', fontVariantNumeric: 'tabular-nums' }
const rowStyle = { display: 'flex', alignItems: 'center', gap: '12px' }

export default function DepthTestPage() {
  const [intensity, setIntensity] = useState(0.5)
  const [displacement, setDisplacement] = useState(0.4)
  const [dof, setDof] = useState(0)
  const [ca, setCa] = useState(0)
  const [vig, setVig] = useState(0)
  const [light, setLight] = useState(0)

  const applyPreset = (name) => {
    const p = PRESETS[name]
    setIntensity(p.intensity)
    setDisplacement(p.displacement)
    setDof(p.dof)
    setCa(p.ca)
    setVig(p.vig)
    setLight(p.light)
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0a0a0a',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '28px',
      padding: '40px',
      fontFamily: 'monospace',
    }}>
      <DepthParallax
        src="/images/test/render.png"
        depthSrc="/images/test/depth.png"
        intensity={intensity}
        displacement={displacement}
        dof={dof}
        chromaticAberration={ca}
        vignette={vig}
        lighting={light}
        alt="Depth parallax test"
        style={{ width: '600px', height: '600px', borderRadius: '4px' }}
      />

      <div style={{ display: 'flex', gap: '8px' }}>
        {Object.keys(PRESETS).map((name) => (
          <button
            key={name}
            onClick={() => applyPreset(name)}
            style={{
              padding: '6px 14px',
              background: '#1a1a1a',
              border: '1px solid #333',
              borderRadius: '4px',
              color: '#ccc',
              fontFamily: 'monospace',
              fontSize: '12px',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              cursor: 'pointer',
            }}
          >
            {name}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div style={rowStyle}>
          <span style={labelStyle}>Intensity</span>
          <input type="range" min="0" max="2" step="0.01" value={intensity} onChange={(e) => setIntensity(parseFloat(e.target.value))} style={sliderStyle} />
          <span style={valueStyle}>{intensity.toFixed(2)}</span>
        </div>
        <div style={rowStyle}>
          <span style={labelStyle}>Displacement</span>
          <input type="range" min="0" max="1.5" step="0.01" value={displacement} onChange={(e) => setDisplacement(parseFloat(e.target.value))} style={sliderStyle} />
          <span style={valueStyle}>{displacement.toFixed(2)}</span>
        </div>
        <div style={rowStyle}>
          <span style={labelStyle}>DOF</span>
          <input type="range" min="0" max="1.5" step="0.01" value={dof} onChange={(e) => setDof(parseFloat(e.target.value))} style={sliderStyle} />
          <span style={valueStyle}>{dof.toFixed(2)}</span>
        </div>
        <div style={rowStyle}>
          <span style={labelStyle}>Chroma</span>
          <input type="range" min="0" max="1.5" step="0.01" value={ca} onChange={(e) => setCa(parseFloat(e.target.value))} style={sliderStyle} />
          <span style={valueStyle}>{ca.toFixed(2)}</span>
        </div>
        <div style={rowStyle}>
          <span style={labelStyle}>Vignette</span>
          <input type="range" min="0" max="1.5" step="0.01" value={vig} onChange={(e) => setVig(parseFloat(e.target.value))} style={sliderStyle} />
          <span style={valueStyle}>{vig.toFixed(2)}</span>
        </div>
        <div style={rowStyle}>
          <span style={labelStyle}>Light</span>
          <input type="range" min="0" max="1" step="0.01" value={light} onChange={(e) => setLight(parseFloat(e.target.value))} style={sliderStyle} />
          <span style={valueStyle}>{light.toFixed(2)}</span>
        </div>
      </div>
    </div>
  )
}
