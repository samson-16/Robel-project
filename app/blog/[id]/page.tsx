"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { blogPosts } from "@/lib/blog-data"
import { useParams } from "next/navigation"
import { CalendarDays, User, ArrowLeft } from "lucide-react"

export default function BlogPostPage() {
  const params = useParams()
  const post = blogPosts.find((p) => p.id === params.id)

  if (!post) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Post not found</h1>
            <Link href="/blog">
              <Button>Back to Blog</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  const relatedPosts = blogPosts.filter((p) => p.id !== post.id && p.category === post.category).slice(0, 3)

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        {/* Featured Image */}
        <div className="w-full h-96 overflow-hidden bg-muted">
          <img src={post.image || "/placeholder.svg"} alt={post.title} className="w-full h-full object-cover" />
        </div>

        {/* Article Content */}
        <article className="max-w-3xl mx-auto px-4 py-12">
          <Link href="/blog" className="inline-flex items-center gap-2 text-primary hover:underline mb-6">
            <ArrowLeft size={16} />
            Back to Blog
          </Link>

          <div className="mb-6">
            <span className="text-sm font-semibold px-3 py-1 rounded-full bg-primary/10 text-primary inline-block">
              {post.category}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">{post.title}</h1>

          <div className="flex flex-col md:flex-row gap-6 text-foreground/70 mb-8 pb-8 border-b">
            <div className="flex items-center gap-2">
              <CalendarDays size={16} />
              <span>
                {new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <User size={16} />
              <span>{post.author}</span>
            </div>
          </div>

          <div className="prose prose-lg max-w-none mb-12">
            <p className="text-lg text-foreground/80 leading-relaxed">{post.content}</p>
          </div>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <div className="pt-12 border-t">
              <h2 className="text-2xl font-bold text-primary mb-6">Related Articles</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <div
                    key={relatedPost.id}
                    className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <img
                      src={relatedPost.image || "/placeholder.svg"}
                      alt={relatedPost.title}
                      className="w-full h-40 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="font-bold text-primary mb-2 line-clamp-2">{relatedPost.title}</h3>
                      <Link href={`/blog/${relatedPost.id}`}>
                        <Button variant="outline" size="sm" className="w-full bg-transparent">
                          Read More
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </article>
      </main>
      <Footer />
    </>
  )
}
