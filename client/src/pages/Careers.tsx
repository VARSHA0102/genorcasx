import GlassCard from '@/components/GlassCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock, Users, Briefcase, ArrowRight, Heart, Zap, Globe } from 'lucide-react';

export default function Careers() {
const openPositions = [
{
  title: "Full Stack Developer",
  department: "Engineering",
  location: "Chennai",
  type: "Full-time",
  description: "Design and develop scalable web applications using modern frameworks and technologies. Collaborate across teams to deliver seamless front-end and back-end solutions.",
  isClosed: true,
},
{
  title: "Project Manager",
  department: "Operations",
  location: "Chennai",
  type: "Full-time",
  description: "Oversee end-to-end project execution, ensuring timely delivery and alignment with strategic goals. Coordinate cross-functional teams and manage resources efficiently.",
  isClosed: true,
},
{
  title: "AI Engineer",
  department: "Engineering",
  location: "Chennai",
  type: "Full-time",
  description: "Develop and deploy advanced AI models and automation systems. Collaborate with data scientists and software engineers to implement intelligent, production-ready solutions.",
  isClosed: true,
},

  // add more positions following the same pattern
];


  const benefits = [
    {
      icon: <Heart className="h-6 w-6" />,
      title: "Health & Wellness",
      description: "Comprehensive health coverage, mental health support, and wellness programs"
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Growth & Learning",
      description: "Conference attendance, courses, certifications, and continuous learning opportunities"
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: "Remote First",
      description: "Work from anywhere with flexible hours and a focus on work-life balance"
    }
  ];

  return (
    <div className="min-h-screen bg-background pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-muted/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="outline" className="text-primary border-primary/20 mb-6">
            Join Our Team
          </Badge>
          <h1 className="text-4xl md:text-6xl font-display font-bold text-foreground mb-6">
            Shape the Future of
            <span className="text-transparent bg-gradient-to-r from-primary to-blue-600 bg-clip-text"> AI Innovation</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Join a team of passionate AI researchers, engineers, and innovators working to solve 
            the world's most challenging problems with artificial intelligence.
          </p>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold text-foreground mb-4">Why Work With Us?</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <GlassCard key={index} className="text-center p-6 hover-elevate">
                <div className="p-3 rounded-full bg-primary/10 text-primary w-fit mx-auto mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">{benefit.description}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-display font-bold text-foreground mb-8 text-center">Open Positions</h2>
          <div className="space-y-6">
            {/* Assume openPositions array now includes isClosed boolean */}

{openPositions.map((position, index) => {
  const isClosed = position.isClosed || false; // fallback to false
  return (
    <GlassCard key={index} className="p-6 hover-elevate">
      <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-foreground">{position.title}</h3>
          <p className="text-muted-foreground text-sm">{position.description}</p>
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <span className="flex items-center"><Briefcase className="h-4 w-4 mr-1" />{position.department}</span>
            <span className="flex items-center"><MapPin className="h-4 w-4 mr-1" />{position.location}</span>
            <span className="flex items-center"><Clock className="h-4 w-4 mr-1" />{position.type}</span>
          </div>
        </div>
        <Button
          className={`shrink-0 transition-opacity duration-300 ${
            isClosed ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'
          }`}
          disabled={isClosed}
          aria-disabled={isClosed}
          title={isClosed ? "This position is currently closed." : undefined}
        >
          {isClosed ? "Position Closed" : "Apply Now"}
          {!isClosed && <ArrowRight className="ml-2 h-4 w-4" />}
        </Button>
      </div>
    </GlassCard>
  );
})}

          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <GlassCard className="p-12">
            <h2 className="text-3xl font-display font-bold text-foreground mb-4">Don't See Your Role?</h2>
            <p className="text-muted-foreground mb-8">We're always looking for talented individuals. Send us your resume and let's talk!</p>
            <Button size="lg">Get In Touch</Button>
          </GlassCard>
        </div>
      </section>
    </div>
  );
}
