
import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark';
  logoUrl?: string;
}

const Logo: React.FC<LogoProps> = ({ className = "h-12", variant = 'dark', logoUrl }) => {
  const orangeColor = '#E67E22'; // Saffron/Orange from the logo
  const blueColor = '#2980B9';   // Blue from the logo
  const textColor = variant === 'dark' ? '#2C3E50' : '#FFFFFF';

  const saffronColor = '#FF9933';
  const skyBlueColor = '#0EA5E9';

  if (logoUrl) {
    return (
      <div className={`flex flex-col items-center justify-center ${className}`}>
        <img src={logoUrl} alt="STATVION Logo" className={`object-contain ${className}`} referrerPolicy="no-referrer" />
        <div className="flex items-center justify-between w-full mt-1 px-1">
          <span className="text-[10.5px] font-bold tracking-[0.1em]" style={{ color: saffronColor }}>PRIVATE</span>
          <span className="text-[10.5px] font-bold tracking-[0.1em]" style={{ color: skyBlueColor }}>LIMITED</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg width="63" height="63" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
        {/* Circuit Nodes and Lines - Left Side */}
        <circle cx="25" cy="55" r="5" fill={orangeColor} />
        <circle cx="25" cy="85" r="5" fill={orangeColor} />
        <path d="M25 55L45 55L55 45" stroke={orangeColor} strokeWidth="4" strokeLinecap="round" />
        <path d="M25 85L50 85L60 75" stroke={orangeColor} strokeWidth="4" strokeLinecap="round" />
        
        {/* Circuit Nodes and Lines - Right Side */}
        <circle cx="95" cy="45" r="5" fill={blueColor} />
        <circle cx="95" cy="75" r="5" fill={blueColor} />
        <path d="M95 45L75 45L65 55" stroke={blueColor} strokeWidth="4" strokeLinecap="round" />
        <path d="M95 75L70 75L60 85" stroke={blueColor} strokeWidth="4" strokeLinecap="round" />

        {/* The Upward Arrow */}
        <path d="M45 95L45 55L35 55L60 25L85 55L75 55L75 95H45Z" fill={orangeColor} />
        <path d="M55 95L55 60L50 60L60 45L70 60L65 60L65 95H55Z" fill={blueColor} />
      </svg>
      
      <div className="flex flex-col leading-none">
        <div className="flex items-baseline">
          <span className="text-[31.5px] font-extrabold tracking-tighter" style={{ color: variant === 'dark' ? orangeColor : '#FFFFFF' }}>Stat</span>
          <span className="text-[31.5px] font-extrabold tracking-tighter" style={{ color: variant === 'dark' ? blueColor : '#FFFFFF' }}>vion</span>
        </div>
        <div className="flex items-center justify-center gap-1 mt-1">
          <div className="h-px bg-blue-400 flex-grow"></div>
          <span className="text-[14.7px] font-bold tracking-[0.4em]" style={{ color: blueColor }}>INFOTECH</span>
          <div className="h-px bg-blue-400 flex-grow"></div>
        </div>
        <div className="flex items-center justify-between mt-1">
          <span className="text-[10.5px] font-bold tracking-[0.1em]" style={{ color: saffronColor }}>PRIVATE</span>
          <span className="text-[10.5px] font-bold tracking-[0.1em]" style={{ color: skyBlueColor }}>LIMITED</span>
        </div>
      </div>
    </div>
  );
};

export default Logo;
