import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export async function hashPassword(password: string){
  return bcrypt.hash(password, 10)
}

export async function verifyPassword(password: string, hash: string){
  return bcrypt.compare(password, hash)
}

export const authOptions = {
  // placeholder for Auth.js / next-auth configuration
}
