import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-white">InvestPro</div>
          <div className="space-x-4">
            <Link href="/auth/login" className="text-gray-300 hover:text-white">
              Login
            </Link>
            <Link
              href="/auth/register"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-5xl font-bold text-white mb-8">
            Invest in Your Future
          </h1>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl">
            Start your investment journey with our secure platform. Choose between
            Naira and Crypto investments with competitive ROI rates.
          </p>
          <div className="flex space-x-4">
            <Link
              href="/auth/register"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700"
            >
              Start Investing
            </Link>
            <Link
              href="#features"
              className="bg-gray-700 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-600"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="container mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-white text-center mb-12">
          Why Choose Us
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-white mb-4">
              Multiple Investment Options
            </h3>
            <p className="text-gray-300">
              Invest in Naira or various cryptocurrencies including Bitcoin,
              Ethereum, and USDT.
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-white mb-4">
              Daily ROI Returns
            </h3>
            <p className="text-gray-300">
              Earn daily returns on your investments with competitive ROI rates.
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-white mb-4">
              Secure Platform
            </h3>
            <p className="text-gray-300">
              Your investments are protected with state-of-the-art security
              measures.
            </p>
          </div>
        </div>
      </div>

      {/* Investment Plans */}
      <div className="container mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-white text-center mb-12">
          Investment Plans
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-800 p-8 rounded-lg">
            <h3 className="text-2xl font-semibold text-white mb-4">
              Naira Investment
            </h3>
            <ul className="text-gray-300 space-y-2 mb-6">
              <li>• Minimum Investment: ₦50,000</li>
              <li>• Daily ROI: 2-5%</li>
              <li>• Flexible Duration</li>
              <li>• Bank Transfer Support</li>
            </ul>
            <Link
              href="/auth/register"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg inline-block hover:bg-blue-700"
            >
              Invest Now
            </Link>
          </div>
          <div className="bg-gray-800 p-8 rounded-lg">
            <h3 className="text-2xl font-semibold text-white mb-4">
              Crypto Investment
            </h3>
            <ul className="text-gray-300 space-y-2 mb-6">
              <li>• Support for BTC, ETH, USDT</li>
              <li>• Daily ROI: 3-7%</li>
              <li>• Instant Deposits</li>
              <li>• Secure Wallet System</li>
            </ul>
            <Link
              href="/auth/register"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg inline-block hover:bg-blue-700"
            >
              Invest Now
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 py-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-white mb-4 md:mb-0">
              © 2024 InvestPro. All rights reserved.
            </div>
            <div className="flex space-x-6">
              <Link href="/terms" className="text-gray-300 hover:text-white">
                Terms
              </Link>
              <Link href="/privacy" className="text-gray-300 hover:text-white">
                Privacy
              </Link>
              <Link href="/contact" className="text-gray-300 hover:text-white">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
