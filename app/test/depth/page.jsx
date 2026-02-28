'use client'

import { useState } from 'react'
import DepthParallax from '@/components/DepthParallax'

export default function DepthTestPage() {
  const [intensity, setIntensity] = useState(0.5)
  const [displacement, setDisplacement] = useState(0.4)

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0a0a0a',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '24px',
      padding: '40px',
    }}>
      <DepthParallax
        src="/images/test/render.png"
        depthSrc="/images/test/depth.png"
        intensity={intensity}
        displacement={displacement}
        alt="Depth parallax test"
        style={{ width: '600px', height: '600px' }}
      />

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        color: '#fff',
        fontFamily: 'monospace',
        fontSize: '14px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <label htmlFor="intensity-slider" style={{ minWidth: '100px' }}>Intensity</label>
          <input
            id="intensity-slider"
            type="range"
            min="0"
            max="2"
            step="0.01"
            value={intensity}
            onChange={(e) => setIntensity(parseFloat(e.target.value))}
            style={{ width: '200px' }}
          />
          <span style={{ minWidth: '50px' }}>{intensity.toFixed(2)}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <label htmlFor="displacement-slider" style={{ minWidth: '100px' }}>Displacement</label>
          <input
            id="displacement-slider"
            type="range"
            min="0"
            max="1.5"
            step="0.01"
            value={displacement}
            onChange={(e) => setDisplacement(parseFloat(e.target.value))}
            style={{ width: '200px' }}
          />
          <span style={{ minWidth: '50px' }}>{displacement.toFixed(2)}</span>
        </div>
      </div>
    </div>
  )
}
