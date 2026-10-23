import React, { useState } from 'react';
import { PageId, Suite } from '../types';
import { SUITES_DATA } from '../data/resortData';
import { ResilientImage } from '../components/ResilientImage';
import { LightboxModal } from '../components/LightboxModal';
import {
  ArrowLeft,
  Maximize,
  Bed,
  Users,
  Waves,
  Check,
} from 'lucide-react';

interface SuiteDetailPageProps {
  suiteId?: string;
  onNavigate: (page: PageId, suiteId?: string) => void;
  onSelectForReservation?: (suiteId: string, arrival?: string, departure?: string) => void;
}

export const SuiteDetailPage: React.FC<SuiteDetailPageProps> = ({
  suiteId,
  onNavigate,
  onSelectForReservation,
}) => {
  const currentSuite: Suite =
    SUITES_DATA.find((s) => s.id === suiteId) || SUITES_DATA[0];

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const today = new Date();
  const defaultArrival = new Date(today.getTime() + 14 * 86400000).toISOString().split('T')[0];
  const defaultDeparture = new Date(today.getTime() + 17 * 86400000).toISOString().split('T')[0];

  const [arrivalDate, setArrivalDate] = useState(defaultArrival);
  const [departureDate, setDepartureDate] = useState(defaultDeparture);
  const [guestCount, setGuestCount] = useState(2);

  const calculateNights = () => {
    const arr = new Date(arrivalDate);
    const dep = new Date(departureDate);
    const diff = Math.ceil((dep.getTime() - arr.getTime()) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 2;
  };

  const nights = calculateNights();
  const baseRate = currentSuite.pricePerNight * nights;
  const resortTaxAndService = Math.round(baseRate * 0.12);
  const totalEstimated = baseRate + resortTaxAndService;

  const handleOpenLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const galleryItems = currentSuite.images.gallery.map((img, idx) => ({
    id: `suite-gallery-${idx}`,
    title: `${currentSuite.name} — Perspective 0${idx + 1}`,
    category: 'suites' as const,
    categoryLabel: currentSuite.categoryLabel,
    location: currentSuite.specs.level,
    image: img,
    caption: `${currentSuite.name}. ${currentSuite.headline}`,
  }));

  const handleProceedToBooking = () => {
    if (onSelectForReservation) {
      onSelectForReservation(currentSuite.id, arrivalDate, departureDate);
    }
    onNavigate('reservations', currentSuite.id);
  };

  return (
    <div className="bg-[#0B0B0D] text-[#F4EFE5] pt-32 pb-24">
      {/* Top Breadcrumb & Switcher */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <button
          onClick={() => onNavigate('suites')}
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-[#F4EFE5]/70 hover:text-[#E8C36B] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Accommodations</span>
        </button>

        {/* Quick Suite Selector Dropdown */}
        <div className="flex items-center gap-3 text-xs">
          <span className="text-[#F4EFE5]/50 uppercase tracking-wider font-sans">Browse Residence:</span>
          <select
            value={currentSuite.id}
            onChange={(e) => onNavigate('suite-details', e.target.value)}
            className="bg-[#17171B] border border-[#232328] px-3 py-1.5 text-xs text-[#F4EFE5] focus:outline-none focus:border-[#E8C36B] font-sans cursor-pointer"
          >
            {SUITES_DATA.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name} (${s.pricePerNight.toLocaleString()}/nt)
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Suite Hero Header */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-12">
        <div className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-[#E8C36B] font-sans font-semibold mb-3">
          <span>{currentSuite.categoryLabel}</span>
          <span className="text-[#F4EFE5]/30">·</span>
          <span>{currentSuite.specs.level}</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light text-[#F4EFE5] leading-tight">
          {currentSuite.name}
        </h1>
        <p className="font-sans text-sm md:text-base text-[#F4EFE5]/80 max-w-2xl mt-4 leading-relaxed">
          {currentSuite.headline}
        </p>
      </div>

      {/* Multi-Image Hero Grid with Lightbox Triggers */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Main Hero Photo (Left 8 cols) */}
          <div
            onClick={() => handleOpenLightbox(0)}
            className="md:col-span-8 relative aspect-[16/10] overflow-hidden border border-[#232328] cursor-pointer group shadow-2xl"
          >
            <ResilientImage
              src={currentSuite.images.gallery[0] || currentSuite.images.hero}
              alt={currentSuite.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
            <div className="absolute bottom-4 left-4 bg-[#0B0B0D]/85 backdrop-blur-sm px-3.5 py-1.5 border border-[#232328] text-xs font-sans text-[#F4EFE5]/90">
              Click to view in high resolution (1 of {currentSuite.images.gallery.length})
            </div>
          </div>

          {/* Secondary Stack (Right 4 cols) */}
          <div className="md:col-span-4 grid grid-cols-1 gap-4">
            {currentSuite.images.gallery.slice(1, 3).map((img, idx) => (
              <div
                key={idx}
                onClick={() => handleOpenLightbox(idx + 1)}
                className="relative aspect-[16/10] overflow-hidden border border-[#232328] cursor-pointer group shadow-xl"
              >
                <ResilientImage
                  src={img}
                  alt={`${currentSuite.name} detail ${idx + 1}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-transparent transition-colors" />
                <div className="absolute top-3 right-3 bg-[#0B0B0D]/85 p-1.5 border border-[#232328] text-[10px] text-[#F4EFE5]/90 font-sans">
                  Perspective 0{idx + 2}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Layout: Architectural Specs & Narrative vs. Stay Estimator */}
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column (8 cols): Description, Specs, Features, Amenities */}
          <div className="lg:col-span-8 space-y-12">
            {/* Quick Specs Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 bg-[#121215] border border-[#232328] shadow-lg">
              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-widest text-[#E8C36B] font-sans font-semibold">Indoor Space</span>
                <div className="font-serif text-2xl text-[#F4EFE5]">{currentSuite.specs.indoorSqFt} <span className="text-xs font-sans text-[#F4EFE5]/50">SQ FT</span></div>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-widest text-[#E8C36B] font-sans font-semibold">Terrace Deck</span>
                <div className="font-serif text-2xl text-[#F4EFE5]">{currentSuite.specs.terraceSqFt} <span className="text-xs font-sans text-[#F4EFE5]/50">SQ FT</span></div>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-widest text-[#E8C36B] font-sans font-semibold">Max Guests</span>
                <div className="font-serif text-2xl text-[#F4EFE5]">{currentSuite.specs.maxGuests} <span className="text-xs font-sans text-[#F4EFE5]/50">GUESTS</span></div>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-widest text-[#E8C36B] font-sans font-semibold">Heated Pool</span>
                <div className="font-serif text-2xl text-[#F4EFE5]">{currentSuite.specs.poolLengthMeters}M <span className="text-xs font-sans text-[#F4EFE5]/50">HORIZON</span></div>
              </div>
            </div>

            {/* Architectural Narrative */}
            <div className="space-y-4">
              <h2 className="font-serif text-2xl md:text-3xl text-[#F4EFE5] font-light">
                The Living Experience
              </h2>
              <p className="text-sm md:text-base text-[#F4EFE5]/80 font-sans leading-relaxed">
                {currentSuite.description}
              </p>
              <div className="border border-[#232328] bg-[#17171B]/60 p-6">
                <blockquote className="font-serif text-xl italic text-[#E8C36B]">
                  &ldquo;{currentSuite.editorialQuote}&rdquo;
                </blockquote>
              </div>
            </div>

            {/* Signature Features List */}
            <div className="space-y-4">
              <h3 className="font-serif text-2xl text-[#F4EFE5] font-light">
                Key Features
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs md:text-sm font-sans text-[#F4EFE5]/85">
                {currentSuite.features.map((feat, i) => (
                  <div key={i} className="flex items-start gap-3 p-3.5 bg-[#121215] border border-[#232328]">
                    <span className="w-1.5 h-1.5 bg-[#E8C36B] mt-2 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Detailed Amenities */}
            <div className="space-y-6 pt-4">
              <h3 className="font-serif text-2xl text-[#F4EFE5] font-light">
                In-Suite Amenities
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {currentSuite.amenities.map((group, idx) => (
                  <div key={idx} className="p-6 bg-[#121215] border border-[#232328] space-y-3 shadow-lg">
                    <h4 className="text-xs uppercase tracking-wider text-[#E8C36B] font-sans font-semibold">
                      {group.title}
                    </h4>
                    <ul className="space-y-2 text-xs text-[#F4EFE5]/75 font-sans">
                      {group.items.map((item, itemIdx) => (
                        <li key={itemIdx} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-[#E8C36B] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column (4 cols): Interactive Stay Quote Estimator Sticky Card */}
          <div className="lg:col-span-4 sticky top-28 bg-[#121215] border border-[#232328] p-8 space-y-6 shadow-2xl">
            <div className="pb-4 border-b border-[#232328]">
              <span className="text-[10px] uppercase tracking-widest text-[#F4EFE5]/50 font-sans">
                Illustrative Rate
              </span>
              <div className="font-serif text-3xl text-[#F4EFE5] mt-1">
                ${currentSuite.pricePerNight.toLocaleString()}{' '}
                <span className="text-xs text-[#F4EFE5]/50 font-sans">/ night</span>
              </div>
            </div>

            <div className="space-y-4">
              <span className="text-xs uppercase tracking-wider text-[#E8C36B] font-sans font-semibold">
                Stay Date Estimator
              </span>

              <div className="space-y-3 font-sans text-xs">
                <div>
                  <label className="block text-[#F4EFE5]/70 mb-1">Arrival Date</label>
                  <input
                    type="date"
                    value={arrivalDate}
                    onChange={(e) => setArrivalDate(e.target.value)}
                    className="w-full bg-[#17171B] border border-[#232328] p-2.5 text-[#F4EFE5] focus:outline-none focus:border-[#E8C36B]"
                  />
                </div>

                <div>
                  <label className="block text-[#F4EFE5]/70 mb-1">Departure Date</label>
                  <input
                    type="date"
                    value={departureDate}
                    onChange={(e) => setDepartureDate(e.target.value)}
                    className="w-full bg-[#17171B] border border-[#232328] p-2.5 text-[#F4EFE5] focus:outline-none focus:border-[#E8C36B]"
                  />
                </div>

                <div>
                  <label className="block text-[#F4EFE5]/70 mb-1">Guests</label>
                  <select
                    value={guestCount}
                    onChange={(e) => setGuestCount(Number(e.target.value))}
                    className="w-full bg-[#17171B] border border-[#232328] p-2.5 text-[#F4EFE5] focus:outline-none focus:border-[#E8C36B] cursor-pointer"
                  >
                    {Array.from({ length: currentSuite.specs.maxGuests }, (_, i) => i + 1).map((n) => (
                      <option key={n} value={n}>
                        {n} {n === 1 ? 'Guest' : 'Guests'} (Max {currentSuite.specs.maxGuests})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Price Breakdown Calculation */}
              <div className="pt-4 border-t border-[#232328] space-y-2 text-xs font-sans">
                <div className="flex justify-between text-[#F4EFE5]/70">
                  <span>
                    ${currentSuite.pricePerNight.toLocaleString()} × {nights} nights
                  </span>
                  <span className="font-mono text-[#F4EFE5]">${baseRate.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[#F4EFE5]/70">
                  <span>Environmental & Service (12%)</span>
                  <span className="font-mono text-[#F4EFE5]">${resortTaxAndService.toLocaleString()}</span>
                </div>
                <div className="pt-2 border-t border-[#232328] flex justify-between font-serif text-lg text-[#F4EFE5]">
                  <span>Estimated Total</span>
                  <span className="text-[#E8C36B] font-semibold">${totalEstimated.toLocaleString()}</span>
                </div>
              </div>

              <button
                onClick={handleProceedToBooking}
                className="w-full py-4 text-xs uppercase tracking-[0.18em] btn-gold cursor-pointer mt-4"
              >
                Reserve This Suite
              </button>

              <p className="text-[11px] text-[#F4EFE5]/40 text-center font-sans">
                Inquiries are reviewed personally by our private desk within 4 hours. No payment taken today.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      <LightboxModal
        items={galleryItems}
        currentIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNext={() => setLightboxIndex((i) => (i + 1) % galleryItems.length)}
        onPrev={() => setLightboxIndex((i) => (i - 1 + galleryItems.length) % galleryItems.length)}
      />
    </div>
  );
};
