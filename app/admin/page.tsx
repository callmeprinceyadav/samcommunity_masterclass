'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isExporting, setIsExporting] = useState(false)
  const [stats, setStats] = useState<{
    total: number
    today: number
    thisWeek: number
  } | null>(null)
  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
  })
  const [loginError, setLoginError] = useState('')

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      // Check if user is authenticated by trying to fetch stats
      const response = await fetch('/api/stats')
      if (response.ok) {
        const data = await response.json()
        setStats(data)
        setIsAuthenticated(true)
      } else if (response.status === 401) {
        setIsAuthenticated(false)
      }
    } catch (error) {
      setIsAuthenticated(false)
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoginError('')

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      })

      const data = await response.json()

      if (response.ok) {
        setIsAuthenticated(true)
        // Fetch stats after successful login
        fetchStats()
      } else {
        setLoginError(data.error || 'Invalid credentials')
      }
    } catch (error) {
      setLoginError('Login failed. Please try again.')
    }
  }

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
      setIsAuthenticated(false)
      setStats(null)
      setLoginData({ username: '', password: '' })
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/stats')
      if (response.ok) {
        const data = await response.json()
        setStats(data)
      } else {
        setStats({ total: 0, today: 0, thisWeek: 0 })
      }
    } catch (error) {
      console.error('Error fetching stats:', error)
      setStats({ total: 0, today: 0, thisWeek: 0 })
    }
  }

  const handleExport = async () => {
    setIsExporting(true)
    try {
      const response = await fetch('/api/export')
      
      if (!response.ok) {
        if (response.status === 401) {
          setIsAuthenticated(false)
          throw new Error('Session expired. Please login again.')
        }
        throw new Error('Export failed')
      }

      // Get the CSV content
      const csvContent = await response.text()
      
      // Create a blob and download
      const blob = new Blob([csvContent], { type: 'text/csv' })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `registrations_${new Date().toISOString().split('T')[0]}.csv`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      window.URL.revokeObjectURL(url)

      alert('✅ Data exported successfully!')
    } catch (error: any) {
      console.error('Export error:', error)
      alert(`❌ ${error.message || 'Export failed. Please try again.'}`)
    } finally {
      setIsExporting(false)
    }
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-dark via-darkSecondary to-dark flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary mx-auto mb-4"></div>
          <p className="text-white text-xl">Loading...</p>
        </div>
      </div>
    )
  }

  // Login form
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-dark via-darkSecondary to-dark flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="bg-darkSecondary/50 backdrop-blur-sm rounded-lg p-8 border border-primary/20">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">
                Admin <span className="gradient-text">Login</span>
              </h1>
              <p className="text-gray-300">Enter your credentials to access the admin dashboard</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              {loginError && (
                <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 text-red-300 text-sm">
                  {loginError}
                </div>
              )}

              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  value={loginData.username}
                  onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
                  className="w-full px-4 py-3 bg-darkTertiary border border-primary/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter username"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={loginData.password}
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                  className="w-full px-4 py-3 bg-darkTertiary border border-primary/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter password"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full btn-primary"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }

  // Admin dashboard
  return (
    <div className="min-h-screen bg-gradient-to-b from-dark via-darkSecondary to-dark py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
              Admin <span className="gradient-text">Dashboard</span>
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary"></div>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 rounded-lg text-red-300 transition-colors"
          >
            Logout
          </button>
        </div>

        <div className="bg-darkSecondary/50 backdrop-blur-sm rounded-lg p-8 border border-primary/20 space-y-6">
          <div>
            <h2 className="text-2xl font-semibold text-white mb-4">Export Registrations</h2>
            <p className="text-gray-300 mb-6">
              Export all registration data to CSV format for analysis and record-keeping.
            </p>
            
            <button
              onClick={handleExport}
              disabled={isExporting}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isExporting ? 'Exporting...' : '📥 Export to CSV'}
            </button>
          </div>

          {stats && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-primary/20">
              <div className="bg-darkTertiary/50 p-4 rounded-lg">
                <p className="text-sm text-gray-400 mb-1">Total Registrations</p>
                <p className="text-2xl font-bold text-white">{stats.total}</p>
              </div>
              <div className="bg-darkTertiary/50 p-4 rounded-lg">
                <p className="text-sm text-gray-400 mb-1">Today</p>
                <p className="text-2xl font-bold text-white">{stats.today}</p>
              </div>
              <div className="bg-darkTertiary/50 p-4 rounded-lg">
                <p className="text-sm text-gray-400 mb-1">This Week</p>
                <p className="text-2xl font-bold text-white">{stats.thisWeek}</p>
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 text-center">
          <a href="/" className="text-secondary hover:text-primary transition-colors">
            ← Back to Home
          </a>
        </div>
      </div>
    </div>
  )
}
