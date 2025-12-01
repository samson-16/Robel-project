import { Mail, Phone, MapPin } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* About Section */}
          <div>
            <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary-foreground text-primary flex items-center justify-center text-sm font-bold">
                G
              </div>
              Grace Lutheran
            </h4>
            <p className="text-sm opacity-90">
              A faith community dedicated to service, love, and spiritual growth in Christ.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#about" className="hover:underline opacity-90 hover:opacity-100 transition-opacity">
                  About Us
                </a>
              </li>
              <li>
                <a href="#worship" className="hover:underline opacity-90 hover:opacity-100 transition-opacity">
                  Worship Times
                </a>
              </li>
              <li>
                <a href="#events" className="hover:underline opacity-90 hover:opacity-100 transition-opacity">
                  Events
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:underline opacity-90 hover:opacity-100 transition-opacity">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold text-lg mb-4">Contact</h4>
            <div className="space-y-3 text-sm">
              <div className="flex gap-2 items-start">
                <Phone size={16} className="flex-shrink-0 mt-0.5" />
                <span className="opacity-90">(555) 123-4567</span>
              </div>
              <div className="flex gap-2 items-start">
                <Mail size={16} className="flex-shrink-0 mt-0.5" />
                <span className="opacity-90">info@grace.church</span>
              </div>
              <div className="flex gap-2 items-start">
                <MapPin size={16} className="flex-shrink-0 mt-0.5" />
                <span className="opacity-90">
                  123 Faith Avenue
                  <br />
                  Grace City, ST 12345
                </span>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="font-bold text-lg mb-4">Follow Us</h4>
            <div className="space-y-2 text-sm">
              <a href="#" className="block opacity-90 hover:opacity-100 transition-opacity">
                Facebook
              </a>
              <a href="#" className="block opacity-90 hover:opacity-100 transition-opacity">
                Instagram
              </a>
              <a href="#" className="block opacity-90 hover:opacity-100 transition-opacity">
                YouTube
              </a>
              <a href="#" className="block opacity-90 hover:opacity-100 transition-opacity">
                Newsletter
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-8 text-center text-sm opacity-80">
          <p>&copy; {currentYear} Grace Lutheran Church. All rights reserved.</p>
          <p className="mt-2 text-xs">
            <a href="#" className="hover:underline">
              Privacy Policy
            </a>{" "}
            |{" "}
            <a href="#" className="hover:underline">
              Terms of Service
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
