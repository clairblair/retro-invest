'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  ArrowRightIcon,
  ChartBarIcon,
  ShieldCheckIcon,
  CurrencyDollarIcon,
  ClockIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline'

const features = [
  {
    name: 'Smart Investment Plans',
    description: 'Choose from a variety of investment plans tailored to your financial goals and risk tolerance.',
    icon: ChartBarIcon,
  },
  {
    name: 'Secure Transactions',
    description: 'Your investments are protected with state-of-the-art security measures and encryption.',
    icon: ShieldCheckIcon,
  },
  {
    name: 'Daily ROI',
    description: 'Earn daily returns on your investments with our competitive ROI rates.',
    icon: CurrencyDollarIcon,
  },
  {
    name: '24/7 Support',
    description: 'Our dedicated support team is available round the clock to assist you.',
    icon: ClockIcon,
  },
  {
    name: 'Growing Community',
    description: 'Join thousands of successful investors in our thriving community.',
    icon: UserGroupIcon,
  },
]

const stats = [
  { label: 'Active Investors', value: '10,000+' },
  { label: 'Total Investments', value: '$50M+' },
  { label: 'Daily ROI', value: '2-5%' },
  { label: 'Success Rate', value: '99.9%' },
]

export default function LandingPage() {
  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 pb-16 sm:pt-24 sm:pb-20">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col justify-center"
            >
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                <span className="block bg-gradient-to-r from-[#ff5858] via-[#ff7e5f] to-[#ff9966] bg-clip-text text-transparent">
                  Smart Investments,
                </span>
                <span className="block text-gray-900 dark:text-white">
                  Brighter Future
                </span>
              </h1>
              <p className="mt-6 text-lg text-gray-600 dark:text-gray-300">
                Join thousands of successful investors who trust InvestWise for their financial growth. 
                Start your investment journey today with our secure and profitable investment plans.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-[#ff5858] via-[#ff7e5f] to-[#ff9966] text-white hover:opacity-90"
                >
                  <Link href="/dashboard">
                    Get Started
                    <ArrowRightIcon className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-2"
                >
                  <Link href="/about">
                    Learn More
                  </Link>
                </Button>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative lg:mt-0"
            >
              <div className="relative mx-auto w-full max-w-lg">
                <div className="relative w-full">
                  <div className="absolute -inset-4 rounded-2xl bg-gradient-to-r from-[#ff5858] via-[#ff7e5f] to-[#ff9966] opacity-20 blur-lg" />
                  <div className="relative rounded-2xl bg-white dark:bg-gray-800 p-8 shadow-xl">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-4">
                        <div className="h-12 w-12 rounded-full bg-gradient-to-r from-[#ff5858] via-[#ff7e5f] to-[#ff9966] p-0.5">
                          <div className="h-full w-full rounded-full bg-white dark:bg-gray-800" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Premium Plan
                          </h3>
                          <p className="text-sm text-gray-500">Daily ROI: 5%</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Investment</span>
                          <span className="font-medium text-gray-900 dark:text-white">$10,000</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Daily Returns</span>
                          <span className="font-medium text-green-600">$500</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Duration</span>
                          <span className="font-medium text-gray-900 dark:text-white">30 Days</span>
                        </div>
                      </div>
                      <Button className="w-full bg-gradient-to-r from-[#ff5858] via-[#ff7e5f] to-[#ff9966] text-white hover:opacity-90">
                        Invest Now
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white dark:bg-gray-800 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {stat.value}
                </p>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 dark:bg-gray-900 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Why Choose{' '}
              <span className="bg-gradient-to-r from-[#ff5858] via-[#ff7e5f] to-[#ff9966] bg-clip-text text-transparent">
                InvestWise
              </span>
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              Experience the best investment platform with our unique features
            </p>
          </div>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <motion.div
                key={feature.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full border-2 hover:border-[#ff5858] transition-colors">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="rounded-full bg-gradient-to-r from-[#ff5858] via-[#ff7e5f] to-[#ff9966] p-2 text-white">
                        <feature.icon className="h-6 w-6" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {feature.name}
                      </h3>
                    </div>
                    <p className="mt-4 text-gray-600 dark:text-gray-400">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[#ff5858] via-[#ff7e5f] to-[#ff9966] py-16 sm:py-24">
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to Start Your Investment Journey?
            </h2>
            <p className="mt-4 text-lg text-white/90">
              Join thousands of successful investors and start earning today
            </p>
            <div className="mt-8">
              <Button
                asChild
                size="lg"
                className="bg-white text-[#ff5858] hover:bg-white/90"
              >
                <Link href="/dashboard">
                  Get Started Now
                  <ArrowRightIcon className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 