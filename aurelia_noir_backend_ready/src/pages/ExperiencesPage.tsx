import React, { useState } from 'react';
import { PageId, Experience } from '../types';
import { EXPERIENCES_DATA } from '../data/resortData';
import { ResilientImage } from '../components/ResilientImage';
import { Compass, Clock, Check, X, ArrowRight } from 'lucide-react';

interface ExperiencesPageProps {
  onNavigate: (page: PageId) => void;
}

export const ExperiencesPage: React.FC<ExperiencesPageProps> = ({ onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeModalExperience, setActiveModalExperience] = useState<Experience | null>(null);

  const categories = [
    { id: 'all', label: 'All Experiences' },
    { id: 'wellness', label: 'Wellness & Spa' },
    { id: 'ocean', label: 'Ocean Experiences' },
    { id: 'astronomy', label: 'Private Excursions' },
    { id: 'culinary', label: 'Dining Experiences' },
  ];

  const filtered = EXPERIENCES_DATA.filter((exp) => {
    return selectedCategory === 'all' || exp.category === selectedCategory;
  });

  return (
    <div className="bg-[#0B0B0D] text-[#F4EFE5] pt-32 pb-24">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-12">
        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#E8C36B] font-sans font-semibold mb-3">
          <Compass className="w-3.5 h-3.5" />
          <span>Curated Pursuits</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light text-[#F4EFE5]">
          Discover Experiences
        </h1>
        <p className="font-sans text-sm md:text-base text-[#F4EFE5]/75 max-w-2xl mt-4 leading-relaxed">
          From warm volcanic cave baths to private sunset voyages on our luxury motor yacht, every experience is designed around your schedule and comfort.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-12">
        <div className="flex flex-wrap items-center gap-2 p-2 bg-[#121215] border border-[#232328] shadow-lg">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-5 py-2.5 text-xs font-sans uppercase tracking-wider transition-all cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-[#D6AD55] to-[#E8C36B] text-[#0B0B0D] font-bold shadow-md'
                    : 'text-[#F4EFE5]/70 hover:text-[#F4EFE5] hover:bg-[#1A1A20]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Experiences Grid */}
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {filtered.map((exp) => (
            <div
              key={exp.id}
              className="border border-[#232328] bg-[#121215] overflow-hidden flex flex-col justify-between group transition-all duration-300 hover:border-[#E8C36B]/60 shadow-xl"
            >
              <div>
                <div className="relative aspect-[16/10] overflow-hidden">
                  <ResilientImage
                    src={exp.image}
                    alt={exp.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 bg-[#0B0B0D]/90 px-3 py-1 border border-[#232328] text-[10px] uppercase tracking-widest text-[#E8C36B] font-sans font-semibold">
                    {exp.categoryLabel}
                  </div>
                  <div className="absolute bottom-4 right-4 bg-[#0B0B0D]/85 backdrop-blur-sm px-3 py-1 border border-[#232328] text-xs font-sans text-[#F4EFE5]/90 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#E8C36B]" />
                    <span>{exp.duration}</span>
                  </div>
                </div>

                <div className="p-8 space-y-4">
                  <h2 className="font-serif text-2xl md:text-3xl text-[#F4EFE5] font-light group-hover:text-[#E8C36B] transition-colors">
                    {exp.title}
                  </h2>
                  <p className="text-xs md:text-sm text-[#F4EFE5]/75 font-sans leading-relaxed">
                    {exp.description}
                  </p>

                  <div className="pt-2 space-y-1.5 border-t border-[#232328] text-xs text-[#F4EFE5]/85 font-sans">
                    <div className="text-[11px] uppercase tracking-wider text-[#E8C36B] font-semibold mb-1">
                      Highlights
                    </div>
                    {exp.highlights.slice(0, 2).map((h, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-[#E8C36B] mt-1.5 shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-8 pt-0 flex items-center justify-between border-t border-[#232328] mt-4">
                <div className="pt-4 text-xs text-[#F4EFE5]/50 font-sans">
                  <span>Host: </span>
                  <span className="text-[#F4EFE5]/85 font-medium">{exp.curator.split(',')[0]}</span>
                </div>
                <div className="pt-4 flex items-center gap-3">
                  <button
                    onClick={() => setActiveModalExperience(exp)}
                    className="px-4 py-2 text-xs uppercase tracking-wider border border-[#232328] hover:border-[#E8C36B] text-[#F4EFE5] hover:text-[#E8C36B] transition-colors cursor-pointer"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => onNavigate('contact')}
                    className="px-4 py-2 text-xs uppercase tracking-wider btn-gold cursor-pointer"
                  >
                    Inquire
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Experience Details Modal */}
      {activeModalExperience && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in"
        >
          <div className="bg-[#121215] border border-[#232328] max-w-2xl w-full p-8 relative max-h-[90vh] overflow-y-auto shadow-2xl">
            <button
              onClick={() => setActiveModalExperience(null)}
              className="absolute top-6 right-6 p-2 text-[#F4EFE5]/60 hover:text-[#F4EFE5] cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative aspect-[16/9] mb-6 overflow-hidden border border-[#232328]">
              <ResilientImage
                src={activeModalExperience.image}
                alt={activeModalExperience.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-xs uppercase tracking-wider text-[#E8C36B] font-sans font-semibold">
                <span>{activeModalExperience.categoryLabel}</span>
                <span>·</span>
                <span>{activeModalExperience.duration}</span>
              </div>
              <h3 className="font-serif text-3xl text-[#F4EFE5]">{activeModalExperience.title}</h3>
              <p className="text-xs md:text-sm text-[#F4EFE5]/80 font-sans leading-relaxed">
                {activeModalExperience.description}
              </p>

              <div className="border-t border-[#232328] pt-4 space-y-2">
                <span className="text-xs uppercase tracking-wider text-[#E8C36B] font-sans font-semibold">
                  What is Included
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#F4EFE5]/75 font-sans">
                  {activeModalExperience.inclusions.map((inc, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-[#E8C36B] mt-0.5 shrink-0" />
                      <span>{inc}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-[#232328] pt-4 text-xs font-sans text-[#F4EFE5]/60">
                <div className="flex items-center gap-2 text-[#F4EFE5]">
                  <Clock className="w-4 h-4 text-[#E8C36B]" />
                  <span className="font-medium">Schedule:</span>
                </div>
                <p className="mt-1">{activeModalExperience.schedule}</p>
              </div>

              <div className="border-t border-[#232328] pt-6 flex items-center justify-between">
                <div className="text-xs text-[#F4EFE5]/50">
                  Arranged by {activeModalExperience.curator}
                </div>
                <button
                  onClick={() => {
                    setActiveModalExperience(null);
                    onNavigate('contact');
                  }}
                  className="px-6 py-3 text-xs uppercase tracking-wider btn-gold cursor-pointer"
                >
                  Book Experience
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
