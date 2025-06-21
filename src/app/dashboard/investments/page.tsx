'use client'

import { useState } from 'react'
import {
  BanknotesIcon,
  CurrencyDollarIcon,
  ArrowTrendingUpIcon,
  CheckCircleIcon,
  ShieldCheckIcon,
  GiftIcon,
  UserGroupIcon,
  FireIcon,
  RocketLaunchIcon,
  StarIcon,
  TrophyIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

const investmentPlans = [
  {
    name: 'Cadet',
    minAmount: 5,
    maxAmount: 20,
    dailyRoi: 5,
    welcomeBonus: 2.5,
    referralBonus: 3.5,
    features: [
      'Daily ROI payments',
      'Flexible investment duration',
      '2.5% welcome bonus',
      '3.5% referral bonus',
      'Auto-reinvest option',
      '24/7 Support',
    ],
    icon: StarIcon,
    color: 'from-gray-500 to-gray-700',
  },
  {
    name: 'Captain',
    minAmount: 21,
    maxAmount: 35,
    dailyRoi: 5.8,
    welcomeBonus: 3,
    referralBonus: 4,
    features: [
      'Daily ROI payments',
      'Flexible investment duration',
      '3% welcome bonus',
      '4% referral bonus',
      'Priority Support',
      'Auto-reinvest option',
    ],
    icon: RocketLaunchIcon,
    color: 'from-blue-500 to-blue-700',
  },
  {
    name: 'General',
    minAmount: 36,
    maxAmount: 50,
    dailyRoi: 6.25,
    welcomeBonus: 3.5,
    referralBonus: 4.5,
    features: [
      'High Daily ROI payments',
      'Flexible terms',
      '3.5% welcome bonus',
      '4.5% referral bonus',
      'Priority Support',
      'Auto-reinvest option',
    ],
    icon: ShieldCheckIcon,
    color: 'from-green-500 to-green-700',
  },
  {
    name: 'Vanguard',
    minAmount: 51,
    maxAmount: 99,
    dailyRoi: 6.7,
    welcomeBonus: 4,
    referralBonus: 5,
    features: [
      'Higher Daily ROI payments',
      'Flexible investment duration',
      '4% welcome bonus',
      '5% referral bonus',
      'Auto-invest option',
      'VIP benefit',
    ],
    icon: FireIcon,
    color: 'from-orange-500 to-orange-700',
  },
  {
    name: 'Admiral',
    minAmount: 100,
    maxAmount: 150,
    dailyRoi: 7.1,
    welcomeBonus: 6,
    referralBonus: 6,
    features: [
      'Highest Daily ROI payments',
      'Flexible investment duration',
      '5% welcome bonus',
      '6% referral bonus',
      'Auto-invest option',
      'VIP benefit',
    ],
    icon: TrophyIcon,
    color: 'from-purple-500 to-purple-700',
  },
]

export default function InvestmentsPage() {
  const [selectedPlan, setSelectedPlan] = useState(investmentPlans[0])
  const [investmentAmount, setInvestmentAmount] = useState(selectedPlan.minAmount)

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-[#ff5858] via-[#ff7e5f] to-[#ff9966] bg-clip-text text-transparent">
          Investment Plans
          </h1>
        <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
          Choose a plan that fits your financial goals.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {investmentPlans.map((plan, index) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className={cn("relative flex h-full flex-col overflow-hidden rounded-2xl border-2 border-transparent bg-gray-900 text-white shadow-2xl", `hover:border-purple-500`)}>
              <div className={cn("absolute inset-0 z-0 opacity-20", plan.color)} />
              <div className="relative z-10 flex flex-col p-8">
                <plan.icon className="mb-4 h-10 w-10" />
                <h3 className="text-2xl font-bold">{plan.name}</h3>
                <p className="mt-2 text-4xl font-bold">
                                {plan.dailyRoi}%
                  <span className="text-base font-medium text-gray-300">/ day</span>
                </p>
                <p className="mt-1 text-sm text-gray-400">
                  ${plan.minAmount} - ${plan.maxAmount}
                              </p>
                <ul className="mt-6 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center">
                      <CheckCircleIcon className="mr-3 h-5 w-5 text-green-400" />
                      <span>{feature}</span>
                                </li>
                              ))}
                            </ul>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                      onClick={() => {
                        setSelectedPlan(plan)
                        setInvestmentAmount(plan.minAmount)
                      }}
                      className="mt-8 w-full bg-white text-gray-900 hover:bg-gray-200"
                              >
                                Invest Now
                              </Button>
                            </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                              <DialogHeader>
                      <DialogTitle>Invest in {selectedPlan.name}</DialogTitle>
                              </DialogHeader>
                    <div className="grid gap-4 py-4">
                                <div>
                        <label htmlFor="amount" className="block text-sm font-medium">
                          Amount (USD)
                                  </label>
                                    <Input
                          id="amount"
                          type="number"
                                      value={investmentAmount}
                          onChange={(e) => setInvestmentAmount(Number(e.target.value))}
                          min={selectedPlan.minAmount}
                          max={selectedPlan.maxAmount}
                          className="mt-1"
                        />
                        <p className="mt-1 text-sm text-gray-500">
                          Min: ${selectedPlan.minAmount}, Max: ${selectedPlan.maxAmount}
                                  </p>
                                </div>
                                <div>
                        <label className="block text-sm font-medium">Payment Method</label>
                        <Select>
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select payment method" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="wallet">Wallet Balance</SelectItem>
                            <SelectItem value="deposit">Bank/Crypto Deposit</SelectItem>
                          </SelectContent>
                        </Select>
                                          </div>
                                        </div>
                    <Button type="submit" className="w-full">
                      Confirm Investment
                                </Button>
                            </DialogContent>
                          </Dialog>
                        </div>
                    </Card>
                  </motion.div>
                ))}
            </div>
    </div>
  )
} 