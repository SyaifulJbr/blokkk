export default function ContactPage(){
  return (
    <section className="p-8 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-primary mb-6">Hubungi Kami</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="p-6 bg-gray-50 rounded-lg border-l-4 border-primary">
            <h3 className="text-xl font-semibold text-primary mb-2">📧 Email</h3>
            <a href="mailto:giorginomalik@gmail.com" className="text-blue-600 hover:underline">
              giorginomalik@gmail.com
            </a>
          </div>

          <div className="p-6 bg-gray-50 rounded-lg border-l-4 border-primary">
            <h3 className="text-xl font-semibold text-primary mb-2">📱 WhatsApp</h3>
            <a href="https://wa.me/6285854965523" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              +62 858 5496 5523
            </a>
          </div>

          <div className="p-6 bg-gray-50 rounded-lg border-l-4 border-primary">
            <h3 className="text-xl font-semibold text-primary mb-2">📸 Instagram</h3>
            <a href="https://instagram.com/gior.malik" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              @gior.malik
            </a>
          </div>
        </div>

        <div className="p-6 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg">
          <h3 className="text-xl font-semibold text-primary mb-4">Jam Layanan</h3>
          <div className="space-y-2 text-gray-700">
            <p><span className="font-semibold">Senin - Jumat:</span> 08:00 - 19:00</p>
            <p><span className="font-semibold">Sabtu:</span> 08:00 - 18:00</p>
            <p><span className="font-semibold">Minggu:</span> 09:00 - 17:00</p>
          </div>
          
          <h3 className="text-xl font-semibold text-primary mt-6 mb-4">Respons Cepat</h3>
          <p className="text-gray-700">Hubungi kami melalui WhatsApp untuk respons tercepat. Tim kami siap membantu menjawab semua pertanyaan Anda 24/7!</p>
        </div>
      </div>
    </section>
  )
}
