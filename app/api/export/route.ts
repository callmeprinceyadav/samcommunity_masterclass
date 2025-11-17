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

    // Get all registrations
    const registrations = await Registration.find({})
      .sort({ registeredAt: -1 }) // Sort by newest first
      .lean() // Convert to plain JavaScript objects

    if (registrations.length === 0) {
      return NextResponse.json(
        { error: 'No registrations found' },
        { status: 404 }
      )
    }

    // Convert to CSV format
    const headers = [
      'Unique ID',
      'Full Name',
      'Email',
      'WhatsApp',
      'Alternate Phone',
      'Current Role',
      'Skill Level',
      'Domain Interest',
      'Previous Attendance',
      'Previous Topics',
      'Expectations',
      'Referral Source',
      'Consent',
      'Registered At',
      'Created At',
    ]

    // Create CSV rows
    const csvRows = [
      headers.join(','), // Header row
      ...registrations.map((reg) => {
        return [
          reg.uniqueId || '',
          `"${(reg.fullName || '').replace(/"/g, '""')}"`, // Escape quotes
          reg.email || '',
          reg.whatsapp || '',
          reg.alternatePhone || '',
          reg.currentRole || '',
          reg.skillLevel || '',
          `"${(Array.isArray(reg.domainInterest) ? reg.domainInterest.join('; ') : reg.domainInterest || '').replace(/"/g, '""')}"`,
          reg.previousAttendance || '',
          `"${((reg.previousTopics || '').replace(/"/g, '""'))}"`,
          `"${((reg.expectations || '').replace(/"/g, '""'))}"`,
          reg.referralSource || '',
          reg.consent ? 'Yes' : 'No',
          reg.registeredAt ? new Date(reg.registeredAt).toLocaleString() : '',
          reg.createdAt ? new Date(reg.createdAt).toLocaleString() : '',
        ].join(',')
      }),
    ]

    const csvContent = csvRows.join('\n')

    // Return CSV file
    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="registrations_${new Date().toISOString().split('T')[0]}.csv"`,
      },
    })
  } catch (error: any) {
    console.error('❌ Export error:', error)
    return NextResponse.json(
      { 
        error: error.message || 'Failed to export data',
        ...(process.env.NODE_ENV === 'development' && { details: error.stack })
      },
      { status: 500 }
    )
  }
}

