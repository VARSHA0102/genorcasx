import SingleToolInterface from '@/components/SingleToolInterface';
import { Brain } from 'lucide-react';

export default function RAGTool() {
  return (
    <SingleToolInterface
      title="RAG Tool"
      description="Advanced Retrieval-Augmented Generation with multi-format document support. Upload Word docs, and get intelligent answers."
      icon={<Brain className="h-8 w-8" />}
      category="RAG"
      inputs={[
        { 
          name: "groq_api_key", 
          type: "text", 
          placeholder: "Your Groq API key...", 
          required: true,
          description: "Get your free API key from console.groq.com"
        },
        { 
          name: "openai_embed_key", 
          type: "text", 
          placeholder: "OpenAI API key (optional)...", 
          required: false,
          description: "Optional: For real embeddings (uses demo mode without)"
        },
        { 
          name: "file", 
          type: "file", 
          placeholder: "Upload document...", 
          required: true,
          description: "Word document, or text file to analyze"
        },
        { 
          name: "query", 
          type: "textarea", 
          placeholder: "Ask a question about your document...", 
          required: true,
          description: "Your question about the uploaded document"
        }
      ]}
      features={[
        "Multi-format file support (Word, Text, Markdown)",
        "Intelligent document parsing and text extraction",
        "Context-aware chunking for optimal retrieval",
        "Groq-powered AI responses with document context",
        "Document analysis and metadata extraction",
        "Relevant chunk identification and ranking",
        "Token usage tracking for cost optimization",
        "Automatic file cleanup for security"
      ]}
      examples={[
        {
          title: "Document Q&A",
          description: "Upload research papers, reports, or manuals and ask specific questions about their content."
        },
        {
          title: "Contract Analysis",
          description: "Analyze legal documents, contracts, or agreements to extract key information and terms."
        },
        {
          title: "Knowledge Base Search",
          description: "Turn any document into a searchable knowledge base for quick information retrieval."
        }
      ]}
    />
  );
}
