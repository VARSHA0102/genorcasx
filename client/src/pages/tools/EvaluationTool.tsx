import SingleToolInterface from '@/components/SingleToolInterface';
import { Target } from 'lucide-react';

export default function EvaluationTool() {
  return (
    <SingleToolInterface
      title="Evaluation Tool"
      description="Comprehensive evaluation suite for AI model responses with advanced metrics including readability, similarity, and performance analysis."
      icon={<Target className="h-8 w-8" />}
      category="Evaluation"
      inputs={[
        { 
          name: "model_responses", 
          type: "textarea", 
          placeholder: "Enter model responses (one per line)...", 
          required: true,
          description: "AI model responses to evaluate, separated by new lines"
        },
        { 
          name: "ground_truth", 
          type: "textarea", 
          placeholder: "Expected responses (optional, one per line)...", 
          required: false,
          description: "Reference/expected responses for similarity comparison"
        },
        { 
          name: "metrics", 
          type: "text", 
          placeholder: "basic", 
          required: false,
          description: "Evaluation metrics to use (basic, advanced, custom)"
        }
      ]}
      features={[
        "Jaccard similarity analysis for response comparison",
        "Readability scoring with grade-level assessment",
        "Response consistency and coherence metrics",
        "Ground truth comparison when available",
        "Comprehensive statistical analysis",
        "Word frequency and uniqueness analysis",
        "Sentence complexity evaluation",
        "Overall performance scoring system"
      ]}
      examples={[
        {
          title: "Model Comparison",
          description: "Compare outputs from different AI models to determine which performs better for your use case."
        },
        {
          title: "Response Quality Assessment",
          description: "Evaluate chatbot or AI assistant responses for consistency, relevance, and readability."
        },
        {
          title: "Content Generation Analysis",
          description: "Assess the quality of AI-generated content like articles, summaries, or creative writing."
        }
      ]}
    />
  );
}
