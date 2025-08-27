import { TrendingUp } from "lucide-react";

const Logo = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="relative">
        <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center shadow-glow">
          <TrendingUp className="w-5 h-5 text-primary-foreground" />
        </div>
        <div className="absolute inset-0 bg-gradient-glow rounded-lg opacity-50 animate-pulse"></div>
      </div>
      <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
        Elevatr
      </span>
    </div>
  );
};

export default Logo;