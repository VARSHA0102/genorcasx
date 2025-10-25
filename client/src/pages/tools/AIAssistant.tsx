import SingleToolInterface from '@/components/SingleToolInterface';
import { MessageSquare } from 'lucide-react';

export default function AIAssistant() {
  return (
    <SingleToolInterface
      title="AI Assistant"
      description="Engage with powerful AI models through Groq's lightning-fast inference. Perfect for conversations, Q&A, and content generation."
      icon={<MessageSquare className="h-8 w-8" />}
      category="Chat"
      inputs={[
        { 
          name: "groq_api_key", 
          type: "text", 
          placeholder: "Your Groq API key...", 
          required: true,
          description: "Get your free API key from console.groq.com"
        },
        { 
          name: "message", 
          type: "textarea", 
          placeholder: "Ask me anything...", 
          required: true,
          description: "Your question or prompt for the AI assistant"
        },
        { 
          name: "model", 
          type: "text", 
          placeholder: "llama-3.1-8b-instant", 
          required: false,
          description: "Groq model to use (default: llama-3.1-8b-instant)"
        }
      ]}
      features={[
        "Groq LLaMA 3.1 integration with sub-second responses",
        "Lightning-fast inference for real-time conversations", 
        "Token usage tracking for cost optimization",
        "Custom model selection for different use cases",
        "Conversation context preservation",
        "Professional system prompting",
        "Error handling and retry logic",
        "Detailed response metadata including finish reasons"
      ]}
      examples={[
        {
          title: "Content Generation",
          description: "Create blog posts, articles, marketing copy, or any written content with AI assistance."
        },
        {
          title: "Code Assistance",
          description: "Get help with programming questions, code reviews, debugging, and algorithm explanations."
        },
        {
          title: "Research & Analysis",
          description: "Analyze data, summarize documents, research topics, and get insights on complex subjects."
        }
      ]}
    />
  );
}
