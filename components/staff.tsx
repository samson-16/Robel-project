import { Card } from "@/components/ui/card"

export default function Staff() {
  const staff = [
    {
      name: "Rev. Sarah Johnson",
      role: "Senior Pastor",
      bio: "Leading our congregation with compassion and biblical wisdom for 8 years.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
    },
    {
      name: "Rev. David Chen",
      role: "Associate Pastor",
      bio: "Dedicated to youth ministry and community outreach programs.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
    },
    {
      name: "Margaret Williams",
      role: "Director of Music",
      bio: "Creating beautiful musical experiences that inspire faith and joy.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop",
    },
    {
      name: "James Martinez",
      role: "Director of Christian Education",
      bio: "Nurturing spiritual growth through engaging educational programs.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop",
    },
  ]

  return (
    <section id="staff" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Our Leadership Team</h2>
          <p className="text-foreground/70 max-w-2xl mx-auto">Dedicated servants called to guide our faith community</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {staff.map((member, index) => (
            <Card key={index} className="p-6 text-center border-border/50 hover:shadow-lg transition-shadow h-full">
              <img
                src={member.image || "/placeholder.svg"}
                alt={member.name}
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover shadow-md"
              />
              <h3 className="text-lg font-bold text-primary mb-1">{member.name}</h3>
              <p className="text-accent font-semibold text-sm mb-3">{member.role}</p>
              <p className="text-foreground/70 text-sm leading-relaxed">{member.bio}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
