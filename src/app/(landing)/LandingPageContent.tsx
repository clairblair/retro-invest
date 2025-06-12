'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import {
  ArrowRightIcon,
  ChartBarIcon,
  ShieldCheckIcon,
  CurrencyDollarIcon,
  ClockIcon,
  UserGroupIcon,
  SparklesIcon,
  BuildingOfficeIcon,
} from '@heroicons/react/24/outline'

const features = [
  {
    name: 'Smart Investment Plans',
    description: 'Choose from a variety of investment plans tailored to your financial goals and risk tolerance. Our AI-driven recommendations help you maximize returns safely.',
    icon: ChartBarIcon,
  },
  {
    name: 'Secure Transactions',
    description: 'Your investments are protected with state-of-the-art security, encryption, and 24/7 monitoring. We prioritize your safety at every step.',
    icon: ShieldCheckIcon,
  },
  {
    name: 'Daily ROI',
    description: 'Earn daily returns on your investments with our competitive ROI rates. Watch your money grow every single day.',
    icon: CurrencyDollarIcon,
  },
  {
    name: '24/7 Support',
    description: 'Our dedicated support team is available round the clock to assist you with any questions or issues.',
    icon: ClockIcon,
  },
  {
    name: 'Growing Community',
    description: 'Join thousands of successful investors in our thriving community. Share insights, learn, and grow together.',
    icon: UserGroupIcon,
  },
  {
    name: 'Business Solutions',
    description: 'Custom investment solutions for businesses, organizations, and high-net-worth individuals.',
    icon: BuildingOfficeIcon,
  },
]

const howItWorks = [
  {
    step: 'Sign Up',
    text: 'Create your free account in seconds and verify your identity securely.',
    icon: SparklesIcon,
  },
  {
    step: 'Choose Plan',
    text: 'Select an investment plan that matches your goals and risk profile.',
    icon: ChartBarIcon,
  },
  {
    step: 'Invest',
    text: 'Fund your account using multiple payment methods and start investing.',
    icon: CurrencyDollarIcon,
  },
  {
    step: 'Earn & Withdraw',
    text: 'Track your daily ROI and withdraw your earnings anytime, anywhere.',
    icon: ArrowRightIcon,
  },
]

const testimonials = [
  {
    name: 'David Thompson',
    role: 'Tech Entrepreneur',
    image: '/testimonials/david.jpg',
    quote: "KLTMINES has transformed my investment strategy. The platform&apos;s ease of use and consistent returns have made it an essential part of my financial portfolio.",
  },
  {
    name: 'Maria Rodriguez',
    role: 'Small Business Owner',
    image: '/testimonials/maria.jpg',
    quote: "As a small business owner, I needed a reliable investment platform. KLTMINES has exceeded my expectations with their transparent processes and excellent returns.",
  },
  {
    name: 'James Wilson',
    role: 'Retired Professional',
    image: '/testimonials/james.jpg',
    quote: "The daily ROI and professional support from KLTMINES have made my retirement planning much more effective. I highly recommend their services.",
  },
]

const faqs = [
  {
    question: 'How secure is my investment?',
    answer: 'We use bank-level encryption, two-factor authentication, and regular security audits to ensure your funds and data are always safe.'
  },
  {
    question: 'How do I withdraw my earnings?',
    answer: 'Withdrawals are instant and can be made to your bank account or crypto wallet at any time from your dashboard.'
  },
  {
    question: 'What is the minimum investment amount?',
    answer: 'You can start investing with as little as ₦100,000 or the equivalent in supported currencies.'
  },
  {
    question: 'Can businesses or organizations invest?',
    answer: 'Yes! We offer custom solutions for businesses, organizations, and high-net-worth individuals.'
  },
]

export default function LandingPageContent() {
  return (
    // ...all the JSX from your previous LandingPageContent function...
    <div className="relative">
      {/* Hero Section */}
      {/* ...rest of your JSX... */}
    </div>
  )
} 