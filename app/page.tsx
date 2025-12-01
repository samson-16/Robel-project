import Header from "@/components/header"
import Hero from "@/components/hero"
import About from "@/components/about"
import WorshipTimes from "@/components/worship-times"
import Events from "@/components/events"
import Staff from "@/components/staff"
import ApplicantsSection from "@/components/applicants-section"
import BlogSection from "@/components/blog-section"
import Contact from "@/components/contact"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />
      <Hero />
      <About />
      <WorshipTimes />
      <Events />
      <Staff />
      <ApplicantsSection />
      <BlogSection />
      <Contact />
      <Footer />
    </main>
  )
}
