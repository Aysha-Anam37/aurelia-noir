import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Camera } from 'lucide-react';
import { GalleryItem } from '../types';
import { ResilientImage } from './ResilientImage';

interface LightboxModalProps {
  items: GalleryItem[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  items,
  currentIndex,
  isOpen,
  onClose,
  onNext,
  onPrev,
}) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose, onNext, onPrev]);

  if (!isOpen || items.length === 0) return null;

  const current = items[currentIndex];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Image Lightbox"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4 md:p-8 animate-fade-in"
    >
      {/* Top bar with counter and close */}
      <div className="absolute top-4 left-6 right-6 md:left-12 md:right-12 flex items-center justify-between text-xs text-[#EDE8DC]/70 z-20">
        <div className="flex items-center gap-3">
          <span className="font-mono text-[#B8893A]">
            {String(currentIndex + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
          </span>
          <span className="text-[#EDE8DC]/30">·</span>
          <span className="uppercase tracking-widest text-[11px] text-[#EDE8DC]/80 font-sans">
            {current.categoryLabel}
          </span>
        </div>

        <button
          onClick={onClose}
          className="p-2 text-[#EDE8DC] hover:text-[#B8893A] transition-colors focus-visible:outline-none cursor-pointer"
          aria-label="Close lightbox"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Prev / Next Buttons */}
      <button
        onClick={onPrev}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 p-3 text-[#EDE8DC]/70 hover:text-[#B8893A] bg-[#121317]/60 hover:bg-[#121317] border border-[#27272A] transition-all cursor-pointer z-20"
        aria-label="Previous image"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={onNext}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 p-3 text-[#EDE8DC]/70 hover:text-[#B8893A] bg-[#121317]/60 hover:bg-[#121317] border border-[#27272A] transition-all cursor-pointer z-20"
        aria-label="Next image"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Main Image & Caption Container */}
      <div className="max-w-5xl w-full flex flex-col items-center justify-center max-h-[85vh]">
        <div className="relative max-h-[68vh] w-auto overflow-hidden shadow-2xl border border-[#27272A]/40">
          <ResilientImage
            src={current.image}
            alt={current.title}
            className="max-h-[68vh] w-auto object-contain mx-auto"
          />
        </div>

        <div className="mt-4 text-center max-w-2xl px-4">
          <h3 className="font-serif text-xl md:text-2xl text-[#EDE8DC]">{current.title}</h3>
          <p className="text-xs md:text-sm text-[#EDE8DC]/70 mt-1 font-sans">{current.caption}</p>
          {current.cameraInfo && (
            <div className="flex items-center justify-center gap-2 mt-2 text-[11px] font-mono text-[#B8893A]/80">
              <Camera className="w-3.5 h-3.5" />
              <span>{current.cameraInfo}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
