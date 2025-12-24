export interface User {
  id: string
  email: string
  name: string
  role: 'USER' | 'ADMIN'
}

export interface Car {
  id: string
  name: string
  capacity: number
  transmission: 'MANUAL' | 'AUTOMATIC'
  pricePerDay: number
  imageUrl: string
  description: string
  isAvailable: boolean
}

export interface Review {
  id: string
  userName: string
  comment: string
  rating: number
  createdAt: Date
  userId?: string
}
