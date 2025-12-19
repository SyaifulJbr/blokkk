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
    <div className="max-w-2xl mx-auto">
      {success && (
        <div className="mb-6 p-4 bg-gradient-to-r from-accent-green/20 to-accent-green/10 border border-accent-green/30 rounded-xl glow-green">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-accent-green rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-accent-green font-medium">Review submitted successfully!</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-secondary">Name (Optional)</label>
            <input 
              type="text" 
              value={userName} 
              onChange={e => setUserName(e.target.value)} 
              placeholder="Your name or nickname"
              className="input-modern w-full"
            />
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium text-secondary">Rating</label>
            <div className="flex items-center space-x-2">
              {[1,2,3,4,5].map(star => (
                <button 
                  key={star} 
                  type="button"
                  onClick={() => setRating(star)}
                  className={`text-3xl transition-all duration-200 transform hover:scale-110 ${
                    star <= rating 
                      ? 'text-accent-yellow drop-shadow-glow' 
                      : 'text-muted hover:text-accent-yellow/50'
                  }`}
                >
                  ★
                </button>
              ))}
              <span className="ml-3 text-sm text-secondary">
                {rating} of 5
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-secondary">Comment</label>
          <textarea 
            value={comment} 
            onChange={e => setComment(e.target.value)} 
            placeholder="Share your experience with GiorBaliTour..."
            className="input-modern w-full h-32 resize-none"
            required
          />
          <div className="flex justify-between items-center">
            <p className="text-xs text-secondary">
              {comment.length}/500 characters
            </p>
            {comment.length > 500 && (
              <p className="text-xs text-accent-yellow">Maximum 500 characters</p>
            )}
          </div>
        </div>

        {error && (
          <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between">
          <p className="text-sm text-secondary">
            Your review helps us improve our service
          </p>
          <button 
            type="submit" 
            className="btn-modern px-8 py-3 flex items-center space-x-2"
            disabled={loading || comment.length === 0 || comment.length > 500}
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Submitting...</span>
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                <span>Submit Review</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
