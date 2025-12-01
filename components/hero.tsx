"use client"

import { Button } from "@/components/ui/button"

export default function Hero() {
  return (
    <section className="relative w-full min-h-screen md:min-h-[600px] lg:min-h-[700px] bg-cover bg-center bg-no-repeat flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url("/images/images.jpeg")',
          backgroundAttachment: "fixed",
          backgroundPosition: "center",
        }}
      />
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/50" />

      {/* Content - fully responsive */}
      <div className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-24 lg:py-32">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 text-balance drop-shadow-lg">
          Welcome to Grace Lutheran Church
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-white/90 mb-6 sm:mb-8 max-w-2xl mx-auto text-pretty drop-shadow">
          A faith community dedicated to serving, loving, and growing together. Join us for worship, fellowship, and
          spiritual growth.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
          <Button
            size="lg"
            className="bg-primary hover:bg-accent text-primary-foreground rounded-full px-6 sm:px-8 shadow-lg text-sm sm:text-base"
          >
            Attend This Sunday
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white text-white hover:bg-white/10 rounded-full px-6 sm:px-8 bg-transparent shadow-lg text-sm sm:text-base"
          >
            Learn More
          </Button>
        </div>
      </div>
    </section>
  )
}
