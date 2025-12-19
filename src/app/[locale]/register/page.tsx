"use client"
import { useState } from 'react'
import Header from '@/components/ui/Header'
import Footer from '@/components/ui/Footer'
import '@/styles/globals.css'

export default function RegisterPage(){
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  async function handleSubmit(e: React.FormEvent){
    e.preventDefault()
    setLoading(true)
    setError(null)
    try{
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name, password })
      })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.message || 'Register gagal')
      }
      setSuccess(true)
      setTimeout(() => window.location.href = '/login', 2000)
    }catch(err: any){
      setError(err.message || 'Terjadi kesalahan')
    }finally{
      setLoading(false)
    }
  }

  return (
    <>
      <Header />
      <main className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
          <h1 className="text-2xl font-semibold mb-4 text-primary">Daftar</h1>
          {success && <p className="text-sm text-green-600 mb-4">Registrasi berhasil! Redirecting ke login...</p>}
          {!success && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Nama</label>
                <input 
                  type="text" 
                  value={name} 
                  onChange={e => setName(e.target.value)} 
                  className="w-full border p-2 rounded" 
                  required 
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Email</label>
                <input 
                  type="email" 
                  value={email} 
                  onChange={e => setEmail(e.target.value)} 
                  className="w-full border p-2 rounded" 
                  required 
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Password</label>
                <input 
                  type="password" 
                  value={password} 
                  onChange={e => setPassword(e.target.value)} 
                  className="w-full border p-2 rounded" 
                  required 
                />
              </div>
              {error && <p className="text-sm text-red-600">{error}</p>}
              <div>
                <button 
                  type="submit" 
                  className="w-full bg-primary text-white px-4 py-2 rounded" 
                  disabled={loading}
                >
                  {loading ? 'Memproses...' : 'Daftar'}
                </button>
              </div>
              <p className="text-sm text-gray-600 text-center">
                Sudah punya akun? <a href="/login" className="text-primary hover:underline">Login di sini</a>
              </p>
            </form>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
