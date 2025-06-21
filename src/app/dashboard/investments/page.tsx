'use client'

import { useState, useEffect } from 'react'
import {
  BanknotesIcon,
  CurrencyDollarIcon,
  ArrowTrendingUpIcon,
  CheckCircleIcon,
  ClockIcon,
  ArrowPathIcon,
  ChartBarIcon,
  WalletIcon,
  CalendarIcon,
  InformationCircleIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  StarIcon,
  RocketLaunchIcon,
  ShieldCheckIcon,
  FireIcon,
  TrophyIcon,
} from '@heroicons/react/24/outline'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { toast } from 'sonner'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Skeleton } from '@/components/ui/skeleton'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertCircle } from 'lucide-react'

interface InvestmentPlan {
  id: string
  name: string
  type: 'naira' | 'usdt'
  minAmount: number
  maxAmount: number
  dailyRoi: number
  totalRoi: number
  duration: number
  welcomeBonus: number
  referralBonus: number
  icon: any
  features: string[]
  description: string
  popularity: number
  totalInvestors: number
  totalVolume: string
}

interface ActiveInvestment {
  id: number
  planId: string
  amount: string
  dailyRoi: number,
  duration: number
  startDate: string
  endDate: string
  status: 'active' | 'completed' | 'pending'
  progress: number
  totalEarnings: string
  nextPayout: string
  dailyEarnings: string
  projectedEarnings: string
  autoReinvest: boolean
  lastPayout: string
  payoutHistory: {
    date: string
    amount: string
  }[]
}

interface PaymentMethod {
  id: string
  name: string
  type: 'wallet' | 'deposit'
  icon: React.ReactNode
  description: string
}

const paymentMethods: PaymentMethod[] = [
  {
    id: 'wallet',
    name: 'Wallet Balance',
    type: 'wallet',
    icon: <WalletIcon className="h-5 w-5" />,
    description: 'Pay directly from your wallet balance',
  },
  {
    id: 'bank-transfer',
    name: 'Bank Transfer',
    type: 'deposit',
    icon: <BanknotesIcon className="h-5 w-5" />,
    description: 'Make a bank transfer to our account',
  },
  {
    id: 'crypto',
    name: 'Crypto Payment',
    type: 'deposit',
    icon: <CurrencyDollarIcon className="h-5 w-5" />,
    description: 'Send crypto to our wallet address',
  },
]

const investmentPlans: InvestmentPlan[] = [
  // Naira Plans
  {
    id: 'naira-cadet',
    name: 'Naira Cadet',
    type: 'naira',
    minAmount: 5000,
    maxAmount: 25000,
    dailyRoi: 5,
    totalRoi: 150,
    duration: 30,
    welcomeBonus: 2.5,
    referralBonus: 3.5,
    icon: <StarIcon className="h-6 w-6" />,
    features: [ 'Daily ROI payments', 'Flexible investment duration', '2.5% welcome bonus', '3.5% referral bonus', 'Auto-reinvest option', '24/7 Support' ],
    description: "Start your investment journey with the Cadet plan, designed for steady growth and minimal risk.",
    popularity: 92,
    totalInvestors: 1500,
    totalVolume: "₦15M",
  },
  {
    id: 'naira-captain',
    name: 'Naira Captain',
    type: 'naira',
    minAmount: 26000,
    maxAmount: 35000,
    dailyRoi: 5.8,
    totalRoi: 174,
    duration: 30,
    welcomeBonus: 3,
    referralBonus: 4,
    icon: <RocketLaunchIcon className="h-6 w-6" />,
    features: [ 'Daily ROI payments', 'Flexible investment duration', '3% welcome bonus', '4% referral bonus', 'Priority Support', 'Auto-reinvest option' ],
    description: "The Captain plan offers enhanced returns and priority support for the ambitious investor.",
    popularity: 88,
    totalInvestors: 1100,
    totalVolume: "₦30M",
  },
  {
    id: 'naira-general',
    name: 'Naira General',
    type: 'naira',
    minAmount: 36000,
    maxAmount: 45000,
    dailyRoi: 6.25,
    totalRoi: 187.5,
    duration: 30,
    welcomeBonus: 3.5,
    referralBonus: 4.5,
    icon: <ShieldCheckIcon className="h-6 w-6" />,
    features: [ 'High Daily ROI payments', 'Flexible terms', '3.5% welcome bonus', '4.5% referral bonus', 'Priority Support', 'Auto-reinvest option' ],
    description: "For the strategic investor, the General plan provides high daily ROIs and flexible terms.",
    popularity: 85,
    totalInvestors: 800,
    totalVolume: "₦50M",
  },
  {
    id: 'naira-vanguard',
    name: 'Naira Vanguard',
    type: 'naira',
    minAmount: 46000,
    maxAmount: 55000,
    dailyRoi: 6.7,
    totalRoi: 201,
    duration: 30,
    welcomeBonus: 4,
    referralBonus: 5,
    icon: <FireIcon className="h-6 w-6" />,
    features: [ 'Higher Daily ROI payments', 'Flexible investment duration', '4% welcome bonus', '5% referral bonus', 'Auto-invest option', 'VIP benefit' ],
    description: "Lead the charge with the Vanguard plan, offering even higher returns and exclusive VIP benefits.",
    popularity: 80,
    totalInvestors: 600,
    totalVolume: "₦75M",
  },
  {
    id: 'naira-admiral',
    name: 'Naira Admiral',
    type: 'naira',
    minAmount: 156000,
    maxAmount: 250000,
    dailyRoi: 7.1,
    totalRoi: 213,
    duration: 30,
    welcomeBonus: 4.5,
    referralBonus: 6,
    icon: <TrophyIcon className="h-6 w-6" />,
    features: [ 'Highest Daily ROI payments', 'Flexible investment duration', '5% welcome bonus', '6% referral bonus', 'Auto-invest option', 'VIP benefit' ],
    description: "The Admiral plan is for the elite investor, providing the highest returns and premium benefits.",
    popularity: 75,
    totalInvestors: 400,
    totalVolume: "₦120M",
  },
  // USDT Plans
  {
    id: 'usdt-cadet',
    name: 'USDT Cadet',
    type: 'usdt',
    minAmount: 5,
    maxAmount: 20,
    dailyRoi: 5,
    totalRoi: 150,
    duration: 30,
    welcomeBonus: 2.5,
    referralBonus: 3.5,
    icon: <StarIcon className="h-6 w-6" />,
    features: [ 'Daily ROI payments', 'Flexible investment duration', '2.5% welcome bonus', '3.5% referral bonus', 'Auto-reinvest option', '24/7 Support' ],
    description: "A stable and secure start to crypto investing with our USDT Cadet plan.",
    popularity: 90,
    totalInvestors: 2500,
    totalVolume: "$500k",
  },
  {
    id: 'usdt-captain',
    name: 'USDT Captain',
    type: 'usdt',
    minAmount: 21,
    maxAmount: 35,
    dailyRoi: 5.8,
    totalRoi: 174,
    duration: 30,
    welcomeBonus: 3,
    referralBonus: 4,
    icon: <RocketLaunchIcon className="h-6 w-6" />,
    features: [ 'Daily ROI payments', 'Flexible investment duration', '3% welcome bonus', '4% referral bonus', 'Priority Support', 'Auto-reinvest option' ],
    description: "Navigate the crypto markets with confidence using the USDT Captain plan.",
    popularity: 87,
    totalInvestors: 1800,
    totalVolume: "$800k",
  },
  {
    id: 'usdt-general',
    name: 'USDT General',
    type: 'usdt',
    minAmount: 36,
    maxAmount: 50,
    dailyRoi: 6.25,
    totalRoi: 187.5,
    duration: 30,
    welcomeBonus: 3.5,
    referralBonus: 4.5,
    icon: <ShieldCheckIcon className="h-6 w-6" />,
    features: [ 'High Daily ROI payments', 'Flexible terms', '3.5% welcome bonus', '4.5% referral bonus', 'Priority Support', 'Auto-reinvest option' ],
    description: "Command a powerful investment strategy with the high-yield USDT General plan.",
    popularity: 84,
    totalInvestors: 1200,
    totalVolume: "$1.2M",
  },
  {
    id: 'usdt-vanguard',
    name: 'USDT Vanguard',
    type: 'usdt',
    minAmount: 51,
    maxAmount: 99,
    dailyRoi: 6.7,
    totalRoi: 201,
    duration: 30,
    welcomeBonus: 4,
    referralBonus: 5,
    icon: <FireIcon className="h-6 w-6" />,
    features: [ 'Higher Daily ROI payments', 'Flexible investment duration', '4% welcome bonus', '5% referral bonus', 'Auto-invest option', 'VIP benefit' ],
    description: "Pioneer new opportunities in the crypto space with the USDT Vanguard plan.",
    popularity: 78,
    totalInvestors: 900,
    totalVolume: "$2M",
  },
  {
    id: 'usdt-admiral',
    name: 'USDT Admiral',
    type: 'usdt',
    minAmount: 100,
    maxAmount: 150,
    dailyRoi: 7.1,
    totalRoi: 213,
    duration: 30,
    welcomeBonus: 4.5,
    referralBonus: 6,
    icon: <TrophyIcon className="h-6 w-6" />,
    features: [ 'Highest Daily ROI payments', 'Flexible investment duration', '5% welcome bonus', '6% referral bonus', 'Auto-invest option', 'VIP benefit' ],
    description: "The pinnacle of crypto investing, the USDT Admiral plan offers unparalleled returns.",
    popularity: 72,
    totalInvestors: 500,
    totalVolume: "$3.5M",
  },
]

const activeInvestments: ActiveInvestment[] = [
  {
    id: 1,
    planId: 'naira-vanguard',
    amount: '₦50,000',
    dailyRoi: 6.7,
    duration: 30,
    startDate: '2024-03-01',
    endDate: '2024-03-31',
    status: 'active',
    progress: 65,
    totalEarnings: '₦21,775',
    nextPayout: 'In 12 hours',
    dailyEarnings: '₦3,350',
    projectedEarnings: '₦100,500',
    autoReinvest: true,
    lastPayout: '2024-03-19',
    payoutHistory: [
      { date: '2024-03-19', amount: '₦3,350' },
      { date: '2024-03-18', amount: '₦3,350' },
      { date: '2024-03-17', amount: '₦3,350' },
    ],
  },
  {
    id: 2,
    planId: 'usdt-general',
    amount: '40 USDT',
    dailyRoi: 6.25,
    duration: 30,
    startDate: '2024-02-15',
    endDate: '2024-03-15',
    status: 'completed',
    progress: 100,
    totalEarnings: '75 USDT',
    nextPayout: '-',
    dailyEarnings: '2.5 USDT',
    projectedEarnings: '75 USDT',
    autoReinvest: false,
    lastPayout: '2024-03-15',
    payoutHistory: [
      { date: '2024-03-15', amount: '2.5 USDT' },
      { date: '2024-03-14', amount: '2.5 USDT' },
      { date: '2024-03-13', amount: '2.5 USDT' },
    ],
  },
]

export default function InvestmentsPage() {
  const [selectedPlan, setSelectedPlan] = useState<InvestmentPlan | null>(null)
  const [investmentAmount, setInvestmentAmount] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [activeTab, setActiveTab] = useState('plans')
  const [autoReinvest, setAutoReinvest] = useState(false)
  const [selectedCurrency, setSelectedCurrency] = useState<'naira' | 'usdt'>('naira')
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [roiFilter, setRoiFilter] = useState('all')
  const [investmentStatusFilter, setInvestmentStatusFilter] = useState<'all' | 'active' | 'completed'>('active')
  const [searchActive, setSearchActive] = useState('')

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  const handleInvestment = async () => {
    if (!selectedPlan || !investmentAmount) return

    setIsProcessing(true)
    try {
      // All investments are processed from the wallet
      console.log('Processing investment from wallet:', {
        plan: selectedPlan.name,
        amount: investmentAmount,
        autoReinvest,
      })
      await new Promise(resolve => setTimeout(resolve, 1500))
      toast.success('Investment Successful', {
        description: `Your investment in ${selectedPlan.name} was successful.`,
      })
      setSelectedPlan(null)
      setInvestmentAmount('')
      setAutoReinvest(false)
    } catch (error) {
      toast.error('Investment Failed', {
        description: 'There was an error creating your investment.',
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const calculateProjectedEarnings = (amount: number, dailyRoi: number, duration: number) => {
    if (isNaN(amount) || amount <= 0) return 0
    const dailyEarnings = amount * (dailyRoi / 100)
    const totalEarnings = dailyEarnings * duration
    return totalEarnings
  }

  const filteredInvestments = activeInvestments.filter((investment) => {
    const plan = investmentPlans.find((p) => p.id === investment.planId)
    const matchesStatus = investmentStatusFilter === 'all' ? true : (investment.status === investmentStatusFilter)
    const matchesSearch = plan?.name.toLowerCase().includes(searchActive.toLowerCase())
    return matchesStatus && matchesSearch
  })

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[#ff5858] via-[#ff7e5f] to-[#ff9966] bg-clip-text text-transparent">
            Investments
          </h1>
          <p className="text-gray-500">Manage your investments and track your returns</p>
        </div>
      </motion.div>

      <Tabs defaultValue="plans" className="w-full" onValueChange={(value) => setActiveTab(value)}>
        <TabsList className="grid w-full grid-cols-2 bg-white/50 backdrop-blur-sm">
          <TabsTrigger value="plans" className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 transition-colors data-[state=active]:bg-gradient-to-r from-[#ff5858] via-[#ff7e5f] to-[#ff9966] data-[state=active]:text-white">
            <ArrowTrendingUpIcon className="h-4 w-4" />
            Investment Plans
          </TabsTrigger>
          <TabsTrigger value="active" className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 transition-colors data-[state=active]:bg-gradient-to-r from-[#ff5858] via-[#ff7e5f] to-[#ff9966] data-[state=active]:text-white">
            <ClockIcon className="h-4 w-4" />
            Active Investments
          </TabsTrigger>
        </TabsList>

        <TabsContent value="plans">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Select value={selectedCurrency} onValueChange={(value) => setSelectedCurrency(value as 'naira' | 'usdt')}>
                <SelectTrigger className="w-[180px] bg-white/50 backdrop-blur-sm">
                  <SelectValue placeholder="Select Currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="naira">Naira (₦)</SelectItem>
                  <SelectItem value="usdt">USDT</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.5 }}
             className="mb-6 space-y-4"
           >
             <div className="flex flex-col gap-4 md:flex-row md:items-center">
               <div className="relative flex-1">
                 <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                 <Input
                   type="text"
                   placeholder="Search investment plans..."
                   className="pl-10 bg-white/50 backdrop-blur-sm"
                   value={searchQuery}
                   onChange={(e) => setSearchQuery(e.target.value)}
                 />
               </div>
               <div className="flex flex-wrap gap-2">
                 <Select value={roiFilter} onValueChange={setRoiFilter}>
                   <SelectTrigger className="w-[140px] bg-white/50 backdrop-blur-sm">
                     <SelectValue placeholder="ROI Range" />
                   </SelectTrigger>
                   <SelectContent>
                     <SelectItem value="all">All ROI</SelectItem>
                     <SelectItem value="low">5-6% Daily</SelectItem>
                     <SelectItem value="medium">6-7% Daily</SelectItem>
                     <SelectItem value="high">7%+ Daily</SelectItem>
                   </SelectContent>
                 </Select>
                 <Button
                   variant="outline"
                   onClick={() => {
                     setSearchQuery('')
                     setRoiFilter('all')
                   }}
                   className="bg-white/50 backdrop-blur-sm"
                 >
                   Clear Filters
                 </Button>
               </div>
             </div>
           </motion.div>

          {isLoading ? (
            <div className="grid gap-6 md:grid-cols-2">
              {[1, 2].map((i) => (
                <Card key={i} className="overflow-hidden">
                  <CardHeader className="border-b bg-gray-50/50">
                    <Skeleton className="h-8 w-3/4" />
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <Skeleton className="h-4 w-1/2" />
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-4 w-2/3" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {investmentPlans
                .filter(plan => {
                   const matchesCurrency = plan.type === selectedCurrency;
                   const matchesSearch = plan.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                        plan.description.toLowerCase().includes(searchQuery.toLowerCase());
                   const matchesRoi = roiFilter === 'all' || 
                     (roiFilter === 'low' && plan.dailyRoi >= 5 && plan.dailyRoi < 6) ||
                     (roiFilter === 'medium' && plan.dailyRoi >= 6 && plan.dailyRoi < 7) ||
                     (roiFilter === 'high' && plan.dailyRoi >= 7);
                   
                   return matchesCurrency && matchesSearch && matchesRoi;
                })
                .map((plan) => (
                  <motion.div
                    key={plan.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    whileHover={{ y: -5 }}
                  >
                    <Card className="overflow-hidden border-2 hover:border-blue-500 transition-colors h-full flex flex-col">
                      <CardHeader className="border-b bg-gradient-to-r from-[#ff5858]/10 via-[#ff7e5f]/10 to-[#ff9966]/10 flex flex-row items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="rounded-full bg-gradient-to-r from-[#ff5858] via-[#ff7e5f] to-[#ff9966] p-2 text-white">
                              {plan.icon}
                            </div>
                            <div>
                              <CardTitle className="text-lg">{plan.name}</CardTitle>
                              <CardDescription>{plan.description}</CardDescription>
                            </div>
                        </div>
                      </CardHeader>
                      <CardContent className="p-6 flex-grow flex flex-col">
                        <div className="space-y-4 flex-grow">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="rounded-lg bg-gradient-to-r from-[#ff5858]/10 via-[#ff7e5f]/10 to-[#ff9966]/10 p-4 text-center">
                              <p className="text-sm font-medium text-gray-500">Daily ROI</p>
                              <p className="text-2xl font-bold text-green-600">
                                {plan.dailyRoi}%
                              </p>
                            </div>
                            <div className="rounded-lg bg-gradient-to-r from-[#ff5858]/10 via-[#ff7e5f]/10 to-[#ff9966]/10 p-4 text-center">
                              <p className="text-sm font-medium text-gray-500">
                                Duration
                              </p>
                              <p className="text-2xl font-bold">
                                {plan.duration} days
                              </p>
                            </div>
                          </div>

                          <div className="text-sm text-gray-600">
                            <strong>Investment Range:</strong>{' '}
                            {plan.type === 'naira'
                              ? `₦${plan.minAmount.toLocaleString()} - ₦${plan.maxAmount.toLocaleString()}`
                              : `${plan.minAmount.toLocaleString()} - ${plan.maxAmount.toLocaleString()} USDT`
                            }
                          </div>
                        
                          <div className="rounded-lg bg-gradient-to-r from-[#ff5858]/10 via-[#ff7e5f]/10 to-[#ff9966]/10 p-4">
                            <p className="text-sm font-medium text-gray-500 mb-2">
                              Features
                            </p>
                            <ul className="space-y-2">
                              {plan.features.map((feature, index) => (
                                <li
                                  key={index}
                                  className="flex items-center text-sm text-gray-600"
                                >
                                  <CheckCircleIcon className="mr-2 h-4 w-4 text-[#ff5858]" />
                                  {feature}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              className="w-full mt-4 bg-gradient-to-r from-[#ff5858] via-[#ff7e5f] to-[#ff9966] hover:from-[#ff5858]/90 hover:via-[#ff7e5f]/90 hover:to-[#ff9966]/90 text-white"
                              onClick={() => setSelectedPlan(plan)}
                            >
                              Invest Now
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[425px] w-[95vw] sm:w-[90vw] md:w-[80vw] lg:w-[70vw] max-h-[90vh] overflow-y-auto bg-white/95 dark:bg-[#232526]/95 backdrop-blur-sm border-2">
                            <DialogHeader>
                              <DialogTitle className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-[#ff5858] via-[#ff7e5f] to-[#ff9966] bg-clip-text text-transparent">
                                Create Investment
                              </DialogTitle>
                              <DialogDescription className="text-sm text-gray-600">
                                You are investing in the <strong>{plan.name}</strong> plan.
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                              <div>
                                <Label className="text-sm font-medium">
                                  Investment Amount
                                </Label>
                                <div className="relative mt-1">
                                  {plan.type === 'naira' ? (
                                    <span className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400">₦</span>
                                  ) : (
                                    <span className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400">USDT</span>
                                  )}
                                  <Input
                                    type="number"
                                    value={investmentAmount}
                                    onChange={(e) => setInvestmentAmount(e.target.value)}
                                    className="pl-8 h-12 text-base bg-white/50 backdrop-blur-sm border-2 focus:border-blue-500 transition-colors"
                                    placeholder='0.00'
                                  />
                                </div>
                                <p className="mt-2 text-xs text-gray-500">
                                  Min: {plan.type === 'naira' ? '₦' : ''}
                                  {plan.minAmount.toLocaleString()}
                                  {plan.type === 'usdt' ? ' USDT' : ''}
                                  {' | '}
                                  Max: {plan.type === 'naira' ? '₦' : ''}
                                  {plan.maxAmount.toLocaleString()}
                                  {plan.type === 'usdt' ? ' USDT' : ''}
                                </p>
                              </div>

                              <div className="flex items-center space-x-2 p-4 rounded-lg bg-gray-50/50">
                                <Switch
                                  id="auto-reinvest"
                                  checked={autoReinvest}
                                  onCheckedChange={setAutoReinvest}
                                  className="data-[state=checked]:bg-blue-500"
                                />
                                <Label htmlFor="auto-reinvest" className="text-sm cursor-pointer">
                                  Enable Auto-Reinvest
                                </Label>
                              </div>

                              <div className="rounded-lg bg-gradient-to-r from-[#ff5858]/10 via-[#ff7e5f]/10 to-[#ff9966]/10 p-4">
                                <h4 className="text-sm font-medium">Investment Summary</h4>
                                <div className="mt-4 space-y-3">
                                  <div className="flex justify-between text-xs">
                                    <span className="text-gray-500">Daily ROI</span>
                                    <span className="font-medium">{plan.dailyRoi}%</span>
                                  </div>
                                  <div className="flex justify-between text-xs">
                                    <span className="text-gray-500">Duration</span>
                                    <span className="font-medium">
                                      {plan.duration} days
                                    </span>
                                  </div>
                                  <Separator className="my-3" />
                                  <div className="flex justify-between text-xs">
                                    <span className="text-gray-500">
                                      Projected Earnings
                                    </span>
                                    <span className="font-medium text-green-600">
                                      {plan.type === 'naira'
                                        ? '₦' + calculateProjectedEarnings(Number(investmentAmount), plan.dailyRoi, plan.duration).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                                        : calculateProjectedEarnings(Number(investmentAmount), plan.dailyRoi, plan.duration).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ` USDT`}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <DialogFooter className="flex flex-col sm:flex-row gap-2 pt-4 border-t">
                              <Button
                                variant="outline"
                                onClick={() => {
                                  setSelectedPlan(null)
                                }}
                                className="w-full sm:w-auto h-12 text-base border-2 hover:bg-gray-100 transition-colors"
                              >
                                Cancel
                              </Button>
                              <Button
                                onClick={handleInvestment}
                                disabled={isProcessing || !investmentAmount}
                                className="w-full sm:w-auto h-12 text-base bg-gradient-to-r from-[#ff5858] via-[#ff7e5f] to-[#ff9966] hover:from-[#ff5858]/90 hover:via-[#ff7e5f]/90 hover:to-[#ff9966]/90 text-white shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                {isProcessing ? (
                                  <>
                                    <ArrowPathIcon className="mr-2 h-4 w-4 animate-spin" />
                                    Processing...
                                  </>
                                ) : (
                                  'Invest from Wallet'
                                )}
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="active">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div className="flex gap-2">
              <Button
                variant={investmentStatusFilter === 'all' ? 'default' : 'outline'}
                onClick={() => setInvestmentStatusFilter('all')}
                className="rounded-full px-4"
              >
                All
              </Button>
              <Button
                variant={investmentStatusFilter === 'active' ? 'default' : 'outline'}
                onClick={() => setInvestmentStatusFilter('active')}
                className="rounded-full px-4"
              >
                Active
              </Button>
              <Button
                variant={investmentStatusFilter === 'completed' ? 'default' : 'outline'}
                onClick={() => setInvestmentStatusFilter('completed')}
                className="rounded-full px-4"
              >
                Closed
              </Button>
            </div>
            <Input
              type="text"
              placeholder="Search by plan name..."
              className="w-full md:w-64 bg-white/50 backdrop-blur-sm"
              value={searchActive}
              onChange={e => setSearchActive(e.target.value)}
            />
          </div>
          <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
            {filteredInvestments.length === 0 ? (
              <div className="col-span-full text-center text-gray-400 py-12">
                No investments found.
              </div>
            ) : (
              filteredInvestments.map((investment) => {
                const plan = investmentPlans.find((p) => p.id === investment.planId)
                const isClosed = investment.status === 'completed'
                return (
                  <motion.div
                    key={investment.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    whileHover={{ y: -5, scale: 1.02 }}
                  >
                    <Card className={cn(
                      "overflow-hidden border-2 transition-all duration-300 shadow-xl backdrop-blur-lg",
                      isClosed ? 'border-gray-300 bg-white/70 dark:bg-gray-900/70' : 'hover:border-[#ff7e5f] bg-white/80 dark:bg-[#232526]/80',
                      'glassmorphic-card'
                    )}>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-4">
                            <div className="rounded-full bg-gradient-to-r from-[#ff5858] via-[#ff7e5f] to-[#ff9966] p-2 text-white shadow-md">
                              {plan?.icon}
                            </div>
                            <div>
                              <h3 className="text-lg font-bold bg-gradient-to-r from-[#ff5858] via-[#ff7e5f] to-[#ff9966] bg-clip-text text-transparent">
                                {plan?.name}
                              </h3>
                              <p className="text-xs text-gray-500">
                                Started: {investment.startDate}
                              </p>
                            </div>
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            <span className={cn(
                              "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide",
                              isClosed ? 'bg-gray-200 text-gray-600 dark:bg-gray-800 dark:text-gray-300' : 'bg-green-100 text-green-800'
                            )}>
                              {isClosed ? (
                                <CheckCircleIcon className="mr-1 h-4 w-4" />
                              ) : (
                                <ClockIcon className="mr-1 h-4 w-4" />
                              )}
                              {isClosed ? 'Closed' : 'Active'}
                            </span>
                            {investment.autoReinvest && !isClosed && (
                              <Badge variant="secondary" className="flex items-center gap-1 bg-gradient-to-r from-[#ff5858]/10 via-[#ff7e5f]/10 to-[#ff9966]/10">
                                <ArrowPathIcon className="h-3 w-3" />
                                Auto-Reinvest
                              </Badge>
                            )}
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="rounded-lg bg-gradient-to-r from-[#ff5858]/10 via-[#ff7e5f]/10 to-[#ff9966]/10 p-4">
                              <p className="text-xs font-medium text-gray-500">Amount</p>
                              <p className="text-lg font-semibold">{investment.amount}</p>
                            </div>
                            <div className="rounded-lg bg-gradient-to-r from-[#ff5858]/10 via-[#ff7e5f]/10 to-[#ff9966]/10 p-4">
                              <p className="text-xs font-medium text-gray-500">Daily Earnings</p>
                              <p className="text-lg font-semibold text-green-600">{investment.dailyEarnings}</p>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="rounded-lg bg-gradient-to-r from-[#ff5858]/10 via-[#ff7e5f]/10 to-[#ff9966]/10 p-4">
                              <p className="text-xs font-medium text-gray-500">Total Earnings</p>
                              <p className="text-lg font-semibold text-green-600">{investment.totalEarnings}</p>
                            </div>
                            <div className="rounded-lg bg-gradient-to-r from-[#ff5858]/10 via-[#ff7e5f]/10 to-[#ff9966]/10 p-4">
                              <p className="text-xs font-medium text-gray-500">Projected</p>
                              <p className="text-lg font-semibold text-green-600">{investment.projectedEarnings}</p>
                            </div>
                          </div>
                          <div className="rounded-lg bg-gradient-to-r from-[#ff5858]/10 via-[#ff7e5f]/10 to-[#ff9966]/10 p-4">
                            <div className="flex items-center justify-between">
                              <p className="text-xs font-medium text-gray-500">Progress</p>
                              <p className="text-xs font-medium">{investment.progress}%</p>
                            </div>
                            <Progress value={investment.progress} className="mt-2 h-2 rounded-full" />
                          </div>
                          <div className="rounded-lg bg-gradient-to-r from-[#ff5858]/10 via-[#ff7e5f]/10 to-[#ff9966]/10 p-4">
                            <div className="flex items-center justify-between">
                              <p className="text-xs font-medium text-gray-500">Duration</p>
                              <p className="text-xs font-medium">{investment.duration} days</p>
                            </div>
                            <div className="flex items-center justify-between mt-2">
                              <p className="text-xs font-medium text-gray-500">Next Payout</p>
                              <p className="text-xs font-medium">{investment.nextPayout}</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
} 