"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { blogPosts } from "@/lib/blog-data"
import { CalendarDays, User } from "lucide-react"

export default function BlogPage() {
  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      Spirituality: "bg-primary/10 text-primary",
      Community: "bg-accent/10 text-accent",
      Youth: "bg-secondary/10 text-secondary",
      "Spiritual Seasons": "bg-primary/10 text-primary",
      Missions: "bg-accent/10 text-accent",
    }
    return colors[category] || "bg-muted text-foreground"
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <div className="py-12 px-4 bg-primary/5">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">Church Blog</h1>
            <p className="text-foreground/70 text-lg">Stories, insights, and inspiration from our community</p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post) => (
              <Card
                key={post.id}
                className="p-0 border-border/50 hover:shadow-lg transition-shadow flex flex-col overflow-hidden"
              >
                <div className="w-full h-48 overflow-hidden bg-muted">
                  <img
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <div className="mb-3">
                    <span
                      className={`text-xs font-semibold px-3 py-1 rounded-full inline-block ${getCategoryColor(post.category)}`}
                    >
                      {post.category}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-primary mb-2 line-clamp-2">{post.title}</h3>
                  <p className="text-foreground/70 text-sm mb-4 flex-1 line-clamp-3">{post.excerpt}</p>

                  <div className="space-y-2 text-xs text-foreground/60 mb-4 pt-4 border-t">
                    <div className="flex items-center gap-2">
                      <CalendarDays size={14} />
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User size={14} />
                      <span>{post.author}</span>
                    </div>
                  </div>

                  <Link href={`/blog/${post.id}`}>
                    <Button
                      variant="outline"
                      className="w-full rounded-full border-primary text-primary hover:bg-primary/10 bg-transparent"
                    >
                      Read More
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
