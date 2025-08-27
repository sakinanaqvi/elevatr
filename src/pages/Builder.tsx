import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Copy, Sparkles, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Logo from "@/components/Logo";

const Builder = () => {
  const navigate = useNavigate();
  const [notes, setNotes] = useState("");
  const [targetRole, setTargetRole] = useState("");
  const [tone, setTone] = useState("");
  const [showResults, setShowResults] = useState(false);

  const handleGenerate = () => {
    // Placeholder for AI generation logic
    setShowResults(true);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    // Could add toast notification here
  };

  return (
    <div className="min-h-screen bg-gradient-bg relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-gradient-glow opacity-10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-gradient-glow opacity-10 rounded-full blur-3xl"></div>
      
      {/* Header */}
      <div className="border-b border-border/30 glass-card backdrop-blur-md relative z-20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate('/')}
              className="hover:bg-muted/80 hover:shadow-glow transition-all duration-300"
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
          <div className="glass-card p-6 rounded-2xl animate-slide-in-left">
            <div className="space-y-6 h-full flex flex-col">
              <div>
                <h2 className="text-lg font-semibold text-foreground mb-2">Input Your Details</h2>
                <p className="text-sm text-muted-foreground">
                  Provide your raw notes and we'll transform them into polished career stories.
                </p>
              </div>

              <div className="space-y-4 flex-1">
                <div className="space-y-2">
                  <Label htmlFor="notes">Paste your notes here</Label>
                  <Textarea
                    id="notes"
                    placeholder="e.g., Led team of 5 engineers, built new feature that increased user engagement by 30%, worked on React frontend and Node.js backend, collaborated with design team..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="min-h-[200px] resize-none glass-card bg-input/50 border-border/30 focus:border-primary/50 transition-all duration-300"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="role">Target Role</Label>
                    <Input
                      id="role"
                      placeholder="e.g., Software Engineer, PM Intern"
                      value={targetRole}
                      onChange={(e) => setTargetRole(e.target.value)}
                      className="glass-card bg-input/50 border-border/30 focus:border-primary/50 transition-all duration-300"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tone">Tone</Label>
                    <Select value={tone} onValueChange={setTone}>
                      <SelectTrigger className="glass-card bg-input/50 border-border/30 focus:border-primary/50 transition-all duration-300">
                        <SelectValue placeholder="Select tone" />
                      </SelectTrigger>
                      <SelectContent className="glass-card border-border/30">
                        <SelectItem value="confident">Confident</SelectItem>
                        <SelectItem value="concise">Concise</SelectItem>
                        <SelectItem value="friendly">Friendly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <Button 
                onClick={handleGenerate}
                className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300 hover:scale-[1.02] disabled:hover:scale-100 glow-hover border-0 relative overflow-hidden group"
                disabled={!notes.trim() || !targetRole.trim() || !tone}
              >
                <div className="absolute inset-0 bg-gradient-glow opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
                <Sparkles className="w-4 h-4 mr-2 relative z-10" />
                <span className="relative z-10">Generate Stories</span>
              </Button>
            </div>
          </div>

          {/* Right Panel - Output */}
          <div className="space-y-6">
            {!showResults ? (
              <div className="glass-card p-8 rounded-2xl h-full flex items-center justify-center animate-slide-up">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-full bg-gradient-primary/20 flex items-center justify-center">
                    <Sparkles className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Ready to Generate</h3>
                    <p className="text-muted-foreground">
                      Fill in your details on the left and click "Generate Stories" to see your polished career content.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6 animate-fade-in">
                {/* LinkedIn Bullets */}
                <div className="glass-card p-6 rounded-2xl animate-slide-up" style={{ animationDelay: '0.1s' }}>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-foreground">LinkedIn Bullets</h3>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleCopy("Sample LinkedIn bullet points...")}
                      className="hover:bg-muted/80 hover:shadow-glow transition-all duration-300"
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="space-y-2 text-sm text-foreground">
                    <p>• Led cross-functional team of 5 engineers to deliver high-impact feature, resulting in 30% increase in user engagement</p>
                    <p>• Developed full-stack solution using React and Node.js, collaborating closely with design team to ensure optimal UX</p>
                    <p>• Implemented scalable architecture patterns that improved application performance by 25%</p>
                  </div>
                </div>

                {/* STAR Story */}
                <div className="glass-card p-6 rounded-2xl animate-slide-up" style={{ animationDelay: '0.2s' }}>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-foreground">STAR Story</h3>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleCopy("Sample STAR story...")}
                      className="hover:bg-muted/80 hover:shadow-glow transition-all duration-300"
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="space-y-3 text-sm text-foreground">
                    <div>
                      <span className="font-semibold bg-gradient-primary bg-clip-text text-transparent">Situation:</span> Our user engagement metrics were declining, and we needed to deliver a new feature to re-engage our user base.
                    </div>
                    <div>
                      <span className="font-semibold bg-gradient-primary bg-clip-text text-transparent">Task:</span> As the technical lead, I was responsible for building and launching this feature with a team of 5 engineers.
                    </div>
                    <div>
                      <span className="font-semibold bg-gradient-primary bg-clip-text text-transparent">Action:</span> I designed the full-stack architecture using React and Node.js, coordinating with the design team and implementing scalable patterns.
                    </div>
                    <div>
                      <span className="font-semibold bg-gradient-primary bg-clip-text text-transparent">Result:</span> Successfully launched the feature, achieving a 30% increase in user engagement and 25% improvement in performance.
                    </div>
                  </div>
                </div>

                {/* Resume Headline */}
                <div className="glass-card p-6 rounded-2xl animate-slide-up" style={{ animationDelay: '0.3s' }}>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-foreground">Resume/LinkedIn Headline</h3>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleCopy("Sample headline...")}
                      className="hover:bg-muted/80 hover:shadow-glow transition-all duration-300"
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                  <p className="text-sm text-foreground font-medium">
                    Full-Stack Software Engineer | Led 5-Person Team to 30% User Engagement Growth | React & Node.js Expert
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Builder;