import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Play, Copy, Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AIToolProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  inputs: Array<{
    name: string;
    type: 'text' | 'textarea' | 'number' | 'file';
    placeholder: string;
    required?: boolean;
  }>;
  category: string;
}

export default function AITool({ title, description, icon, inputs, category }: AIToolProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [inputValues, setInputValues] = useState<Record<string, string | File>>({});
  const [result, setResult] = useState<string>('');
  const { toast } = useToast();

  const handleInputChange = (name: string, value: string | File) => {
    setInputValues(prev => ({ ...prev, [name]: value }));
  };

  const handleRunTool = async () => {
    console.log(`Running ${title} with inputs:`, inputValues);
    setIsLoading(true);
    
    try {
      let response;
      let endpoint = '';
      let formData;
      
      // Determine API endpoint and prepare data based on tool type
      switch (title) {
        case "Tokenization Tool":
          endpoint = '/api/tools/tokenize';
          response = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              text: inputValues.text,
              language: inputValues.language || 'english',
              strategy: inputValues.strategy || 'word'
            })
          });
          break;
          
        case "Chunking Tool":
          endpoint = '/api/tools/chunk';
          response = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              text: inputValues.text,
              chunk_size: parseInt(inputValues.chunk_size) || 1000,
              overlap: parseInt(inputValues.overlap) || 0
            })
          });
          break;
          
        case "AI Assistant":
          endpoint = '/api/tools/chat';
          response = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              groq_api_key: inputValues.groq_api_key,
              message: inputValues.message,
              model: inputValues.model || 'llama-3.1-8b-instant'
            })
          });
          break;
          
        case "Embedding Tool":
          endpoint = '/api/tools/embed';
          response = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              text: inputValues.text,
              model: inputValues.model || 'text-embedding-3-small',
              dimensions: inputValues.dimensions ? parseInt(inputValues.dimensions) : undefined
            })
          });
          break;
          
        case "Evaluation Tool":
          endpoint = '/api/tools/evaluate';
          response = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              model_responses: inputValues.model_responses,
              ground_truth: inputValues.ground_truth,
              metrics: inputValues.metrics || 'basic'
            })
          });
          break;
          
        case "RAG Tool":
          endpoint = '/api/tools/rag';
          formData = new FormData();
          formData.append('groq_api_key', inputValues.groq_api_key);
          formData.append('query', inputValues.query);
          if (inputValues.openai_embed_key) {
            formData.append('openai_embed_key', inputValues.openai_embed_key);
          }
          if (inputValues.file && inputValues.file instanceof File) {
            formData.append('file', inputValues.file);
          }
          
          response = await fetch(endpoint, {
            method: 'POST',
            body: formData
          });
          break;
          
        default:
          throw new Error(`Unknown tool: ${title}`);
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.success) {
        // Format the result nicely for display
        const formattedResult = JSON.stringify(data.result, null, 2);
        setResult(formattedResult);
        
        toast({
          title: "Tool executed successfully",
          description: `${title} has processed your request.`,
        });
      } else {
        throw new Error(data.error || 'Unknown error occurred');
      }
      
    } catch (error) {
      console.error('Tool execution error:', error);
      setResult(`Error: ${error.message}\n\nPlease check your inputs and try again.`);
      
      toast({
        title: "Error",
        description: error.message || 'Failed to execute tool',
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyResult = () => {
    navigator.clipboard.writeText(result);
    toast({
      title: "Copied to clipboard",
      description: "Result has been copied to your clipboard.",
    });
  };

  const handleDownloadResult = () => {
    const blob = new Blob([result], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title.toLowerCase().replace(/\s+/g, '-')}-result.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const isFormValid = inputs.filter(input => input.required).every(input => {
    const value = inputValues[input.name];
    if (input.type === 'file') {
      return value instanceof File;
    }
    return value && typeof value === 'string' && value.trim() !== '';
  });

  return (
    <Card className="h-full bg-glass-primary dark:bg-glass-dark-primary backdrop-blur-lg border-glass-border dark:border-glass-dark-border">
      <CardHeader className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              {icon}
            </div>
            <div>
              <CardTitle className="font-display" data-testid={`text-tool-title-${title.toLowerCase().replace(/\s+/g, '-')}`}>
                {title}
              </CardTitle>
              <Badge variant="outline" className="mt-1 text-xs">
                {category}
              </Badge>
            </div>
          </div>
        </div>
        <CardDescription className="text-muted-foreground">
          {description}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Input Fields */}
        <div className="space-y-4">
          {inputs.map((input) => (
            <div key={input.name} className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                {input.name.charAt(0).toUpperCase() + input.name.slice(1)}
                {input.required && <span className="text-destructive ml-1">*</span>}
              </label>
              {input.type === 'textarea' ? (
                <Textarea
                  placeholder={input.placeholder}
                  value={inputValues[input.name] as string || ''}
                  onChange={(e) => handleInputChange(input.name, e.target.value)}
                  className="bg-background/50 border-glass-border dark:border-glass-dark-border"
                  data-testid={`input-${input.name.toLowerCase().replace(/\s+/g, '-')}`}
                />
              ) : input.type === 'file' ? (
                <Input
                  type="file"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      handleInputChange(input.name, file);
                    }
                  }}
                  className="bg-background/50 border-glass-border dark:border-glass-dark-border"
                  accept=".txt,.pdf,.doc,.docx,.md"
                  data-testid={`input-${input.name.toLowerCase().replace(/\s+/g, '-')}`}
                />
              ) : (
                <Input
                  type={input.type}
                  placeholder={input.placeholder}
                  value={inputValues[input.name] as string || ''}
                  onChange={(e) => handleInputChange(input.name, e.target.value)}
                  className="bg-background/50 border-glass-border dark:border-glass-dark-border"
                  data-testid={`input-${input.name.toLowerCase().replace(/\s+/g, '-')}`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Run Button */}
        <Button
          onClick={handleRunTool}
          disabled={!isFormValid || isLoading}
          className="w-full"
          data-testid={`button-run-${title.toLowerCase().replace(/\s+/g, '-')}`}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <Play className="mr-2 h-4 w-4" />
              Run {title}
            </>
          )}
        </Button>

        {/* Results */}
        {result && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-foreground">Result</label>
              <div className="flex space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCopyResult}
                  data-testid={`button-copy-result-${title.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  <Copy className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleDownloadResult}
                  data-testid={`button-download-result-${title.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <Textarea
              value={result}
              readOnly
              className="bg-background/50 border-glass-border dark:border-glass-dark-border font-mono text-sm min-h-[200px]"
              data-testid={`output-result-${title.toLowerCase().replace(/\s+/g, '-')}`}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}