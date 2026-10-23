import React, { useState } from 'react';
import { PageId } from '../types';
import { DINING_VENUES_DATA } from '../data/resortData';
import { ResilientImage } from '../components/ResilientImage';
import { Compass, Sparkles, Utensils, Clock, Wine, ArrowRight } from 'lucide-react';

interface DiningPageProps {
  onNavigate: (page: PageId) => void;
}

export const DiningPage: React.FC<DiningPageProps> = ({ onNavigate }) => {
  const [activeVenueId, setActiveVenueId] = useState<string>('noir-and-mare');

  const currentVenue =
    DINING_VENUES_DATA.find((v) => v.id === activeVenueId) || DINING_VENUES_DATA[0];

  return (
    <div className="bg-[#0B0B0D] text-[#F4EFE5] pt-32 pb-24">
      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-12">
        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#E8C36B] font-sans font-semibold mb-3">
          <Compass className="w-3.5 h-3.5" />
          <span>Coastal Cuisine</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light text-[#F4EFE5] max-w-4xl leading-tight">
          Dining at Aurelia Noir
        </h1>
        <p className="font-sans text-sm md:text-base text-[#F4EFE5]/75 max-w-2xl mt-4 leading-relaxed">
          From candlelit tables suspended above crashing waves to private tastings in our 3,200-bottle stone wine cellar.
        </p>
      </div>

      {/* Culinary Philosophy Banner */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16">
        <div className="border border-[#232328] bg-[#121215] p-8 md:p-12 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <span className="text-xs uppercase tracking-[0.25em] text-[#E8C36B] font-sans font-semibold">
                Culinary Philosophy
              </span>
              <h2 className="font-serif text-2xl md:text-4xl text-[#F4EFE5] font-light">
                &ldquo;Fresh seafood, cooked simply and served with warmth.&rdquo;
              </h2>
              <p className="text-xs md:text-sm text-[#F4EFE5]/75 font-sans leading-relaxed">
                Executive Chef Laurent Mercier crafts menus inspired by the daily catch. Fresh scallops, wild turbot, and local produce are prepared with French precision and paired with exceptional European wines.
              </p>
            </div>
            <div className="lg:col-span-4 border-l border-[#232328] pl-8 space-y-2 text-xs text-[#F4EFE5]/70 font-sans">
              <div className="text-base text-[#F4EFE5] font-serif">Laurent Mercier</div>
              <div className="text-[#E8C36B] font-medium">Executive Chef</div>
              <p className="text-[11px] text-[#F4EFE5]/50 pt-2">
                Sample menus and illustrative pricing presented as fictional concept content.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Venue Selector Navigation */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-12">
        <div className="flex flex-wrap items-center gap-3 border-b border-[#232328] pb-4">
          {DINING_VENUES_DATA.map((venue) => {
            const isSel = activeVenueId === venue.id;
            return (
              <button
                key={venue.id}
                onClick={() => setActiveVenueId(venue.id)}
                className={`py-2.5 px-6 text-xs uppercase tracking-[0.16em] font-sans transition-all cursor-pointer ${
                  isSel
                    ? 'bg-gradient-to-r from-[#D6AD55] to-[#E8C36B] text-[#0B0B0D] font-bold shadow-md'
                    : 'bg-[#17171B] text-[#F4EFE5]/70 hover:text-[#F4EFE5]'
                }`}
              >
                {venue.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Venue Showcase */}
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Venue Info & Photo (Left 6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="border border-[#232328] overflow-hidden aspect-[16/10] shadow-2xl">
              <ResilientImage
                src={currentVenue.image}
                alt={currentVenue.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-xs uppercase tracking-wider text-[#E8C36B] font-sans font-semibold">
                <span>{currentVenue.concept}</span>
              </div>
              <h2 className="font-serif text-3xl md:text-4xl text-[#F4EFE5] font-light">
                {currentVenue.name}
              </h2>
              <p className="text-sm text-[#F4EFE5]/80 font-sans leading-relaxed">
                {currentVenue.description}
              </p>

              <div className="p-4 bg-[#121215] border border-[#232328] space-y-2 text-xs font-sans text-[#F4EFE5]/75">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#E8C36B]" />
                  <span>{currentVenue.hours}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Utensils className="w-4 h-4 text-[#E8C36B]" />
                  <span>Dress Code: {currentVenue.dressCode}</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onNavigate('contact')}
                  className="px-6 py-3.5 text-xs uppercase tracking-wider btn-gold cursor-pointer"
                >
                  Reserve a Table or Private Tasting
                </button>
              </div>
            </div>
          </div>

          {/* Sample Menu (Right 6 cols) */}
          <div className="lg:col-span-6 bg-[#121215] border border-[#232328] p-8 md:p-12 space-y-8 shadow-2xl">
            <div className="border-b border-[#232328] pb-4 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#E8C36B] font-sans font-semibold">
                  Sample Concept Menu
                </span>
                <h3 className="font-serif text-2xl text-[#F4EFE5] mt-1">
                  Evening Selections
                </h3>
              </div>
              <Sparkles className="w-5 h-5 text-[#E8C36B]" />
            </div>

            <div className="space-y-8">
              {currentVenue.menuHighlights.map((cat, idx) => (
                <div key={idx} className="space-y-4">
                  <h4 className="font-serif text-xl text-[#E8C36B] border-b border-[#232328] pb-2 font-light">
                    {cat.category}
                  </h4>
                  <div className="space-y-5">
                    {cat.items.map((item, itemIdx) => (
                      <div key={itemIdx} className="space-y-1 font-sans">
                        <div className="flex items-baseline justify-between">
                          <span className="text-sm font-medium text-[#F4EFE5] flex items-center gap-2">
                            {item.name}
                            {item.signature && (
                              <span className="text-[10px] text-[#E8C36B] border border-[#E8C36B]/40 px-1.5 py-0.2 uppercase font-mono font-semibold">
                                Signature
                              </span>
                            )}
                          </span>
                        </div>
                        <p className="text-xs text-[#F4EFE5]/70 leading-relaxed">
                          {item.description}
                        </p>
                        {item.winePairing && (
                          <div className="text-[11px] text-[#E8C36B] flex items-center gap-1.5 pt-0.5">
                            <Wine className="w-3 h-3 text-[#E8C36B]" />
                            <span>Recommended Wine: {item.winePairing}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-6 border-t border-[#232328] text-xs text-[#F4EFE5]/50 font-sans italic text-center">
              Dietary requirements and custom dishes are happily prepared upon advance notice.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
