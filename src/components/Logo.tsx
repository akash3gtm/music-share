import React from "react";

interface LogoProps {
  className?: string;
  width?: number;
  height?: number;
}

const Logo: React.FC<LogoProps> = ({
  className = "",
  width = 40,
  height = 40,
}) => {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient
          id="app-logo-gradient"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" style={{ stopColor: "#3b82f6" }} />
          <stop offset="100%" style={{ stopColor: "#8b5cf6" }} />
        </linearGradient>
      </defs>
      <g fill="url(#app-logo-gradient)">
        <path d="M20 35L50 15L80 35V75C80 77.7614 77.7614 80 75 80H25C22.2386 80 20 77.7614 20 75V35Z" />
        <path d="M40 50H60V80H40V50Z" fill="white" />
        <circle cx="50" cy="40" r="8" fill="white" />
      </g>
    </svg>
  );
};

export default Logo;
