export default function About() {
  return (
    <section id="about" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-card">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">About Us</h2>
          <p className="text-foreground/70 max-w-2xl mx-auto">Our Story and Mission</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <img
              src="https://images.unsplash.com/photo-1574418016020-c57dc3dfc8d9?w=600&h=400&fit=crop"
              alt="Church sanctuary with warm lighting"
              className="rounded-lg shadow-lg w-full h-auto object-cover"
            />
          </div>
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-primary mb-3">Our Mission</h3>
              <p className="text-foreground/80 leading-relaxed">
                At Grace Lutheran Church, we are committed to sharing the gospel of Christ, serving our community with
                compassion, and building meaningful relationships rooted in faith. We believe in the transformative
                power of God's love.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-primary mb-3">Our Values</h3>
              <ul className="space-y-2 text-foreground/80">
                <li className="flex gap-3">
                  <span className="text-accent font-bold">•</span>
                  <span>
                    <strong>Faith</strong> - Rooted in God's Word and grace
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent font-bold">•</span>
                  <span>
                    <strong>Community</strong> - Growing together in fellowship
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent font-bold">•</span>
                  <span>
                    <strong>Service</strong> - Loving and serving others with joy
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent font-bold">•</span>
                  <span>
                    <strong>Inclusion</strong> - Welcoming all God's people
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
