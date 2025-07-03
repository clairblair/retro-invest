'use client'

import { useState, useEffect } from 'react'
import {
  ChartBarIcon,
  ArrowTrendingUpIcon,
  CurrencyDollarIcon,
  ClockIcon,
  CalendarIcon,
  ArrowPathIcon,
  BanknotesIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  ArrowDownTrayIcon,
  GiftIcon,
  SparklesIcon,
  LockClosedIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { motion } from 'framer-motion'
import { Skeleton } from '@/components/ui/skeleton'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { useMyInvestments, useInvestmentStats } from '@/lib/hooks/useInvestments'
import { useWithdrawBonus } from '@/lib/hooks/useBonus'
import { toast } from 'react-hot-toast'

interface RoiTransaction {
  id: number
  plan: string
  amount: string
  date: string
  status: 'completed' | 'pending'
  type: 'daily' | 'weekly' | 'monthly'
}

const BONUS_WAIT_DAYS = 15;
const WELCOME_BONUS = 0.05; // 5%

function daysBetween(date1: Date, date2: Date) {
  const msPerDay = 24 * 60 * 60 * 1000;
  return Math.floor((date2.getTime() - date1.getTime()) / msPerDay);
}

export default function RoiPage() {
  const { data: investments, isLoading: investmentsLoading } = useMyInvestments()
  const { data: investmentStats, isLoading: statsLoading } = useInvestmentStats()
  const withdrawBonusMutation = useWithdrawBonus()
  const [showAllTransactions, setShowAllTransactions] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [transactionsPerPage] = useState(10)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [typeFilter, setTypeFilter] = useState('all')
  const [lastBonusWithdrawal, setLastBonusWithdrawal] = useState<Date | null>(null)
  const [activeInvestmentDate] = useState(() => {
    // Use the earliest investment start date as active date
    if (investments && investments.length > 0) {
      return new Date(Math.min(...investments.map(inv => new Date(inv.startDate).getTime())))
    }
    const d = new Date();
    d.setDate(d.getDate() - 16);
    return d;
  });
  const [bonusWithdrawn, setBonusWithdrawn] = useState(false);

  const isLoading = investmentsLoading || statsLoading

  // Helper to format currency
  const formatCurrency = (amount: number, currency: 'naira' | 'usdt') => {
    if (currency === 'naira') return `₦${amount.toLocaleString()}`;
    return `${amount} USDT`;
  };

  // ROI calculations
  const totalRoi = investmentStats?.totalEarnings || 0
  const dailyRoi = investments?.reduce((sum, inv) => sum + (inv.dailyEarnings || 0), 0) || 0
  const totalInvested = investmentStats?.totalAmount || 0
  const activeInvestments = investmentStats?.activeInvestments || 0

  // Active plans breakdown
  const planBreakdown = investments?.reduce((acc, inv) => {
    const planName = inv.plan?.name || 'Plan';
    acc[planName] = (acc[planName] || 0) + (inv.amount || 0);
    return acc;
  }, {} as Record<string, number>) || {};

  // Calculate total bonus from active investments
  const totalBonus = investments?.reduce((sum, inv) => {
    if (inv.status === 'active') {
      return sum + (inv.welcomeBonus || 0) + (inv.referralBonus || 0);
    }
    return sum;
  }, 0) || 0;

  // ROI transactions from payouts
  const roiTransactions = investments?.flatMap(investment => 
    investment.payoutHistory?.map(payout => ({
      id: `${investment.id}-${payout.date}`,
      plan: investment.plan?.name || 'Investment Plan',
      amount: formatCurrency(payout.amount, investment.currency),
      date: payout.date,
      status: payout.status as 'completed' | 'pending',
      type: payout.type as 'daily' | 'weekly' | 'monthly',
      currency: investment.currency,
    })) || []
  ) || []

  // Calculate pagination
  const filteredTransactions = roiTransactions.filter(transaction => {
    const matchesSearch = transaction.plan.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         transaction.amount.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'all' || transaction.status === statusFilter
    const matchesType = typeFilter === 'all' || transaction.type === typeFilter
    return matchesSearch && matchesStatus && matchesType
  })
  const totalPages = Math.ceil(filteredTransactions.length / transactionsPerPage)
  const indexOfLastTransaction = currentPage * transactionsPerPage
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage
  const currentTransactions = filteredTransactions.slice(indexOfFirstTransaction, indexOfLastTransaction)

  // Calculate eligibility
  const now = new Date();
  let eligible = false;
  let daysLeft = BONUS_WAIT_DAYS;
  if (!lastBonusWithdrawal) {
    daysLeft = BONUS_WAIT_DAYS - daysBetween(activeInvestmentDate, now);
    eligible = daysLeft <= 0;
  } else {
    daysLeft = BONUS_WAIT_DAYS - daysBetween(new Date(lastBonusWithdrawal), now);
    eligible = daysLeft <= 0;
  }

  const handleWithdrawBonus = async () => {
    try {
      const result = await withdrawBonusMutation.mutateAsync();
      if (result.success) {
        toast.success(result.message);
        setLastBonusWithdrawal(new Date());
        setBonusWithdrawn(true);
      } else {
        toast.error(result.message);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to withdraw bonus');
    }
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'daily':
        return <ClockIcon className="h-4 w-4 text-blue-500" />
      case 'weekly':
        return <CalendarIcon className="h-4 w-4 text-purple-500" />
      case 'monthly':
        return <ChartBarIcon className="h-4 w-4 text-green-500" />
      default:
        return null
    }
  }

  // Compute growth percentage
  const monthlyGrowth = totalInvested > 0 ? ((totalRoi - totalInvested) / totalInvested) * 100 : 0;
  const dailyGrowth = totalInvested > 0 ? ((dailyRoi) / totalInvested) * 100 : 0;

  return (
    <div className="space-y-6 sm:space-y-8 max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
      >
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-[#ff5858] via-[#ff7e5f] to-[#ff9966] bg-clip-text text-transparent tracking-tight">
            ROI Dashboard
          </h1>
          <p className="text-base sm:text-lg text-gray-500 mt-1">Track your investment returns</p>
        </div>
        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Badge variant="outline" className="flex items-center gap-2 bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full border-2">
              <ChartBarIcon className="h-5 w-5 text-blue-600" />
              <span className="font-medium">Total ROI: {formatCurrency(totalRoi, 'naira')}</span>
            </Badge>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Badge variant="outline" className="flex items-center gap-2 bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full border-2">
              <ArrowTrendingUpIcon className="h-5 w-5 text-green-600" />
              <span className="font-medium">Growth: +{monthlyGrowth.toFixed(2)}%</span>
            </Badge>
          </motion.div>
        </div>
      </motion.div>

      <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-4">
        {isLoading ? (
          <>
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="overflow-hidden border-2">
                <CardHeader className="border-b bg-gray-50/50">
                  <Skeleton className="h-8 w-3/4" />
                </CardHeader>
                <CardContent className="p-4 sm:p-6">
                  <div className="space-y-4">
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </>
        ) : (
          <>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
              whileHover={{ y: -5, transition: { type: "spring", stiffness: 400, damping: 17 } }}
            >
              <Card className="overflow-hidden border-2 hover:border-blue-500 transition-all duration-300 shadow-lg hover:shadow-xl">
                <CardHeader className="border-b bg-gradient-to-r from-[#ff5858]/10 via-[#ff7e5f]/10 to-[#ff9966]/10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="rounded-full bg-gradient-to-r from-[#ff5858] via-[#ff7e5f] to-[#ff9966] p-2 text-white shadow-lg">
                        <ChartBarIcon className="h-6 w-6" />
                      </div>
                      <div>
                        <CardTitle className="text-lg sm:text-xl">Total ROI</CardTitle>
                        <p className="text-sm text-gray-500">All time earnings</p>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-4 sm:p-6">
                  <div className="space-y-4">
                    <div className="rounded-lg bg-gradient-to-r from-[#ff5858]/10 via-[#ff7e5f]/10 to-[#ff9966]/10 p-4 shadow-inner">
                      <p className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-[#ff5858] via-[#ff7e5f] to-[#ff9966] bg-clip-text text-transparent">
                        {formatCurrency(totalRoi, 'naira')}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">Total earnings</p>
                    </div>
                    <div className="flex justify-between text-sm sm:text-base">
                      <span className="text-gray-500">Monthly Growth</span>
                      <span className="text-green-600 font-medium">+{monthlyGrowth.toFixed(2)}%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
              whileHover={{ y: -5, transition: { type: "spring", stiffness: 400, damping: 17 } }}
            >
              <Card className="overflow-hidden border-2 hover:border-blue-500 transition-all duration-300 shadow-lg hover:shadow-xl">
                <CardHeader className="border-b bg-gradient-to-r from-[#ff5858]/10 via-[#ff7e5f]/10 to-[#ff9966]/10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="rounded-full bg-gradient-to-r from-[#ff5858] via-[#ff7e5f] to-[#ff9966] p-2 text-white shadow-lg">
                        <ClockIcon className="h-6 w-6" />
                      </div>
                      <div>
                        <CardTitle className="text-lg sm:text-xl">Daily ROI</CardTitle>
                        <p className="text-sm text-gray-500">Today's earnings</p>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-4 sm:p-6">
                  <div className="space-y-4">
                    <div className="rounded-lg bg-gradient-to-r from-[#ff5858]/10 via-[#ff7e5f]/10 to-[#ff9966]/10 p-4 shadow-inner">
                      <p className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-[#ff5858] via-[#ff7e5f] to-[#ff9966] bg-clip-text text-transparent">
                        {formatCurrency(dailyRoi, 'naira')}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">Daily earnings</p>
                    </div>
                    <div className="flex justify-between text-sm sm:text-base">
                      <span className="text-gray-500">Daily Growth</span>
                      <span className="text-green-600 font-medium">+{dailyGrowth.toFixed(2)}%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
              whileHover={{ y: -8, scale: 1.03, boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)' }}
            >
              <Card className="overflow-hidden border-2 bg-white/60 dark:bg-[#232526]/60 backdrop-blur-xl shadow-2xl hover:shadow-3xl transition-all duration-300 relative">
                <div className="absolute -top-6 right-6 z-10 animate-bounce">
                  <GiftIcon className="h-12 w-12 text-yellow-400 drop-shadow-lg" />
                </div>
                <CardHeader className="border-b bg-gradient-to-r from-[#ff5858]/20 via-[#ff7e5f]/20 to-[#ff9966]/20">
                    <div className="flex items-center space-x-4">
                    <div className="rounded-full bg-gradient-to-r from-green-400 to-blue-500 p-2 text-white shadow-lg">
                      <SparklesIcon className="h-7 w-7 animate-spin-slow" />
                      </div>
                      <div>
                      <CardTitle className="text-lg sm:text-xl flex items-center gap-2">
                        BONUS
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <span className="ml-1 cursor-pointer text-blue-400">ⓘ</span>
                            </TooltipTrigger>
                            <TooltipContent>
                              <span>Bonuses are withdrawable every 15 days of active investment.</span>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </CardTitle>
                      <p className="text-sm text-gray-500">Referral & Welcome Bonuses</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 space-y-4">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium flex items-center gap-1">
                        Referral Bonus
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <LockClosedIcon className="h-4 w-4 text-gray-400" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <span>Still under review</span>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </span>
                      <span className="text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full">Reviewing</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-medium flex items-center gap-1">
                        Welcome Bonus
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <SparklesIcon className="h-4 w-4 text-yellow-400" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <span>5% of your first investment</span>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </span>
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">5%</span>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-col gap-2 items-center">
                    {/* Progress/Countdown */}
                    <div className="w-full flex items-center gap-2">
                      {eligible ? (
                        <span className="text-green-600 text-xs flex items-center gap-1"><CheckCircleIcon className="h-4 w-4" />Available</span>
                      ) : (
                        <span className="text-gray-400 text-xs flex items-center gap-1"><LockClosedIcon className="h-4 w-4" />Locked</span>
                      )}
                      <div className="flex-1">
                        <Progress value={100 * (BONUS_WAIT_DAYS - (daysLeft > 0 ? daysLeft : 0)) / BONUS_WAIT_DAYS} className="h-2 bg-gray-200" />
                      </div>
                      <span className="text-xs text-gray-500 w-16 text-right">{eligible ? 'Now' : daysLeft > 0 ? daysLeft + 'd' : '0d'}</span>
                    </div>
                    <Button
                      className={
                        `w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 transition-all duration-300 mt-2 ${eligible ? 'animate-pulse shadow-lg' : 'opacity-60 cursor-not-allowed'}`
                      }
                      onClick={handleWithdrawBonus}
                      disabled={!eligible}
                    >
                      {eligible ? 'Withdraw Bonus' : 'Withdraw Bonus (Available in ' + (daysLeft > 0 ? daysLeft : 0) + ' days)'}
                    </Button>
                    {!eligible && (
                      <p className="text-xs text-gray-500 mt-2 text-center">Bonuses can only be withdrawn after 15 days of active investment. After withdrawal, the next bonus will be available in another 15 days.</p>
                    )}
                    {bonusWithdrawn && (
                      <p className="text-xs text-green-600 mt-2 text-center animate-bounce">Bonus withdrawn! Next withdrawal available in 15 days.</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
              whileHover={{ y: -5, transition: { type: "spring", stiffness: 400, damping: 17 } }}
            >
              <Card className="overflow-hidden border-2 hover:border-blue-500 transition-all duration-300 shadow-lg hover:shadow-xl">
                <CardHeader className="border-b bg-gradient-to-r from-[#ff5858]/10 via-[#ff7e5f]/10 to-[#ff9966]/10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="rounded-full bg-gradient-to-r from-[#ff5858] via-[#ff7e5f] to-[#ff9966] p-2 text-white shadow-lg">
                        <BanknotesIcon className="h-6 w-6" />
                      </div>
                      <div>
                        <CardTitle className="text-lg sm:text-xl">Active Plans</CardTitle>
                        <p className="text-sm text-gray-500">Earning plans</p>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-4 sm:p-6">
                  <div className="space-y-4">
                    <div className="rounded-lg bg-gradient-to-r from-[#ff5858]/10 via-[#ff7e5f]/10 to-[#ff9966]/10 p-4 shadow-inner">
                      <div className="space-y-2">
                        {Object.entries(planBreakdown).map(([plan, amount]) => (
                          <div key={plan} className="flex justify-between text-sm sm:text-base">
                            <span className="text-gray-500">{plan}</span>
                            <span className="font-medium">{formatCurrency(amount, 'naira')}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </>
        )}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
      >
        <Card className="overflow-hidden border-2 hover:border-blue-500 transition-all duration-300 shadow-lg hover:shadow-xl">
          <CardHeader className="border-b bg-gradient-to-r from-[#ff5858]/10 via-[#ff7e5f]/10 to-[#ff9966]/10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center space-x-4">
                <div className="rounded-full bg-gradient-to-r from-[#ff5858] via-[#ff7e5f] to-[#ff9966] p-2 text-white shadow-lg">
                  <ArrowPathIcon className="h-6 w-6" />
                </div>
                <div>
                  <CardTitle className="text-lg sm:text-xl">ROI History</CardTitle>
                  <p className="text-sm text-gray-500">Your earnings history</p>
                </div>
              </div>
              <Button 
                variant="outline" 
                className="w-full sm:w-auto bg-white/50 backdrop-blur-sm border-2 hover:bg-gray-100 transition-colors"
                onClick={() => setShowAllTransactions(true)}
              >
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            <ScrollArea className="h-[300px] sm:h-[400px] pr-4">
              <div className="space-y-4">
                {roiTransactions.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <ChartBarIcon className="h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No ROI Transactions Yet</h3>
                    <p className="text-gray-500 mb-4">You haven't earned any ROI yet. Start investing to see your returns here.</p>
                    <Button 
                      onClick={() => window.location.href = '/dashboard/investments'}
                      className="bg-gradient-to-r from-[#ff5858] via-[#ff7e5f] to-[#ff9966] hover:from-[#ff4848] hover:via-[#ff6e4f] hover:to-[#ff8956] text-white"
                    >
                      Start Investing
                    </Button>
                  </div>
                ) : (
                  roiTransactions.map((transaction) => (
                    <motion.div
                      key={transaction.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-lg border-2 p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="rounded-full bg-gradient-to-r from-[#ff5858]/10 via-[#ff7e5f]/10 to-[#ff9966]/10 p-2 shadow-inner">
                          {getTypeIcon(transaction.type)}
                        </div>
                        <div>
                          <p className="font-semibold text-base sm:text-lg">{transaction.plan}</p>
                          <div className="flex flex-wrap items-center gap-2">
                            <p className="text-sm text-gray-500">{transaction.date}</p>
                            <span className="text-sm text-gray-500 hidden sm:inline">•</span>
                            <p className="text-sm text-gray-500">{transaction.type}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between sm:justify-end gap-4">
                        <p className="font-semibold text-base sm:text-lg">{transaction.amount}</p>
                        <span
                          className={cn(
                            "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium whitespace-nowrap",
                            getStatusColor(transaction.status)
                          )}
                        >
                          {transaction.status}
                        </span>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </motion.div>

      {/* View All Dialog */}
      <Dialog open={showAllTransactions} onOpenChange={setShowAllTransactions}>
        <DialogContent className="sm:max-w-[90vw] w-[95vw] max-h-[90vh] overflow-hidden flex flex-col p-0 bg-white/95 dark:bg-[#232526]/95">
          <DialogHeader className="px-6 py-4 border-b">
            <DialogTitle className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              All Transactions
            </DialogTitle>
            <DialogDescription className="text-base sm:text-lg">
              View and filter your complete transaction history
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col h-full">
            {/* Filters - Fixed at top */}
            <div className="p-6 pb-4 border-b bg-white/50 dark:bg-[#232526]/50 backdrop-blur-sm">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search transactions..."
                    className="pl-10 bg-white/50 dark:bg-[#232526]/50 backdrop-blur-sm"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[140px] bg-white/50 backdrop-blur-sm">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger className="w-[140px] bg-white/50 backdrop-blur-sm">
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchQuery('')
                      setStatusFilter('all')
                      setTypeFilter('all')
                    }}
                    className="bg-white/50 backdrop-blur-sm"
                  >
                    Clear Filters
                  </Button>
                </div>
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-hidden">
              <ScrollArea className="h-full">
                <div className="p-6 space-y-4">
                  {currentTransactions.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <ChartBarIcon className="h-12 w-12 text-gray-400 mb-4" />
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">No Transactions Found</h3>
                      <p className="text-gray-500 mb-4">
                        {searchQuery || statusFilter !== 'all' || typeFilter !== 'all' 
                          ? 'No transactions match your current filters. Try adjusting your search criteria.'
                          : 'You haven\'t earned any ROI yet. Start investing to see your returns here.'
                        }
                      </p>
                      {!searchQuery && statusFilter === 'all' && typeFilter === 'all' && (
                        <Button 
                          onClick={() => window.location.href = '/dashboard/investments'}
                          className="bg-gradient-to-r from-[#ff5858] via-[#ff7e5f] to-[#ff9966] hover:from-[#ff4848] hover:via-[#ff6e4f] hover:to-[#ff8956] text-white"
                        >
                          Start Investing
                        </Button>
                      )}
                    </div>
                  ) : (
                    currentTransactions.map((transaction) => (
                      <motion.div
                        key={transaction.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-lg border-2 p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="rounded-full bg-gradient-to-r from-[#ff5858]/10 via-[#ff7e5f]/10 to-[#ff9966]/10 p-2 shadow-inner">
                            {getTypeIcon(transaction.type)}
                          </div>
                          <div>
                            <p className="font-semibold text-base sm:text-lg">{transaction.plan}</p>
                            <div className="flex flex-wrap items-center gap-2">
                              <p className="text-sm text-gray-500">{transaction.date}</p>
                              <span className="text-sm text-gray-500 hidden sm:inline">•</span>
                              <p className="text-sm text-gray-500">{transaction.type}</p>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between sm:justify-end gap-4">
                          <p className="font-semibold text-base sm:text-lg">{transaction.amount}</p>
                          <span
                            className={cn(
                              "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium whitespace-nowrap",
                              getStatusColor(transaction.status)
                            )}
                          >
                            {transaction.status}
                          </span>
                        </div>
                      </motion.div>
                    ))
                  )}
                </div>
              </ScrollArea>
            </div>

            {/* Pagination - Fixed at bottom */}
            <div className="p-6 pt-4 border-t bg-white/50 backdrop-blur-sm">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-sm text-gray-500">
                  Showing {indexOfFirstTransaction + 1} to {Math.min(indexOfLastTransaction, filteredTransactions.length)} of {filteredTransactions.length} transactions
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="h-8 w-8 bg-white/50 backdrop-blur-sm"
                  >
                    <ChevronLeftIcon className="h-4 w-4" />
                  </Button>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        size="icon"
                        onClick={() => handlePageChange(page)}
                        className={cn(
                          "h-8 w-8",
                          currentPage === page
                            ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                            : "bg-white/50 backdrop-blur-sm"
                        )}
                      >
                        {page}
                      </Button>
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="h-8 w-8 bg-white/50 backdrop-blur-sm"
                  >
                    <ChevronRightIcon className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
} 