import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Logo from "@/components/Logo";
import careerBg from "@/assets/career-bg.png";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      {/* Background Image */}
      <div 
        className="absolute inset-0 opacity-5 bg-no-repeat bg-center bg-contain"
        style={{
          backgroundImage: `url(${careerBg})`,
          backgroundPosition: 'center right',
          backgroundSize: '60%'
        }}
      />
      
      {/* Navigation Header */}
      <header className="relative z-10 border-b border-border/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <nav className="flex items-center justify-between">
            <Logo />
            <div className="flex items-center gap-8">
              <div className="hidden md:flex items-center gap-6 text-muted-foreground">
                <a href="#features" className="hover:text-foreground transition-colors">Features</a>
                <a href="#about" className="hover:text-foreground transition-colors">About</a>
                <a href="#contact" className="hover:text-foreground transition-colors">Contact</a>
              </div>
              <Button 
                onClick={() => navigate('/builder')}
                className="bg-yellow-400 text-black hover:bg-yellow-300 font-medium px-6"
              >
                Get Started
              </Button>
            </div>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[calc(100vh-80px)]">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <h1 className="text-6xl lg:text-7xl font-light leading-[0.9] tracking-tight text-foreground">
                  Transform your experiences into{" "}
                  <span className="italic font-normal">compelling stories.</span>
                </h1>
                
                <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
                  Turn your raw career notes into polished LinkedIn bullets, STAR stories, 
                  and professional headlines that capture attention and land interviews.
                </p>
              </div>

              <div className="space-y-4">
                <Button 
                  size="lg"
                  onClick={() => navigate('/builder')}
                  className="bg-yellow-400 text-black hover:bg-yellow-300 font-medium px-8 py-4 text-lg rounded-full"
                >
                  Start Building Stories
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                
                <p className="text-sm text-muted-foreground">
                  No registration required • Instant results • Free to use
                </p>
              </div>
            </div>

            {/* Right Content - Features */}
            <div className="space-y-12">
              <div className="space-y-8">
                <h2 className="text-2xl font-light text-foreground">What you'll get:</h2>
                
                <div className="space-y-6">
                  <div className="border-l-2 border-primary/30 pl-6">
                    <h3 className="text-lg font-medium text-foreground mb-2">LinkedIn-Ready Bullets</h3>
                    <p className="text-muted-foreground">
                      Professional bullet points that showcase your achievements with impact and metrics.
                    </p>
                  </div>
                  
                  <div className="border-l-2 border-primary/30 pl-6">
                    <h3 className="text-lg font-medium text-foreground mb-2">STAR Method Stories</h3>
                    <p className="text-muted-foreground">
                      Structured behavioral interview responses using the Situation, Task, Action, Result framework.
                    </p>
                  </div>
                  
                  <div className="border-l-2 border-primary/30 pl-6">
                    <h3 className="text-lg font-medium text-foreground mb-2">Professional Headlines</h3>
                    <p className="text-muted-foreground">
                      Compelling resume and LinkedIn headlines that make recruiters want to learn more.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer Section */}
      <footer className="relative z-10 border-t border-border/20 py-8 mt-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-muted-foreground">
              © 2024 elevatr. Transform your career story.
            </div>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <a href="#privacy" className="hover:text-foreground transition-colors">Privacy</a>
              <a href="#terms" className="hover:text-foreground transition-colors">Terms</a>
              <a href="#support" className="hover:text-foreground transition-colors">Support</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;