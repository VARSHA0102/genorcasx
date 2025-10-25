import { useState } from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ArrowLeft,
  Play,
  Copy,
  Download,
  Loader2,
  Info,
  Zap,
  CheckCircle,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import LoadingSpinner from '@/components/LoadingSpinner';

// ✅ Includes "password" for secure API key inputs
interface ToolInput {
  name: string;
  type: 'text' | 'textarea' | 'number' | 'file' | 'password' | 'select';
  placeholder: string;
  required?: boolean;
  description?: string;
  options?: string[]; 
}
interface SingleToolInterfaceProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  category: string;
  inputs: ToolInput[];
  features: string[];
  examples: Array<{ title: string; description: string }>;
}

export default function SingleToolInterface({
  title,
  description,
  icon,
  category,
  inputs,
  features,
  examples,
}: SingleToolInterfaceProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [inputValues, setInputValues] = useState<Record<string, string | File>>({});
  const [result, setResult] = useState<string>('');
  const { toast } = useToast();
  const [chunkArray, setChunkArray] = useState<Array<{ content: string }>>([]);


  const handleInputChange = (name: string, value: string | File) => {
    setInputValues((prev) => ({ ...prev, [name]: value }));
  };

  const renderColoredChunks = (chunks: Array<{ content: string }>) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8em' }}>
      {chunks.map((chunkObj, idx) => {
        // Different hue per chunk
        const hue = (idx * 50) % 360; // distinct colors per chunk
        const backgroundColor = `hsl(${hue}, 60%, 90%)`; // soft pastel
        const textColor = `#000`; // black text

        return (
          <div
            key={idx}
            style={{
              backgroundColor,
              color: textColor,
              padding: '8px 12px',
              borderRadius: '6px',
              whiteSpace: 'pre-wrap', // preserve spacing & line breaks
              lineHeight: 1.6,
              fontWeight: 500,
            }}
          >
            {chunkObj.content}
          </div>
        );
      })}
    </div>
  );
};


  
  // Function to render tokens with colors for DOM
const renderColoredTokens = (tokens: Array<{ token: string }>) => {
  return (
    <div style={{ display: 'inline', flexWrap: 'wrap', lineHeight: 1.6 }}>
      {tokens.map((tokenObj, idx) => {
        // Generate a hue that changes significantly for each token
        const hue = (idx * 45) % 360; // 45° step gives visually distinct colors
        const backgroundColor = `hsl(${hue}, 60%, 90%)`; // soft pastel background
        const textColor = `hsl(${hue}, 70%, 20%)`;       // dark text for contrast

        return (
          <span
            key={idx}
            style={{
              backgroundColor,
              color: textColor,
              padding: '2px 6px',
              borderRadius: '6px',
              marginRight: '2px',
              marginBottom: '2px',
              display: 'inline-block',
              fontWeight: 500,
            }}
          >
            {tokenObj.token}
          </span>
        );
      })}
    </div>
  );
};


  const handleRunTool = async () => {
    setIsLoading(true);

    try {
      let response: Response;
      let endpoint = '';
      let formData: FormData | null = null;

      switch (title) {
        case 'Tokenization Tool':
          endpoint = '/api/tools/tokenize';
          response = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: inputValues.text }),
          });
          break;

        case 'Chunking Tool':
          endpoint = '/api/tools/chunk';
          response = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              text: inputValues.text,
              chunk_size: parseInt(inputValues.chunk_size as string) || 1000,
              overlap: parseInt(inputValues.overlap as string) || 0,
            }),
          });
          break;

        case 'AI Assistant':
          endpoint = '/api/tools/chat';
          response = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              groq_api_key: inputValues.groq_api_key,
              message: inputValues.message,
              model: inputValues.model || 'llama-3.1-8b-instant',
            }),
          });
          break;

        case 'Embedding Tool':
          endpoint = '/api/tools/embed';
          response = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              text: inputValues.text,
              model: inputValues.model || 'text-embedding-3-small',
              apikey: inputValues.apikey,
              dimensions: inputValues.dimensions
                ? parseInt(inputValues.dimensions as string)
                : undefined,
            }),
          });
          break;

        case 'Evaluation Tool':
          endpoint = '/api/tools/evaluate';
          response = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              model_responses: inputValues.model_responses,
              ground_truth: inputValues.ground_truth,
              metrics: inputValues.metrics || 'basic',
            }),
          });
          break;

        case 'RAG Tool':
          endpoint = '/api/tools/rag';
          formData = new FormData();
          formData.append('groq_api_key', inputValues.groq_api_key as string);
          formData.append('query', inputValues.query as string);
          if (inputValues.openai_embed_key) {
            formData.append('openai_embed_key', inputValues.openai_embed_key as string);
          }
          if (inputValues.file && inputValues.file instanceof File) {
            formData.append('file', inputValues.file);
          }
          response = await fetch(endpoint, { method: 'POST', body: formData });
          break;

        default:
          throw new Error(`Unknown tool: ${title}`);
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // ✅ Handle results
      if (title === 'Tokenization Tool') {
        const tokens = data?.result?.tokens || data?.tokens || [];
        if (Array.isArray(tokens) && tokens.length > 0) {
          // For display in Textarea (string)
          setResult(tokens.map((t: any) => t.token).join(' '));
        } else {
          setResult('No tokens found.');
        }
      } else if (title === 'Embedding Tool') {
        const answer =
          data?.result?.embedding || data?.embedding || data?.result || 'No embedding result found.';
        setResult(typeof answer === 'object' ? JSON.stringify(answer, null, 2) : answer);
      } else if (title === 'AI Assistant') {
        const answer =
          data?.result?.assistant_response || data?.assistant_response || data?.result || 'No response found.';
        setResult(answer);
      } else if (title === 'Chunking Tool') {
  const chunks = data?.result?.chunks || data?.chunks || [];

  if (Array.isArray(chunks) && chunks.length > 0) {
    // Store chunk array for rendering
    setChunkArray(
      chunks.map((chunk: any) => ({
        content: `Chunk ${chunk.index}: ${chunk.content.trim()}`,
      }))
    );

    // Optional: plain text version
    setResult(chunks.map((c: any) => c.content.trim()).join('\n\n'));
  } else {
    setChunkArray([]);
    setResult('No chunks found.');
  }
} else if (title === 'RAG Tool') {
        const answer = data?.result?.answer || data?.result || data?.answer || 'No answer found in response.';
        setResult(answer);
      } else if (data.success) {
        setResult(JSON.stringify(data.result, null, 2));
      } else {
        throw new Error(data.error || 'Unknown error occurred');
      }

      toast({ title: 'Success!', description: `${title} completed successfully.` });
    } catch (error) {
      console.error('Tool execution error:', error);
      setResult(`Error: ${(error as Error).message}\n\nPlease check your inputs and try again.`);
      toast({
        title: 'Error',
        description: (error as Error).message || 'Failed to execute tool',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyResult = () => {
    navigator.clipboard.writeText(result);
    toast({ title: 'Copied!', description: 'Result copied to clipboard.' });
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

  const isFormValid = inputs
    .filter((input) => input.required)
    .every((input) => {
      const value = inputValues[input.name];
      if (input.type === 'file') return value instanceof File;
      return value && typeof value === 'string' && value.trim() !== '';
    });

  return (
    <div className="min-h-screen bg-background pt-16">
      {/* Header Section */}
      <section className="py-8 bg-gradient-to-br from-background via-muted/5 to-background border-b border-glass-border dark:border-glass-dark-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-4 mb-6">
            <Link href="/tools">
              <Button variant="ghost" size="sm" className="hover:bg-glass-secondary">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Tools
              </Button>
            </Link>
            <div className="h-4 border-l border-glass-border dark:border-glass-dark-border" />
            <Badge variant="outline">{category}</Badge>
          </div>
          <div className="flex items-start space-x-6">
            <div className="p-4 rounded-2xl bg-primary/10 text-primary">{icon}</div>
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">
                {title}
              </h1>
              <p className="text-lg text-muted-foreground mb-4">{description}</p>
              <div className="flex flex-wrap gap-2">
                {features.slice(0, 4).map((feature, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    {feature}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tool Interface */}
      <section className="py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card className="bg-glass-primary dark:bg-glass-dark-primary backdrop-blur-lg border-glass-border dark:border-glass-dark-border relative">
                {isLoading && (
                  <div className="absolute inset-0 bg-background/80 backdrop-blur-sm rounded-lg flex items-center justify-center z-50">
                    <LoadingSpinner size="lg" text="Processing your request..." />
                  </div>
                )}

                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Zap className="h-5 w-5 mr-2 text-primary" />
                    Tool Interface
                  </CardTitle>
                  <CardDescription>Configure your inputs and run the tool</CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    {inputs.map((input) => (
                      <div key={input.name} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <label className="text-sm font-medium text-foreground">
                            {input.name.charAt(0).toUpperCase() +
                              input.name.slice(1).replace(/_/g, ' ')}
                            {input.required && <span className="text-destructive ml-1">*</span>}
                          </label>
                          {input.description && (
                            <div className="flex items-center text-xs text-muted-foreground">
                              <Info className="h-3 w-3 mr-1" />
                              {input.description}
                            </div>
                          )}
                        </div>

                        {input.type === 'textarea' ? (
                          <Textarea
                            placeholder={input.placeholder}
                            value={(inputValues[input.name] as string) || ''}
                            onChange={(e) =>
                              handleInputChange(input.name, e.target.value)
                            }
                            className="bg-background/50 border-glass-border dark:border-glass-dark-border min-h-[100px]"
                            rows={4}
                          />
                        ) : input.type === 'file' ? (
                          <Input
                            type="file"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) handleInputChange(input.name, file);
                            }}
                            className="bg-background/50 border-glass-border dark:border-glass-dark-border"
                            accept=".txt,.pdf,.doc,.docx,.md"
                          />
                        ) : (
                          <Input
                            type={input.type}
                            placeholder={input.placeholder}
                            value={(inputValues[input.name] as string) || ''}
                            onChange={(e) =>
                              handleInputChange(input.name, e.target.value)
                            }
                            className="bg-background/50 border-glass-border dark:border-glass-dark-border"
                          />
                        )}
                      </div>
                    ))}
                  </div>

                  <Button
                    onClick={handleRunTool}
                    disabled={!isFormValid || isLoading}
                    className="w-full"
                    size="lg"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Processing...
                      </>
                    ) : (
                      <>
                        <Play className="mr-2 h-5 w-5" /> Run {title}
                      </>
                    )}
                  </Button>

                  {result && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-medium text-foreground">
                          Results
                        </label>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm" onClick={handleCopyResult}>
                            <Copy className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={handleDownloadResult}>
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      {/* Display colored tokens only for Tokenization Tool */}
                      {title === 'Tokenization Tool' ? (
                        <div
                            className="p-2 border rounded bg-background/20"
                            style={{
                              maxHeight: 'calc(1.5em * 20 + 32px)', // 20 lines approx, adjust line-height & padding
                              overflowY: 'auto',
                            }}
                          >
                          {renderColoredTokens(
                            (result.split(' ').map((t) => ({ token: t }))) || []
                          )}
                          {/* Total token count with 3-line gap */}
                          <div style={{ marginTop: '3em', fontWeight: 'bold', fontSize: '14px' }}>
                            Total Tokens: {result.split(' ').filter(Boolean).length}
                          </div>
                        </div>
                      ) : title === 'Chunking Tool' && chunkArray.length > 0 ? (
      <div
        className="p-2 border rounded bg-background/20"
        style={{
          maxHeight: 'calc(1.5em * 20 + 32px)', // 20 lines approx, adjust line-height & padding
          overflowY: 'auto',
        }}
      >
        {renderColoredChunks(chunkArray)}
        <div style={{ marginTop: '3em', fontWeight: 'bold', fontSize: '14px' }}>
          Total Chunks: {chunkArray.length}
        </div>
      </div>
    ) : (
      <Textarea
        value={result}
        readOnly
        className="bg-background/50 border-glass-border dark:border-glass-dark-border font-mono text-sm min-h-[300px]"
      />
    )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card className="bg-glass-primary dark:bg-glass-dark-primary backdrop-blur-lg border-glass-border dark:border-glass-dark-border">
                <CardHeader>
                  <CardTitle className="text-lg">Features</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {features.map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-start text-sm text-muted-foreground"
                      >
                        <CheckCircle className="h-4 w-4 mr-2 text-green-500 mt-0.5 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-glass-primary dark:bg-glass-dark-primary backdrop-blur-lg border-glass-border dark:border-glass-dark-border">
                <CardHeader>
                  <CardTitle className="text-lg">Examples</CardTitle>
                  <CardDescription>Common use cases</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {examples.map((example, index) => (
                      <div
                        key={index}
                        className="p-3 rounded-lg bg-background/50 border border-glass-border dark:border-glass-dark-border"
                      >
                        <h4 className="text-sm font-semibold text-foreground mb-1">
                          {example.title}
                        </h4>
                        <p className="text-xs text-muted-foreground">{example.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
