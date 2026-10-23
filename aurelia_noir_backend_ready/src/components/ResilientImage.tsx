import React, { useState } from 'react';

interface ResilientImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackLabel?: string;
  containerClassName?: string;
}

export const ResilientImage: React.FC<ResilientImageProps> = ({
  src,
  alt,
  fallbackLabel = 'Aurelia Noir Collection',
  className = '',
  containerClassName = '',
  ...props
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden bg-[#131418] ${containerClassName}`}>
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-[#16171D] animate-pulse" />
      )}

      {hasError ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-gradient-to-br from-[#121318] to-[#0A0A0C] border border-[#27272A]/40 text-center">
          <div className="w-10 h-10 mb-3 border border-[#B8893A]/40 rotate-45 flex items-center justify-center">
            <div className="w-3 h-3 bg-[#B8893A]/60 -rotate-45" />
          </div>
          <span className="font-serif text-lg text-[#EDE8DC] tracking-wide">{alt || fallbackLabel}</span>
          <span className="text-xs text-[#EDE8DC]/50 mt-1 uppercase tracking-widest font-sans">Aurelia Noir Archive</span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          referrerPolicy="no-referrer"
          loading="lazy"
          onError={() => setHasError(true)}
          onLoad={() => setIsLoaded(true)}
          className={`transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'} ${className}`}
          {...props}
        />
      )}
    </div>
  );
};
