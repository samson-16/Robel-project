// CMS-friendly blog data structure
export interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  image: string
  category: string
  date: string
  author: string
}

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "The Meaning of Grace in Our Faith",
    excerpt: "Discover how grace shapes our spiritual journey and community connection.",
    content:
      "Grace is the foundation of our faith. It teaches us compassion, forgiveness, and unconditional love. Through grace, we find strength in our community and hope in our daily lives.",
    image: "/church-spirituality-grace-light-stained-glass.jpg",
    category: "Spirituality",
    date: "2025-11-08",
    author: "Pastor Thomas",
  },
  {
    id: "2",
    title: "Building Stronger Community Through Service",
    excerpt: "How our church volunteers are making a difference in the neighborhood.",
    content:
      "Our community outreach programs have touched hundreds of lives this year. From food drives to mentoring programs, our members demonstrate Christ's love through action.",
    image: "/church-community-service-volunteering-helping.jpg",
    category: "Community",
    date: "2025-11-06",
    author: "Sarah Williams",
  },
  {
    id: "3",
    title: "Youth Fellowship: Growing in Faith Together",
    excerpt: "Our youth group's journey and the impact of mentorship.",
    content:
      "The youth of our church are passionate about their faith and eager to grow. Through mentorship, Bible study, and fellowship, they are becoming tomorrow's leaders.",
    image: "/youth-group-fellowship-young-people-church.jpg",
    category: "Youth",
    date: "2025-11-04",
    author: "David Chen",
  },
  {
    id: "4",
    title: "Advent: A Season of Preparation and Hope",
    excerpt: "Preparing our hearts for the coming season with reflection and prayer.",
    content:
      "Advent invites us to pause, reflect, and prepare our hearts. It's a season of anticipation filled with hope, joy, and the promise of redemption.",
    image: "/advent-christmas-candles-prayer-hope.jpg",
    category: "Spiritual Seasons",
    date: "2025-11-01",
    author: "Pastor Thomas",
  },
  {
    id: "5",
    title: "Prayer Warriors: The Power of Intercession",
    excerpt: "Understanding how prayer transforms lives and strengthens faith.",
    content:
      "Prayer is the heartbeat of our community. Through consistent intercession, we lift each other up and experience God's faithfulness in remarkable ways.",
    image: "/prayer-hands-together-faith-spiritual.jpg",
    category: "Spirituality",
    date: "2025-10-30",
    author: "Margaret Foster",
  },
  {
    id: "6",
    title: "Mission Work: Spreading God's Love Globally",
    excerpt: "Our church's commitment to international missions and global impact.",
    content:
      "Our mission teams have traveled to serve in multiple countries. Each trip strengthens our faith and deepens our commitment to sharing God's love worldwide.",
    image: "/mission-work-global-church-serving.jpg",
    category: "Missions",
    date: "2025-10-28",
    author: "James Mitchell",
  },
]
