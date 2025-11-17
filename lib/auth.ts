import { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

const SECRET_KEY = process.env.AUTH_SECRET || 'your-secret-key-change-this-in-production'

const getSecretKey = () => {
  return new TextEncoder().encode(SECRET_KEY)
}

export interface AuthUser {
  username: string
  role: string
}

export async function verifyAuth(request: NextRequest): Promise<{ user: AuthUser | null; error: string | null }> {
  try {
    // Get token from cookie
    const token = request.cookies.get('admin-token')?.value

    if (!token) {
      return { user: null, error: 'No token provided' }
    }

    // Verify token
    const { payload } = await jwtVerify(token, getSecretKey())

    // Check if user is admin
    if (payload.role !== 'admin') {
      return { user: null, error: 'Unauthorized' }
    }

    return {
      user: {
        username: payload.username as string,
        role: payload.role as string,
      },
      error: null,
    }
  } catch (error: any) {
    console.error('Auth verification error:', error)
    return { user: null, error: 'Invalid token' }
  }
}

export async function requireAuth(request: NextRequest): Promise<{ user: AuthUser; error: null } | { user: null; error: string }> {
  const { user, error } = await verifyAuth(request)

  if (!user || error) {
    return { user: null, error: error || 'Authentication required' }
  }

  return { user, error: null }
}


