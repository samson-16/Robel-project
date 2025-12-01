import { Clock } from "lucide-react"
import { Card } from "@/components/ui/card"

export default function WorshipTimes() {
  const services = [
    {
      name: "Traditional Service",
      day: "Sundays",
      time: "8:00 AM",
      description: "Classic hymns and liturgy",
      location: "Main Sanctuary",
    },
    {
      name: "Contemporary Service",
      day: "Sundays",
      time: "10:30 AM",
      description: "Modern music and engaging message",
      location: "Main Sanctuary",
    },
    {
      name: "Evening Reflection",
      day: "Sundays",
      time: "5:00 PM",
      description: "Intimate worship and community discussion",
      location: "Fellowship Hall",
    },
    {
      name: "Midweek Prayer",
      day: "Wednesdays",
      time: "7:00 PM",
      description: "Prayer and Bible study",
      location: "Prayer Chapel",
    },
  ]

  return (
    <section id="worship" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Worship Times</h2>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            Join us for meaningful worship experiences that feed your spirit
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow border-border/50">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Clock className="text-primary" size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-primary mb-1">{service.name}</h3>
                  <p className="text-foreground/60 text-sm mb-2">
                    {service.day} at {service.time}
                  </p>
                  <p className="text-foreground/80 mb-2">{service.description}</p>
                  <p className="text-sm text-foreground/60">📍 {service.location}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
