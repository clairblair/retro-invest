'use client'

import { useState, useEffect } from 'react'
import {
  ChartBarIcon,
  CurrencyDollarIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  ClockIcon,
  WalletIcon,
  UserGroupIcon,
  ChartPieIcon,
  FunnelIcon,
  ArrowsUpDownIcon,
} from '@heroicons/react/24/outline'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { motion } from 'framer-motion'
import { Skeleton } from '@/components/ui/skeleton'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { MagnifyingGlassIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'

interface Transaction {
  id: number
  type: 'deposit' | 'withdrawal' | 'investment' | 'roi'
  amount: string
  date: string
  status: 'completed' | 'pending' | 'failed'
}

const recentTransactions: Transaction[] = [
  {
    id: 1,
    type: 'deposit',
    amount: '₦500,000',
    date: '2024-03-20',
    status: 'completed',
  },
  {
    id: 2,
    type: 'investment',
    amount: '₦300,000',
    date: '2024-03-19',
    status: 'completed',
  },
  {
    id: 3,
    type: 'roi',
    amount: '₦15,000',
    date: '2024-03-18',
    status: 'completed',
  },
  {
    id: 4,
    type: 'withdrawal',
    amount: '₦200,000',
    date: '2024-03-17',
    status: 'pending',
  },
]

const stats = [
  {
    name: 'Total Balance',
    value: '$24,500.00',
    change: '+12.5%',
    changeType: 'increase',
    description: 'Your total investment balance',
  },
  {
    name: 'Daily ROI',
    value: '$245.00',
    change: '+2.5%',
    changeType: 'increase',
    description: 'Today&apos;s return on investment',
  },
  // ... rest of the stats ...
]

export default function DashboardPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [showAllTransactions, setShowAllTransactions] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [transactionsPerPage] = useState(5)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [typeFilter, setTypeFilter] = useState('all')
  const [sortBy, setSortBy] = useState('date')
  const [sortOrder, setSortOrder] = useState('desc')

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'failed':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'deposit':
        return <ArrowDownIcon className="h-4 w-4 text-green-500" />
      case 'withdrawal':
        return <ArrowUpIcon className="h-4 w-4 text-red-500" />
      case 'investment':
        return <ChartBarIcon className="h-4 w-4 text-blue-500" />
      case 'roi':
        return <CurrencyDollarIcon className="h-4 w-4 text-purple-500" />
      default:
        return null
    }
  }

  const filteredTransactions = recentTransactions.filter(transaction => {
    const matchesSearch = transaction.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         transaction.amount.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         transaction.date.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'all' || transaction.status === statusFilter
    const matchesType = typeFilter === 'all' || transaction.type === typeFilter
    return matchesSearch && matchesStatus && matchesType
  }).sort((a, b) => {
    if (sortBy === 'date') {
      return sortOrder === 'desc' 
        ? new Date(b.date).getTime() - new Date(a.date).getTime()
        : new Date(a.date).getTime() - new Date(b.date).getTime()
    }
    if (sortBy === 'amount') {
      const amountA = parseFloat(a.amount.replace(/[^0-9.-]+/g, ''))
      const amountB = parseFloat(b.amount.replace(/[^0-9.-]+/g, ''))
      return sortOrder === 'desc' ? amountB - amountA : amountA - amountB
    }
    return 0
  })

  const totalPages = Math.ceil(filteredTransactions.length / transactionsPerPage)
  const currentTransactions = filteredTransactions.slice(
    (currentPage - 1) * transactionsPerPage,
    currentPage * transactionsPerPage
  )

  return (
    <div className="space-y-8 max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
      >
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-[#ff5858] via-[#ff7e5f] to-[#ff9966] bg-clip-text text-transparent tracking-tight">
            Dashboard
          </h1>
          <p className="text-base sm:text-lg text-gray-500">Welcome back! Here's your investment overview</p>
        </div>
        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Badge variant="outline" className="flex items-center gap-2 bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full border-2">
              <WalletIcon className="h-5 w-5 text-[#ff5858]" />
              <span className="font-medium">Total Balance: ₦1,250,000</span>
            </Badge>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Badge variant="outline" className="flex items-center gap-2 bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full border-2">
              <ChartBarIcon className="h-5 w-5 text-[#ff7e5f]" />
              <span className="font-medium">Total ROI: ₦45,000</span>
            </Badge>
          </motion.div>
        </div>
      </motion.div>

      {/* Mobile Stats View */}
      <div className="md:hidden">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="overview" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#ff5858] data-[state=active]:via-[#ff7e5f] data-[state=active]:to-[#ff9966] data-[state=active]:text-white">
              Overview
            </TabsTrigger>
            <TabsTrigger value="portfolio" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#ff5858] data-[state=active]:via-[#ff7e5f] data-[state=active]:to-[#ff9966] data-[state=active]:text-white">
              Portfolio
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-0">
            <div className="space-y-4">
              {/* Mobile Stats Cards */}
              <Card className="border-2">
                <CardHeader className="border-b bg-gradient-to-r from-[#ff5858]/10 via-[#ff7e5f]/10 to-[#ff9966]/10">
                  <div className="flex items-center space-x-4">
                    <div className="rounded-full bg-gradient-to-r from-[#ff5858] via-[#ff7e5f] to-[#ff9966] p-2 text-white">
                      <WalletIcon className="h-6 w-6" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">Total Balance</CardTitle>
                      <p className="text-sm text-gray-500">Your main balance</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-4">
                    <div className="rounded-lg bg-gradient-to-r from-[#ff5858]/10 via-[#ff7e5f]/10 to-[#ff9966]/10 p-4">
                      <p className="text-2xl font-bold">₦1,250,000</p>
                      <p className="text-sm text-gray-500">Available for investment</p>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Monthly Growth</span>
                      <span className="text-green-600">+12.5%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardHeader className="border-b bg-gradient-to-r from-[#ff5858]/10 via-[#ff7e5f]/10 to-[#ff9966]/10">
                  <div className="flex items-center space-x-4">
                    <div className="rounded-full bg-gradient-to-r from-[#ff5858] via-[#ff7e5f] to-[#ff9966] p-2 text-white">
                      <ChartBarIcon className="h-6 w-6" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">Total ROI</CardTitle>
                      <p className="text-sm text-gray-500">Your returns</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-4">
                    <div className="rounded-lg bg-gradient-to-r from-[#ff5858]/10 via-[#ff7e5f]/10 to-[#ff9966]/10 p-4">
                      <p className="text-2xl font-bold">₦45,000</p>
                      <p className="text-sm text-gray-500">Total earnings</p>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Daily Growth</span>
                      <span className="text-green-600">+1.5%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="portfolio" className="mt-0">
            <div className="space-y-4">
              <Card className="border-2">
                <CardHeader className="border-b bg-gradient-to-r from-[#ff5858]/10 via-[#ff7e5f]/10 to-[#ff9966]/10">
                  <div className="flex items-center space-x-4">
                    <div className="rounded-full bg-gradient-to-r from-[#ff5858] via-[#ff7e5f] to-[#ff9966] p-2 text-white">
                      <UserGroupIcon className="h-6 w-6" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">Active Plans</CardTitle>
                      <p className="text-sm text-gray-500">Your investments</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-4">
                    <div className="rounded-lg bg-gradient-to-r from-[#ff5858]/10 via-[#ff7e5f]/10 to-[#ff9966]/10 p-4">
                      <p className="text-2xl font-bold">3</p>
                      <p className="text-sm text-gray-500">Active investments</p>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Total Value</span>
                      <span className="text-blue-600">₦750,000</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardHeader className="border-b bg-gradient-to-r from-[#ff5858]/10 via-[#ff7e5f]/10 to-[#ff9966]/10">
                  <div className="flex items-center space-x-4">
                    <div className="rounded-full bg-gradient-to-r from-[#ff5858] via-[#ff7e5f] to-[#ff9966] p-2 text-white">
                      <ChartPieIcon className="h-6 w-6" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">Portfolio</CardTitle>
                      <p className="text-sm text-gray-500">Asset allocation</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-4">
                    <div className="rounded-lg bg-gradient-to-r from-[#ff5858]/10 via-[#ff7e5f]/10 to-[#ff9966]/10 p-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Naira</span>
                          <span className="font-medium">60%</span>
                        </div>
                        <Progress value={60} className="h-2" />
                      </div>
                      <div className="mt-4 space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Crypto</span>
                          <span className="font-medium">40%</span>
                        </div>
                        <Progress value={40} className="h-2" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Desktop Stats Grid */}
      <div className="hidden md:grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {isLoading ? (
          <>
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="overflow-hidden">
                <CardHeader className="border-b bg-gray-50/50">
                  <Skeleton className="h-8 w-3/4" />
                </CardHeader>
                <CardContent className="p-6">
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
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ y: -5 }}
            >
              <Card className="overflow-hidden border-2 hover:border-[#ff5858] transition-colors">
                <CardHeader className="border-b bg-gradient-to-r from-[#ff5858]/10 via-[#ff7e5f]/10 to-[#ff9966]/10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="rounded-full bg-gradient-to-r from-[#ff5858] via-[#ff7e5f] to-[#ff9966] p-2 text-white">
                        <WalletIcon className="h-6 w-6" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">Total Balance</CardTitle>
                        <p className="text-sm text-gray-500">Your main balance</p>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="rounded-lg bg-gradient-to-r from-[#ff5858]/10 via-[#ff7e5f]/10 to-[#ff9966]/10 p-4">
                      <p className="text-2xl font-bold">₦1,250,000</p>
                      <p className="text-sm text-gray-500">Available for investment</p>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Monthly Growth</span>
                      <span className="text-green-600">+12.5%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ y: -5 }}
            >
              <Card className="overflow-hidden border-2 hover:border-[#ff5858] transition-colors">
                <CardHeader className="border-b bg-gradient-to-r from-[#ff5858]/10 via-[#ff7e5f]/10 to-[#ff9966]/10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="rounded-full bg-gradient-to-r from-[#ff5858] via-[#ff7e5f] to-[#ff9966] p-2 text-white">
                        <ChartBarIcon className="h-6 w-6" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">Total ROI</CardTitle>
                        <p className="text-sm text-gray-500">Your profits</p>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="rounded-lg bg-gradient-to-r from-[#ff5858]/10 via-[#ff7e5f]/10 to-[#ff9966]/10 p-4">
                      <p className="text-2xl font-bold">₦45,000</p>
                      <p className="text-sm text-gray-500">Total earnings</p>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Daily Growth</span>
                      <span className="text-green-600">+1.5%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ y: -5 }}
            >
              <Card className="overflow-hidden border-2 hover:border-[#ff5858] transition-colors">
                <CardHeader className="border-b bg-gradient-to-r from-[#ff5858]/10 via-[#ff7e5f]/10 to-[#ff9966]/10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="rounded-full bg-gradient-to-r from-[#ff5858] via-[#ff7e5f] to-[#ff9966] p-2 text-white">
                        <UserGroupIcon className="h-6 w-6" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">Active Plans</CardTitle>
                        <p className="text-sm text-gray-500">Your investments</p>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="rounded-lg bg-gradient-to-r from-[#ff5858]/10 via-[#ff7e5f]/10 to-[#ff9966]/10 p-4">
                      <p className="text-2xl font-bold">3</p>
                      <p className="text-sm text-gray-500">Active investments</p>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Total Value</span>
                      <span className="text-blue-600">₦750,000</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              whileHover={{ y: -5 }}
            >
              <Card className="overflow-hidden border-2 hover:border-[#ff5858] transition-colors">
                <CardHeader className="border-b bg-gradient-to-r from-[#ff5858]/10 via-[#ff7e5f]/10 to-[#ff9966]/10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="rounded-full bg-gradient-to-r from-[#ff5858] via-[#ff7e5f] to-[#ff9966] p-2 text-white">
                        <ChartPieIcon className="h-6 w-6" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">Portfolio</CardTitle>
                        <p className="text-sm text-gray-500">Asset allocation</p>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="rounded-lg bg-gradient-to-r from-[#ff5858]/10 via-[#ff7e5f]/10 to-[#ff9966]/10 p-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Naira</span>
                          <span className="font-medium">60%</span>
                        </div>
                        <Progress value={60} className="h-2" />
                      </div>
                      <div className="mt-4 space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Crypto</span>
                          <span className="font-medium">40%</span>
                        </div>
                        <Progress value={40} className="h-2" />
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
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <Card className="overflow-hidden border-2 hover:border-[#ff5858] transition-colors">
          <CardHeader className="border-b bg-gradient-to-r from-[#ff5858]/10 via-[#ff7e5f]/10 to-[#ff9966]/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="rounded-full bg-gradient-to-r from-[#ff5858] via-[#ff7e5f] to-[#ff9966] p-2 text-white">
                  <ClockIcon className="h-6 w-6" />
                </div>
                <div>
                  <CardTitle className="text-lg">Recent Transactions</CardTitle>
                  <p className="text-sm text-gray-500">Your latest activities</p>
                </div>
              </div>
              <Button 
                variant="outline" 
                className="bg-white/50 backdrop-blur-sm hover:bg-gray-100 transition-colors"
                onClick={() => router.push('/dashboard/withdrawals')}
              >
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <ScrollArea className="h-[300px]">
              <div className="space-y-4">
                {currentTransactions.map((transaction) => (
                  <motion.div
                    key={transaction.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center justify-between rounded-lg border p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="rounded-full bg-gradient-to-r from-[#ff5858]/10 via-[#ff7e5f]/10 to-[#ff9966]/10 p-2">
                        {getTransactionIcon(transaction.type)}
                      </div>
                      <div>
                        <p className="font-medium capitalize">{transaction.type}</p>
                        <p className="text-sm text-gray-500">{transaction.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <p className="font-medium">{transaction.amount}</p>
                      <span
                        className={cn(
                          "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                          getStatusColor(transaction.status)
                        )}
                      >
                        {transaction.status}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </ScrollArea>
            {totalPages > 1 && (
              <div className="flex items-center justify-between mt-4 pt-4 border-t">
                <div className="text-sm text-gray-500">
                  Showing {((currentPage - 1) * transactionsPerPage) + 1} to {Math.min(currentPage * transactionsPerPage, filteredTransactions.length)} of {filteredTransactions.length} transactions
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="bg-white/50 backdrop-blur-sm"
                  >
                    <ChevronLeftIcon className="h-4 w-4" />
                  </Button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(page)}
                      className={cn(
                        "bg-white/50 backdrop-blur-sm",
                        currentPage === page && "bg-gradient-to-r from-[#ff5858] via-[#ff7e5f] to-[#ff9966] text-white"
                      )}
                    >
                      {page}
                    </Button>
                  ))}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="bg-white/50 backdrop-blur-sm"
                  >
                    <ChevronRightIcon className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* All Transactions Dialog */}
      <Dialog open={showAllTransactions} onOpenChange={setShowAllTransactions}>
        <DialogContent className="sm:max-w-[900px] w-[95vw] max-h-[90vh] flex flex-col bg-white/95 dark:bg-[#232526]/95">
          <DialogHeader>
            <DialogTitle className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-[#ff5858] via-[#ff7e5f] to-[#ff9966] bg-clip-text text-transparent">
              All Transactions
            </DialogTitle>
            <DialogDescription className="text-base sm:text-lg">
              View and manage all your transactions
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col sm:flex-row gap-4 p-4 border-b">
            <div className="flex-1">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Search transactions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-white/50 dark:bg-[#232526]/50 backdrop-blur-sm"
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-[180px] bg-white/50 backdrop-blur-sm">
                  <div className="flex items-center gap-2">
                    <FunnelIcon className="h-4 w-4" />
                    <SelectValue placeholder="Filter by status" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-full sm:w-[180px] bg-white/50 backdrop-blur-sm">
                  <div className="flex items-center gap-2">
                    <FunnelIcon className="h-4 w-4" />
                    <SelectValue placeholder="Filter by type" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="deposit">Deposits</SelectItem>
                  <SelectItem value="withdrawal">Withdrawals</SelectItem>
                  <SelectItem value="investment">Investments</SelectItem>
                  <SelectItem value="roi">ROI</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full sm:w-[180px] bg-white/50 backdrop-blur-sm">
                  <div className="flex items-center gap-2">
                    <ArrowsUpDownIcon className="h-4 w-4" />
                    <SelectValue placeholder="Sort by" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date">Date</SelectItem>
                  <SelectItem value="amount">Amount</SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSortOrder(prev => prev === 'desc' ? 'asc' : 'desc')}
                className="bg-white/50 backdrop-blur-sm"
              >
                <ArrowsUpDownIcon className="h-4 w-4" />
                {sortOrder === 'desc' ? 'Descending' : 'Ascending'}
              </Button>
            </div>
          </div>

          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {filteredTransactions.map((transaction) => (
                <motion.div
                  key={transaction.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center justify-between rounded-lg border p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="rounded-full bg-gradient-to-r from-[#ff5858]/10 via-[#ff7e5f]/10 to-[#ff9966]/10 p-2">
                      {getTransactionIcon(transaction.type)}
                    </div>
                    <div>
                      <p className="font-medium capitalize">{transaction.type}</p>
                      <p className="text-sm text-gray-500">{transaction.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <p className="font-medium">{transaction.amount}</p>
                    <span
                      className={cn(
                        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                        getStatusColor(transaction.status)
                      )}
                    >
                      {transaction.status}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </ScrollArea>

          {totalPages > 1 && (
            <div className="flex items-center justify-between p-4 border-t">
              <div className="text-sm text-gray-500">
                Showing {((currentPage - 1) * transactionsPerPage) + 1} to {Math.min(currentPage * transactionsPerPage, filteredTransactions.length)} of {filteredTransactions.length} transactions
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="bg-white/50 backdrop-blur-sm"
                >
                  <ChevronLeftIcon className="h-4 w-4" />
                </Button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(page)}
                    className={cn(
                      "bg-white/50 backdrop-blur-sm",
                      currentPage === page && "bg-gradient-to-r from-[#ff5858] via-[#ff7e5f] to-[#ff9966] text-white"
                    )}
                  >
                    {page}
                  </Button>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="bg-white/50 backdrop-blur-sm"
                >
                  <ChevronRightIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
} 