import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    // In a real app, you'd clear session/token here
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Logout failed:', error)
    return NextResponse.json({ error: 'Logout failed' }, { status: 500 })
  }
}