"use client"
import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'

interface Review {
  id: string
  userName: string
  comment: string
  rating: number
  createdAt: string
}

export default function LatestReviews() {
  const t = useTranslations()
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)

  const fetchReviews = async () => {
    try {
      const res = await fetch('/api/reviews?limit=3')
      if (res.ok) {
        const data = await res.json()
        setReviews(data)
      }
    } catch (error) {
      console.error('Failed to fetch reviews:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchReviews()
  }, [])

  // Listen for custom event to refresh reviews
  useEffect(() => {
    const handleReviewSubmitted = () => {
      fetchReviews()
    }

    window.addEventListener('reviewSubmitted', handleReviewSubmitted)
    return () => {
      window.removeEventListener('reviewSubmitted', handleReviewSubmitted)
    }
  }, [])

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="card-modern p-4 animate-pulse">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-muted rounded-full"></div>
              <div className="flex-1">
                <div className="h-4 bg-muted rounded mb-2"></div>
                <div className="h-3 bg-muted rounded w-20"></div>
              </div>
            </div>
            <div className="h-12 bg-muted rounded"></div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {reviews.map((review, index) => (
        <div key={review.id} className="card-modern p-4 fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-10 h-10 bg-gradient-to-br from-accent-green to-accent-green-light rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">
                {review.userName.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <p className="font-semibold text-primary text-sm">{review.userName}</p>
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <span 
                    key={i} 
                    className={`text-xs ${
                      i < review.rating 
                        ? 'text-accent-yellow drop-shadow-glow' 
                        : 'text-muted'
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          <p className="text-secondary text-sm line-clamp-2">"{review.comment}"</p>
        </div>
      ))}
    </div>
  )
}