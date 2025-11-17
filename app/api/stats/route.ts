import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/db'
import Registration from '@/models/Registration'
import { requireAuth } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    // Verify authentication
    const { user, error } = await requireAuth(request)
    
    if (!user || error) {
      return NextResponse.json(
        { error: 'Unauthorized. Admin access required.' },
        { status: 401 }
      )
    }

    // Connect to database
    await connectDB()

    // Get statistics
    const total = await Registration.countDocuments()
    
    // Get today's registrations
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const todayCount = await Registration.countDocuments({
      registeredAt: { $gte: today }
    })

    // Get this week's registrations
    const weekAgo = new Date()
    weekAgo.setDate(weekAgo.getDate() - 7)
    const thisWeekCount = await Registration.countDocuments({
      registeredAt: { $gte: weekAgo }
    })

    return NextResponse.json(
      {
        total,
        today: todayCount,
        thisWeek: thisWeekCount,
      },
      { status: 200 }
    )
  } catch (error: any) {
    console.error('❌ Stats error:', error)
    return NextResponse.json(
      { 
        error: error.message || 'Failed to fetch statistics',
      },
      { status: 500 }
    )
  }
}

