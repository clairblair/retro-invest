'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Icons } from '@/components/icons'

export default function LoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen w-full relative flex items-stretch overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 -z-20 animate-gradient-move" style={{background: 'linear-gradient(120deg, #ff5858, #ff7e5f, #ff9966, #ff5858)', backgroundSize: '200% 200%'}} />
      <style jsx global>{`
        @keyframes gradient-move {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient-move {
          animation: gradient-move 8s ease-in-out infinite;
        }
      `}</style>
      {/* Background Gradient */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#ff5858] via-[#ff7e5f] to-[#ff9966]" />
      {/* Blurred Circles */}
      <div className="absolute z-10 top-20 left-32 w-32 h-32 bg-white/20 rounded-full blur-2xl" />
      <div className="absolute z-10 top-1/2 left-1/4 w-16 h-16 bg-white/10 rounded-full blur-xl" />
      <div className="absolute z-10 bottom-24 left-20 w-24 h-24 bg-white/15 rounded-full blur-2xl" />
      <div className="absolute z-10 bottom-10 right-1/3 w-20 h-20 bg-white/10 rounded-full blur-xl" />
      {/* Main Content */}
      <div className="relative z-20 flex flex-1 min-h-screen">
        {/* Left Branding */}
        <div className="hidden lg:flex flex-col justify-center items-start flex-1 pl-24 font-sans">
          <div className="max-w-md">
            <div className="text-4xl font-extrabold text-white mb-4 leading-tight drop-shadow-lg">
              Invest in Your Future, <span className="text-white">Today.</span>
            </div>
            <div className="text-lg text-white mb-6 font-medium opacity-90">
              Paschal empowers you to grow, protect, and enjoy your wealth with confidence.
            </div>
            <ul className="mb-8 space-y-2">
              <li className="flex items-center text-white text-base opacity-80"><span className="mr-2 text-white">•</span> Zero hidden fees</li>
              <li className="flex items-center text-white text-base opacity-80"><span className="mr-2 text-white">•</span> Instant withdrawals</li>
              <li className="flex items-center text-white text-base opacity-80"><span className="mr-2 text-white">•</span> Trusted by professionals</li>
            </ul>
            {/* Testimonial Carousel */}
            {(() => {
              const reviews = [
                {
                  quote: 'Paschal made investing so easy. My portfolio grew faster than I expected, and the support team was always there for me. Highly recommend!',
                  highlight: 'I barely had to do anything',
                  name: 'Jane Doe',
                  avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
                  stars: 5,
                },
                {
                  quote: 'The auto-invest feature is a game changer. I just set my preferences and watch my money grow. The dashboard is beautiful and easy to use.',
                  highlight: 'Effortless and rewarding',
                  name: 'Michael Smith',
                  avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
                  stars: 5,
                },
                {
                  quote: 'I love the transparency and instant withdrawals. Paschal is the best investment platform I have ever used.',
                  highlight: 'Best platform for investors',
                  name: 'Aisha Bello',
                  avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
                  stars: 5,
                },
              ];
              const [current, setCurrent] = useState(0);
              useEffect(() => {
                const interval = setInterval(() => {
                  setCurrent((prev) => (prev + 1) % reviews.length);
                }, 4000);
                return () => clearInterval(interval);
              }, [reviews.length]);
              return (
                <div className="relative mb-6">
                  <div className="bg-white/10 rounded-2xl p-6 mb-6 shadow-lg backdrop-blur-md min-h-[180px]">
                    <div className="text-lg font-semibold text-white mb-2">“{reviews[current].highlight}”</div>
                    <div className="text-white/90 mb-4 text-sm">{reviews[current].quote}</div>
                    <div className="flex items-center gap-3 mt-2">
                      <img src={reviews[current].avatar} alt={reviews[current].name} className="h-8 w-8 rounded-full border-2 border-white/30" />
                      <span className="text-white font-medium text-sm">{reviews[current].name}</span>
                      <span className="flex ml-auto gap-0.5">
                        {[...Array(reviews[current].stars)].map((_, i) => (
                          <svg key={i} className="h-4 w-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><polygon points="10 1.5 12.59 7.36 18.9 7.64 13.97 11.97 15.54 18.09 10 14.77 4.46 18.09 6.03 11.97 1.1 7.64 7.41 7.36 10 1.5" /></svg>
                        ))}
                      </span>
                    </div>
                  </div>
                  {/* Carousel Dots */}
                  <div className="flex justify-center gap-2 mt-4">
                    {reviews.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrent(idx)}
                        className={`w-3 h-3 rounded-full transition-all duration-200 ${current === idx ? 'bg-white' : 'bg-white/40'}`}
                        aria-label={`Go to review ${idx + 1}`}
                      />
                    ))}
                  </div>
                </div>
              );
            })()}
            <div className="text-sm text-white mt-8 opacity-70">Questions? <a href="mailto:info@paschal.com" className="underline hover:text-orange-200 transition-colors">info@paschal.com</a></div>
          </div>
        </div>
        {/* Right Card */}
        <div className="flex flex-col justify-center items-center flex-1 min-h-screen">
          <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Login</h2>
            <p className="text-sm text-gray-500 mb-6">Inserisci le tue credenziali per accedere</p>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="mt-1 h-11 bg-white border border-gray-200 focus:border-orange-400 focus:ring-orange-200"
                  required
                />
              </div>
              <div>
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">Password</Label>
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="mt-1 h-11 bg-white border border-gray-200 focus:border-orange-400 focus:ring-orange-200"
                  required
                />
                <div className="flex justify-end mt-2">
                  <Link href="/auth/forgot-password" className="text-sm text-orange-600 hover:underline transition-colors">Forgot password?</Link>
                </div>
              </div>
              <Button
                type="submit"
                className="w-full h-11 mt-2 bg-gradient-to-r from-[#ff5858] to-[#ff9966] text-white font-semibold shadow-md hover:from-[#ff7e5f] hover:to-[#ff9966] transition-all"
                disabled={isLoading}
              >
                {isLoading ? 'Signing in...' : 'Login'}
              </Button>
              <div className="text-center mt-4">
                <span className="text-sm text-gray-600">Don't have an account? </span>
                <Link href="/auth/register" className="text-sm text-orange-600 font-semibold hover:underline transition-colors">Sign up</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
} 