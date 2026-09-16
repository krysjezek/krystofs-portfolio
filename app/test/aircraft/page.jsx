import AirportWeather from '@/components/AirportWeather'
import Link from 'next/link'

export const metadata = { title: 'Airport module · Review' }

export default function AircraftPreview() {
  return <main id="main-content" className="airport-preview">
    <div className="airport-preview-heading"><Link href="/">← Portfolio</Link><span>MODULE / 01</span></div>
    <AirportWeather />
    <p className="airport-preview-note">Live observations around Prague.<br />Select an aircraft to inspect its latest report.</p>
  </main>
}
