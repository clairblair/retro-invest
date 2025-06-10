'use client'

import { useState, useEffect } from 'react'
import {
  WalletIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  CurrencyDollarIcon,
  BanknotesIcon,
  CreditCardIcon,
  QrCodeIcon,
  ArrowPathIcon,
  XMarkIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { motion, AnimatePresence } from 'framer-motion'
import { Skeleton } from '@/components/ui/skeleton'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Inter, Poppins } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })
const poppins = Poppins({ 
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
})

interface Transaction {
  id: number
  type: 'deposit' | 'withdrawal' | 'transfer'
  amount: string
  date: string
  status: 'completed' | 'pending' | 'failed'
  currency: 'NGN' | 'USD' | 'BTC' | 'ETH'
  method?: string
  reference?: string
}

const recentTransactions: Transaction[] = [
  {
    id: 1,
    type: 'deposit',
    amount: '₦500,000',
    date: '2024-03-20',
    status: 'completed',
    currency: 'NGN',
    method: 'Bank Transfer',
    reference: 'TRX123456',
  },
  {
    id: 2,
    type: 'withdrawal',
    amount: '₦300,000',
    date: '2024-03-19',
    status: 'completed',
    currency: 'NGN',
    method: 'Bank Transfer',
    reference: 'TRX123457',
  },
  {
    id: 3,
    type: 'transfer',
    amount: '0.05 BTC',
    date: '2024-03-18',
    status: 'completed',
    currency: 'BTC',
    method: 'Crypto Transfer',
    reference: 'TRX123458',
  },
  {
    id: 4,
    type: 'deposit',
    amount: '$2,500',
    date: '2024-03-17',
    status: 'pending',
    currency: 'USD',
    method: 'Card Payment',
    reference: 'TRX123459',
  },
]

interface WalletBalance {
  currency: string
  amount: number
  available: number
  pending: number
  locked: number
}

const walletBalances: WalletBalance[] = [
  {
    currency: 'NGN',
    amount: 1250000,
    available: 1000000,
    pending: 150000,
    locked: 100000,
  },
  {
    currency: 'USD',
    amount: 2500,
    available: 2000,
    pending: 300,
    locked: 200,
  },
  {
    currency: 'BTC',
    amount: 0.05,
    available: 0.04,
    pending: 0.005,
    locked: 0.005,
  },
  {
    currency: 'ETH',
    amount: 1.2,
    available: 1.0,
    pending: 0.1,
    locked: 0.1,
  },
]

interface DepositAccount {
  currency: string
  bankName?: string
  accountNumber?: string
  accountName?: string
  walletAddress?: string
  network?: string
}

const depositAccounts: DepositAccount[] = [
  {
    currency: 'NGN',
    bankName: 'First Bank',
    accountNumber: '1234567890',
    accountName: 'Investment Platform',
  },
  {
    currency: 'USD',
    bankName: 'Chase Bank',
    accountNumber: '9876543210',
    accountName: 'Investment Platform',
  },
  {
    currency: 'BTC',
    walletAddress: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
    network: 'Bitcoin',
  },
  {
    currency: 'ETH',
    walletAddress: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
    network: 'Ethereum (ERC20)',
  },
]

interface WithdrawalAccount {
  currency: string
  bankName?: string
  accountNumber?: string
  accountName?: string
  walletAddress?: string
  network?: string
}

const withdrawalAccounts: WithdrawalAccount[] = [
  {
    currency: 'NGN',
    bankName: 'First Bank',
    accountNumber: '1234567890',
    accountName: 'John Doe',
  },
  {
    currency: 'USD',
    bankName: 'Chase Bank',
    accountNumber: '9876543210',
    accountName: 'John Doe',
  },
  {
    currency: 'BTC',
    walletAddress: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
    network: 'Bitcoin',
  },
  {
    currency: 'ETH',
    walletAddress: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
    network: 'Ethereum (ERC20)',
  },
]

export default function WalletPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('naira')
  const [showDepositDialog, setShowDepositDialog] = useState(false)
  const [showWithdrawDialog, setShowWithdrawDialog] = useState(false)
  const [selectedCurrency, setSelectedCurrency] = useState('NGN')
  const [amount, setAmount] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false)
  const [depositStep, setDepositStep] = useState(1)
  const [withdrawStep, setWithdrawStep] = useState(1)
  const [depositProof, setDepositProof] = useState<File | null>(null)
  const [depositReference, setDepositReference] = useState('')
  const [depositFromAccount, setDepositFromAccount] = useState('')
  const [selectedDepositAccount, setSelectedDepositAccount] = useState<DepositAccount | null>(null)
  const [withdrawalAccount, setWithdrawalAccount] = useState<WithdrawalAccount | null>(null)
  const [withdrawalAmount, setWithdrawalAmount] = useState('')
  const [withdrawalMethod, setWithdrawalMethod] = useState('')
  const [withdrawalFee, setWithdrawalFee] = useState(0)
  const [withdrawalTotal, setWithdrawalTotal] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const transactionsPerPage = 5
  const [showAllTransactions, setShowAllTransactions] = useState(false)
  const [transactionFilter, setTransactionFilter] = useState('all')
  const [transactionSort, setTransactionSort] = useState('date')
  const [searchQuery, setSearchQuery] = useState('')

  // Calculate pagination
  const indexOfLastTransaction = currentPage * transactionsPerPage
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage
  const currentTransactions = recentTransactions.slice(indexOfFirstTransaction, indexOfLastTransaction)
  const totalPages = Math.ceil(recentTransactions.length / transactionsPerPage)

  // Filter and sort transactions
  const filteredTransactions = recentTransactions
    .filter(transaction => {
      if (transactionFilter === 'all') return true
      return transaction.type === transactionFilter
    })
    .filter(transaction => {
      if (!searchQuery) return true
      const searchLower = searchQuery.toLowerCase()
      return (
        transaction.type.toLowerCase().includes(searchLower) ||
        transaction.amount.toLowerCase().includes(searchLower) ||
        transaction.reference?.toLowerCase().includes(searchLower) ||
        transaction.method?.toLowerCase().includes(searchLower)
      )
    })
    .sort((a, b) => {
      if (transactionSort === 'date') {
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      }
      if (transactionSort === 'amount') {
        return parseFloat(b.amount.replace(/[^0-9.-]+/g, '')) - parseFloat(a.amount.replace(/[^0-9.-]+/g, ''))
      }
      return 0
    })

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
      case 'transfer':
        return <ArrowPathIcon className="h-4 w-4 text-blue-500" />
      default:
        return null
    }
  }

  const formatNGNAmount = (value: string) => {
    // Remove any non-digit characters
    const numericValue = value.replace(/[^0-9]/g, '')
    
    // Convert to number and format with commas
    const formattedValue = Number(numericValue).toLocaleString('en-NG')
    
    return formattedValue
  }

  const handleNGNAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '')
    setAmount(value)
  }

  const handleDeposit = async () => {
    if (!amount || !paymentMethod) {
      toast.error('Error', {
        description: 'Please fill in all required fields.',
      })
      return
    }

    // Enforce bank transfer for NGN deposits
    if (selectedCurrency === 'NGN' && paymentMethod !== 'bank') {
      toast.error('Error', {
        description: 'NGN deposits can only be made via bank transfer.',
      })
      return
    }

    setIsProcessing(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      if (depositStep === 1) {
        setDepositStep(2)
      } else if (depositStep === 2) {
        setDepositStep(3)
      } else {
        setShowSuccessAnimation(true)
        toast.success('Deposit initiated', {
          description: 'Your deposit has been submitted for review.',
        })
        setTimeout(() => {
          setShowDepositDialog(false)
          setDepositStep(1)
          setAmount('')
          setPaymentMethod('')
          setDepositProof(null)
          setDepositReference('')
          setDepositFromAccount('')
          setShowSuccessAnimation(false)
        }, 2000)
      }
    } catch (error) {
      toast.error('Error', {
        description: 'There was an error processing your deposit.',
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const calculateWithdrawalFee = (amount: number, currency: string) => {
    // Different fee structures for different currencies
    switch (currency) {
      case 'NGN':
        return amount * 0.01 // 1% fee for NGN
      case 'USD':
        return amount * 0.02 // 2% fee for USD
      case 'BTC':
        return 0.0001 // Fixed fee for BTC
      case 'ETH':
        return 0.001 // Fixed fee for ETH
      default:
        return 0
    }
  }

  const handleWithdraw = async () => {
    if (!withdrawalAmount || !withdrawalMethod) {
      toast.error('Error', {
        description: 'Please fill in all required fields.',
      })
      return
    }

    // Enforce bank account for NGN withdrawals
    if (selectedCurrency === 'NGN' && withdrawalMethod !== 'bank') {
      toast.error('Error', {
        description: 'NGN withdrawals can only be made to bank accounts.',
      })
      return
    }

    // Validate bank account details for NGN withdrawals
    if (selectedCurrency === 'NGN' && (!withdrawalAccount?.bankName || !withdrawalAccount?.accountNumber || !withdrawalAccount?.accountName)) {
      toast.error('Error', {
        description: 'Please provide complete bank account details.',
      })
      return
    }

    setIsProcessing(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      if (withdrawStep === 1) {
        setWithdrawStep(2)
      } else {
        setShowSuccessAnimation(true)
        toast.success('Withdrawal initiated', {
          description: 'Your withdrawal request has been submitted successfully.',
        })
        setTimeout(() => {
          setShowWithdrawDialog(false)
          setWithdrawStep(1)
          setWithdrawalAmount('')
          setWithdrawalMethod('')
          setWithdrawalAccount(null)
          setShowSuccessAnimation(false)
        }, 2000)
      }
    } catch (error) {
      toast.error('Error', {
        description: 'There was an error processing your withdrawal.',
      })
    } finally {
      setIsProcessing(false)
    }
  }

  useEffect(() => {
    if (withdrawalAmount) {
      const amount = Number(withdrawalAmount)
      const fee = calculateWithdrawalFee(amount, selectedCurrency)
      setWithdrawalFee(fee)
      setWithdrawalTotal(amount - fee)
    }
  }, [withdrawalAmount, selectedCurrency])

  const getBalance = (currency: string) => {
    return walletBalances.find(balance => balance.currency === currency)
  }

  const formatAmount = (amount: number, currency: string) => {
    if (currency === 'NGN') {
      return `₦${amount.toLocaleString()}`
    } else if (currency === 'USD') {
      return `$${amount.toLocaleString()}`
    } else {
      return `${amount} ${currency}`
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast.error('Error', {
          description: 'File size should be less than 5MB',
        })
        return
      }
      setDepositProof(file)
    }
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  return (
    <div className={`space-y-8 ${poppins.variable} font-sans max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
      >
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-[#ff5858] via-[#ff7e5f] to-[#ff9966] bg-clip-text text-transparent tracking-tight">
            Wallet
          </h1>
          <p className="text-base sm:text-lg text-gray-500 mt-1">Manage your funds and transactions</p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Badge variant="outline" className="flex items-center gap-2 bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full border-2">
              <WalletIcon className="h-5 w-5 text-blue-600" />
              <span className="font-medium">Total Balance: {formatAmount(walletBalances[0].amount, walletBalances[0].currency)}</span>
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
          walletBalances.map((balance, index) => (
            <motion.div
              key={balance.currency}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
              whileHover={{ y: -5, transition: { type: "spring", stiffness: 400, damping: 17 } }}
            >
              <Card className="overflow-hidden border-2 hover:border-blue-500 transition-all duration-300 shadow-lg hover:shadow-xl">
                <CardHeader className="border-b bg-gradient-to-r from-[#ff5858]/10 via-[#ff7e5f]/10 to-[#ff9966]/10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="rounded-full bg-gradient-to-r from-[#ff5858] via-[#ff7e5f] to-[#ff9966] p-2 text-white shadow-lg">
                        {balance.currency === 'NGN' ? (
                          <BanknotesIcon className="h-6 w-6" />
                        ) : balance.currency === 'USD' ? (
                          <CurrencyDollarIcon className="h-6 w-6" />
                        ) : (
                          <QrCodeIcon className="h-6 w-6" />
                        )}
                      </div>
                      <div>
                        <CardTitle className="text-xl font-semibold">{balance.currency} Balance</CardTitle>
                        <p className="text-sm text-gray-500">{balance.currency} Wallet</p>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-4 sm:p-6">
                  <div className="space-y-4">
                    <div className="rounded-lg bg-gradient-to-r from-[#ff5858]/10 via-[#ff7e5f]/10 to-[#ff9966]/10 p-4 shadow-inner">
                      <p className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-[#ff5858] via-[#ff7e5f] to-[#ff9966] bg-clip-text text-transparent">
                        {formatAmount(balance.amount, balance.currency)}
                      </p>
                      <div className="mt-3 space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500 font-medium">Available</span>
                          <span className="font-semibold">{formatAmount(balance.available, balance.currency)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500 font-medium">Pending</span>
                          <span className="font-semibold">{formatAmount(balance.pending, balance.currency)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500 font-medium">Locked</span>
                          <span className="font-semibold">{formatAmount(balance.locked, balance.currency)}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row justify-center items-center gap-2 w-full">
                      <Dialog open={showDepositDialog} onOpenChange={setShowDepositDialog}>
                        <DialogTrigger asChild>
                          <Button
                            onClick={() => {
                              setSelectedCurrency(balance.currency)
                              setSelectedDepositAccount(depositAccounts.find(acc => acc.currency === balance.currency) || null)
                              setShowDepositDialog(true)
                            }}
                            className="w-full sm:w-auto h-12 px-6 py-3 bg-gradient-to-r from-[#ff5858] via-[#ff7e5f] to-[#ff9966] text-white hover:from-[#ff6868] hover:via-[#ff8e7f] hover:to-[#ffa988] shadow-lg hover:shadow-xl transition-all duration-300"
                          >
                            <ArrowDownIcon className="mr-2 h-4 w-4" />
                            Deposit
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px] w-[95vw] sm:w-[90vw] md:w-[80vw] lg:w-[70vw] bg-white/95 dark:bg-[#232526]/95 backdrop-blur-sm border-2">
                          <DialogHeader>
                            <DialogTitle className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-[#ff5858] via-[#ff7e5f] to-[#ff9966] bg-clip-text text-transparent">
                              Deposit {balance.currency}
                            </DialogTitle>
                            <DialogDescription className="text-gray-600">
                              {depositStep === 1 ? 'Enter the amount you want to deposit' : 
                               depositStep === 2 ? 'Complete your deposit details' :
                               'Upload proof of payment'}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            {depositStep === 1 ? (
                              <>
                                <div>
                                  <Label className="text-gray-700 font-medium">Amount</Label>
                                  <div className="relative mt-1">
                                    {balance.currency === 'NGN' ? (
                                      <BanknotesIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                    ) : (
                                      <CurrencyDollarIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                    )}
                                    <Input
                                      type="text"
                                      value={balance.currency === 'NGN' ? `₦${formatNGNAmount(amount)}` : amount}
                                      onChange={balance.currency === 'NGN' ? handleNGNAmountChange : (e) => setAmount(e.target.value)}
                                      className="pl-10 bg-white/50 backdrop-blur-sm border-2 focus:border-[#ff5858] transition-colors"
                                      placeholder={balance.currency === 'NGN' ? '₦0.00' : `0.00 ${balance.currency}`}
                                    />
                                  </div>
                                  {balance.currency === 'NGN' && (
                                    <p className="mt-1 text-sm text-gray-500">
                                      Enter amount in Naira (₦)
                                    </p>
                                  )}
                                </div>
                                <div>
                                  <Label className="text-gray-700 font-medium">Payment Method</Label>
                                  <Select 
                                    value={paymentMethod} 
                                    onValueChange={setPaymentMethod}
                                    disabled={balance.currency === 'NGN'}
                                  >
                                    <SelectTrigger className="mt-1 bg-white/50 backdrop-blur-sm border-2">
                                      <SelectValue placeholder="Select payment method" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {balance.currency === 'NGN' ? (
                                        <SelectItem value="bank">Bank Transfer</SelectItem>
                                      ) : (
                                        <>
                                          <SelectItem value="bank">Bank Transfer</SelectItem>
                                          <SelectItem value="card">Credit/Debit Card</SelectItem>
                                          <SelectItem value="crypto">Cryptocurrency</SelectItem>
                                        </>
                                      )}
                                    </SelectContent>
                                  </Select>
                                  {balance.currency === 'NGN' && (
                                    <p className="mt-1 text-sm text-gray-500">
                                      NGN deposits can only be made via bank transfer
                                    </p>
                                  )}
                                </div>
                              </>
                            ) : depositStep === 2 ? (
                              <div className="space-y-4">
                                <Alert className="bg-blue-50 border-blue-200">
                                  <CheckCircleIcon className="h-4 w-4 text-blue-600" />
                                  <AlertTitle className="text-blue-800 font-semibold">Deposit Details</AlertTitle>
                                  <AlertDescription className="text-blue-700">
                                    Please send {balance.currency === 'NGN' ? `₦${formatNGNAmount(amount)}` : formatAmount(Number(amount), balance.currency)} to the following account:
                                  </AlertDescription>
                                </Alert>
                                <div className="rounded-lg border-2 p-4 bg-white/50 backdrop-blur-sm">
                                  {selectedDepositAccount?.bankName ? (
                                    <div className="space-y-2">
                                      <div className="flex justify-between text-sm">
                                        <span className="text-gray-500 font-medium">Bank Name</span>
                                        <span className="font-semibold">{selectedDepositAccount.bankName}</span>
                                      </div>
                                      <div className="flex justify-between text-sm">
                                        <span className="text-gray-500 font-medium">Account Number</span>
                                        <span className="font-semibold">{selectedDepositAccount.accountNumber}</span>
                                      </div>
                                      <div className="flex justify-between text-sm">
                                        <span className="text-gray-500 font-medium">Account Name</span>
                                        <span className="font-semibold">{selectedDepositAccount.accountName}</span>
                                      </div>
                                    </div>
                                  ) : (
                                    <div className="space-y-2">
                                      <div className="flex justify-between text-sm">
                                        <span className="text-gray-500 font-medium">Network</span>
                                        <span className="font-semibold">{selectedDepositAccount?.network}</span>
                                      </div>
                                      <div className="flex justify-between text-sm">
                                        <span className="text-gray-500 font-medium">Wallet Address</span>
                                        <span className="font-semibold">{selectedDepositAccount?.walletAddress}</span>
                                      </div>
                                    </div>
                                  )}
                                  <div className="mt-4 space-y-2">
                                    <div className="flex justify-between text-sm">
                                      <span className="text-gray-500 font-medium">Amount</span>
                                      <span className="font-semibold">{formatAmount(Number(amount), balance.currency)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                      <span className="text-gray-500 font-medium">Payment Method</span>
                                      <span className="font-semibold capitalize">{paymentMethod}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                      <span className="text-gray-500 font-medium">Reference</span>
                                      <span className="font-semibold">TRX{Math.random().toString(36).substring(7).toUpperCase()}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <div className="space-y-4">
                                <Alert className="bg-green-50 border-green-200">
                                  <CheckCircleIcon className="h-4 w-4 text-green-600" />
                                  <AlertTitle className="text-green-800 font-semibold">Proof of Payment</AlertTitle>
                                  <AlertDescription className="text-green-700">
                                    Please provide your payment details and upload proof of payment
                                  </AlertDescription>
                                </Alert>
                                <div className="space-y-4">
                                  <div>
                                    <Label className="text-gray-700 font-medium">Account/Wallet ID Used</Label>
                                    <Input
                                      value={depositFromAccount}
                                      onChange={(e) => setDepositFromAccount(e.target.value)}
                                      className="mt-1 bg-white/50 backdrop-blur-sm border-2 focus:border-[#ff5858] transition-colors"
                                      placeholder="Enter the account or wallet ID you used"
                                    />
                                  </div>
                                  <div>
                                    <Label className="text-gray-700 font-medium">Transaction Reference</Label>
                                    <Input
                                      value={depositReference}
                                      onChange={(e) => setDepositReference(e.target.value)}
                                      className="mt-1 bg-white/50 backdrop-blur-sm border-2 focus:border-[#ff5858] transition-colors"
                                      placeholder="Enter your bank/crypto transaction reference"
                                    />
                                  </div>
                                  <div>
                                    <Label className="text-gray-700 font-medium">Proof of Payment</Label>
                                    <div className="mt-1">
                                      <Input
                                        type="file"
                                        accept="image/*,.pdf"
                                        onChange={handleFileChange}
                                        className="bg-white/50 backdrop-blur-sm border-2 focus:border-[#ff5858] transition-colors"
                                      />
                                      <p className="mt-1 text-sm text-gray-500">
                                        Upload screenshot or PDF of your payment (max 5MB)
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                          <DialogFooter className="flex flex-col sm:flex-row gap-2">
                            <Button
                              variant="outline"
                              onClick={() => {
                                setShowDepositDialog(false)
                                setDepositStep(1)
                                setAmount('')
                                setPaymentMethod('')
                                setDepositProof(null)
                                setDepositReference('')
                                setDepositFromAccount('')
                              }}
                              className="w-full sm:w-auto bg-white/50 dark:bg-[#232526]/50 backdrop-blur-sm border-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                            >
                              Cancel
                            </Button>
                            <Button
                              onClick={handleDeposit}
                              disabled={isProcessing || !amount || !paymentMethod || 
                                (depositStep === 3 && (!depositFromAccount || !depositReference || !depositProof))}
                              className="w-full sm:w-auto bg-gradient-to-r from-[#ff5858] via-[#ff7e5f] to-[#ff9966] hover:from-[#ff6868] hover:via-[#ff8e7f] hover:to-[#ffa988] text-white shadow-lg hover:shadow-xl transition-all duration-300"
                            >
                              {isProcessing ? (
                                <>
                                  <ArrowPathIcon className="mr-2 h-4 w-4 animate-spin" />
                                  Processing...
                                </>
                              ) : depositStep === 1 ? (
                                'Continue'
                              ) : depositStep === 2 ? (
                                "I've Made the Payment"
                              ) : (
                                'Submit Deposit'
                              )}
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>

                      <Dialog open={showWithdrawDialog} onOpenChange={setShowWithdrawDialog}>
                        <DialogTrigger asChild>
                          <Button
                            onClick={() => {
                              setSelectedCurrency(balance.currency)
                              setWithdrawalAccount(withdrawalAccounts.find(acc => acc.currency === balance.currency) || null)
                              setShowWithdrawDialog(true)
                            }}
                            variant="outline"
                            className="w-full sm:w-auto h-12 px-6 py-3 border-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                          >
                            <ArrowUpIcon className="mr-2 h-4 w-4" />
                            Withdraw
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px] w-[95vw] sm:w-[90vw] md:w-[80vw] lg:w-[70vw] bg-white/95 dark:bg-[#232526]/95 backdrop-blur-sm border-2">
                          <DialogHeader>
                            <DialogTitle className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-[#ff5858] via-[#ff7e5f] to-[#ff9966] bg-clip-text text-transparent">
                              Withdraw {balance.currency}
                            </DialogTitle>
                            <DialogDescription className="text-gray-600">
                              {withdrawStep === 1 ? 'Enter withdrawal details' : 'Confirm withdrawal'}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            {withdrawStep === 1 ? (
                              <>
                                <div>
                                  <Label className="text-gray-700 font-medium">Amount</Label>
                                  <div className="relative mt-1">
                                    {balance.currency === 'NGN' ? (
                                      <BanknotesIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                    ) : (
                                      <CurrencyDollarIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                    )}
                                    <Input
                                      type="number"
                                      value={withdrawalAmount}
                                      onChange={(e) => setWithdrawalAmount(e.target.value)}
                                      className="pl-10 bg-white/50 backdrop-blur-sm border-2 focus:border-[#ff5858] transition-colors"
                                      placeholder={`0.00 ${balance.currency}`}
                                    />
                                  </div>
                                  <p className="mt-1 text-sm text-gray-500">
                                    Available: {formatAmount(balance.available, balance.currency)}
                                  </p>
                                </div>
                                <div>
                                  <Label className="text-gray-700 font-medium">Withdrawal Method</Label>
                                  <Select 
                                    value={withdrawalMethod} 
                                    onValueChange={setWithdrawalMethod}
                                    disabled={balance.currency === 'NGN'}
                                  >
                                    <SelectTrigger className="mt-1 bg-white/50 backdrop-blur-sm border-2">
                                      <SelectValue placeholder="Select withdrawal method" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {balance.currency === 'NGN' ? (
                                        <SelectItem value="bank">Bank Account</SelectItem>
                                      ) : (
                                        <>
                                          <SelectItem value="bank">Bank Account</SelectItem>
                                          <SelectItem value="card">Debit Card</SelectItem>
                                          <SelectItem value="crypto">Cryptocurrency Wallet</SelectItem>
                                        </>
                                      )}
                                    </SelectContent>
                                  </Select>
                                  {balance.currency === 'NGN' && (
                                    <p className="mt-1 text-sm text-gray-500">
                                      NGN withdrawals can only be made to bank accounts
                                    </p>
                                  )}
                                </div>
                                {(withdrawalMethod === 'bank' || balance.currency === 'NGN') && (
                                  <div className="space-y-4">
                                    <div>
                                      <Label className="text-gray-700 font-medium">Bank Name</Label>
                                      <Input
                                        value={withdrawalAccount?.bankName || ''}
                                        onChange={(e) => setWithdrawalAccount(prev => ({ ...prev!, bankName: e.target.value }))}
                                        className="mt-1 bg-white/50 backdrop-blur-sm border-2 focus:border-[#ff5858] transition-colors"
                                        placeholder="Enter bank name"
                                      />
                                    </div>
                                    <div>
                                      <Label className="text-gray-700 font-medium">Account Number</Label>
                                      <Input
                                        value={withdrawalAccount?.accountNumber || ''}
                                        onChange={(e) => setWithdrawalAccount(prev => ({ ...prev!, accountNumber: e.target.value }))}
                                        className="mt-1 bg-white/50 backdrop-blur-sm border-2 focus:border-[#ff5858] transition-colors"
                                        placeholder="Enter account number"
                                      />
                                    </div>
                                    <div>
                                      <Label className="text-gray-700 font-medium">Account Name</Label>
                                      <Input
                                        value={withdrawalAccount?.accountName || ''}
                                        onChange={(e) => setWithdrawalAccount(prev => ({ ...prev!, accountName: e.target.value }))}
                                        className="mt-1 bg-white/50 backdrop-blur-sm border-2 focus:border-[#ff5858] transition-colors"
                                        placeholder="Enter account name"
                                      />
                                    </div>
                                  </div>
                                )}
                                {withdrawalMethod === 'crypto' && balance.currency !== 'NGN' && (
                                  <div className="space-y-4">
                                    <div>
                                      <Label className="text-gray-700 font-medium">Wallet Address</Label>
                                      <Input
                                        value={withdrawalAccount?.walletAddress || ''}
                                        onChange={(e) => setWithdrawalAccount(prev => ({ ...prev!, walletAddress: e.target.value }))}
                                        className="mt-1 bg-white/50 backdrop-blur-sm border-2 focus:border-[#ff5858] transition-colors"
                                        placeholder="Enter wallet address"
                                      />
                                    </div>
                                    <div>
                                      <Label className="text-gray-700 font-medium">Network</Label>
                                      <Input
                                        value={withdrawalAccount?.network || ''}
                                        onChange={(e) => setWithdrawalAccount(prev => ({ ...prev!, network: e.target.value }))}
                                        className="mt-1 bg-white/50 backdrop-blur-sm border-2 focus:border-[#ff5858] transition-colors"
                                        placeholder="Enter network (e.g., Bitcoin, Ethereum)"
                                      />
                                    </div>
                                  </div>
                                )}
                              </>
                            ) : (
                              <div className="space-y-4">
                                <Alert className="bg-green-50 border-green-200">
                                  <CheckCircleIcon className="h-4 w-4 text-green-600" />
                                  <AlertTitle className="text-green-800 font-semibold">Withdrawal Details</AlertTitle>
                                  <AlertDescription className="text-green-700">
                                    Please confirm your withdrawal details
                                  </AlertDescription>
                                </Alert>
                                <div className="rounded-lg border-2 p-4 bg-white/50 backdrop-blur-sm">
                                  <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                      <span className="text-gray-500 font-medium">Amount</span>
                                      <span className="font-semibold">{formatAmount(Number(withdrawalAmount), balance.currency)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                      <span className="text-gray-500 font-medium">Withdrawal Method</span>
                                      <span className="font-semibold capitalize">{withdrawalMethod}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                      <span className="text-gray-500 font-medium">Fee</span>
                                      <span className="font-semibold">{formatAmount(withdrawalFee, balance.currency)}</span>
                                    </div>
                                    <Separator className="my-2" />
                                    <div className="flex justify-between text-sm font-semibold">
                                      <span>Total</span>
                                      <span>{formatAmount(withdrawalTotal, balance.currency)}</span>
                                    </div>
                                    {withdrawalMethod === 'bank' && (
                                      <>
                                        <Separator className="my-2" />
                                        <div className="space-y-2">
                                          <div className="flex justify-between text-sm">
                                            <span className="text-gray-500 font-medium">Bank Name</span>
                                            <span className="font-semibold">{withdrawalAccount?.bankName}</span>
                                          </div>
                                          <div className="flex justify-between text-sm">
                                            <span className="text-gray-500 font-medium">Account Number</span>
                                            <span className="font-semibold">{withdrawalAccount?.accountNumber}</span>
                                          </div>
                                          <div className="flex justify-between text-sm">
                                            <span className="text-gray-500 font-medium">Account Name</span>
                                            <span className="font-semibold">{withdrawalAccount?.accountName}</span>
                                          </div>
                                        </div>
                                      </>
                                    )}
                                    {withdrawalMethod === 'crypto' && (
                                      <>
                                        <Separator className="my-2" />
                                        <div className="space-y-2">
                                          <div className="flex justify-between text-sm">
                                            <span className="text-gray-500 font-medium">Wallet Address</span>
                                            <span className="font-semibold">{withdrawalAccount?.walletAddress}</span>
                                          </div>
                                          <div className="flex justify-between text-sm">
                                            <span className="text-gray-500 font-medium">Network</span>
                                            <span className="font-semibold">{withdrawalAccount?.network}</span>
                                          </div>
                                        </div>
                                      </>
                                    )}
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                          <DialogFooter className="flex flex-col sm:flex-row gap-2">
                            <Button
                              variant="outline"
                              onClick={() => {
                                setShowWithdrawDialog(false)
                                setWithdrawStep(1)
                                setWithdrawalAmount('')
                                setWithdrawalMethod('')
                                setWithdrawalAccount(null)
                              }}
                              className="w-full sm:w-auto bg-white/50 dark:bg-[#232526]/50 backdrop-blur-sm border-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                            >
                              Cancel
                            </Button>
                            <Button
                              onClick={handleWithdraw}
                              disabled={isProcessing || !withdrawalAmount || !withdrawalMethod || 
                                (withdrawalMethod === 'bank' && (!withdrawalAccount?.bankName || !withdrawalAccount?.accountNumber || !withdrawalAccount?.accountName)) ||
                                (withdrawalMethod === 'crypto' && (!withdrawalAccount?.walletAddress || !withdrawalAccount?.network))}
                              className="w-full sm:w-auto bg-gradient-to-r from-[#ff5858] via-[#ff7e5f] to-[#ff9966] hover:from-[#ff6868] hover:via-[#ff8e7f] hover:to-[#ffa988] text-white shadow-lg hover:shadow-xl transition-all duration-300"
                            >
                              {isProcessing ? (
                                <>
                                  <ArrowPathIcon className="mr-2 h-4 w-4 animate-spin" />
                                  Processing...
                                </>
                              ) : withdrawStep === 1 ? (
                                'Continue'
                              ) : (
                                'Confirm Withdrawal'
                              )}
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))
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
                  <CardTitle className="text-xl font-semibold">Recent Transactions</CardTitle>
                  <p className="text-sm text-gray-500">Your latest activities</p>
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
                {currentTransactions.map((transaction) => (
                  <motion.div
                    key={transaction.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-lg border-2 p-4 hover:bg-gray-50 transition-all duration-300"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="rounded-full bg-gradient-to-r from-[#ff5858]/10 via-[#ff7e5f]/10 to-[#ff9966]/10 p-2 shadow-inner">
                        {getTransactionIcon(transaction.type)}
                      </div>
                      <div>
                        <p className="font-semibold capitalize">{transaction.type}</p>
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="text-sm text-gray-500">{transaction.date}</p>
                          <span className="text-sm text-gray-500 hidden sm:inline">•</span>
                          <p className="text-sm text-gray-500">{transaction.method}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between sm:justify-end gap-4">
                      <div className="text-right">
                        <p className="font-semibold">{transaction.amount}</p>
                        <p className="text-sm text-gray-500">{transaction.reference}</p>
                      </div>
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
                ))}
              </div>
            </ScrollArea>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t pt-4">
                <div className="flex items-center gap-2">
                  <p className="text-sm text-gray-500 text-center sm:text-left">
                    Showing {indexOfFirstTransaction + 1} to {Math.min(indexOfLastTransaction, recentTransactions.length)} of {recentTransactions.length} transactions
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="border-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ArrowLeftIcon className="h-4 w-4 mr-1" />
                    Previous
                  </Button>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        size="sm"
                        onClick={() => handlePageChange(page)}
                        className={cn(
                          "min-w-[2.5rem] h-9 px-3",
                          currentPage === page
                            ? "bg-gradient-to-r from-[#ff5858] via-[#ff7e5f] to-[#ff9966] text-white hover:from-[#ff6868] hover:via-[#ff8e7f] hover:to-[#ffa988]"
                            : "border-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        )}
                      >
                        {page}
                      </Button>
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="border-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                    <ArrowRightIcon className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* All Transactions Dialog */}
      <Dialog open={showAllTransactions} onOpenChange={setShowAllTransactions}>
        <DialogContent className="max-w-4xl w-[95vw] sm:w-[90vw] md:w-[80vw] lg:w-[70vw] bg-white/95 dark:bg-[#232526]/95 backdrop-blur-sm border-2">
          <DialogHeader>
            <DialogTitle className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-[#ff5858] via-[#ff7e5f] to-[#ff9966] bg-clip-text text-transparent">
              All Transactions
            </DialogTitle>
            <DialogDescription className="text-gray-600">
              View and filter all your transactions
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {/* Filters and Search */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <Input
                    placeholder="Search transactions..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-white/50 backdrop-blur-sm border-2 focus:border-[#ff5858] transition-colors"
                  />
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <Select value={transactionFilter} onValueChange={setTransactionFilter}>
                  <SelectTrigger className="w-full sm:w-[180px] bg-white/50 backdrop-blur-sm border-2">
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="deposit">Deposits</SelectItem>
                    <SelectItem value="withdrawal">Withdrawals</SelectItem>
                    <SelectItem value="transfer">Transfers</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={transactionSort} onValueChange={setTransactionSort}>
                  <SelectTrigger className="w-full sm:w-[180px] bg-white/50 backdrop-blur-sm border-2">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="date">Date</SelectItem>
                    <SelectItem value="amount">Amount</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Transactions List */}
            <ScrollArea className="h-[50vh] sm:h-[60vh] pr-4">
              <div className="space-y-4">
                {filteredTransactions.map((transaction) => (
                  <motion.div
                    key={transaction.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-lg border-2 p-4 hover:bg-gray-50 transition-all duration-300"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="rounded-full bg-gradient-to-r from-[#ff5858]/10 via-[#ff7e5f]/10 to-[#ff9966]/10 p-2 shadow-inner">
                        {getTransactionIcon(transaction.type)}
                      </div>
                      <div>
                        <p className="font-semibold capitalize">{transaction.type}</p>
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="text-sm text-gray-500">{transaction.date}</p>
                          <span className="text-sm text-gray-500 hidden sm:inline">•</span>
                          <p className="text-sm text-gray-500">{transaction.method}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between sm:justify-end gap-4">
                      <div className="text-right">
                        <p className="font-semibold">{transaction.amount}</p>
                        <p className="text-sm text-gray-500">{transaction.reference}</p>
                      </div>
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
                ))}
              </div>
            </ScrollArea>

            {/* Summary */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4 border-t">
              <p className="text-sm text-gray-500 text-center sm:text-left">
                Showing {filteredTransactions.length} transactions
              </p>
              <Button
                variant="outline"
                onClick={() => setShowAllTransactions(false)}
                className="w-full sm:w-auto bg-white/50 dark:bg-[#232526]/50 backdrop-blur-sm border-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                Close
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
} 