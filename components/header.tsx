"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { label: "About", href: "#about" },
    { label: "Worship", href: "#worship" },
    { label: "Events", href: "#events" },
    { label: "Staff", href: "#staff" },
    { label: "Contact", href: "#contact" },
    { label: "Members", href: "/members" },
  ]

  return (
    <header
      className="sticky top-0 z-50 border-b border-border shadow-lg"
      style={{
        backgroundImage: "url(/images/images.jpeg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/50" />

      <nav className="relative max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-auto sm:h-20 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0 py-3 sm:py-0">
        {/* Logo and Church Name */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden border-2 border-white shadow-lg flex-shrink-0">
            <Image src="/images/images.jpeg" alt="Grace Lutheran Church" fill className="object-cover" priority />
          </div>
          <a
            href="#"
            className="font-bold text-base sm:text-lg text-white hover:text-orange-100 transition-colors drop-shadow-lg whitespace-nowrap"
          >
            Grace Lutheran
          </a>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-4 lg:gap-8">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-white hover:text-orange-100 transition-colors text-sm font-medium drop-shadow-md"
            >
              {item.label}
            </Link>
          ))}
          <Button className="bg-white hover:bg-orange-50 text-blue-900 rounded-full px-6 font-semibold shadow-md transition-all">
            Join Us
          </Button>
        </div>

        {/* Mobile Navigation Toggle */}
        <button
          className="md:hidden text-white drop-shadow-md ml-auto"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <div className="absolute top-full left-0 right-0 bg-blue-900/95 border-b border-border md:hidden backdrop-blur-sm w-full">
            <div className="flex flex-col gap-3 p-4 max-w-7xl mx-auto">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-white hover:text-orange-100 transition-colors font-medium py-2"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Button className="bg-white hover:bg-orange-50 text-blue-900 rounded-full w-full font-semibold mt-2">
                Join Us
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
