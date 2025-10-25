import { useState } from 'react';
import BlogCard from '@/components/BlogCard';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import aiImage from '@assets/generated_images/gemini_autogen.png';
import langchainImage from '@assets/generated_images/langchain.png';
import marketingImage from '@assets/generated_images/Marketing_blog_featured_image_88a4b838.png';
import mvpImage from '@assets/generated_images/MVP_blog_featured_image_73ac93ec.png';
import { useToast } from '@/hooks/use-toast';

export default function Blog() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const { toast } = useToast();

  const blogPosts = [
   {
      title: "AutoGen: Orchestrating the Future with Multi-Agent AI Systems (A Microsoft Framework)",
      excerpt: "Explore AutoGen, Microsoft’s open-source framework for collaborative AI agents. See how its flexible agents enable tasks from coding to research automation with practical Python examples.",
      category: "AI",
      readTime: "8 min read",
      publishDate: "Aug 15, 2025",
      image: aiImage,
      slug: "autogen-ai-agents"
    },
    {
      title: "Building Your First MVP: A Complete Guide",
      excerpt: "Learn the essential steps to build and launch a minimum viable product that resonates with your target audience. We cover everything from ideation and validation to development and launch strategies that drive sustainable growth.",
      category: "MVP",
      readTime: "12 min read",
      publishDate: "Dec 10, 2024",
      image: mvpImage,
      slug: "building-first-mvp"
    },
    {
      title: "Digital Marketing Strategies for Tech Startups",
      excerpt: "Discover proven marketing strategies that help tech startups scale efficiently and build sustainable customer acquisition channels. Learn from successful case studies and avoid common pitfalls in digital marketing.",
      category: "Marketing",
      readTime: "6 min read",
      publishDate: "Dec 5, 2024",
      image: marketingImage,
      slug: "digital-marketing-tech-startups"
    },
    {
      title: "LangChain: Building and Deploying Advanced LLM Applications",
      excerpt: "A comprehensive guide to leveraging LangChain for developing, deploying, and scaling LLM-powered applications. Learn about chaining prompts, integrating tools, orchestrating workflows, and best practices for reliable AI solutions.",
      category: "AI",
      readTime: "15 min read",
      publishDate: "Oct 20, 2025",
      image: langchainImage, // replace with your LangChain image import
      slug: "langchain-llm-apps"
    },
    {
      title: "Customer Validation Techniques for Product Managers",
      excerpt: "Master the art of customer validation to build products people actually want. Learn interview techniques, survey design, and validation frameworks used by successful product teams.",
      category: "MVP",
      readTime: "10 min read",
      publishDate: "Nov 20, 2024",
      image: mvpImage,
      slug: "customer-validation-techniques"
    },
    {
      title: "Growth Hacking Tactics That Actually Work",
      excerpt: "Cut through the noise and discover growth hacking tactics that deliver real results. Based on data from 100+ startups, learn what works and what doesn't in modern growth marketing.",
      category: "Marketing",
      readTime: "9 min read",
      publishDate: "Nov 15, 2024",
      image: marketingImage,
      slug: "growth-hacking-tactics"
    }
  ];

  const categories = ['All', 'AI', 'MVP', 'Marketing'];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: newsletterEmail }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.success) {
        toast({
          title: "Thanks for subscribing!",
          description: data.message || "You'll receive our latest blog posts and insights.",
        });
        setNewsletterEmail('');
      } else {
        throw new Error(data.error || 'Failed to subscribe');
      }
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      toast({
        title: "Subscription failed",
        description: error.message || 'Please try again later.',
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen bg-background pt-16">
      {/* Header */}
      <section className="py-16 bg-gradient-to-br from-background via-muted/5 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
              Our Blog
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Insights, tutorials, and thought leadership on AI, product development, and digital transformation
            </p>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between max-w-4xl mx-auto">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-glass-primary dark:bg-glass-dark-primary backdrop-blur-lg border-glass-border dark:border-glass-dark-border"
                data-testid="input-search-blog"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    selectedCategory === category
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-glass-primary dark:bg-glass-dark-primary backdrop-blur-lg border border-glass-border dark:border-glass-dark-border text-foreground hover-elevate'
                  }`}
                  data-testid={`filter-category-${category.toLowerCase()}`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <BlogCard key={post.slug} {...post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-lg text-muted-foreground">
                No articles found matching your search criteria.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 bg-gradient-to-br from-muted/10 via-background to-muted/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-display font-bold text-foreground mb-4">
            Stay Updated
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Get the latest insights on AI, product development, and digital transformation delivered to your inbox.
          </p>
          <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              className="bg-glass-primary dark:bg-glass-dark-primary backdrop-blur-lg border-glass-border dark:border-glass-dark-border"
              data-testid="input-newsletter-email"
              required
            />
            <button type="submit" className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover-elevate transition-all duration-200 whitespace-nowrap" data-testid="button-subscribe-newsletter">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}