import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Sparkles, ArrowRight } from "lucide-react";
import Logo from "@/components/Logo";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-bg flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-glow opacity-30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-glow opacity-20 rounded-full blur-3xl"></div>
      
      <div className="w-full max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16 animate-slide-up">
          <Logo className="justify-center mb-8" />
        </div>

        {/* Main Hero Card */}
        <div className="glass-card p-12 rounded-2xl animate-fade-in">
          <div className="text-center space-y-8">
            {/* Hero Heading */}
            <div className="space-y-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <h1 className="text-5xl font-bold tracking-tight text-foreground leading-tight">
                Turn Your Raw Career Notes into{" "}
                <span className="bg-gradient-primary bg-clip-text text-transparent">Polished Stories</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Paste your notes and instantly get LinkedIn-ready bullets, STAR stories, 
                and a resume headline. Transform your experiences into compelling narratives.
              </p>
            </div>

            {/* CTA Section */}
            <div className="space-y-6 animate-slide-up" style={{ animationDelay: '0.4s' }}>
              <Button 
                size="lg" 
                className="text-lg px-8 py-6 bg-gradient-primary hover:shadow-glow transition-all duration-300 hover:scale-105 group border-0 glow-hover"
                onClick={() => navigate('/builder')}
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
              
              <p className="text-sm text-muted-foreground">
                No sign-up required • Free to use • Instant results
              </p>
            </div>

            {/* Feature Preview */}
            <div className="pt-8 border-t border-border/30 animate-slide-up" style={{ animationDelay: '0.6s' }}>
              <div className="grid md:grid-cols-3 gap-6 text-left">
                <div className="space-y-2 group">
                  <div className="w-10 h-10 rounded-lg bg-gradient-primary/20 flex items-center justify-center mb-3 group-hover:shadow-glow transition-all duration-300">
                    <div className="w-2 h-2 bg-gradient-primary rounded-full"></div>
                  </div>
                  <h3 className="font-semibold text-foreground">LinkedIn Bullets</h3>
                  <p className="text-sm text-muted-foreground">Professional bullet points optimized for LinkedIn profiles</p>
                </div>
                
                <div className="space-y-2 group">
                  <div className="w-10 h-10 rounded-lg bg-gradient-primary/20 flex items-center justify-center mb-3 group-hover:shadow-glow transition-all duration-300">
                    <div className="w-2 h-2 bg-gradient-primary rounded-full"></div>
                  </div>
                  <h3 className="font-semibold text-foreground">STAR Stories</h3>
                  <p className="text-sm text-muted-foreground">Structured behavioral interview responses</p>
                </div>
                
                <div className="space-y-2 group">
                  <div className="w-10 h-10 rounded-lg bg-gradient-primary/20 flex items-center justify-center mb-3 group-hover:shadow-glow transition-all duration-300">
                    <div className="w-2 h-2 bg-gradient-primary rounded-full"></div>
                  </div>
                  <h3 className="font-semibold text-foreground">Resume Headlines</h3>
                  <p className="text-sm text-muted-foreground">Compelling headlines that capture attention</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;