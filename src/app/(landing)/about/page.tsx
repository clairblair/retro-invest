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
                About InvestWise
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-6 text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
            >
              We're revolutionizing the investment landscape by making smart investing accessible to everyone.
              Our mission is to empower individuals to achieve financial freedom through innovative investment solutions.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="bg-white dark:bg-gray-800 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Our Story
              </h2>
              <div className="mt-6 space-y-6 text-gray-600 dark:text-gray-300">
                <p>
                  Founded in 2020, InvestWise emerged from a vision to democratize investment opportunities.
                  We recognized that traditional investment platforms were often complex and inaccessible to the average person.
                </p>
                <p>
                  Our team of financial experts and technologists came together to create a platform that combines
                  sophisticated investment strategies with user-friendly technology.
                </p>
                <p>
                  Today, we're proud to serve thousands of investors worldwide, helping them achieve their financial goals
                  through our innovative investment solutions.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="aspect-w-16 aspect-h-9 rounded-2xl overflow-hidden">
                <Image
                  src="/about/office.jpg"
                  alt="Our Office"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-gray-50 dark:bg-gray-900 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Our Values
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              The principles that guide everything we do
            </p>
          </div>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <motion.div
                key={value.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full border-2 hover:border-[#ff5858] transition-colors">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="rounded-full bg-gradient-to-r from-[#ff5858] via-[#ff7e5f] to-[#ff9966] p-2 text-white">
                        <value.icon className="h-6 w-6" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {value.name}
                      </h3>
                    </div>
                    <p className="mt-4 text-gray-600 dark:text-gray-400">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-white dark:bg-gray-800 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Meet Our Team
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              The experts behind InvestWise
            </p>
          </div>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full border-2 hover:border-[#ff5858] transition-colors">
                  <CardContent className="p-6">
                    <div className="aspect-w-1 aspect-h-1 rounded-full overflow-hidden mb-4">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {member.name}
                    </h3>
                    <p className="text-sm text-[#ff5858]">{member.role}</p>
                    <p className="mt-4 text-gray-600 dark:text-gray-400">
                      {member.bio}
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
              Join Our Growing Team
            </h2>
            <p className="mt-4 text-lg text-white/90">
              We're always looking for talented individuals to join our mission
            </p>
            <div className="mt-8">
              <Button
                asChild
                size="lg"
                className="bg-white text-[#ff5858] hover:bg-white/90"
              >
                <a href="/careers">
                  View Open Positions
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 