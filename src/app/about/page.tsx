export default function AboutPage(){
  return (
    <section className="p-8 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-primary mb-6">About GiorBaliTour</h1>
      
      <div className="prose prose-lg text-gray-700 space-y-6">
        <div>
          <h2 className="text-2xl font-semibold text-primary mb-3">Who Are We??</h2>
          <p>GiorBaliTour is a trusted car rental service in Bali that provides a comfortable and safe driving experience for 10 hours, including a professional driver and premium fuel.</p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-primary mb-3">Why Choose Us??</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Well-maintained and modern fleet of cars</li>
            <li>Experienced and professional drivers</li>
            <li>Competitive and transparent pricing</li>
            <li>24/7 customer service</li>
            <li>Flexible with your travel route</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-primary mb-3">Service Quality</h2>
          <p>We are committed to providing the best experience for every customer. With a diverse fleet, from economical to luxury cars, we are ready to serve various vacation needs in Bali.</p>
        </div>
      </div>
    </section>
  )
}
