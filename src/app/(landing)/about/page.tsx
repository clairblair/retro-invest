'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  BuildingOfficeIcon,
  ChartBarIcon,
  ShieldCheckIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline'
import Link from 'next/link'

const team = [
  {
    name: 'John Smith',
    role: 'CEO & Founder',
    image: '/team/john-smith.jpg',
    bio: 'With over 15 years of experience in finance and technology, John leads our vision for the future of investment.',
  },
  {
    name: 'Sarah Johnson',
    role: 'Chief Investment Officer',
    image: '/team/sarah-johnson.jpg',
    bio: 'Sarah brings 12 years of investment expertise and a proven track record of successful portfolio management.',
  },
  {
    name: 'Michael Chen',
    role: 'Head of Technology',
    image: '/team/michael-chen.jpg',
    bio: 'Michael ensures our platform remains at the cutting edge of financial technology and security.',
  },
  {
    name: 'Emily Davis',
    role: 'Customer Success Lead',
    image: '/team/emily-davis.jpg',
    bio: 'Emily is dedicated to ensuring our investors receive exceptional support and guidance.',
  },
]

const values = [
  {
    name: 'Innovation',
    description: 'We continuously innovate to provide the best investment solutions.',
    icon: ChartBarIcon,
  },
  {
    name: 'Security',
    description: 'Your investments are protected with state-of-the-art security measures.',
    icon: ShieldCheckIcon,
  },
  {
    name: 'Community',
    description: 'We foster a supportive community of investors and partners.',
    icon: UserGroupIcon,
  },
  {
    name: 'Integrity',
    description: 'We operate with complete transparency and ethical standards.',
    icon: BuildingOfficeIcon,
  },
]

export default function AboutPage() {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <section className="max-w-4xl mx-auto px-4 pt-24 pb-12 text-center">
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-[#ff5858] via-[#ff7e5f] to-[#ff9966] bg-clip-text text-transparent mb-4">About Paschal</motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }} className="text-lg text-gray-600 dark:text-gray-300 mb-8">Empowering everyone to invest smarter and live better.</motion.p>
      </section>
      <section className="max-w-3xl mx-auto px-4 mb-16 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Our Story</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">Founded in 2020, Paschal was created to democratize smart investing for everyone. Our mission is to empower individuals and businesses to achieve financial freedom through innovative, secure, and accessible investment solutions.</p>
          <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Our Values</h2>
          <ul className="text-gray-600 dark:text-gray-300 mb-6 space-y-2">
            <li><span className="font-semibold text-[#ff5858]">Innovation:</span> We leverage technology to deliver the best investment experience.</li>
            <li><span className="font-semibold text-[#ff5858]">Security:</span> Your safety is our top priority.</li>
            <li><span className="font-semibold text-[#ff5858]">Transparency:</span> Clear, honest communication at every step.</li>
            <li><span className="font-semibold text-[#ff5858]">Community:</span> We grow together, as investors and as people.</li>
          </ul>
        </motion.div>
      </section>
      <section className="text-center pb-16">
        <Button asChild size="lg" className="bg-gradient-to-r from-[#ff5858] via-[#ff7e5f] to-[#ff9966] text-white hover:opacity-90">
          <Link href="/dashboard">Get Started</Link>
        </Button>
      </section>
    </div>
  )
} 