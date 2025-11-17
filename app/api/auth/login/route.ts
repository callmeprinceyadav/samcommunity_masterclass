import { NextRequest, NextResponse } from 'next/server'
import { SignJWT } from 'jose'

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'sam@yash'
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'samcommunity'
const SECRET_KEY = process.env.AUTH_SECRET || 'your-secret-key-change-this-in-production'

// Generate secret key for JWT
const getSecretKey = () => {
  return new TextEncoder().encode(SECRET_KEY)
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { username, password } = body

    // Validate credentials
    if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // Create JWT token
    const token = await new SignJWT({ username, role: 'admin' })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('24h')
      .sign(getSecretKey())

    // Create response with httpOnly cookie
    const response = NextResponse.json(
      { success: true, message: 'Login successful' },
      { status: 200 }
    )

    // Set httpOnly cookie (secure, httpOnly, sameSite)
    response.cookies.set('admin-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24, // 24 hours
      path: '/',
    })

    return response
  } catch (error: any) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Login failed' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  )
}


