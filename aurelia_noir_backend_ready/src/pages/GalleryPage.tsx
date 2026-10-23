import React, { useState } from 'react';
import { PageId, GalleryItem } from '../types';
import { GALLERY_ITEMS } from '../data/resortData';
import { ResilientImage } from '../components/ResilientImage';
import { LightboxModal } from '../components/LightboxModal';
import { Compass, Maximize2 } from 'lucide-react';

interface GalleryPageProps {
  onNavigate: (page: PageId) => void;
}

export const GalleryPage: React.FC<GalleryPageProps> = ({ onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);

  const categories = [
    { id: 'all', label: 'All Photographs (8)' },
    { id: 'architecture', label: 'Architecture' },
    { id: 'suites', label: 'Suites & Living' },
    { id: 'coastline', label: 'Coastline' },
    { id: 'gastronomy', label: 'Gastronomy' },
    { id: 'wellness', label: 'Wellness & Spa' },
  ];

  const filteredItems = GALLERY_ITEMS.filter((item) => {
    return selectedCategory === 'all' || item.category === selectedCategory;
  });

  const handleOpenPhoto = (idx: number) => {
    setActivePhotoIndex(idx);
    setLightboxOpen(true);
  };

  return (
    <div className="bg-[#0B0B0D] text-[#F4EFE5] pt-32 pb-24">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-12">
        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#E8C36B] font-sans font-semibold mb-3">
          <Compass className="w-3.5 h-3.5" />
          <span>Visual Archive</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light text-[#F4EFE5]">
          The Photographic Archive
        </h1>
        <p className="font-sans text-sm md:text-base text-[#F4EFE5]/75 max-w-2xl mt-4 leading-relaxed">
          A high-resolution visual collection capturing volcanic cliffs, cantilevered stone pavilions, warm interior lighting, and calm ocean waters.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-12">
        <div className="flex flex-wrap items-center gap-2 p-2 bg-[#121215] border border-[#232328] shadow-lg">
          {categories.map((cat) => {
            const isSel = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-5 py-2.5 text-xs font-sans uppercase tracking-wider transition-all cursor-pointer ${
                  isSel
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

      {/* Gallery Grid */}
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => handleOpenPhoto(idx)}
              className="border border-[#232328] bg-[#121215] overflow-hidden group cursor-pointer transition-all duration-300 hover:border-[#E8C36B]/60 flex flex-col justify-between shadow-xl"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <ResilientImage
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                <div className="absolute top-3 left-3 bg-[#0B0B0D]/90 px-3 py-1 text-[10px] uppercase font-sans tracking-widest text-[#E8C36B] border border-[#232328] font-semibold">
                  {item.categoryLabel}
                </div>
                <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-[#0B0B0D]/90 p-2 border border-[#232328] text-[#F4EFE5]">
                  <Maximize2 className="w-4 h-4 text-[#E8C36B]" />
                </div>
              </div>

              <div className="p-6 space-y-2">
                <h3 className="font-serif text-xl text-[#F4EFE5] group-hover:text-[#E8C36B] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-[#F4EFE5]/65 font-sans line-clamp-2">
                  {item.caption}
                </p>
                <div className="pt-3 flex items-center justify-between text-[11px] text-[#F4EFE5]/40 font-mono border-t border-[#232328]">
                  <span>{item.location}</span>
                  {item.cameraInfo && <span>{item.cameraInfo.split('·')[0]}</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Accessible Lightbox Modal */}
      <LightboxModal
        items={filteredItems}
        currentIndex={activePhotoIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNext={() => setActivePhotoIndex((i) => (i + 1) % filteredItems.length)}
        onPrev={() => setActivePhotoIndex((i) => (i - 1 + filteredItems.length) % filteredItems.length)}
      />
    </div>
  );
};
