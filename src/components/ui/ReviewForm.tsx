"use client"
import { useState } from 'react'
import { useTranslations } from 'next-intl'

export default function ReviewForm(){
  const t = useTranslations()
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState('')
  const [userName, setUserName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  async function handleSubmit(e: React.FormEvent){
    e.preventDefault()
    setLoading(true)
    setError(null)
    try{
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userName, comment, rating: parseInt(rating.toString()) })
      })
      if (!res.ok) throw new Error('Failed to submit review')
      setSuccess(true)
      setUserName('')
      setComment('')
      setRating(5)
      setTimeout(() => setSuccess(false), 3000)
    }catch(err: any){
      setError(err.message || 'An error occurred')
    }finally{
      setLoading(false)
    }
  }

  return (
    <div className="max-w-lg">
      {success && <p className="text-green-600 mb-4 text-sm">{t('LeaveReview')} submitted successfully!</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Name (Optional)</label>
          <input 
            type="text" 
            value={userName} 
            onChange={e => setUserName(e.target.value)} 
            placeholder="Your name or nickname"
            className="w-full border p-2 rounded text-sm" 
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Rating</label>
          <div className="flex gap-2">
            {[1,2,3,4,5].map(star => (
              <button 
                key={star} 
                type="button"
                onClick={() => setRating(star)}
                className={`text-2xl ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
              >
                ★
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium">Comment</label>
          <textarea 
            value={comment} 
            onChange={e => setComment(e.target.value)} 
            placeholder="Share your experience..."
            className="w-full border p-2 rounded text-sm h-24" 
            required
          />
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button 
          type="submit" 
          className="bg-primary text-white px-4 py-2 rounded text-sm" 
          disabled={loading}
        >
          {loading ? 'Submitting...' : t('LeaveReview')}
        </button>
      </form>
    </div>
  )
}
