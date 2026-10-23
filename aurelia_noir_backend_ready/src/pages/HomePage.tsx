import React from 'react';
import { HeroCinematic } from '../components/HeroCinematic';
import { ResilientImage } from '../components/ResilientImage';
import { RESORT_IMAGES, RESORT_METRICS, SUITES_DATA, EXPERIENCES_DATA } from '../data/resortData';
import { PageId } from '../types';
import { ArrowRight, Compass, Sparkles, Waves, ShieldCheck } from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: PageId, suiteId?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const featuredSuites = SUITES_DATA.slice(0, 3);
  const featuredExperiences = EXPERIENCES_DATA.slice(0, 3);

  return (
    <div className="bg-[#0B0B0D] text-[#F4EFE5] overflow-hidden">
      {/* 1. Cinematic 3-Scene Hero Opening */}
      <HeroCinematic onNavigate={onNavigate} />

      {/* 2. Light Stone Contrast Section: Resort Story & Architectural Introduction */}
      <section id="storytelling-intro" className="py-24 md:py-32 bg-[#F4EFE5] text-[#0B0B0D] relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-5 space-y-6">
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#8C6A38] font-sans font-semibold">
                <Compass className="w-3.5 h-3.5" />
                <span>The Obsidian Sanctuary</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#0B0B0D] leading-[1.1] font-light text-balance">
                Built from Volcanic Stone. Framed by Endless Water.
              </h2>
              <div className="h-[2px] w-16 bg-[#8C6A38]" />
              <p className="font-sans text-sm md:text-base text-[#171719]/80 leading-relaxed">
                Aurelia Noir is an architectural coastal retreat perched forty-two meters above the Atlantic ocean. Eighteen private cliffside villas blend dark volcanic stone, natural timber, and floor-to-ceiling glass to create an atmosphere of complete quiet and calm.
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-6">
                <button
                  onClick={() => onNavigate('the-retreat')}
                  className="px-6 py-3 text-xs uppercase tracking-[0.16em] font-semibold bg-[#0B0B0D] text-[#F4EFE5] hover:bg-[#1A1A20] transition-colors cursor-pointer"
                >
                  Explore The Retreat
                </button>
                <button
                  onClick={() => onNavigate('our-world')}
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] font-semibold text-[#8C6A38] hover:text-[#0B0B0D] transition-colors cursor-pointer"
                >
                  <span>Our Philosophy</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="relative overflow-hidden shadow-2xl group border border-[#171719]/15">
                <ResilientImage
                  src={RESORT_IMAGES.retreatCliffVillas}
                  alt="Private villa terrace and heated infinity pool at sunset"
                  className="w-full aspect-[16/10] object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-6 text-white flex justify-between items-end">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-[#E8C36B] font-sans font-semibold">Private Villa Terrace</span>
                    <h3 className="font-serif text-xl sm:text-2xl mt-0.5">Heated Horizon Plunge Pool</h3>
                  </div>
                  <span className="text-xs font-mono text-white/80">Tier Two</span>
                </div>
              </div>
            </div>
          </div>

          {/* Key Metrics Row in Light Stone */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-16 mt-16 border-t border-[#0B0B0D]/15">
            {RESORT_METRICS.map((metric, idx) => (
              <div key={idx} className="space-y-1">
                <div className="font-serif text-3xl md:text-5xl text-[#0B0B0D] font-light tracking-tight">
                  {metric.value}
                </div>
                <div className="text-xs uppercase tracking-wider text-[#8C6A38] font-sans font-semibold">
                  {metric.label}
                </div>
                <div className="text-xs text-[#171719]/60 font-sans">
                  {metric.detail}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Signature Suites & Villas: Asymmetrical Editorial Showcase */}
      <section className="py-28 md:py-36 bg-[#0B0B0D] border-b border-[#232328]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-[#E8C36B] font-sans font-semibold">
                Private Accommodations
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#F4EFE5] font-light mt-2">
                Suites & Villas
              </h2>
            </div>
            <button
              onClick={() => onNavigate('suites')}
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-[#E8C36B] hover:text-[#F4EFE5] font-semibold transition-colors cursor-pointer"
            >
              <span>View All 18 Residences</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Marquee Suite 1: Full-width Heroic Card */}
          <div className="mb-14 border border-[#232328] bg-[#121215] overflow-hidden group">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              <div className="lg:col-span-7 relative overflow-hidden min-h-[380px]">
                <ResilientImage
                  src={featuredSuites[0].images.hero}
                  alt={featuredSuites[0].name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-[#0B0B0D]/90 px-3.5 py-1.5 border border-[#232328] text-[10px] uppercase tracking-widest text-[#E8C36B] font-sans font-semibold">
                  Featured Sanctuary
                </div>
              </div>
              <div className="lg:col-span-5 p-8 md:p-12 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-2 text-xs text-[#F4EFE5]/60 font-sans">
                    <span>{featuredSuites[0].specs.indoorSqFt} SQ FT</span>
                    <span>·</span>
                    <span>UP TO {featuredSuites[0].specs.maxGuests} GUESTS</span>
                    <span>·</span>
                    <span>22M PRIVATE POOL</span>
                  </div>
                  <h3 className="font-serif text-2xl md:text-4xl text-[#F4EFE5] font-light">
                    {featuredSuites[0].name}
                  </h3>
                  <p className="text-sm text-[#F4EFE5]/75 font-sans leading-relaxed">
                    {featuredSuites[0].description}
                  </p>
                  <div className="pt-2 text-xs text-[#E8C36B] font-sans">
                    Includes dedicated 24-hour butler and private chef.
                  </div>
                </div>

                <div className="pt-8 mt-8 border-t border-[#232328] flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-[#F4EFE5]/50 uppercase tracking-widest font-sans">From</span>
                    <div className="font-serif text-2xl md:text-3xl text-[#F4EFE5]">
                      ${featuredSuites[0].pricePerNight.toLocaleString()}{' '}
                      <span className="text-xs text-[#F4EFE5]/50 font-sans">/ night</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => onNavigate('suite-details', featuredSuites[0].id)}
                      className="px-5 py-2.5 text-xs uppercase tracking-wider border border-[#232328] hover:border-[#E8C36B] text-[#F4EFE5] hover:text-[#E8C36B] transition-colors cursor-pointer"
                    >
                      Details
                    </button>
                    <button
                      onClick={() => onNavigate('reservations')}
                      className="px-5 py-2.5 text-xs uppercase tracking-wider btn-gold cursor-pointer"
                    >
                      Enquire
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Secondary Suites 2 & 3: Side-by-Side with completely different images */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="border border-[#232328] bg-[#121215] overflow-hidden flex flex-col justify-between group">
              <div className="relative aspect-[16/10] overflow-hidden">
                <ResilientImage
                  src={RESORT_IMAGES.suiteMasterBedroom}
                  alt={featuredSuites[2].name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-[#0B0B0D]/90 px-3 py-1 border border-[#232328] text-[10px] uppercase tracking-widest text-[#E8C36B] font-sans font-semibold">
                  Couples Haven
                </div>
              </div>
              <div className="p-8 flex-1 flex flex-col justify-between space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs text-[#F4EFE5]/60 font-sans">
                    <span>2,200 SQ FT</span>
                    <span>·</span>
                    <span>1 KING BED</span>
                    <span>·</span>
                    <span>OCEAN VIEW</span>
                  </div>
                  <h3 className="font-serif text-2xl text-[#F4EFE5] font-light">
                    Azure Master Pavilion
                  </h3>
                  <p className="text-xs sm:text-sm text-[#F4EFE5]/70 font-sans leading-relaxed">
                    Designed for couples seeking quietude. High glass doors slide open to your private terrace and heated pool.
                  </p>
                </div>
                <div className="pt-6 border-t border-[#232328] flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-[#F4EFE5]/50 uppercase tracking-widest font-sans">From</span>
                    <div className="font-serif text-xl text-[#F4EFE5]">
                      $3,900 <span className="text-xs text-[#F4EFE5]/50 font-sans">/ night</span>
                    </div>
                  </div>
                  <button
                    onClick={() => onNavigate('suite-details', 'azure-master-pavilion')}
                    className="px-4 py-2 text-xs uppercase tracking-wider btn-gold cursor-pointer"
                  >
                    View Pavilion
                  </button>
                </div>
              </div>
            </div>

            <div className="border border-[#232328] bg-[#121215] overflow-hidden flex flex-col justify-between group">
              <div className="relative aspect-[16/10] overflow-hidden">
                <ResilientImage
                  src={RESORT_IMAGES.suitePenthouseTerrace}
                  alt={SUITES_DATA[3].name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-[#0B0B0D]/90 px-3 py-1 border border-[#232328] text-[10px] uppercase tracking-widest text-[#E8C36B] font-sans font-semibold">
                  Rooftop Penthouse
                </div>
              </div>
              <div className="p-8 flex-1 flex flex-col justify-between space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs text-[#F4EFE5]/60 font-sans">
                    <span>4,100 SQ FT</span>
                    <span>·</span>
                    <span>2 KING BEDS</span>
                    <span>·</span>
                    <span>270° PANORAMA</span>
                  </div>
                  <h3 className="font-serif text-2xl text-[#F4EFE5] font-light">
                    Noir Horizon Penthouse
                  </h3>
                  <p className="text-xs sm:text-sm text-[#F4EFE5]/70 font-sans leading-relaxed">
                    Cantilevered rooftop swimming pool with glass railings and 270-degree views of the Atlantic coast.
                  </p>
                </div>
                <div className="pt-6 border-t border-[#232328] flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-[#F4EFE5]/50 uppercase tracking-widest font-sans">From</span>
                    <div className="font-serif text-xl text-[#F4EFE5]">
                      $6,900 <span className="text-xs text-[#F4EFE5]/50 font-sans">/ night</span>
                    </div>
                  </div>
                  <button
                    onClick={() => onNavigate('suite-details', 'noir-horizon-penthouse')}
                    className="px-4 py-2 text-xs uppercase tracking-wider btn-gold cursor-pointer"
                  >
                    View Penthouse
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Striking Architectural Monolith Section */}
      <section className="relative py-28 md:py-36 bg-[#102A3A]/40 border-b border-[#232328]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs uppercase tracking-[0.25em] text-[#E8C36B] font-sans font-semibold">
                Architecture of Silence
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#F4EFE5] font-light leading-snug">
                Where Structure Dissolves into the Atlantic Horizon.
              </h2>
              <p className="text-sm md:text-base text-[#F4EFE5]/80 font-sans leading-relaxed">
                Constructed using volcanic basalt quarried on site, our cliff pavilions balance structural cantilevers with natural warmth. Floor-to-ceiling glass doors slide into hidden wall pockets, letting the fresh sea breeze flow throughout your residence.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => onNavigate('the-retreat')}
                  className="px-6 py-3.5 text-xs uppercase tracking-[0.16em] btn-outline-ivory cursor-pointer"
                >
                  Discover The Estate Grounds
                </button>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="border border-[#232328] shadow-2xl overflow-hidden group">
                <ResilientImage
                  src={RESORT_IMAGES.heroRetreat}
                  alt="Cantilevered cliffside resort at dusk"
                  className="w-full aspect-[16/10] object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Experiences Preview with 3 Distinct Visuals */}
      <section className="py-28 md:py-36 bg-[#0B0B0D] border-b border-[#232328]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="max-w-2xl mb-16">
            <span className="text-xs uppercase tracking-[0.25em] text-[#E8C36B] font-sans font-semibold">
              Curated Pursuits
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-[#F4EFE5] font-light mt-2">
              Discover Experiences
            </h2>
            <p className="text-sm md:text-base text-[#F4EFE5]/75 font-sans mt-3">
              From subterranean thermal baths to private sunset voyages on our luxury motor yacht, enjoy memorable activities without rush or crowds.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredExperiences.map((exp) => (
              <div
                key={exp.id}
                onClick={() => onNavigate('experiences')}
                className="group border border-[#232328] bg-[#121215] overflow-hidden cursor-pointer transition-all duration-300 hover:border-[#E8C36B]/60"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <ResilientImage
                    src={exp.image}
                    alt={exp.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0D] via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-3 left-3 text-[11px] font-sans uppercase tracking-widest text-[#E8C36B] font-semibold">
                    {exp.categoryLabel}
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <h3 className="font-serif text-xl text-[#F4EFE5] group-hover:text-[#E8C36B] transition-colors">
                    {exp.title}
                  </h3>
                  <p className="text-xs md:text-sm text-[#F4EFE5]/70 font-sans line-clamp-2 leading-relaxed">
                    {exp.tagline}
                  </p>
                  <div className="pt-3 flex items-center justify-between text-xs text-[#F4EFE5]/50 font-sans border-t border-[#232328]">
                    <span>{exp.duration}</span>
                    <span className="text-[#E8C36B] font-medium flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                      Explore <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Refined Dining Section: Noir & Mare Feature */}
      <section className="py-28 md:py-36 bg-[#0E0E12] border-b border-[#232328]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs uppercase tracking-[0.25em] text-[#E8C36B] font-sans font-semibold">
                Oceanfront Gastronomy
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl text-[#F4EFE5] font-light leading-tight">
                Exceptional Dining, Inspired by the Sea.
              </h2>
              <div className="h-[2px] w-14 bg-gradient-to-r from-[#D6AD55] to-[#E8C36B]" />
              <p className="text-sm md:text-base text-[#F4EFE5]/80 font-sans leading-relaxed">
                Set directly above the crashing surf upon polished dark marble, Noir & Mare celebrates fresh Atlantic seafood. Led by Executive Chef Laurent Mercier, each evening features a tasting menu of fresh scallops, wild turbot, and local delicacies.
              </p>

              <div className="p-5 bg-[#17171B] border border-[#232328] text-xs font-sans text-[#F4EFE5]/80 space-y-1.5">
                <div className="flex items-center justify-between text-[#E8C36B] font-semibold">
                  <span>Chef&apos;s Feature Course</span>
                  <span className="font-mono text-[10px]">TASTING MENU</span>
                </div>
                <div className="font-serif text-lg text-[#F4EFE5]">Pan-Seared Sea Scallops</div>
                <p className="text-xs text-[#F4EFE5]/60">Hand-dived king scallops, delicate squid ink emulsion, crisp samphire.</p>
              </div>

              <div className="pt-2 flex items-center gap-4">
                <button
                  onClick={() => onNavigate('dining')}
                  className="px-6 py-3.5 text-xs uppercase tracking-[0.16em] btn-gold cursor-pointer"
                >
                  Explore Dining & Menus
                </button>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="border border-[#232328] shadow-2xl overflow-hidden group">
                <ResilientImage
                  src={RESORT_IMAGES.diningSignature}
                  alt="Candlelit oceanfront dinner at Noir & Mare"
                  className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Curated Gallery Preview (Using 4 New Unique Visuals) */}
      <section className="py-24 md:py-32 bg-[#0B0B0D] border-b border-[#232328]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-[#E8C36B] font-sans font-semibold">
                Visual Archive
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#F4EFE5] font-light mt-1">
                Scenes of Aurelia Noir
              </h2>
            </div>
            <button
              onClick={() => onNavigate('gallery')}
              className="text-xs uppercase tracking-[0.16em] text-[#E8C36B] hover:text-[#F4EFE5] font-semibold flex items-center gap-2 transition-colors cursor-pointer"
            >
              <span>View Full Gallery (8)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { img: RESORT_IMAGES.villaCoveWaterfront, title: 'Waterfront Cove Villa' },
              { img: RESORT_IMAGES.wineCellarVault, title: 'The Wine Cellar' },
              { img: RESORT_IMAGES.restaurantOutdoorLounge, title: 'Sunset Raw Bar' },
              { img: RESORT_IMAGES.culinaryPlating, title: 'Chef Plating Atelier' },
            ].map((item, idx) => (
              <div
                key={idx}
                onClick={() => onNavigate('gallery')}
                className="group relative aspect-[3/4] overflow-hidden border border-[#232328] cursor-pointer"
              >
                <ResilientImage
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0D]/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <span className="font-serif text-base text-[#F4EFE5]">{item.title}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Strong Reservation Call To Action */}
      <section className="py-28 md:py-36 relative bg-gradient-to-b from-[#0B0B0D] to-[#121215] text-center">
        <div className="max-w-4xl mx-auto px-6 md:px-12 space-y-6">
          <div className="w-6 h-6 border border-[#E8C36B] rotate-45 flex items-center justify-center mx-auto shadow-[0_0_12px_rgba(232,195,107,0.3)]">
            <div className="w-1.5 h-1.5 bg-[#E8C36B]" />
          </div>
          <span className="text-xs uppercase tracking-[0.25em] text-[#E8C36B] font-sans font-semibold">
            Discover a Stay Designed Around You
          </span>
          <h2 className="font-serif text-4xl sm:text-6xl text-[#F4EFE5] font-light leading-tight">
            Escape the Ordinary.
          </h2>
          <p className="text-sm md:text-base text-[#F4EFE5]/80 font-sans max-w-xl mx-auto leading-relaxed">
            With only eighteen cliffside residences, every stay is individually prepared. Our private office will coordinate your journey from arrival to departure.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onNavigate('reservations')}
              className="px-8 py-4 text-xs uppercase tracking-[0.18em] btn-gold cursor-pointer"
            >
              Submit Reservation Enquiry
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="px-8 py-4 text-xs uppercase tracking-[0.18em] btn-outline-ivory cursor-pointer"
            >
              Contact Concierge Office
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
