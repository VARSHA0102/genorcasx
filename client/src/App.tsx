import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/hooks/use-theme";
import { ScrollToTop } from "@/hooks/use-scroll-restoration";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Home from "@/pages/Home";
import Tools from "@/pages/Tools";
import Blog from "@/pages/Blog";
import Team from "@/pages/Team";
import Contact from "@/pages/Contact";
import NotFound from "@/pages/not-found";


// Tool pages
import TokenizationTool from "@/pages/tools/TokenizationTool";
import ChunkingTool from "@/pages/tools/ChunkingTool";
import AIAssistant from "@/pages/tools/AIAssistant";
import RAGTool from "@/pages/tools/RAGTool";
import EvaluationTool from "@/pages/tools/EvaluationTool";
import EmbeddingTool from "@/pages/tools/EmbeddingTool";

// Company pages
import About from "@/pages/About";
import Careers from "@/pages/Careers";

// Service pages
import Consulting from "@/pages/Consulting";
import Development from "@/pages/Development";
import Enterprise from "@/pages/Enterprise";

// Resource pages
import Documentation from "@/pages/Documentation";
import APIReference from "@/pages/APIReference";
import Support from "@/pages/Support";

// Legal pages
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import Terms from "@/pages/Terms";
import CookiePolicy from "@/pages/CookiePolicy";
import Security from "@/pages/Security";

// blog page
import BlogPost from "@/pages/blog/BlogPost";


function Router() {
  return (
    <Switch>
      {/* Main pages */}
      <Route path="/" component={Home} />

      <Route path="/tools" component={Tools} />
      <Route path="/blog" component={Blog} />

      <Route path="/contact" component={Contact} />
      
      {/* Tool pages */}
      <Route path="/tools/tokenization" component={TokenizationTool} />
      <Route path="/tools/chunking" component={ChunkingTool} />
      <Route path="/tools/ai-assistant" component={AIAssistant} />
      <Route path="/tools/rag" component={RAGTool} />
      {/* <Route path="/tools/evaluation" component={EvaluationTool} /> */}
      <Route path="/tools/embeddings" component={EmbeddingTool} />
      
      {/* Company pages */}
      <Route path="/about" component={About} />
      <Route path="/careers" component={Careers} />
      
      {/* Service pages */}
      <Route path="/consulting" component={Consulting} />
      <Route path="/development" component={Development} />
      <Route path="/enterprise" component={Enterprise} />
      
      {/* Resource pages */}
      <Route path="/docs" component={Documentation} />

      <Route path="/support" component={Support} />
      
      {/* Legal pages */}
      <Route path="/privacy" component={PrivacyPolicy} />
      <Route path="/terms" component={Terms} />
      <Route path="/cookies" component={CookiePolicy} />
      <Route path="/security" component={Security} />


      {/* Blog */}
      <Route path="/blog/:slug" component={BlogPost} />
      
      {/* 404 page */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ThemeProvider>
          <ScrollToTop />
          <div className="min-h-screen bg-background">
            <Navigation />
            <main>
              <Router />
            </main>
            <Footer />
          </div>
          <Toaster />
        </ThemeProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;