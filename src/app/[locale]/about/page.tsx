import Header from '@/components/ui/Header'
import Footer from '@/components/ui/Footer'
import '@/styles/globals.css'

export default function AboutPage(){
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <section className="p-8 max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-primary mb-6">Tentang GiorBaliTour</h1>
          
          <div className="prose prose-lg text-gray-700 space-y-6">
            <div>
              <h2 className="text-2xl font-semibold text-primary mb-3">Siapa Kami?</h2>
              <p>GiorBaliTour adalah layanan rental mobil terpercaya di Bali yang menyediakan pengalaman berkendara yang nyaman dan aman dengan durasi 10 jam, sudah termasuk sopir profesional dan bensin premium.</p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-primary mb-3">Mengapa Memilih Kami?</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>Armada mobil terawat dengan baik dan modern</li>
                <li>Sopir berpengalaman dan profesional</li>
                <li>Harga kompetitif dan transparan</li>
                <li>Layanan pelanggan 24/7</li>
                <li>Fleksibel dengan rute perjalanan Anda</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-primary mb-3">Kualitas Layanan</h2>
              <p>Kami berkomitmen memberikan pengalaman terbaik kepada setiap pelanggan. Dengan armada yang beragam, dari mobil ekonomis hingga luxury, kami siap melayani berbagai kebutuhan liburan Anda di Bali.</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
