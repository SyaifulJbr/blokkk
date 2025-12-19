'use client'

export default function Footer(){
  return (
    <footer className="bg-primary text-white p-8 mt-12">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
          <div>
            <h4 className="font-semibold mb-3">GiorBaliTour</h4>
            <p className="text-sm opacity-90">Rental mobil terpercaya di Bali dengan layanan profesional.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Kontak</h4>
            <p className="text-sm opacity-90">📧 giorginomalik@gmail.com</p>
            <p className="text-sm opacity-90">📱 +62 858 5496 5523</p>
            <p className="text-sm opacity-90">📸 @gior.malik</p>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Navigasi</h4>
            <p className="text-sm opacity-90 mb-1"><a href="/" className="hover:underline">Home</a></p>
            <p className="text-sm opacity-90 mb-1"><a href="/cars" className="hover:underline">Cars</a></p>
            <p className="text-sm opacity-90"><a href="/contact" className="hover:underline">Contact</a></p>
          </div>
        </div>
        <div className="border-t border-white/20 pt-6 text-center text-sm opacity-75">
          <p>© {new Date().getFullYear()} GiorBaliTour. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
