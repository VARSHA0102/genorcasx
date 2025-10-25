import { HeroGeometric } from '@/components/ui/shape-landing-hero';
import GlassCard from '@/components/GlassCard';
import ScrollStats from '@/components/ScrollStats';
import FeatureShowcase from '@/components/FeatureShowcase';
import { Button } from '@/components/ui/button';
import {X, Brain, Zap, Shield, Rocket, ArrowRight, Users, Award, TrendingUp,Globe, Code2 } from 'lucide-react';
import { useTheme } from '@/hooks/use-theme';
import { useLocation } from 'wouter';
import { Global } from 'recharts';
import aiDev from '@assets/generated_images/AI_dev.jpg';
import AI_tools_suitle from '@assets/generated_images/AI_tool_suitle.jpg';
import webApp from '@assets/generated_images/webApp.jpg';
import softwareDev from '@assets/generated_images/softwareDev.png';
import { useState } from 'react';


export default function Home() {
const [showModal, setShowModal] = useState(false);
const [activeSection, setActiveSection] = useState<'aiDev' | 'aiToolsSuitle' | 'webApp' | 'softwareDev'>('aiDev');
const startYear = 2023;
const currentYear = new Date().getFullYear();
const experienceYears = currentYear - startYear;
  const { theme } = useTheme();
  const [, setLocation] = useLocation();
  const services = [
    {
      icon: <Brain className="h-8 w-8" />,
      title: "AI Development",
      description: "Custom AI solutions tailored to your business needs, from machine learning models to intelligent automation systems.",
       onClick: () => {
      setActiveSection('aiDev');
      setShowModal(true);
    },

    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "AI Tools Suite",
      description: "Access our comprehensive toolkit including tokenization, embeddings, chunking, and RAG implementations.",
      onClick: () => {
      setActiveSection('aiToolsSuitle');
      setShowModal(true);
    },

    },
    {
    icon: <Globe className="h-8 w-8" />,
    title: "Web Application",
    description: "Robust, scalable web solutions designed for performance, security, and seamless user experience.",
    onClick: () => {
      setActiveSection('webApp');
      setShowModal(true);
    },
  },
  {
    icon: <Code2 className="h-8 w-8" />,
    title: "Software Development",
    description: "End-to-end software solutions built with cutting-edge technology, ensuring reliability, scalability, and innovation.",
    onClick: () => {
      setActiveSection('softwareDev');
      setShowModal(true);
    },
  }
  ];

  const testimonials = [
    {
      quote: "GenOrcasX transformed our data processing capabilities. Their AI tools increased our efficiency by 300%.",
      author: "Mr. Dinakar",
      role: "CTO, LuminaCortex.",
      company: "LuminaCortex"
    },
    {
      quote: "The RAG implementation was flawless. We saw immediate improvements in our customer support automation.",
      author: "Ms. Sesha Shivanya",
      role: "Head of Engineering, Zefy tech Bee",
      company: "Zefy tech Bee"
    },
    {
      quote: "Outstanding AI consultation and development. The team's expertise in machine learning is unmatched.",
      author: "Mr. Ashwin",
      role: "CEO, CerebrIQ Labs",
      company: "CerebrIQ Labs "
    }
  ];

  return (
    <div className="min-h-screen bg-background pt-8">
      {/* Hero Section */}
      <HeroGeometric 
        badge="AI Innovation"
        title1="Next-Gen AI"
        title2="Solutions"
        description="Unlock the power of artificial intelligence with GenOrcasX's comprehensive suite of AI tools and enterprise solutions. Transform your business with cutting-edge technology."
        isDark={theme === 'dark'}
      />

      {/* Stats Section */}
      <ScrollStats />

      {/* Services Section */}
      <section className="py-24 bg-gradient-to-br from-background via-muted/5 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Our AI Solutions
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive artificial intelligence services designed to accelerate your digital transformation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
{services.map((service, index) => (
  <div key={index} onClick={service.onClick} className="cursor-pointer">
    <GlassCard hover className="text-center h-full">
      <div className="space-y-4">
        <div className="p-3 rounded-lg bg-primary/10 text-primary w-fit mx-auto">
          {service.icon}
        </div>
        <h3 className="text-xl font-display font-semibold text-foreground">
          {service.title}
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed">
          {service.description}
        </p>
      </div>
    </GlassCard>
  </div>
))}
{showModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-8">
    <div className="relative bg-background rounded-xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 transform transition-all duration-300 ease-out translate-y-0 opacity-100">
      
      {/* Close Button */}
      <button
        onClick={() => setShowModal(false)}
        className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
        aria-label="Close"
      >
        <X className="h-5 w-5" />
      </button>

      {/* Modal Content */}
      <div className="space-y-8 text-muted-foreground text-[15px] leading-relaxed">
        {activeSection === 'aiDev' && (
          <>
            <h2 className="text-xl font-display font-bold">AI Development</h2>
            <p>
              AI Development is the process of designing, training, and deploying intelligent systems capable of learning, reasoning, and adapting like humans. It involves building models using machine learning, deep learning, and natural language processing to enable automation, prediction, and decision-making across various domains. Core AI development focuses on transforming raw data into actionable intelligence through advanced algorithms, neural networks, and generative architectures.
            </p>
            <div className="mt-4">
              <img src={aiDev} alt="AI Development" className="w-full rounded-md shadow-md" />
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              Source:{' '}
              <a
                href="https://www.excellentwebworld.com/ai-development-process/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-primary"
              >
                Excellent Web World
              </a>
            </p>
            <h2 className="text-xl font-display font-bold pt-4">AI Development at GenOrcasX</h2>
            <p>
              At GenOrcasX, we specialize in crafting end-to-end AI solutions powered by autonomous AI agents. Our expertise spans across building intelligent systems that can perceive, analyze, and act dynamically using real-time data and contextual understanding. From generative AI to multi-agent frameworks, we develop adaptive AI systems tailored to solve complex business challenges. The GenOrcasX team has the capability to engineer any AI development—from concept to deployment—using state-of-the-art AI agents that bring automation, intelligence, and scalability to every solution.
            </p>
          </>
        )}

        {activeSection === 'aiToolsSuitle' && (
          <>
            <h2 className="text-xl font-display font-bold">AI Tools Suite</h2>
            <div className="mt-4">
              <img src={AI_tools_suitle} alt="AI Tools Suite" className="w-full rounded-md shadow-md" />
            </div>
            <p>
              An AI Tool Suite is an integrated ecosystem of frameworks, models, and automation tools designed to build, train, and manage intelligent applications. These suites combine the power of machine learning, natural language understanding, computer vision, and data orchestration to accelerate AI-driven innovation. Core AI tool suites enable developers to create, fine-tune, and deploy scalable solutions that leverage neural networks, generative models, and intelligent APIs for end-to-end automation and insight generation.

            </p>
            
            <h2 className="text-xl font-display font-bold pt-4">AI Tools Suite at GenOrcasX</h2>
            <p>
              At GenOrcasX, we design and deploy complete AI Tool Suites tailored for diverse industries and operational needs. Our expert team not only develops custom AI tools but also integrates and utilizes any advanced AI framework available in the ecosystem. From autonomous workflow systems to generative design platforms, GenOrcasX engineers AI toolchains that streamline data processing, enhance decision-making, and power intelligent automation. With our deep expertise, GenOrcasX can create, deploy, and operationalize any AI tool suite using cutting-edge AI architectures and adaptive AI agents.
            </p>
          </>
        )}
        {activeSection === 'webApp' && (
          <>
            <h2 className="text-xl font-display font-bold">Web Application</h2>
            <div className="mt-4">
              <img src={webApp} alt="AI Tools Suite" className="w-full rounded-md shadow-md" />
            </div>
            <p>
              A Web Application is an intelligent digital platform that operates through web technologies, enabling seamless interaction between users and data-driven systems. Core web applications combine scalable architecture, responsive design, and real-time processing to deliver secure, high-performance solutions accessible from any device. In the AI era, web applications evolve beyond static interfaces — they become adaptive systems capable of learning user behavior, automating workflows, and generating predictive insights through integrated AI capabilities.

            </p>
            
            <h2 className="text-xl font-display font-bold pt-4">Web Application at GenOrcasX</h2>
            <p>

At GenOrcasX, we develop advanced Web Applications that merge AI intelligence with robust web engineering. Our expert team builds dynamic platforms capable of integrating AI Assistants and AI Agents directly into the application ecosystem, enabling automation, personalized interactions, and intelligent decision-making. From AI-powered dashboards to autonomous enterprise portals, GenOrcasX engineers web systems that think, adapt, and evolve. With our deep AI integration expertise, GenOrcasX can architect and deploy any web application enhanced by intelligent agents for next-generation digital experiences.
            </p>
          </>
        )}
        {activeSection === 'softwareDev' && (
          <>
            <h2 className="text-xl font-display font-bold">Software Development</h2>
            <div className="mt-4">
              <img src={softwareDev} alt="AI Tools Suite" className="w-full rounded-md shadow-md" />
            </div>
            <p>
              Software Development is the engineering process of designing, building, and maintaining intelligent systems that solve complex business and operational challenges. It combines structured programming, system architecture, and algorithmic intelligence to create scalable and efficient digital solutions. In the modern AI ecosystem, software development extends beyond traditional coding — it fuses automation, predictive modeling, and adaptive learning to deliver self-evolving applications powered by artificial intelligence.

            </p>
            
            <h2 className="text-xl font-display font-bold pt-4">Software Development at GenOrcasX</h2>
            <p>At GenOrcasX, we engineer intelligent Software Solutions that blend deep AI capabilities with robust software architecture. Our expert team can develop and deploy any AI-driven software, integrating AI Assistants and AI Agents that enhance automation, learning, and decision-making within the system. From enterprise-level automation tools to generative intelligence platforms, GenOrcasX creates adaptive, self-improving software that evolves with data and user interaction. With our advanced AI integration expertise, GenOrcasX transforms traditional software into smart, autonomous, and intelligent ecosystems.
            </p>
          </>
        )}
      </div>
    </div>
  </div>
)}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" onClick={() => window.open('/consulting', '_blank')} data-testid="button-view-all-services">
              View All Services
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Feature Showcase */}
      <FeatureShowcase />

      {/* Features Section */}
      <section className="py-24 bg-gradient-to-br from-muted/10 via-background to-muted/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
                  Why Choose GenOrcasX?
                </h2>
                <p className="text-xl text-muted-foreground">
                  We combine cutting-edge AI research with practical business applications to deliver solutions that drive real results.
                </p>
              </div>

              <div className="space-y-6">
                {[
                  {
    icon: <Users className="h-6 w-6" />,
    title: "Expert Team",
    description:`${experienceYears}+ years of experience with in-depth AI expertise, innovation-driven mindset, and continuous alignment with evolving AI trends`,
  },
  {
    icon: <Award className="h-6 w-6" />,
    title: "Proven Results",
    description: "Successfully delivered AI projects across diverse industries with measurable impact",
  },
  {
    icon: <TrendingUp className="h-6 w-6" />,
    title: "Scalable Solutions",
    description: "Built for growth with enterprise-grade architecture, performance, and reliability",
  },
                ].map((feature, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary mt-1">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">{feature.title}</h3>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <GlassCard className="p-8">
              <div className="text-center space-y-6">
                <h3 className="text-2xl font-display font-bold text-foreground">
                  Ready to Get Started?
                </h3>
                <p className="text-muted-foreground">
                  Book a free consultation to discuss your AI needs and explore how we can help transform your business.
                </p>
                <div className="space-y-4">
                  <Button size="lg" onClick={() => setLocation('/contact')} className="w-full" data-testid="button-book-consultation">
                    Book Free Consultation
                  </Button>
                  <Button variant="outline" size="lg" onClick={() => window.open('/tools', '_blank')} className="w-full" data-testid="button-explore-tools-cta">
                    Explore AI Tools
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              What Our Clients Say
            </h2>
            <p className="text-xl text-muted-foreground">
              Trusted by leading companies worldwide
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <GlassCard key={index} className="h-full">
                <div className="space-y-4">
                  <p className="text-muted-foreground italic leading-relaxed">
                    "{testimonial.quote}"
                  </p>
                  <div>
                    <div className="font-semibold text-foreground">{testimonial.author}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    <div className="text-xs text-primary font-medium">{testimonial.company}</div>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}