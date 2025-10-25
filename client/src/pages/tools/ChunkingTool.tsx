import SingleToolInterface from '@/components/SingleToolInterface';
import { Layers } from 'lucide-react';

export default function ChunkingTool() {
  return (
    <SingleToolInterface
      title="Chunking Tool"
      description="Intelligently split large documents into optimally-sized chunks with smart word boundary detection and customizable overlap."
      icon={<Layers className="h-8 w-8" />}
      category="Text Processing"
      inputs={[
        { 
          name: "text", 
          type: "textarea", 
          placeholder: "Enter text to chunk...", 
          required: true,
          description: "Large document or text to be split into smaller chunks"
        },
        { 
          name: "chunk_size", 
          type: "number", 
          placeholder: "1000", 
          required: true,
          description: "Target size for each chunk (in characters)"
        },
        { 
          name: "overlap", 
          type: "number", 
          placeholder: "200", 
          required: false,
          description: "Number of characters to overlap between chunks"
        }
      ]}
      features={[
        "Smart word boundary detection to avoid breaking words",
        "Customizable chunk size for different use cases",
        "Configurable overlap between chunks for context preservation",
        "RAG-optimized chunking for retrieval systems",
        "Detailed statistics including coverage percentage",
        "Chunk indexing with start positions",
        "Word count analysis per chunk",
        "Optimal for document processing pipelines"
      ]}
      examples={[
        {
          title: "RAG System Preparation",
          description: "Prepare documents for retrieval-augmented generation by creating searchable chunks with context overlap."
        },
        {
          title: "Large Document Processing",
          description: "Break down research papers, books, or reports into manageable sections for analysis."
        },
        {
          title: "API Text Processing",
          description: "Split long content to fit within API token limits while preserving context between sections."
        }
      ]}
    />
  );
}
