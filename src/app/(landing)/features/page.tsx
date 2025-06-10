'use client'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { ChartBarIcon, ShieldCheckIcon, CurrencyDollarIcon, ClockIcon, UserGroupIcon, BuildingOfficeIcon } from '@heroicons/react/24/outline'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const features = [
  { name: 'Smart Investment Plans', description: 'AI-driven, tailored plans for every investor.', icon: ChartBarIcon },
  { name: 'Secure Transactions', description: 'Bank-level security and encryption.', icon: ShieldCheckIcon },
  { name: 'Daily ROI', description: 'Earn daily returns, track your growth.', icon: CurrencyDollarIcon },
  { name: '24/7 Support', description: 'Always-on support for your peace of mind.', icon: ClockIcon },
  { name: 'Growing Community', description: 'Join thousands of successful investors.', icon: UserGroupIcon },
  { name: 'Business Solutions', description: 'Custom solutions for organizations.', icon: BuildingOfficeIcon },
]

export default function FeaturesPage() {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <section className="max-w-4xl mx-auto px-4 pt-24 pb-12 text-center">
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-[#ff5858] via-[#ff7e5f] to-[#ff9966] bg-clip-text text-transparent mb-4">Our Features</motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }} className="text-lg text-gray-600 dark:text-gray-300 mb-8">Discover what makes Paschal the best investment platform for you.</motion.p>
      </section>
      <section className="max-w-7xl mx-auto px-4 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 mb-16">
        {features.map((feature, idx) => (
          <motion.div key={feature.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: idx * 0.1 }}>
            <Card className="h-full border-2 hover:border-[#ff5858] transition-colors shadow-lg">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="rounded-full bg-gradient-to-r from-[#ff5858] via-[#ff7e5f] to-[#ff9966] p-3 text-white mb-4">
                  <feature.icon className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{feature.name}</h3>
                <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </section>
      <section className="text-center pb-16">
        <Button asChild size="lg" className="bg-gradient-to-r from-[#ff5858] via-[#ff7e5f] to-[#ff9966] text-white hover:opacity-90">
          <Link href="/dashboard">Get Started</Link>
        </Button>
      </section>
    </div>
  )
} 