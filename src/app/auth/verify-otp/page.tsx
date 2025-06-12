'use client'
import { useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

function VerifyOtpForm() {
  const [otp, setOtp] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const next = searchParams.get('next') || 'dashboard'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsLoading(false)
    setSubmitted(true)
    setTimeout(() => {
      if (next === 'change-password') {
        router.push('/auth/change-password')
      } else {
        router.push('/dashboard')
      }
    }, 1000)
  }

  return (
    <div className="min-h-screen w-full relative flex items-stretch">
      {/* Background Gradient */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#ff5858] via-[#ff7e5f] to-[#ff9966]" />
      {/* Blurred Circles */}
      <div className="absolute z-10 top-20 left-32 w-32 h-32 bg-white/20 rounded-full blur-2xl" />
      <div className="absolute z-10 top-1/2 left-1/4 w-16 h-16 bg-white/10 rounded-full blur-xl" />
      <div className="absolute z-10 bottom-24 left-20 w-24 h-24 bg-white/15 rounded-full blur-2xl" />
      <div className="absolute z-10 bottom-10 right-1/3 w-20 h-20 bg-white/10 rounded-full blur-xl" />
      {/* Main Content */}
      <div className="relative z-20 flex flex-1 min-h-screen justify-center items-center">
        <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Verify OTP</h2>
          <p className="text-sm text-gray-500 mb-6">Enter the code sent to your email to continue.</p>
          {submitted ? (
            <div className="text-green-600 text-center font-medium py-8">OTP verified! Redirecting...</div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <Label htmlFor="otp" className="text-sm font-medium text-gray-700">OTP Code</Label>
                <Input
                  id="otp"
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={e => setOtp(e.target.value)}
                  className="mt-1 h-11 bg-white border border-gray-200 focus:border-orange-400 focus:ring-orange-200 tracking-widest text-center"
                  required
                  maxLength={6}
                />
              </div>
              <Button
                type="submit"
                className="w-full h-11 mt-2 bg-gradient-to-r from-[#ff5858] to-[#ff9966] text-white font-semibold shadow-md hover:from-[#ff7e5f] hover:to-[#ff9966] transition-all"
                disabled={isLoading}
              >
                {isLoading ? 'Verifying...' : 'Verify'}
              </Button>
              <div className="text-center mt-4">
                <a href="/auth/login" className="text-sm text-orange-600 font-semibold hover:underline transition-colors">Back to Sign in</a>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

export default function VerifyOtpPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyOtpForm />
    </Suspense>
  )
} 