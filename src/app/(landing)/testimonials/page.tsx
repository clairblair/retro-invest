'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  StarIcon,
  ChartBarIcon,
  CurrencyDollarIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline'

const testimonials = [
  {
    name: 'David Thompson',
    role: 'Tech Entrepreneur',
    image: '/testimonials/david.jpg',
    quote: 'InvestWise has transformed my investment strategy. The platform's ease of use and consistent returns have made it an essential part of my financial portfolio.',
    rating: 5,
    investment: '$50,000',
    returns: '$75,000',
  },
  {
    name: 'Maria Rodriguez',
    role: 'Small Business Owner',
    image: '/testimonials/maria.jpg',
    quote: 'As a small business owner, I needed a reliable investment platform. InvestWise has exceeded my expectations with their transparent processes and excellent returns.',
    rating: 5,
    investment: '$25,000',
    returns: '$37,500',
  },
  {
    name: 'James Wilson',
    role: 'Retired Professional',
    image: '/testimonials/james.jpg',
    quote: 'The daily ROI and professional support from InvestWise have made my retirement planning much more effective. I highly recommend their services.',
    rating: 5,
    investment: '$100,000',
    returns: '$150,000',
  },
  {
    name: 'Sarah Chen',
    role: 'Financial Analyst',
    image: '/testimonials/sarah.jpg',
    quote: 'From a professional perspective, I'm impressed by InvestWise's investment strategies and risk management. Their platform is truly innovative.',
    rating: 5,
    investment: '$75,000',
    returns: '$112,500',
  },
  {
    name: 'Robert Johnson',
    role: 'Real Estate Developer',
    image: '/testimonials/robert.jpg',
    quote: 'InvestWise has become an integral part of my investment portfolio. Their consistent returns and professional service are unmatched.',
    rating: 5,
    investment: '$200,000',
    returns: '$300,000',
  },
  {
    name: 'Emily Parker',
    role: 'Marketing Director',
    image: '/testimonials/emily.jpg',
    quote: 'The user-friendly interface and excellent customer support make investing with InvestWise a pleasure. I've seen remarkable growth in my investments.',
    rating: 5,
    investment: '$30,000',
    returns: '$45,000',
  },
]

const stats = [
  {
    label: 'Total Investors',
    value: '10,000+',
    icon: UserGroupIcon,
  },
  {
    label: 'Average ROI',
    value: '50%',
    icon: ChartBarIcon,
  },
  {
    label: 'Total Returns',
    value: '$50M+',
    icon: CurrencyDollarIcon,
  },
]

export default function TestimonialsPage() {
  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 pb-16 sm:pt-24 sm:pb-20">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
            >
              <span className="block bg-gradient-to-r from-[#ff5858] via-[#ff7e5f] to-[#ff9966] bg-clip-text text-transparent">
                Success Stories
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-6 text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
            >
              Hear from our investors about their journey with InvestWise and how we've helped them achieve their financial goals.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white dark:bg-gray-800 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#ff5858] via-[#ff7e5f] to-[#ff9966] p-3 text-white">
                  <stat.icon className="h-6 w-6" />
                </div>
                <p className="mt-4 text-3xl font-bold text-gray-900 dark:text-white">
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

      {/* Testimonials Grid */}
      <section className="bg-gray-50 dark:bg-gray-900 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full border-2 hover:border-[#ff5858] transition-colors">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="relative h-12 w-12 rounded-full overflow-hidden">
                        <Image
                          src={testimonial.image}
                          alt={testimonial.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {testimonial.name}
                        </h3>
                        <p className="text-sm text-[#ff5858]">{testimonial.role}</p>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <StarIcon
                          key={i}
                          className="h-5 w-5 text-yellow-400"
                          fill="currentColor"
                        />
                      ))}
                    </div>
                    <p className="mt-4 text-gray-600 dark:text-gray-400">
                      {testimonial.quote}
                    </p>
                    <div className="mt-6 grid grid-cols-2 gap-4 border-t border-gray-200 dark:border-gray-700 pt-4">
                      <div>
                        <p className="text-sm text-gray-500">Investment</p>
                        <p className="mt-1 font-semibold text-gray-900 dark:text-white">
                          {testimonial.investment}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Returns</p>
                        <p className="mt-1 font-semibold text-green-600">
                          {testimonial.returns}
                        </p>
                      </div>
                    </div>
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
              Start Your Success Story
            </h2>
            <p className="mt-4 text-lg text-white/90">
              Join thousands of successful investors and begin your journey to financial freedom
            </p>
            <div className="mt-8">
              <Button
                asChild
                size="lg"
                className="bg-white text-[#ff5858] hover:bg-white/90"
              >
                <a href="/dashboard">
                  Get Started Now
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 