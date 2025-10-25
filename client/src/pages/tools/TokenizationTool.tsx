import SingleToolInterface from '@/components/SingleToolInterface';
import { Scissors } from 'lucide-react';

export default function TokenizationTool() {
  return (
    <SingleToolInterface
      title="Tokenization Tool"
      description="Break down text into individual tokens for natural language processing tasks. Powered by Groq's ultra-fast models."
      icon={<Scissors className="h-8 w-8" />}
      category="NLP"
      inputs={[
        {
          name: "text",
          type: "textarea",
          placeholder: "Enter text to tokenize...",
          required: true,
          description: "The text you want to break down into tokens"
        }
      ]}
      features={[
        "Simple input-driven tokenization",
        "Simulated tokenization using Groq’s chat models",
        "No configuration needed — just paste and go",
        "Returns structured token output and statistics",
        "Character count and word count analysis",
        "Unique token identification",
        "Average token length calculation"
      ]}
      examples={[
        {
          title: "Text Analysis",
          description: "Analyze blog posts, articles, or documents for content structure and word usage patterns."
        },
        {
          title: "NLP Preprocessing",
          description: "Prepare text data for machine learning models by converting raw text into structured tokens."
        },
        {
          title: "Content Research",
          description: "Study vocabulary usage and text complexity in different types of content."
        }
      ]}
    />
  );
}