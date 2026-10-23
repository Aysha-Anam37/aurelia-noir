import React, { useState, useEffect, useRef } from 'react';
import { RESORT_IMAGES } from '../data/resortData';
import { PageId } from '../types';
import { Play, Pause, ChevronRight, Compass } from 'lucide-react';

interface HeroCinematicProps {
  onNavigate: (page: PageId) => void;
  onExploreClick?: () => void;
}

interface HeroScene {
  id: number;
  label: string;
  sublabel: string;
  image: string;
  headline: string;
  narrative: string;
}

export const HeroCinematic: React.FC<HeroCinematicProps> = ({ onNavigate, onExploreClick }) => {
  const [currentScene, setCurrentScene] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<number | null>(null);

  const scenes: HeroScene[] = [
    {
      id: 1,
      label: 'SCENE ONE — THE OCEAN',
      sublabel: 'The Obsidian Coastline',
      image: RESORT_IMAGES.heroOcean,
      headline: 'Where Ancient Cliffs Meet the Atlantic Deep',
      narrative: 'A secluded volcanic coastline shaped by ocean tides. Untouched, dramatic, and deeply restful.',
    },
    {
      id: 2,
      label: 'SCENE TWO — THE RESORT',
      sublabel: 'Cliffside Architecture',
      image: RESORT_IMAGES.heroRetreat,
      headline: 'Cantilevered Over the Edge of the Horizon',
      narrative: 'Eighteen private cliffside villas woven into stone, each with heated infinity pools overlooking the sea.',
    },
    {
      id: 3,
      label: 'SCENE THREE — THE PRESIDENTIAL SUITE',
      sublabel: 'The Living Sanctuary',
      image: RESORT_IMAGES.heroPresidentialSuite,
      headline: 'Quiet Sophistication and Panoramic Ocean Views',
      narrative: 'Dark walnut millwork, bronze lighting, and floor-to-ceiling glass framing the open ocean.',
    },
  ];

  const SCENE_DURATION_MS = 6500;
  const TICK_MS = 100;

  useEffect(() => {
    if (!isPlaying) return;

    timerRef.current = window.setInterval(() => {
      setProgress((prev) => {
        const next = prev + (TICK_MS / SCENE_DURATION_MS) * 100;
        if (next >= 100) {
          setCurrentScene((sc) => (sc + 1) % scenes.length);
          return 0;
        }
        return next;
      });
    }, TICK_MS);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, scenes.length]);

  const selectScene = (idx: number) => {
    setCurrentScene(idx);
    setProgress(0);
  };

  const handleSkipIntro = () => {
    if (onExploreClick) {
      onExploreClick();
    } else {
      const el = document.getElementById('storytelling-intro');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section className="relative w-full h-screen min-h-[720px] max-h-[1100px] overflow-hidden bg-[#0B0B0D] flex items-end">
      {/* Background Images with smooth crossfade & restrained scale */}
      {scenes.map((scene, idx) => {
        const isActive = currentScene === idx;
        return (
          <div
            key={scene.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            <div
              className={`w-full h-full bg-cover bg-center transition-transform duration-[7000ms] ease-out ${
                isActive ? 'scale-105' : 'scale-100'
              }`}
              style={{ backgroundImage: `url(${scene.image})` }}
            />
            {/* Scrim overlay for strong contrast and legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0D] via-[#0B0B0D]/50 to-[#0B0B0D]/30" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0B0B0D]/80 via-[#0B0B0D]/20 to-transparent" />
          </div>
        );
      })}

      {/* Top right Skip Intro / Explore Now control */}
      <div className="absolute top-24 right-6 md:right-12 z-20 flex items-center gap-3">
        <button
          onClick={handleSkipIntro}
          className="px-4 py-2 text-[11px] font-sans uppercase tracking-[0.18em] text-[#F4EFE5] hover:text-[#E8C36B] bg-[#0B0B0D]/75 hover:bg-[#0B0B0D]/95 border border-[#232328] hover:border-[#E8C36B]/50 transition-all backdrop-blur-sm cursor-pointer flex items-center gap-2 group"
          aria-label="Skip cinematic intro to content"
        >
          <span>Skip Intro / Explore</span>
          <ChevronRight className="w-3.5 h-3.5 text-[#E8C36B] transition-transform group-hover:translate-x-0.5" />
        </button>

        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="p-2 text-[#F4EFE5]/80 hover:text-[#E8C36B] bg-[#0B0B0D]/75 border border-[#232328] transition-all backdrop-blur-sm cursor-pointer"
          title={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
          aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
        >
          {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Hero Content Container */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-12 pb-14 md:pb-20">
        <div className="max-w-3xl">
          {/* Active scene label with refined spacing and scale */}
          <div className="flex items-center gap-3 mb-5 sm:mb-6">
            <span className="text-[10px] sm:text-[11px] font-sans uppercase tracking-[0.2em] text-[#E8C36B] font-medium">
              {scenes[currentScene].label}
            </span>
            <span className="text-[#F4EFE5]/35 text-xs">·</span>
            <span className="text-[11px] sm:text-xs text-[#F4EFE5]/65 font-sans tracking-wide">
              {scenes[currentScene].sublabel}
            </span>
          </div>

          {/* Primary Wordmark — Reduced by ~20-25% on desktop with comfortable leading */}
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-[4.75rem] text-[#F4EFE5] font-light tracking-tight leading-[1.04] mb-5 sm:mb-6 text-balance">
            AURELIA NOIR
          </h1>

          {/* Tagline — Refined letter spacing and vertical breathing room */}
          <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-7">
            <div className="h-[1.5px] w-10 sm:w-12 bg-gradient-to-r from-[#D6AD55] to-[#E8C36B]" />
            <h2 className="font-cinzel text-xs sm:text-[13px] md:text-sm tracking-[0.22em] text-[#E8C36B] uppercase font-medium">
              Escape the Ordinary.
            </h2>
          </div>

          {/* Supporting Description — Balanced measure and breathing room */}
          <p className="font-sans text-sm sm:text-base text-[#F4EFE5]/80 leading-relaxed max-w-lg mb-8 sm:mb-10">
            Discover a private coastal retreat where extraordinary architecture meets unforgettable ocean views.
          </p>

          {/* Primary & Secondary Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <button
              onClick={() => onNavigate('the-retreat')}
              className="px-8 py-3.5 sm:py-4 text-xs font-bold tracking-[0.16em] uppercase btn-gold cursor-pointer text-center"
            >
              Explore The Retreat
            </button>
            <button
              onClick={() => onNavigate('suites')}
              className="px-8 py-3.5 sm:py-4 text-xs font-semibold tracking-[0.16em] uppercase btn-outline-ivory backdrop-blur-sm cursor-pointer text-center"
            >
              Discover Our Suites
            </button>
          </div>
        </div>

        {/* Scene Progress Indicators */}
        <div className="mt-14 pt-8 border-t border-[#232328]/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="grid grid-cols-3 gap-4 sm:gap-8 w-full sm:max-w-xl">
            {scenes.map((scene, idx) => {
              const isActive = currentScene === idx;
              return (
                <button
                  key={scene.id}
                  onClick={() => selectScene(idx)}
                  className="text-left group cursor-pointer focus-visible:outline-none"
                >
                  <div className="w-full bg-[#232328] h-[3px] overflow-hidden mb-2 rounded-full">
                    <div
                      className={`h-full bg-gradient-to-r from-[#D6AD55] to-[#E8C36B] transition-all duration-100 ${
                        isActive ? '' : 'w-0'
                      }`}
                      style={{ width: isActive ? `${progress}%` : idx < currentScene ? '100%' : '0%' }}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[11px] text-[#E8C36B] font-semibold">0{scene.id}</span>
                    <span className={`text-[11px] font-sans tracking-wider truncate uppercase transition-colors ${
                      isActive ? 'text-[#F4EFE5] font-semibold' : 'text-[#F4EFE5]/50 group-hover:text-[#F4EFE5]/80'
                    }`}>
                      {scene.id === 1 ? 'The Ocean' : scene.id === 2 ? 'The Resort' : 'The Suite'}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="hidden md:flex items-center gap-3 text-xs text-[#F4EFE5]/60 font-sans">
            <Compass className="w-4 h-4 text-[#E8C36B]" />
            <span>Volcanic Coastline · 28°34&apos;N</span>
          </div>
        </div>
      </div>
    </section>
  );
};
