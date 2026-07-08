'use client'

import { Analytics } from '@vercel/analytics/next'
import AnalyticsEvents from '@/components/AnalyticsEvents'

export default function VercelAnalytics() {
  return (
    <>
      <Analytics />
      <AnalyticsEvents />
    </>
  )
}
