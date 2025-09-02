import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Copy, Sparkles, ArrowLeft, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import Logo from "@/components/Logo";
import { generateCareerOutputs, type CareerOutputs } from "@/lib/openai";

const Builder = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [notes, setNotes] = useState("");
  const [targetRole, setTargetRole] = useState("");
  const [tone, setTone] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<CareerOutputs | null>(null);

  const handleGenerate = async () => {
    if (!notes.trim() || !targetRole.trim() || !tone) return;
    
    setIsLoading(true);
    try {
      const outputs = await generateCareerOutputs(notes, targetRole, tone);
      setResults(outputs);
      setShowResults(true);
      toast({
        title: "Success!",
        description: "Your career content has been generated.",
      });
    } catch (error) {
      console.error("Generation error:", error);
      toast({
        title: "Generation Failed",
        description: error instanceof Error ? error.message : "Failed to generate content. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copied!",
        description: "Content copied to clipboard.",
      });
    } catch (error) {
      toast({
        title: "Copy Failed",
        description: "Failed to copy to clipboard.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-bg relative">
      {/* Clean, minimal background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]"></div>
      
      {/* Header */}
      <div className="border-b border-border backdrop-blur-sm relative z-20 bg-background/80">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate('/')}
              className="hover:bg-muted transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <Logo />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 h-[calc(100vh-120px)]">
          {/* Left Panel - Input */}
          <Card className="p-8 shadow-soft border-border/50">
            <div className="space-y-6 h-full flex flex-col">
              <div>
                <h2 className="text-2xl font-semibold text-foreground mb-2">Build Your Story</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Transform your experiences into compelling career narratives that stand out.
                </p>
              </div>

              <div className="space-y-6 flex-1">
                <div className="space-y-3">
                  <Label htmlFor="notes" className="text-sm font-medium">Your Experience Notes</Label>
                  <Textarea
                    id="notes"
                    placeholder="Describe your achievements, projects, and experiences... Be specific about results, technologies used, and your role in the success."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="min-h-[200px] resize-none bg-muted/30 border-border/50 focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <Label htmlFor="role" className="text-sm font-medium">Target Role</Label>
                    <Input
                      id="role"
                      placeholder="e.g., Software Engineer"
                      value={targetRole}
                      onChange={(e) => setTargetRole(e.target.value)}
                      className="bg-muted/30 border-border/50 focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="tone" className="text-sm font-medium">Writing Tone</Label>
                    <Select value={tone} onValueChange={setTone}>
                      <SelectTrigger className="bg-muted/30 border-border/50 focus:border-primary focus:ring-1 focus:ring-primary transition-all">
                        <SelectValue placeholder="Choose tone" />
                      </SelectTrigger>
                      <SelectContent className="bg-background border-border/50 shadow-large">
                        <SelectItem value="Professional">Professional</SelectItem>
                        <SelectItem value="Friendly">Friendly</SelectItem>
                        <SelectItem value="Bold">Bold</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <Button 
                onClick={handleGenerate}
                className="w-full bg-gradient-primary hover:opacity-90 transition-all hover:shadow-glow"
                disabled={!notes.trim() || !targetRole.trim() || !tone || isLoading}
                size="lg"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Sparkles className="w-4 h-4 mr-2" />
                )}
                {isLoading ? "Generating..." : "Generate Stories"}
              </Button>
            </div>
          </Card>

          {/* Right Panel - Output with Scroll */}
          <div className="flex flex-col h-full">
            {!showResults ? (
              <Card className="p-8 h-full flex items-center justify-center shadow-soft border-border/50">
                <div className="text-center space-y-4 max-w-sm">
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center">
                    <Sparkles className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">Ready to Generate</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Fill in your details and let AI craft your professional story.
                    </p>
                  </div>
                </div>
              </Card>
            ) : (
              <Card className="shadow-soft border-border/50 flex-1 overflow-hidden">
                <ScrollArea className="h-full">
                  <div className="p-8 space-y-8">
                    {isLoading ? (
                      <>
                        {/* Loading LinkedIn Bullets */}
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-foreground">LinkedIn Bullets</h3>
                            <Skeleton className="h-8 w-8 rounded" />
                          </div>
                          <div className="space-y-3">
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-5/6" />
                            <Skeleton className="h-4 w-4/5" />
                          </div>
                        </div>

                        {/* Loading STAR Story */}
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-foreground">STAR Story</h3>
                            <Skeleton className="h-8 w-8 rounded" />
                          </div>
                          <div className="space-y-3">
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-4/5" />
                            <Skeleton className="h-4 w-5/6" />
                            <Skeleton className="h-4 w-3/4" />
                          </div>
                        </div>

                        {/* Loading Headline */}
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-foreground">Professional Headline</h3>
                            <Skeleton className="h-8 w-8 rounded" />
                          </div>
                          <Skeleton className="h-4 w-3/4" />
                        </div>
                      </>
                    ) : results ? (
                      <>
                        {/* LinkedIn Bullets */}
                        <div className="space-y-4 pb-6 border-b border-border/30">
                          <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-foreground">LinkedIn Bullets</h3>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleCopy(results.linkedinBullets.join('\n'))}
                              className="hover:bg-muted transition-colors"
                            >
                              <Copy className="w-4 h-4 mr-2" />
                              Copy
                            </Button>
                          </div>
                          <div className="space-y-3 text-foreground">
                            {results.linkedinBullets.map((bullet, index) => (
                              <p key={index} className="leading-relaxed">• {bullet}</p>
                            ))}
                          </div>
                        </div>

                        {/* STAR Story */}
                        <div className="space-y-4 pb-6 border-b border-border/30">
                          <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-foreground">STAR Story</h3>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleCopy(`Situation: ${results.starStory.situation}\nTask: ${results.starStory.task}\nAction: ${results.starStory.action}\nResult: ${results.starStory.result}`)}
                              className="hover:bg-muted transition-colors"
                            >
                              <Copy className="w-4 h-4 mr-2" />
                              Copy
                            </Button>
                          </div>
                          <div className="space-y-4 text-foreground">
                            <div>
                              <span className="font-semibold text-primary">Situation:</span>
                              <p className="mt-1 leading-relaxed">{results.starStory.situation}</p>
                            </div>
                            <div>
                              <span className="font-semibold text-primary">Task:</span>
                              <p className="mt-1 leading-relaxed">{results.starStory.task}</p>
                            </div>
                            <div>
                              <span className="font-semibold text-primary">Action:</span>
                              <p className="mt-1 leading-relaxed">{results.starStory.action}</p>
                            </div>
                            <div>
                              <span className="font-semibold text-primary">Result:</span>
                              <p className="mt-1 leading-relaxed">{results.starStory.result}</p>
                            </div>
                          </div>
                        </div>

                        {/* Professional Headline */}
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-foreground">Professional Headline</h3>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleCopy(results.headline)}
                              className="hover:bg-muted transition-colors"
                            >
                              <Copy className="w-4 h-4 mr-2" />
                              Copy
                            </Button>
                          </div>
                          <p className="text-foreground font-medium text-lg leading-relaxed">
                            {results.headline}
                          </p>
                        </div>
                      </>
                    ) : null}
                  </div>
                </ScrollArea>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Builder;