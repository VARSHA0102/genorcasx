import SingleToolInterface from '@/components/SingleToolInterface';
import { Sparkles } from 'lucide-react';

export default function EmbeddingTool() {
  return (
    <SingleToolInterface
      title="Embedding Tool"
      description="Generate high-dimensional vector embeddings for semantic analysis, similarity search, and advanced AI applications."
      icon={<Sparkles className="h-8 w-8" />}
      category="Embeddings"
      inputs={[
        { 
          name: "text", 
          type: "textarea", 
          placeholder: "Enter text to embed...", 
          required: true,
          description: "Text content to convert into vector embeddings"
        },
        { 
          name: "model", 
          type: "text", 
          placeholder: "text-embedding-3-small", 
          required: true,
          description: "Embedding model to use (e.g., text-embedding-3-small or text-embedding-3-large)"
        },
        { 
          name: "apikey", 
          type: "password", 
          placeholder: "Enter your OpenAI API key...", 
          required: true,
          description: "Your OpenAI API key used for embedding generation"
        },
        { 
          name: "dimensions", 
          type: "number", 
          placeholder: "1536 (optional)", 
          required: false,
          description: "Number of dimensions for the output vector (optional for OpenAI models)"
        }
      ]}
      features={[
        "Generate vector embeddings using OpenAI’s embedding models",
        "Configurable model and optional dimensionality",
        "Secure API key input with hidden entry",
        "Semantic vector generation for similarity search",
        "Supports semantic clustering, classification, and retrieval",
        "Outputs normalized embedding statistics and metadata",
        "Compatible with vector databases (Pinecone, FAISS, Chroma)",
        "Optional demo mode with sample embeddings"
      ]}
      examples={[
        {
          title: "Semantic Search",
          description: "Generate embeddings for documents or queries to enable semantic search and content matching."
        },
        {
          title: "Content Clustering",
          description: "Use embeddings to group related text content based on semantic similarity."
        },
        {
          title: "Recommendation Systems",
          description: "Create content or product recommendations by comparing vector embeddings for similarity."
        }
      ]}
    />
  );
}
