import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/db'
import { findRegistrationByEmail, createRegistration } from '@/lib/registration'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    const requiredFields = [
      'fullName',
      'email',
      'whatsapp',
      'currentRole',
      'skillLevel',
      'domainInterest',
      'previousAttendance',
      'expectations',
      'referralSource',
      'consent'
    ]

    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `${field} is required` },
          { status: 400 }
        )
      }
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Phone validation
    const phoneRegex = /^\+?[\d\s-]{10,}$/
    if (!phoneRegex.test(body.whatsapp.replace(/\s/g, ''))) {
      return NextResponse.json(
        { error: 'Invalid phone number format' },
        { status: 400 }
      )
    }

    // Domain interest validation
    if (!Array.isArray(body.domainInterest) || body.domainInterest.length === 0) {
      return NextResponse.json(
        { error: 'At least one domain interest is required' },
        { status: 400 }
      )
    }

    // Connect to database
    await connectDB()

    // Check if email already exists
    const existingRegistration = await findRegistrationByEmail(body.email)
    
    if (existingRegistration) {
      return NextResponse.json(
        { error: 'This email is already registered' },
        { status: 409 }
      )
    }

    // Create new registration
    const registration = await createRegistration({
      fullName: body.fullName,
      email: body.email,
      whatsapp: body.whatsapp,
      alternatePhone: body.alternatePhone,
      currentRole: body.currentRole,
      skillLevel: body.skillLevel,
      domainInterest: body.domainInterest,
      previousAttendance: body.previousAttendance,
      previousTopics: body.previousTopics,
      expectations: body.expectations,
      referralSource: body.referralSource,
      consent: body.consent,
    })

    // Log minimal info (no sensitive data in logs)
    console.log('✅ Registration saved to MongoDB:', {
      uniqueId: registration.uniqueId,
      // Don't log sensitive data like email, name, etc.
    })

    // Here you can add:
    // 1. Send confirmation email
    // 2. Add to WhatsApp group (via API)
    // 3. Send notification to admin

    return NextResponse.json(
      { 
        success: true,
        message: 'Registration successful',
        registrationId: (registration._id as any).toString(),
        uniqueId: registration.uniqueId
      },
      { status: 200 }
    )
  } catch (error: any) {
    console.error('❌ Registration error:', error)
    
    // Handle MongoDB duplicate key errors
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0]
      if (field === 'email') {
        return NextResponse.json(
          { error: 'This email is already registered' },
          { status: 409 }
        )
      }
      return NextResponse.json(
        { error: `Duplicate ${field} - this value already exists` },
        { status: 409 }
      )
    }

    // Handle database connection errors
    if (error.message?.includes('MongoServerError') || 
        error.message?.includes('connection') ||
        error.name === 'MongoNetworkError') {
      return NextResponse.json(
        { 
          error: 'Database connection error. Please check your MongoDB Atlas connection string in .env.local file.',
          details: error.message 
        },
        { status: 503 }
      )
    }

    return NextResponse.json(
      { 
        error: error.message || 'Internal server error',
        ...(process.env.NODE_ENV === 'development' && { details: error.stack })
      },
      { status: 500 }
    )
  }
}
