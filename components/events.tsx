import { Calendar } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function Events() {
  const events = [
    {
      title: "Community Potluck Dinner",
      date: "November 15, 2025",
      time: "6:00 PM",
      description: "Join us for fellowship and delicious food. All are welcome!",
      category: "Fellowship",
      image: "/church-community-potluck-dinner-fellowship.jpg",
    },
    {
      title: "Bible Study Series",
      date: "Every Wednesday",
      time: "7:00 PM - 8:30 PM",
      description: "Deep dive into Scripture with our community of faith seekers.",
      category: "Study",
      image: "/bible-study-scripture-learning.jpg",
    },
    {
      title: "Youth Group Outing",
      date: "November 22, 2025",
      time: "2:00 PM",
      description: "Fun activities and games for teenagers. Free admission.",
      category: "Youth",
      image: "/youth-group-outdoor-activities.jpg",
    },
    {
      title: "Holiday Caroling",
      date: "December 15, 2025",
      time: "5:00 PM",
      description: "Spread holiday cheer by singing carols in our neighborhood.",
      category: "Community",
      image: "/holiday-caroling-christmas-joy.jpg",
    },
    {
      title: "Prayer Breakfast",
      date: "First Saturday Monthly",
      time: "8:00 AM",
      description: "Start your morning with prayer, food, and Christian fellowship.",
      category: "Prayer",
      image: "/prayer-breakfast-morning-fellowship.jpg",
    },
    {
      title: "Advent Preparation Workshop",
      date: "November 30, 2025",
      time: "3:00 PM",
      description: "Prepare your heart for Advent with reflection and community.",
      category: "Spiritual",
      image: "/advent-spiritual-reflection-prayer.jpg",
    },
  ]

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      Fellowship: "bg-primary/10 text-primary",
      Study: "bg-accent/10 text-accent",
      Youth: "bg-secondary/10 text-secondary",
      Community: "bg-primary/10 text-primary",
      Prayer: "bg-accent/10 text-accent",
      Spiritual: "bg-primary/10 text-primary",
    }
    return colors[category] || "bg-muted text-foreground"
  }

  return (
    <section id="events" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-card">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Upcoming Events</h2>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            Stay connected with our faith community through these meaningful gatherings
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event, index) => (
            <Card
              key={index}
              className="p-0 border-border/50 hover:shadow-lg transition-shadow flex flex-col overflow-hidden"
            >
              <div className="w-full h-48 overflow-hidden bg-muted">
                <img
                  src={event.image || "/placeholder.svg"}
                  alt={event.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-primary mb-2">{event.title}</h3>
                    <div className="flex gap-2 mb-4">
                      <span
                        className={`text-xs font-semibold px-3 py-1 rounded-full ${getCategoryColor(event.category)}`}
                      >
                        {event.category}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="space-y-2 text-sm text-foreground/70 mb-4 flex-1">
                  <p className="flex gap-2 items-center">
                    <Calendar size={16} className="text-accent flex-shrink-0" />
                    {event.date}
                  </p>
                  <p className="font-medium text-foreground">{event.time}</p>
                  <p className="text-foreground/80">{event.description}</p>
                </div>
                <Button
                  variant="outline"
                  className="w-full rounded-full border-primary text-primary hover:bg-primary/10 mt-auto bg-transparent"
                >
                  Learn More
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
