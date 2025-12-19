import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

function ensureAdmin(session: any){
  if (!session || session.user?.role !== 'ADMIN'){
    throw new Error('Unauthorized')
  }
}

export async function createCar(data: any, session: any){
  ensureAdmin(session)
  return prisma.car.create({ data })
}

export async function updateCar(id: string, data: any, session: any){
  ensureAdmin(session)
  return prisma.car.update({ where: { id }, data })
}

export async function deleteCar(id: string, session: any){
  ensureAdmin(session)
  return prisma.car.delete({ where: { id } })
}

export async function listCars(){
  return prisma.car.findMany()
}
