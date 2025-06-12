import { Suspense } from 'react'
import LandingPageContent from './LandingPageContent'

export default function LandingPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LandingPageContent />
    </Suspense>
  )
} 