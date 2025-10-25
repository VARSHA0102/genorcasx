import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

interface StatItemProps {
  value: string;
  label: string;
  duration?: number;
}

function StatItem({ value, label, duration = 2 }: StatItemProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [displayValue, setDisplayValue] = useState('0');

  useEffect(() => {
    if (isInView) {
      const numericValue = parseInt(value.replace(/\D/g, ''));
      if (numericValue && numericValue > 0) {
        let startTime: number;
        const animate = (currentTime: number) => {
          if (!startTime) startTime = currentTime;
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / (duration * 1000), 1);
          
          const current = Math.floor(progress * numericValue);
          setDisplayValue(value.replace(numericValue.toString(), current.toString()));
          
          if (progress < 1) {
            requestAnimationFrame(animate);
          }
        };
        requestAnimationFrame(animate);
      } else {
        setDisplayValue(value);
      }
    }
  }, [isInView, value, duration]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="text-center"
    >
      <div className="text-4xl md:text-5xl font-display font-bold text-primary mb-2">
        {displayValue}
      </div>
      <div className="text-muted-foreground text-lg">{label}</div>
    </motion.div>
  );
}

export default function ScrollStats() {
  const stats = [
    { value: '7+', label: 'AI Projects Delivered' },
    { value: '4+', label: 'Enterprise Clients' },
    { value: '99%', label: 'Client Satisfaction' },
    { value: '24/7', label: 'Support Available' },
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-background via-primary/5 to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            Trusted by Industry Leaders
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Experience the impact of cutting-edge AI solutions and take your operations to the next level.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <StatItem key={index} {...stat} duration={2 + index * 0.2} />
          ))}
        </div>
      </div>
    </section>
  );
}