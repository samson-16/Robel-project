"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { MapPin, Phone, Mail, Clock } from "lucide-react"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setFormData({ name: "", email: "", phone: "", message: "" })
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <section id="contact" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-card">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Get in Touch</h2>
          <p className="text-foreground/70 max-w-2xl mx-auto">We'd love to hear from you. Connect with us today.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <MapPin className="text-primary" size={24} />
            </div>
            <div>
              <h3 className="font-bold text-primary mb-1">Address</h3>
              <p className="text-foreground/70 text-sm">
                123 Faith Avenue
                <br />
                Grace City, ST 12345
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Phone className="text-primary" size={24} />
            </div>
            <div>
              <h3 className="font-bold text-primary mb-1">Phone</h3>
              <p className="text-foreground/70 text-sm">
                (555) 123-4567
                <br />
                <a href="tel:5551234567" className="hover:text-primary transition-colors">
                  Call us
                </a>
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Mail className="text-primary" size={24} />
            </div>
            <div>
              <h3 className="font-bold text-primary mb-1">Email</h3>
              <p className="text-foreground/70 text-sm">
                info@grace.church
                <br />
                <a href="mailto:info@grace.church" className="hover:text-primary transition-colors">
                  Send us a message
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <h3 className="text-2xl font-bold text-primary mb-6">Send us a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="(555) 123-4567"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  placeholder="Tell us how we can serve you..."
                />
              </div>

              {submitted && (
                <div className="p-4 rounded-lg bg-primary/10 text-primary text-sm font-medium">
                  ✓ Thank you! We'll be in touch soon.
                </div>
              )}

              <Button type="submit" className="w-full bg-primary hover:bg-accent text-primary-foreground rounded-full">
                Send Message
              </Button>
            </form>
          </div>

          {/* Embedded Map */}
          <div>
            <h3 className="text-2xl font-bold text-primary mb-6">Find Us</h3>
            <div className="rounded-lg overflow-hidden h-96 mb-6 shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.1234567890!2d-118.2437!3d34.0522!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzTCsDMnMDcuOSJOIDExOMKwMTQnMzcuMyJX!5e0!3m2!1sen!2sus!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Grace Lutheran Church Location"
              />
            </div>

            <div className="space-y-4">
              <div className="flex gap-3">
                <Clock className="text-primary flex-shrink-0 mt-1" size={20} />
                <div>
                  <p className="font-semibold text-primary">Office Hours</p>
                  <p className="text-foreground/70 text-sm">
                    Monday - Friday: 9:00 AM - 5:00 PM
                    <br />
                    Saturday & Sunday: By appointment
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
