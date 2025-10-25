import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import GlassCard from './GlassCard';
import { useLocation } from 'wouter';

export default function BlogCard({
  title,
  excerpt,
  category,
  readTime,
  publishDate,
  image,
  slug,
}: BlogCardProps) {
  const [, setLocation] = useLocation();

  // Titles to freeze
  const frozenTitles = [
    "Growth Hacking Tactics That Actually Work",
    "Customer Validation Techniques for Product Managers",
    "Digital Marketing Strategies for Tech Startups",
    "Building Your First MVP: A Complete Guide",
  ];

  const isFrozen = frozenTitles.includes(title);

  const handleReadMore = () => {
    if (!isFrozen) setLocation(`/blog/${slug}`);
  };

  return (
    <GlassCard
      hover={!isFrozen}
      className={`h-full flex flex-col group transition-all duration-300 ${
        isFrozen ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      <div className="aspect-video rounded-lg overflow-hidden mb-4">
        <img
          src={image}
          alt={title}
          className={`w-full h-full object-cover transition-transform duration-300 ${
            !isFrozen ? "group-hover:scale-105" : ""
          }`}
        />
      </div>

      <div className="flex-1 flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <Badge
            variant="secondary"
            className="text-xs"
            data-testid={`badge-category-${slug}`}
          >
            {category}
          </Badge>
          <div className="flex items-center text-xs text-muted-foreground space-x-4">
            <div className="flex items-center space-x-1">
              <Calendar className="h-3 w-3" />
              <span data-testid={`text-date-${slug}`}>{publishDate}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="h-3 w-3" />
              <span data-testid={`text-readtime-${slug}`}>{readTime}</span>
            </div>
          </div>
        </div>

        <h3
          className="text-xl font-display font-semibold text-foreground line-clamp-2"
          data-testid={`text-title-${slug}`}
        >
          {title}
        </h3>

        <p
          className="text-muted-foreground text-sm leading-relaxed flex-1"
          data-testid={`text-excerpt-${slug}`}
        >
          {excerpt}
        </p>

        <Button
          variant="ghost"
          className={`self-start p-0 h-auto text-primary hover:text-primary/80 ${
            isFrozen ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={handleReadMore}
          data-testid={`button-read-more-${slug}`}
          disabled={isFrozen}
        >
          Read More
          <ArrowRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
    </GlassCard>
  );
}
