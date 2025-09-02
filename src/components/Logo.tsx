import { TrendingUp } from "lucide-react";

const Logo = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="relative">
        <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center shadow-glow hover:shadow-glow transition-all duration-300 hover:scale-105">
          <TrendingUp className="w-6 h-6 text-primary-foreground" />
        </div>
        <div className="absolute inset-0 bg-gradient-glow rounded-xl opacity-30 animate-pulse"></div>
      </div>
      <span className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent tracking-tight">
        elevatr
      </span>
    </div>
  );
};

export default Logo;