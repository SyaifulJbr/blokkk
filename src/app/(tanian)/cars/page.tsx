"use client"
import { useState, useEffect } from 'react'
import { prisma } from '@/lib/auth'

export default function AdminCarsPage(){
  const [cars, setCars] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    capacity: 6,
    transmission: 'MANUAL',
    pricePerDay: 500000,
    imageUrl: '',
    description: '',
    isAvailable: true
  })

  useEffect(() => {
    fetchCars()
  }, [])

  async function fetchCars(){
    try {
      const res = await fetch('/api/admin/cars')
      const data = await res.json()
      setCars(data.cars || [])
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  async function handleSubmit(e: React.FormEvent){
    e.preventDefault()
    try {
      const method = editingId ? 'PUT' : 'POST'
      const url = editingId ? `/api/admin/cars/${editingId}` : '/api/admin/cars'
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      if (!res.ok) throw new Error('Gagal menyimpan')
      await fetchCars()
      setShowForm(false)
      setEditingId(null)
      setFormData({
        name: '',
        capacity: 6,
        transmission: 'MANUAL',
        pricePerDay: 500000,
        imageUrl: '',
        description: '',
        isAvailable: true
      })
    } catch (err) {
      console.error(err)
    }
  }

  async function handleDelete(id: string){
    if (confirm('Yakin ingin hapus?')){
      try {
        const res = await fetch(`/api/admin/cars/${id}`, { method: 'DELETE' })
        if (!res.ok) throw new Error('Gagal hapus')
        await fetchCars()
      } catch (err) {
        console.error(err)
      }
    }
  }

  function handleEdit(car: any){
    setFormData(car)
    setEditingId(car.id)
    setShowForm(true)
  }

  if (loading) return <div className="p-8">Loading...</div>

  return (
    <section className="p-8">
      <h1 className="text-4xl font-bold text-primary mb-6">Admin - Manajemen Mobil</h1>
      
      <button 
        onClick={() => {
          setShowForm(!showForm)
          setEditingId(null)
          setFormData({
            name: '',
            capacity: 6,
            transmission: 'MANUAL',
            pricePerDay: 500000,
            imageUrl: '',
            description: '',
            isAvailable: true
          })
        }}
        className="bg-primary text-white px-4 py-2 rounded mb-6"
      >
        {showForm ? 'Batal' : 'Tambah Mobil'}
      </button>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-gray-50 p-6 rounded-lg mb-6 max-w-2xl">
          <div className="grid grid-cols-2 gap-4">
            <input 
              type="text" 
              placeholder="Nama Mobil" 
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
              className="border p-2 rounded"
              required
            />
            <input 
              type="number" 
              placeholder="Kapasitas" 
              value={formData.capacity}
              onChange={e => setFormData({...formData, capacity: parseInt(e.target.value)})}
              className="border p-2 rounded"
              required
            />
            <select 
              value={formData.transmission}
              onChange={e => setFormData({...formData, transmission: e.target.value})}
              className="border p-2 rounded"
            >
              <option>MANUAL</option>
              <option>AUTOMATIC</option>
            </select>
            <input 
              type="number" 
              placeholder="Harga per Hari" 
              value={formData.pricePerDay}
              onChange={e => setFormData({...formData, pricePerDay: parseInt(e.target.value)})}
              className="border p-2 rounded"
              required
            />
            <input 
              type="url" 
              placeholder="Image URL" 
              value={formData.imageUrl}
              onChange={e => setFormData({...formData, imageUrl: e.target.value})}
              className="col-span-2 border p-2 rounded"
              required
            />
            <textarea 
              placeholder="Deskripsi" 
              value={formData.description}
              onChange={e => setFormData({...formData, description: e.target.value})}
              className="col-span-2 border p-2 rounded h-20"
              required
            />
            <label className="flex items-center">
              <input 
                type="checkbox" 
                checked={formData.isAvailable}
                onChange={e => setFormData({...formData, isAvailable: e.target.checked})}
                className="mr-2"
              />
              Tersedia
            </label>
          </div>
          <button type="submit" className="bg-primary text-white px-4 py-2 rounded mt-4">
            {editingId ? 'Update' : 'Simpan'}
          </button>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cars.map(car => (
          <div key={car.id} className="border rounded-lg p-4 bg-white shadow">
            <img src={car.imageUrl} alt={car.name} className="w-full h-32 object-cover rounded mb-3" />
            <h3 className="font-semibold text-primary">{car.name}</h3>
            <p className="text-sm text-gray-600">{car.capacity} penumpang | {car.transmission}</p>
            <p className="text-sm font-semibold mt-2">Rp {car.pricePerDay.toLocaleString('id-ID')}</p>
            <p className={`text-xs mt-2 ${car.isAvailable ? 'text-green-600' : 'text-red-600'}`}>
              {car.isAvailable ? 'Tersedia' : 'Tidak Tersedia'}
            </p>
            <div className="flex gap-2 mt-4">
              <button 
                onClick={() => handleEdit(car)}
                className="flex-1 bg-blue-500 text-white px-2 py-1 rounded text-sm"
              >
                Edit
              </button>
              <button 
                onClick={() => handleDelete(car.id)}
                className="flex-1 bg-red-500 text-white px-2 py-1 rounded text-sm"
              >
                Hapus
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
