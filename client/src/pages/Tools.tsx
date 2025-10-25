import ToolCard from '@/components/ToolCard';
import { Brain, Scissors, MessageSquare, Database, BarChart3, Zap, Sparkles, Target, Layers } from 'lucide-react';
import { useLocation } from 'wouter';

export default function Tools() {
  const [, setLocation] = useLocation();
  const aiTools = [
    {
      title: "Tokenization Tool",
      description: "Break down text into individual tokens for natural language processing tasks. Advanced tokenization with multiple strategies and language support.",
      icon: <Scissors className="h-6 w-6" />,
      category: "NLP",
      slug: "tokenization",
      difficulty: "Beginner" as const,
      estimatedTime: "< 1 min",
      features: [
        "Multi-language support",
        "Word & sentence tokenization", 
        "Aggressive tokenization mode",
        "Detailed token statistics",
        "Character count analysis"
      ]
    },
    {
      title: "Chunking Tool",
      description: "Intelligently split large documents into optimally-sized chunks with smart word boundary detection and customizable overlap.",
      icon: <Layers className="h-6 w-6" />,
      category: "Text Processing",
      slug: "chunking",
      difficulty: "Beginner" as const,
      estimatedTime: "< 1 min",
      features: [
        "Smart word boundary detection",
        "Customizable chunk size & overlap",
        "Coverage percentage metrics",
        "RAG-optimized chunking",
        "Detailed chunk statistics"
      ]
    },
    {
      title: "AI Assistant",
      description: "Engage with powerful AI models through Groq's lightning-fast inference. Perfect for conversations, Q&A, and content generation.",
      icon: <MessageSquare className="h-6 w-6" />,
      category: "Chat",
      slug: "ai-assistant",
      difficulty: "Intermediate" as const,
      estimatedTime: "1-3 min",
      features: [
        "Groq LLaMA 3.1 integration",
        "Lightning-fast responses",
        "Token usage tracking",
        "Conversation memory",
        "Custom model selection"
      ]
    },
    {
      title: "RAG Tool",
      description: "Advanced Retrieval-Augmented Generation with multi-format document support. Upload PDFs, Word docs, and get intelligent answers.",
      icon: <Brain className="h-6 w-6" />,
      category: "RAG",
      slug: "rag",
      difficulty: "Advanced" as const,
      estimatedTime: "2-5 min",
      features: [
        "Multi-format file support (PDF, Word, Text)",
        "Intelligent document chunking",
        "Context-aware Q&A",
        "Groq-powered responses",
        "Document analysis metrics"
      ]
    },
    {
      title: "Evaluation Tool",
      description: "Comprehensive evaluation suite for AI model responses with advanced metrics including readability, similarity, and performance analysis.",
      icon: <Target className="h-6 w-6" />,
      category: "Evaluation",
      slug: "evaluation",
      difficulty: "Intermediate" as const,
      estimatedTime: "1-2 min",
      features: [
        "Jaccard similarity analysis",
        "Readability scoring",
        "Response consistency metrics",
        "Ground truth comparison",
        "Comprehensive reports"
      ]
    },
    {
      title: "Embedding Tool",
      description: "Generate high-dimensional vector embeddings for semantic analysis, similarity search, and advanced AI applications.",
      icon: <Sparkles className="h-6 w-6" />,
      category: "Embeddings",
      slug: "embeddings",
      difficulty: "Advanced" as const,
      estimatedTime: "1-2 min",
      features: [
        "High-dimensional vectors",
        "Configurable dimensions",
        "Vector magnitude analysis",
        "Semantic representation",
        "Clustering-ready output"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background pt-16">
      {/* Header */}
      <section className="py-16 bg-gradient-to-br from-background via-muted/5 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
            AI Tools Suite
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Powerful AI tools designed to accelerate your development process. From tokenization to embeddings, 
            our comprehensive toolkit has everything you need for modern AI applications.
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {['All', 'NLP', 'Chat', 'RAG', 'Evaluation', 'Embeddings', 'Text Processing'].map((category) => (
              <button
                key={category}
                className="px-4 py-2 rounded-full bg-glass-primary dark:bg-glass-dark-primary backdrop-blur-lg border border-glass-border dark:border-glass-dark-border text-sm font-medium text-foreground hover-elevate transition-all duration-200"
                data-testid={`filter-${category.toLowerCase()}`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            <div className="text-center p-6 rounded-2xl bg-glass-primary dark:bg-glass-dark-primary backdrop-blur-lg border border-glass-border dark:border-glass-dark-border">
              <div className="text-2xl font-bold text-primary mb-1">6</div>
              <div className="text-sm text-muted-foreground">AI Tools</div>
            </div>
            <div className="text-center p-6 rounded-2xl bg-glass-primary dark:bg-glass-dark-primary backdrop-blur-lg border border-glass-border dark:border-glass-dark-border">
              <div className="text-2xl font-bold text-primary mb-1">1000+</div>
              <div className="text-sm text-muted-foreground">Executions</div>
            </div>
            <div className="text-center p-6 rounded-2xl bg-glass-primary dark:bg-glass-dark-primary backdrop-blur-lg border border-glass-border dark:border-glass-dark-border">
              <div className="text-2xl font-bold text-primary mb-1">99.9%</div>
              <div className="text-sm text-muted-foreground">Uptime</div>
            </div>
            <div className="text-center p-6 rounded-2xl bg-glass-primary dark:bg-glass-dark-primary backdrop-blur-lg border border-glass-border dark:border-glass-dark-border">
              <div className="text-2xl font-bold text-primary mb-1">24/7</div>
              <div className="text-sm text-muted-foreground">Available</div>
            </div>
          </div>

          {/* Tools Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {aiTools.map((tool, index) => (
              <ToolCard 
                key={index} 
                title={tool.title}
                description={tool.description}
                icon={tool.icon}
                category={tool.category}
                slug={tool.slug}
                features={tool.features}
                difficulty={tool.difficulty}
                estimatedTime={tool.estimatedTime}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-muted/10 via-background to-muted/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-display font-bold text-foreground mb-4">
            Need Custom AI Solutions?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Our tools are just the beginning. Get in touch to discuss custom AI development for your specific needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => setLocation('/contact')} className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover-elevate transition-all duration-200" data-testid="button-contact-sales">
              Contact Sales
            </button>
            <button onClick={() => setLocation('/docs')} className="px-8 py-3 bg-glass-primary dark:bg-glass-dark-primary backdrop-blur-lg border border-glass-border dark:border-glass-dark-border rounded-lg font-medium text-foreground hover-elevate transition-all duration-200" data-testid="button-view-documentation">
              View Documentation
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}