import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Users, Clock } from 'lucide-react';
import { Link } from 'wouter';

interface ToolCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  category: string;
  slug: string;
  features: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedTime: string;
}

export default function ToolCard({ 
  title, 
  description, 
  icon, 
  category, 
  slug,
  features,
  difficulty,
  estimatedTime
}: ToolCardProps) {
  const getDifficultyColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Intermediate': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'Advanced': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const isEvaluationTool = title.toLowerCase() === 'evaluation tool';

  return (
    <div className="group relative overflow-hidden rounded-2xl bg-glass-primary dark:bg-glass-dark-primary backdrop-blur-lg border border-glass-border dark:border-glass-dark-border transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-primary/10">
      {/* Gradient overlay for hover effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Content */}
      <div className="relative p-6 h-full flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors duration-300">
              {icon}
            </div>
            <div>
              <h3 className="text-xl font-display font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                {title}
              </h3>
              <Badge variant="outline" className="mt-1 text-xs">
                {category}
              </Badge>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-grow">
          {description}
        </p>

        {/* Features */}
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-foreground mb-2">Key Features:</h4>
          <ul className="space-y-1">
            {features.slice(0, 3).map((feature, index) => (
              <li key={index} className="flex items-center text-xs text-muted-foreground">
                <div className="w-1 h-1 bg-primary rounded-full mr-2" />
                {feature}
              </li>
            ))}
          </ul>
        </div>

        {/* Meta info */}
        <div className="flex items-center justify-between mb-6 text-xs text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Users className="h-3 w-3" />
            <Badge className={`text-xs ${getDifficultyColor(difficulty)}`}>
              {difficulty}
            </Badge>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="h-3 w-3" />
            <span>{estimatedTime}</span>
          </div>
        </div>

        {/* Action button */}
        {isEvaluationTool ? (
          <Button 
            className="w-full opacity-60 cursor-not-allowed"
            variant="outline"
            disabled
          >
            Coming Soon
          </Button>
        ) : (
          <Link href={`/tools/${slug}`}>
            <Button 
              className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300"
              variant="outline"
            >
              Use Tool
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}
