import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Bot, Image, Activity, Cpu, BrainCircuit, RefreshCcw,Network  } from 'lucide-react';
import GlassCard from './GlassCard';

export default function FeatureShowcase() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const features = [
    {
  icon: <Bot className="h-8 w-8" />,
  title: "Agentic AI Systems",
  description: "Autonomous multi-step AI agents capable of reasoning, planning, and self-coordination across complex tasks.",
  color: "from-purple-600 to-fuchsia-500"
},
{
  icon: <Image className="h-8 w-8" />,
  title: "Multimodal & Vision-Language-Action Models",
  description: "AI that sees, speaks, and acts — integrating text, vision, audio, and motion for real-world understanding.",
  color: "from-amber-500 to-orange-500"
},
{
  icon: <Network className="h-8 w-8" />,
  title: "Physics-Informed Neural Networks",
  description: "Hybrid AI-Physics models that embed scientific laws into neural architectures for accurate, real-world predictions.",
  color: "from-sky-500 to-cyan-500"
},
{
  icon: <Cpu className="h-8 w-8" />,
  title: "Edge AI & Ultra-Low Latency Systems",
  description: "On-device intelligence optimized for speed, privacy, and real-time responsiveness without cloud dependence.",
  color: "from-green-500 to-emerald-500"
},
{
  icon: <BrainCircuit className="h-8 w-8" />,
  title: "Causal & Explainable AI",
  description: "AI that moves beyond correlation to understand cause and effect — enabling transparency and human trust.",
  color: "from-indigo-500 to-violet-500"
},
{
  icon: <RefreshCcw className="h-8 w-8" />,
  title: "Adaptive & Self-Improving AI Systems",
  description: "Continuous learning models that evolve in real time, refining performance and knowledge through feedback.",
  color: "from-red-500 to-pink-500"
}

  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section ref={ref} className="py-24 bg-gradient-to-br from-muted/5 via-background to-muted/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            Cutting-Edge AI Features
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Built with the latest advancements in artificial intelligence and machine learning
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={itemVariants}>
              <GlassCard hover className="h-full group cursor-default transition-shadow hover:shadow-lg">
                <div className="space-y-4">
                  <div className={`p-3 rounded-lg bg-gradient-to-r ${feature.color} w-fit text-white`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-display font-semibold text-foreground group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}