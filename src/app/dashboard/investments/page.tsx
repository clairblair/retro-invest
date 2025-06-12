'use client'

import { useState, useEffect } from 'react'
import {
  BanknotesIcon,
  CurrencyDollarIcon,
  ArrowTrendingUpIcon,
  ClockIcon,
  CheckCircleIcon,
  ArrowPathIcon,
  ChartBarIcon,
  ArrowUpIcon,
  WalletIcon,
  CalendarIcon,
  InformationCircleIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
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
  type: 'naira' | 'btc' | 'eth' | 'usdt'
  minAmount: number
  maxAmount: number
  dailyRoi: number
  duration: number
  icon: React.ReactNode
  description: string
  features: string[]
  riskLevel: 'Low' | 'Medium' | 'High'
  autoReinvest: boolean
  totalRoi: number
  dailyPayout: boolean
  earlyWithdrawal: boolean
  earlyWithdrawalFee: number
  popularity: number
  totalInvestors: number
  totalVolume: string
}

interface ActiveInvestment {
  id: number
  planId: string
  amount: string
  dailyRoi: number
  totalRoi: number
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
  {
    id: 'naira-basic',
    name: 'Naira Basic Plan',
    type: 'naira',
    minAmount: 100000,
    maxAmount: 1000000,
    dailyRoi: 1.5,
    totalRoi: 45,
    duration: 30,
    icon: <BanknotesIcon className="h-6 w-6" />,
    description: 'Perfect for beginners. Start with our basic Naira investment plan and earn stable returns.',
    features: [
      'Daily ROI payments',
      'Flexible investment duration',
      'Low risk investment',
      'Instant withdrawals',
      'Auto-reinvest option',
      '24/7 Support',
    ],
    riskLevel: 'Low',
    autoReinvest: true,
    dailyPayout: true,
    earlyWithdrawal: true,
    earlyWithdrawalFee: 5,
    popularity: 95,
    totalInvestors: 1250,
    totalVolume: '₦250,000,000',
  },
  {
    id: 'naira-premium',
    name: 'Naira Premium Plan',
    type: 'naira',
    minAmount: 1000000,
    maxAmount: 5000000,
    dailyRoi: 2.0,
    totalRoi: 60,
    duration: 30,
    icon: <BanknotesIcon className="h-6 w-6" />,
    description: 'Our premium Naira investment plan offers higher returns for larger investments.',
    features: [
      'Higher daily ROI',
      'Priority support',
      'Market analysis reports',
      'Flexible terms',
      'Auto-reinvest option',
      'VIP benefits',
    ],
    riskLevel: 'Medium',
    autoReinvest: true,
    dailyPayout: true,
    earlyWithdrawal: true,
    earlyWithdrawalFee: 7,
    popularity: 85,
    totalInvestors: 750,
    totalVolume: '₦1,500,000,000',
  },
  {
    id: 'btc-basic',
    name: 'Bitcoin Starter',
    type: 'btc',
    minAmount: 0.01,
    maxAmount: 0.1,
    dailyRoi: 2.0,
    totalRoi: 60,
    duration: 30,
    icon: <CurrencyDollarIcon className="h-6 w-6" />,
    description: 'Start your Bitcoin investment journey with our basic plan.',
    features: [
      'Daily ROI payments',
      'Crypto market exposure',
      'Low minimum investment',
      'Auto-reinvest option',
      'Market updates',
      '24/7 Support',
    ],
    riskLevel: 'Medium',
    autoReinvest: true,
    dailyPayout: true,
    earlyWithdrawal: true,
    earlyWithdrawalFee: 7,
    popularity: 80,
    totalInvestors: 950,
    totalVolume: '₦120,000,000',
  },
  {
    id: 'btc-premium',
    name: 'Bitcoin Premium',
    type: 'btc',
    minAmount: 0.1,
    maxAmount: 1,
    dailyRoi: 2.5,
    totalRoi: 75,
    duration: 30,
    icon: <CurrencyDollarIcon className="h-6 w-6" />,
    description: 'Advanced Bitcoin investment plan with higher returns and premium features.',
    features: [
      'Higher ROI potential',
      'Professional management',
      'Advanced market analysis',
      'Priority support',
      'Auto-reinvest option',
      'VIP benefits',
    ],
    riskLevel: 'High',
    autoReinvest: true,
    dailyPayout: true,
    earlyWithdrawal: true,
    earlyWithdrawalFee: 10,
    popularity: 75,
    totalInvestors: 450,
    totalVolume: '₦300,000,000',
  },
  {
    id: 'eth-basic',
    name: 'Ethereum Basic',
    type: 'eth',
    minAmount: 0.1,
    maxAmount: 1,
    dailyRoi: 1.8,
    totalRoi: 54,
    duration: 30,
    icon: <CurrencyDollarIcon className="h-6 w-6" />,
    description: 'Start investing in Ethereum with our basic plan.',
    features: [
      'Daily ROI payments',
      'DeFi exposure',
      'Smart contract security',
      'Auto-reinvest option',
      'Market updates',
      '24/7 Support',
    ],
    riskLevel: 'Medium',
    autoReinvest: true,
    dailyPayout: true,
    earlyWithdrawal: true,
    earlyWithdrawalFee: 7,
    popularity: 85,
    totalInvestors: 800,
    totalVolume: '₦150,000,000',
  },
  {
    id: 'eth-premium',
    name: 'Ethereum Premium',
    type: 'eth',
    minAmount: 1,
    maxAmount: 10,
    dailyRoi: 2.2,
    totalRoi: 66,
    duration: 30,
    icon: <CurrencyDollarIcon className="h-6 w-6" />,
    description: 'Advanced Ethereum investment plan with premium features.',
    features: [
      'Higher ROI potential',
      'DeFi integration',
      'Advanced security',
      'Priority support',
      'Auto-reinvest option',
      'VIP benefits',
    ],
    riskLevel: 'High',
    autoReinvest: true,
    dailyPayout: true,
    earlyWithdrawal: true,
    earlyWithdrawalFee: 10,
    popularity: 70,
    totalInvestors: 350,
    totalVolume: '₦250,000,000',
  },
  {
    id: 'usdt-basic',
    name: 'USDT Basic',
    type: 'usdt',
    minAmount: 100,
    maxAmount: 1000,
    dailyRoi: 1.2,
    totalRoi: 36,
    duration: 30,
    icon: <CurrencyDollarIcon className="h-6 w-6" />,
    description: 'Stable returns with USDT investment, perfect for conservative investors.',
    features: [
      'Stable value',
      'Regular payouts',
      'Low volatility',
      'Quick liquidity',
      'Auto-reinvest option',
      '24/7 Support',
    ],
    riskLevel: 'Low',
    autoReinvest: true,
    dailyPayout: true,
    earlyWithdrawal: true,
    earlyWithdrawalFee: 5,
    popularity: 90,
    totalInvestors: 1200,
    totalVolume: '₦180,000,000',
  },
  {
    id: 'usdt-premium',
    name: 'USDT Premium',
    type: 'usdt',
    minAmount: 1000,
    maxAmount: 10000,
    dailyRoi: 1.5,
    totalRoi: 45,
    duration: 30,
    icon: <CurrencyDollarIcon className="h-6 w-6" />,
    description: 'Premium USDT investment plan with enhanced returns.',
    features: [
      'Higher stable returns',
      'Priority processing',
      'Advanced security',
      'Market analysis',
      'Auto-reinvest option',
      'VIP benefits',
    ],
    riskLevel: 'Low',
    autoReinvest: true,
    dailyPayout: true,
    earlyWithdrawal: true,
    earlyWithdrawalFee: 7,
    popularity: 85,
    totalInvestors: 600,
    totalVolume: '₦300,000,000',
  },
  {
    id: 'naira-enterprise',
    name: 'Naira Enterprise',
    type: 'naira',
    minAmount: 5000000,
    maxAmount: 20000000,
    dailyRoi: 2.5,
    totalRoi: 75,
    duration: 30,
    icon: <BanknotesIcon className="h-6 w-6" />,
    description: 'Exclusive enterprise-level Naira investment plan for high-net-worth individuals.',
    features: [
      'Highest ROI potential',
      'Dedicated account manager',
      'Custom investment terms',
      'Priority processing',
      'Auto-reinvest option',
      'Premium support',
    ],
    riskLevel: 'High',
    autoReinvest: true,
    dailyPayout: true,
    earlyWithdrawal: true,
    earlyWithdrawalFee: 10,
    popularity: 65,
    totalInvestors: 150,
    totalVolume: '₦2,000,000,000',
  },
  {
    id: 'btc-enterprise',
    name: 'Bitcoin Enterprise',
    type: 'btc',
    minAmount: 1,
    maxAmount: 5,
    dailyRoi: 3.0,
    totalRoi: 90,
    duration: 30,
    icon: <CurrencyDollarIcon className="h-6 w-6" />,
    description: 'Exclusive enterprise-level Bitcoin investment plan for serious investors.',
    features: [
      'Maximum ROI potential',
      'Professional portfolio management',
      'Advanced market analysis',
      'Priority processing',
      'Auto-reinvest option',
      'Premium support',
    ],
    riskLevel: 'High',
    autoReinvest: true,
    dailyPayout: true,
    earlyWithdrawal: true,
    earlyWithdrawalFee: 12,
    popularity: 60,
    totalInvestors: 100,
    totalVolume: '₦500,000,000',
  }
]

const activeInvestments: ActiveInvestment[] = [
  {
    id: 1,
    planId: 'naira-basic',
    amount: '₦500,000',
    dailyRoi: 1.5,
    totalRoi: 45,
    duration: 30,
    startDate: '2024-03-01',
    endDate: '2024-03-31',
    status: 'active',
    progress: 65,
    totalEarnings: '₦32,500',
    nextPayout: '2024-03-20',
    dailyEarnings: '₦7,500',
    projectedEarnings: '₦225,000',
    autoReinvest: true,
    lastPayout: '2024-03-19',
    payoutHistory: [
      { date: '2024-03-19', amount: '₦7,500' },
      { date: '2024-03-18', amount: '₦7,500' },
      { date: '2024-03-17', amount: '₦7,500' },
    ],
  },
  {
    id: 2,
    planId: 'btc-premium',
    amount: '0.05 BTC',
    dailyRoi: 2.5,
    totalRoi: 75,
    duration: 30,
    startDate: '2024-02-15',
    endDate: '2024-03-15',
    status: 'active',
    progress: 45,
    totalEarnings: '0.0125 BTC',
    nextPayout: '2024-03-20',
    dailyEarnings: '0.00125 BTC',
    projectedEarnings: '0.0375 BTC',
    autoReinvest: false,
    lastPayout: '2024-03-19',
    payoutHistory: [
      { date: '2024-03-19', amount: '0.00125 BTC' },
      { date: '2024-03-18', amount: '0.00125 BTC' },
      { date: '2024-03-17', amount: '0.00125 BTC' },
    ],
  },
]

export default function InvestmentsPage() {
  const [selectedPlan, setSelectedPlan] = useState<InvestmentPlan | null>(null)
  const [investmentAmount, setInvestmentAmount] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [activeTab, setActiveTab] = useState('plans')
  const [autoReinvest, setAutoReinvest] = useState(false)
  const [selectedCurrency, setSelectedCurrency] = useState('naira')
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod | null>(null)
  const [showPaymentDetails, setShowPaymentDetails] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [riskFilter, setRiskFilter] = useState('all')
  const [roiFilter, setRoiFilter] = useState('all')
  const [investmentStatusFilter, setInvestmentStatusFilter] = useState<'all' | 'active' | 'closed'>('active')
  const [searchActive, setSearchActive] = useState('')

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  const handleInvestment = async () => {
    if (!selectedPlan || !selectedPaymentMethod) return

    setIsProcessing(true)
    try {
      if (selectedPaymentMethod.type === 'wallet') {
        // Handle wallet payment
        console.log('Processing wallet payment:', {
          plan: selectedPlan,
          amount: investmentAmount,
          autoReinvest,
        })
        await new Promise(resolve => setTimeout(resolve, 1500))
        toast.success('Investment Created', {
          description: 'Your investment has been created successfully.',
        })
        setSelectedPlan(null)
        setInvestmentAmount('')
        setAutoReinvest(false)
        setSelectedPaymentMethod(null)
      } else {
        // Show payment details for deposit
        setShowPaymentDetails(true)
      }
    } catch (error) {
      toast.error('Error', {
        description: 'There was an error creating your investment.',
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800'
      case 'completed':
        return 'bg-blue-100 text-blue-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getRiskLevelColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'Low':
        return 'bg-green-100 text-green-800'
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800'
      case 'High':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const calculateProjectedEarnings = (amount: number, dailyRoi: number, duration: number) => {
    const dailyEarnings = amount * (dailyRoi / 100)
    const totalEarnings = dailyEarnings * duration
    return totalEarnings
  }

  // Add a helper to get filtered investments
  const filteredInvestments = activeInvestments.filter((investment) => {
    const plan = investmentPlans.find((p) => p.id === investment.planId)
    const matchesStatus = investmentStatusFilter === 'all' ? true : (
      investmentStatusFilter === 'active' ? investment.status === 'active' : investment.status === 'completed'
    )
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
        <div className="flex flex-wrap items-center gap-4">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Badge variant="outline" className="flex items-center gap-2 bg-white/50 backdrop-blur-sm">
              <WalletIcon className="h-4 w-4" />
              Total Balance: ₦1,250,000
            </Badge>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Badge variant="outline" className="flex items-center gap-2 bg-white/50 backdrop-blur-sm">
              <ChartBarIcon className="h-4 w-4" />
              Total ROI: ₦45,000
            </Badge>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Badge variant="outline" className="flex items-center gap-2 bg-white/50 backdrop-blur-sm">
              <ArrowUpIcon className="h-4 w-4 text-green-500" />
              Active Investments: 2
            </Badge>
          </motion.div>
        </div>
      </motion.div>

      <Tabs defaultValue="plans" className="w-full" onValueChange={setActiveTab}>
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
              <Select value={selectedCurrency} onValueChange={setSelectedCurrency}>
                <SelectTrigger className="w-[180px] bg-white/50 backdrop-blur-sm">
                  <SelectValue placeholder="Select Currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="naira">Naira (₦)</SelectItem>
                  <SelectItem value="btc">Bitcoin (BTC)</SelectItem>
                  <SelectItem value="eth">Ethereum (ETH)</SelectItem>
                  <SelectItem value="usdt">USDT</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" className="bg-white/50 backdrop-blur-sm">
                      <InformationCircleIcon className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Learn more about our investment plans</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
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
                <Select value={riskFilter} onValueChange={setRiskFilter}>
                  <SelectTrigger className="w-[140px] bg-white/50 backdrop-blur-sm">
                    <SelectValue placeholder="Risk Level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Risks</SelectItem>
                    <SelectItem value="Low">Low Risk</SelectItem>
                    <SelectItem value="Medium">Medium Risk</SelectItem>
                    <SelectItem value="High">High Risk</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={roiFilter} onValueChange={setRoiFilter}>
                  <SelectTrigger className="w-[140px] bg-white/50 backdrop-blur-sm">
                    <SelectValue placeholder="ROI Range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All ROI</SelectItem>
                    <SelectItem value="low">1-2% Daily</SelectItem>
                    <SelectItem value="medium">2-3% Daily</SelectItem>
                    <SelectItem value="high">3%+ Daily</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery('')
                    setRiskFilter('all')
                    setRoiFilter('all')
                  }}
                  className="bg-white/50 backdrop-blur-sm"
                >
                  Clear Filters
                </Button>
              </div>
            </div>
            {searchQuery || riskFilter !== 'all' || roiFilter !== 'all' ? (
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <FunnelIcon className="h-4 w-4" />
                <span>Filtered results</span>
                {searchQuery && (
                  <Badge variant="secondary" className="bg-white/50 backdrop-blur-sm">
                    Search: {searchQuery}
                  </Badge>
                )}
                {riskFilter !== 'all' && (
                  <Badge variant="secondary" className="bg-white/50 backdrop-blur-sm">
                    Risk: {riskFilter}
                  </Badge>
                )}
                {roiFilter !== 'all' && (
                  <Badge variant="secondary" className="bg-white/50 backdrop-blur-sm">
                    ROI: {roiFilter}
                  </Badge>
                )}
              </div>
            ) : null}
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
                  const matchesCurrency = plan.type === selectedCurrency
                  const matchesSearch = plan.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                       plan.description.toLowerCase().includes(searchQuery.toLowerCase())
                  const matchesRisk = riskFilter === 'all' || plan.riskLevel === riskFilter
                  const matchesRoi = roiFilter === 'all' || 
                    (roiFilter === 'low' && plan.dailyRoi <= 2) ||
                    (roiFilter === 'medium' && plan.dailyRoi > 2 && plan.dailyRoi <= 3) ||
                    (roiFilter === 'high' && plan.dailyRoi > 3)
                  
                  return matchesCurrency && matchesSearch && matchesRisk && matchesRoi
                })
                .map((plan) => (
                  <motion.div
                    key={plan.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    whileHover={{ y: -5 }}
                  >
                    <Card className="overflow-hidden border-2 hover:border-blue-500 transition-colors">
                      <CardHeader className="border-b bg-gradient-to-r from-[#ff5858]/10 via-[#ff7e5f]/10 to-[#ff9966]/10">
                        <div className="flex items-center justify-center">
                          <div className="flex items-center space-x-4">
                            <div className="rounded-full bg-gradient-to-r from-[#ff5858] via-[#ff7e5f] to-[#ff9966] p-2 text-white">
                              {plan.icon}
                            </div>
                            <div>
                              <CardTitle className="text-lg">{plan.name}</CardTitle>
                              <CardDescription>{plan.description}</CardDescription>
                            </div>
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            <span
                              className={cn(
                                "flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium w-full",
                                getRiskLevelColor(plan.riskLevel)
                              )}
                            >
                              {plan.riskLevel} Risk
                            </span>
                      
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="p-6">
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="rounded-lg bg-gradient-to-r from-[#ff5858]/10 via-[#ff7e5f]/10 to-[#ff9966]/10 p-4">
                              <p className="text-sm font-medium text-gray-500">Daily ROI</p>
                              <p className="text-2xl font-bold text-green-600">
                                {plan.dailyRoi}%
                              </p>
                            </div>
                            <div className="rounded-lg bg-gradient-to-r from-[#ff5858]/10 via-[#ff7e5f]/10 to-[#ff9966]/10 p-4">
                              <p className="text-sm font-medium text-gray-500">
                                Total ROI
                              </p>
                              <p className="text-2xl font-bold text-green-600">
                                {plan.totalRoi}%
                              </p>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="rounded-lg bg-gradient-to-r from-[#ff5858]/10 via-[#ff7e5f]/10 to-[#ff9966]/10 p-4">
                              <p className="text-sm font-medium text-gray-500">
                                Min Investment
                              </p>
                              <p className="text-lg font-semibold">
                                {plan.type === 'naira'
                                  ? `₦${plan.minAmount.toLocaleString()}`
                                  : `${plan.minAmount} ${plan.type.toUpperCase()}`}
                              </p>
                            </div>
                            <div className="rounded-lg bg-gradient-to-r from-[#ff5858]/10 via-[#ff7e5f]/10 to-[#ff9966]/10 p-4"> 
                              <p className="text-sm font-medium text-gray-500">
                                Max Investment
                              </p>
                              <p className="text-lg font-semibold">
                                {plan.type === 'naira'
                                  ? `₦${plan.maxAmount.toLocaleString()}`
                                  : `${plan.maxAmount} ${plan.type.toUpperCase()}`}
                              </p>
                            </div>
                          </div>

                          <div className="rounded-lg bg-gradient-to-r from-[#ff5858]/10 via-[#ff7e5f]/10 to-[#ff9966]/10 p-4">
                            <p className="text-sm font-medium text-gray-500">
                              Features
                            </p>
                            <ul className="mt-2 space-y-2">
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

                          <div className="rounded-lg bg-gradient-to-r from-[#ff5858]/10 via-[#ff7e5f]/10 to-[#ff9966]/10 p-4">
                            <div className="flex items-center justify-between">
                              <p className="text-sm font-medium text-gray-500">
                                Total Investors
                              </p>
                              <p className="text-sm font-medium">
                                {plan.totalInvestors.toLocaleString()}
                              </p>
                            </div>
                            <div className="mt-2 flex items-center justify-between">
                              <p className="text-sm font-medium text-gray-500">
                                Total Volume
                              </p>
                              <p className="text-sm font-medium">{plan.totalVolume}</p>
                            </div>
                          </div>

                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                className="w-full bg-gradient-to-r from-[#ff5858] via-[#ff7e5f] to-[#ff9966] hover:from-[#ff5858]/90 hover:via-[#ff7e5f]/90 hover:to-[#ff9966]/90 text-white"
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
                                <DialogDescription className="text-base sm:text-lg text-gray-600">
                                  Enter the amount you want to invest in {plan.name}
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4 py-4">
                                <div>
                                  <label className="text-sm sm:text-base font-medium">
                                    Investment Amount
                                  </label>
                                  <div className="relative mt-1">
                                    {plan.type === 'naira' ? (
                                      <BanknotesIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                    ) : (
                                      <CurrencyDollarIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                    )}
                                    <Input
                                      type="text"
                                      value={investmentAmount}
                                      onChange={(e) => setInvestmentAmount(e.target.value)}
                                      className="pl-10 h-12 text-base bg-white/50 backdrop-blur-sm border-2 focus:border-blue-500 transition-colors"
                                      placeholder={
                                        plan.type === 'naira'
                                          ? '₦0.00'
                                          : `0.00 ${plan.type.toUpperCase()}`
                                      }
                                    />
                                  </div>
                                  <p className="mt-2 text-sm text-gray-500">
                                    Min: {plan.type === 'naira' ? '₦' : ''}
                                    {plan.minAmount.toLocaleString()}
                                    {plan.type !== 'naira' && ` ${plan.type.toUpperCase()}`}
                                    {' | '}
                                    Max: {plan.type === 'naira' ? '₦' : ''}
                                    {plan.maxAmount.toLocaleString()}
                                    {plan.type !== 'naira' && ` ${plan.type.toUpperCase()}`}
                                  </p>
                                </div>

                                <div className="flex items-center space-x-2 p-4 rounded-lg bg-gray-50/50">
                                  <Switch
                                    id="auto-reinvest"
                                    checked={autoReinvest}
                                    onCheckedChange={setAutoReinvest}
                                    className="data-[state=checked]:bg-blue-500"
                                  />
                                  <Label htmlFor="auto-reinvest" className="text-sm sm:text-base cursor-pointer">
                                    Enable Auto-Reinvest
                                  </Label>
                                </div>

                                <div>
                                  <label className="text-sm sm:text-base font-medium">Payment Method</label>
                                  <div className="mt-2 grid gap-3">
                                    {paymentMethods.map((method) => (
                                      <motion.div
                                        key={method.id}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className={`relative flex cursor-pointer rounded-lg border-2 p-4 shadow-sm focus:outline-none transition-all ${
                                          selectedPaymentMethod?.id === method.id
                                            ? 'border-blue-500 ring-2 ring-blue-500 bg-blue-50'
                                            : 'border-gray-300 hover:border-blue-300'
                                        }`}
                                        onClick={() => setSelectedPaymentMethod(method)}
                                      >
                                        <div className="flex flex-1">
                                          <div className="flex flex-col">
                                            <div className="flex items-center gap-2">
                                              <div className="rounded-full bg-gradient-to-r from-[#ff5858] via-[#ff7e5f] to-[#ff9966] p-2 text-white">
                                                {method.icon}
                                              </div>
                                              <span className="text-sm sm:text-base font-medium">
                                                {method.name}
                                              </span>
                                            </div>
                                            <p className="mt-1 text-sm text-gray-500">
                                              {method.description}
                                            </p>
                                          </div>
                                        </div>
                                        <div className="ml-4 flex items-center">
                                          {selectedPaymentMethod?.id === method.id && (
                                            <CheckCircleIcon className="h-5 w-5 text-[#ff5858]" />
                                          )}
                                        </div>
                                      </motion.div>
                                    ))}
                                  </div>
                                </div>

                                <div className="rounded-lg bg-gradient-to-r from-[#ff5858]/10 via-[#ff7e5f]/10 to-[#ff9966]/10 p-4">
                                  <h4 className="text-base sm:text-lg font-medium">Investment Summary</h4>
                                  <div className="mt-4 space-y-3">
                                    <div className="flex justify-between text-sm sm:text-base">
                                      <span className="text-gray-500">Daily ROI</span>
                                      <span className="font-medium">{plan.dailyRoi}%</span>
                                    </div>
                                    <div className="flex justify-between text-sm sm:text-base">
                                      <span className="text-gray-500">Total ROI</span>
                                      <span className="font-medium">{plan.totalRoi}%</span>
                                    </div>
                                    <div className="flex justify-between text-sm sm:text-base">
                                      <span className="text-gray-500">Duration</span>
                                      <span className="font-medium">
                                        {plan.duration} days
                                      </span>
                                    </div>
                                    <Separator className="my-3" />
                                    <div className="flex justify-between text-sm sm:text-base">
                                      <span className="text-gray-500">
                                        Daily Earnings
                                      </span>
                                      <span className="font-medium text-green-600">
                                        {plan.type === 'naira'
                                          ? '₦' + (Number(investmentAmount) * (plan.dailyRoi / 100)).toLocaleString()
                                          : (Number(investmentAmount) * (plan.dailyRoi / 100)).toFixed(4) + ` ${plan.type.toUpperCase()}`}
                                      </span>
                                    </div>
                                    <div className="flex justify-between text-sm sm:text-base">
                                      <span className="text-gray-500">
                                        Projected Earnings
                                      </span>
                                      <span className="font-medium text-green-600">
                                        {plan.type === 'naira'
                                          ? '₦' + calculateProjectedEarnings(Number(investmentAmount), plan.dailyRoi, plan.duration).toLocaleString()
                                          : calculateProjectedEarnings(Number(investmentAmount), plan.dailyRoi, plan.duration).toFixed(4) + ` ${plan.type.toUpperCase()}`}
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
                                    setSelectedPaymentMethod(null)
                                    setShowPaymentDetails(false)
                                  }}
                                  className="w-full sm:w-auto h-12 text-base border-2 hover:bg-gray-100 transition-colors"
                                >
                                  Cancel
                                </Button>
                                <Button
                                  onClick={handleInvestment}
                                  disabled={isProcessing || !investmentAmount || !selectedPaymentMethod}
                                  className="w-full sm:w-auto h-12 text-base bg-gradient-to-r from-[#ff5858] via-[#ff7e5f] to-[#ff9966] hover:from-[#ff5858]/90 hover:via-[#ff7e5f]/90 hover:to-[#ff9966]/90 text-white shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                  {isProcessing ? (
                                    <>
                                      <ArrowPathIcon className="mr-2 h-4 w-4 animate-spin" />
                                      Processing...
                                    </>
                                  ) : (
                                    'Continue to Payment'
                                  )}
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="active">
          {/* Filter Bar */}
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
                variant={investmentStatusFilter === 'closed' ? 'default' : 'outline'}
                onClick={() => setInvestmentStatusFilter('closed')}
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
          {/* Cards Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
                        <div className="mt-6">
                          <h4 className="mb-2 text-xs font-semibold text-gray-500">Payout History</h4>
                          <ScrollArea className="h-[120px] rounded-lg border bg-white/40 dark:bg-gray-900/40">
                            <div className="divide-y">
                              {investment.payoutHistory.map((payout, index) => (
                                <div
                                  key={index}
                                  className="flex items-center justify-between p-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                                >
                                  <div className="flex items-center gap-2">
                                    <CalendarIcon className="h-4 w-4 text-gray-400" />
                                    <span className="text-xs">{payout.date}</span>
                                  </div>
                                  <span className="text-xs font-medium text-green-600">{payout.amount}</span>
                                </div>
                              ))}
                            </div>
                          </ScrollArea>
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

      {/* Payment Details Dialog */}
      <Dialog open={showPaymentDetails} onOpenChange={setShowPaymentDetails}>
        <DialogContent className="sm:max-w-[425px] bg-white/95 dark:bg-[#232526]/95">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-[#ff5858] via-[#ff7e5f] to-[#ff9966] bg-clip-text text-transparent">
              Payment Details
            </DialogTitle>
            <DialogDescription>
              Please follow the instructions below to complete your payment
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {selectedPaymentMethod?.type === 'deposit' && selectedPlan && (
              <>
                {selectedPaymentMethod.id === 'bank-transfer' ? (
                  <div className="space-y-4">
                    <div className="rounded-lg border p-4 bg-gradient-to-r from-[#ff5858]/10 via-[#ff7e5f]/10 to-[#ff9966]/10">
                      <h4 className="font-medium">Bank Transfer Details</h4>
                      <div className="mt-2 space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Bank Name</span>
                          <span className="font-medium">First Bank</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Account Number</span>
                          <span className="font-medium">1234567890</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Account Name</span>
                          <span className="font-medium">Investment Platform</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Amount</span>
                          <span className="font-medium text-green-600">
                            {selectedPlan.type === 'naira'
                              ? '₦' + Number(investmentAmount).toLocaleString()
                              : `${investmentAmount} ${selectedPlan.type.toUpperCase()}`}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Alert>
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Important</AlertTitle>
                      <AlertDescription>
                        Please include your account ID as the payment reference.
                        Your investment will be activated once we confirm your payment.
                      </AlertDescription>
                    </Alert>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="rounded-lg border p-4 bg-gradient-to-r from-[#ff5858]/10 via-[#ff7e5f]/10 to-[#ff9966]/10">
                      <h4 className="font-medium">Crypto Payment Details</h4>
                      <div className="mt-2 space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Network</span>
                          <span className="font-medium">Ethereum (ERC20)</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Wallet Address</span>
                          <span className="font-medium">0x1234...5678</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Amount</span>
                          <span className="font-medium text-green-600">
                            {investmentAmount} {selectedPlan.type.toUpperCase()}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Alert>
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Important</AlertTitle>
                      <AlertDescription>
                        Please send the exact amount to the wallet address above.
                        Your investment will be activated once we confirm your payment.
                      </AlertDescription>
                    </Alert>
                  </div>
                )}
              </>
            )}
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowPaymentDetails(false)}
            >
              Close
            </Button>
            <Button
              onClick={() => {
                toast.success('Payment Instructions Sent', {
                  description: 'We have sent the payment instructions to your email.',
                })
                setShowPaymentDetails(false)
                setSelectedPlan(null)
                setSelectedPaymentMethod(null)
              }}
              className="bg-gradient-to-r from-[#ff5858] via-[#ff7e5f] to-[#ff9966] hover:from-[#ff5858]/90 hover:via-[#ff7e5f]/90 hover:to-[#ff9966]/90 text-white"
            >
              I've Made the Payment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
} 