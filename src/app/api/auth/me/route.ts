import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    // For now, we'll return a simple response
    // In a real app, you'd check session/token here
    return NextResponse.json({ user: null })
  } catch (error) {
    console.error('Auth check failed:', error)
    return NextResponse.json({ error: 'Authentication failed' }, { status: 401 })
  }
}