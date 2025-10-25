import { Github, Linkedin, Twitter } from 'lucide-react';
import GlassCard from './GlassCard';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

interface TeamMemberProps {
  name: string;
  role: string;
  bio: string;
  image: string;
  social?: {
    linkedin?: string;
    github?: string;
    twitter?: string;
  };
}

export default function TeamMember({ name, role, bio, image, social }: TeamMemberProps) {
  const handleSocialClick = (platform: string, url?: string) => {
    console.log(`${platform} clicked for ${name}`);
    if (url) {
      window.open(url, '_blank');
    }
  };

  return (
    <GlassCard hover className="text-center group">
      <div className="space-y-4">
        <Avatar className="w-24 h-24 mx-auto ring-4 ring-primary/20 group-hover:ring-primary/40 transition-all duration-300">
          <AvatarImage src={image} alt={name} />
          <AvatarFallback className="text-lg font-semibold bg-primary/10 text-primary">
            {name.split(' ').map(n => n[0]).join('')}
          </AvatarFallback>
        </Avatar>

        <div>
          <h3 className="text-xl font-display font-semibold text-foreground" data-testid={`text-name-${name.toLowerCase().replace(' ', '-')}`}>
            {name}
          </h3>
          <p className="text-primary font-medium" data-testid={`text-role-${name.toLowerCase().replace(' ', '-')}`}>
            {role}
          </p>
        </div>

        <p className="text-muted-foreground text-sm leading-relaxed" data-testid={`text-bio-${name.toLowerCase().replace(' ', '-')}`}>
          {bio}
        </p>

        {social && (
          <div className="flex justify-center space-x-2 pt-2">
            {social.linkedin && (
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-primary"
                onClick={() => handleSocialClick('LinkedIn', social.linkedin)}
                data-testid={`button-linkedin-${name.toLowerCase().replace(' ', '-')}`}
              >
                <Linkedin className="h-4 w-4" />
              </Button>
            )}
            {social.github && (
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-primary"
                onClick={() => handleSocialClick('GitHub', social.github)}
                data-testid={`button-github-${name.toLowerCase().replace(' ', '-')}`}
              >
                <Github className="h-4 w-4" />
              </Button>
            )}
            {social.twitter && (
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-primary"
                onClick={() => handleSocialClick('Twitter', social.twitter)}
                data-testid={`button-twitter-${name.toLowerCase().replace(' ', '-')}`}
              >
                <Twitter className="h-4 w-4" />
              </Button>
            )}
          </div>
        )}
      </div>
    </GlassCard>
  );
}