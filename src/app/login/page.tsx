"use client"
import { useState } from 'react'

export default function LoginPage(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent){
    e.preventDefault()
    setLoading(true)
    setError(null)
    try{
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })
      if (!res.ok) throw new Error('Login failed')
      // sukses - redirect
      window.location.href = '/'
    }catch(err: any){
      setError(err.message || 'An error occurred')
    }finally{
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Login</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm">Email</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full border p-2 rounded" required />
        </div>
        <div>
          <label className="block text-sm">Password</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full border p-2 rounded" required />
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <div>
          <button type="submit" className="bg-primary text-white px-4 py-2 rounded" disabled={loading}>{loading ? 'Processing...' : 'Login'}</button>
        </div>
      </form>
    </div>
  )
}
