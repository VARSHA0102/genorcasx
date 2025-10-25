import AITool from '../AITool';
import { Brain, Scissors, MessageSquare, Database, BarChart3, Zap } from 'lucide-react';
import { Toaster } from '@/components/ui/toaster';

export default function AIToolExample() {
  const mockTools = [
    {
      title: "Tokenization Tool",
      description: "Break down text into individual tokens for natural language processing tasks.",
      icon: <Scissors className="h-5 w-5" />,
      category: "NLP",
      inputs: [
        { name: "text", type: "textarea" as const, placeholder: "Enter text to tokenize...", required: true },
        { name: "language", type: "text" as const, placeholder: "Language (e.g., English)", required: false }
      ]
    },
    {
      title: "AI Assistant",
      description: "Chat with our AI assistant powered by state-of-the-art language models.",
      icon: <MessageSquare className="h-5 w-5" />,
      category: "Chat",
      inputs: [
        { name: "groq_api_key", type: "text" as const, placeholder: "Your Groq API key...", required: true },
        { name: "message", type: "textarea" as const, placeholder: "Ask me anything...", required: true }
      ]
    },
    {
      title: "Embedding Tool",
      description: "Convert text into high-dimensional vector embeddings for semantic analysis.",
      icon: <Zap className="h-5 w-5" />,
      category: "Embeddings",
      inputs: [
        { name: "text", type: "textarea" as const, placeholder: "Text to embed...", required: true },
        { name: "model", type: "text" as const, placeholder: "Embedding model (optional)", required: false }
      ]
    }
  ];

  return (
    <div className="p-8 bg-gradient-to-br from-background to-muted/20 min-h-screen">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {mockTools.map((tool) => (
          <AITool key={tool.title} {...tool} />
        ))}
      </div>
      <Toaster />
    </div>
  );
}