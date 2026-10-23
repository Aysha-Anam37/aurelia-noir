import React, { useState } from 'react';
import { PageId } from '../types';
import { RESORT_IMAGES } from '../data/resortData';
import { ResilientImage } from '../components/ResilientImage';
import { Compass, Waves, ShieldCheck, Sun, ArrowRight } from 'lucide-react';

interface TheRetreatPageProps {
  onNavigate: (page: PageId) => void;
}

export const TheRetreatPage: React.FC<TheRetreatPageProps> = ({ onNavigate }) => {
  const [selectedZone, setSelectedZone] = useState<number>(0);

  const estateZones = [
    {
      id: 0,
      code: 'ZONE 01',
      name: 'The Upper Promontory & Helipad',
      elevation: '48m Above Sea Level',
      desc: 'The highest point of Aurelia Noir. Features private helicopter pad AN-PAD 01, the Starlight Observatory Terrace, and the Presidential Sanctuary.',
      features: ['Private Helipad', 'Starlight Observatory', 'Gated Access', 'Panoramic 360° Views'],
      image: RESORT_IMAGES.heroRetreat,
    },
    {
      id: 1,
      code: 'ZONE 02',
      name: 'The Cliffside Pavilions & Horizon Pool',
      elevation: '28m Above Sea Level',
      desc: 'The heart of the resort. Features cantilevered stone residences over volcanic cliffs, our 40-meter black stone infinity pool, and the signature restaurant Noir & Mare.',
      features: ['40m Cantilevered Pool', 'Noir & Mare Fine Dining', 'Oceanfront Lounge', 'Cliffside Funicular'],
      image: RESORT_IMAGES.retreatCliffVillas,
    },
    {
      id: 2,
      code: 'ZONE 03',
      name: 'The Subterranean Thermal Caverns',
      elevation: '12m Above Sea Level',
      desc: 'Carved directly into natural rock caverns. Houses the thermal mineral baths, basalt steam rooms, and the 3,200-bottle wine cellar.',
      features: ['Warm Mineral Baths', 'Basalt Steam Hammam', 'Private Wine Vault', 'Acoustic Sound Grotto'],
      image: RESORT_IMAGES.spaHydrotherapy,
    },
    {
      id: 3,
      code: 'ZONE 04',
      name: 'Cathedral Cove & Marina Berth 4A',
      elevation: 'Sea Level (Tidal Shore)',
      desc: 'A sheltered volcanic harbor providing deep-water anchorage for the resort yacht Celestia, private tender transfers, and direct beach access.',
      features: ['Deep Water Yacht Berth', 'Private Boat Pier', 'Natural Rock Lagoon', 'Beachside Evening Fire'],
      image: RESORT_IMAGES.villaCoveWaterfront,
    },
  ];

  return (
    <div className="bg-[#0B0B0D] text-[#F4EFE5] pt-32 pb-24">
      {/* Page Title */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16">
        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#E8C36B] font-sans font-semibold mb-4">
          <Compass className="w-3.5 h-3.5" />
          <span>The Coastal Estate</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light text-[#F4EFE5] leading-tight max-w-4xl">
          The Retreat: Architecture Anchored in Bedrock.
        </h1>
        <div className="h-[2px] w-20 bg-gradient-to-r from-[#D6AD55] to-[#E8C36B] my-6" />
        <p className="font-sans text-base md:text-lg text-[#F4EFE5]/75 max-w-2xl leading-relaxed">
          Spanning 42 private coastal acres, the estate is an interconnected sanctuary of cantilevered stone, volcanic caves, and quiet ocean views.
        </p>
      </div>

      {/* Main Estate Overview Graphic */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-28">
        <div className="border border-[#232328] bg-[#121215] overflow-hidden shadow-2xl">
          <div className="relative aspect-[21/9]">
            <ResilientImage
              src={RESORT_IMAGES.heroRetreat}
              alt="Aurelia Noir estate overlooking ocean"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0D] via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="text-[11px] font-sans uppercase tracking-[0.25em] text-[#E8C36B] font-semibold">Estate Grounds</span>
                <h3 className="font-serif text-2xl md:text-3xl text-[#F4EFE5]">Forty-Two Acres of Coastline</h3>
              </div>
              <div className="text-xs font-mono text-[#F4EFE5]/70">
                Lat 28.5700° N, Lon 16.3292° W
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Estate Zones Guide */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-16 border-b border-[#232328]">
        <div className="mb-12">
          <span className="text-xs uppercase tracking-[0.25em] text-[#E8C36B] font-sans font-semibold">
            Spatial Navigation
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-[#F4EFE5] font-light mt-2">
            The Four Estate Zones
          </h2>
          <p className="text-sm text-[#F4EFE5]/65 font-sans mt-2">
            Explore the vertical tiers of the property from the promontory down to the marine cove.
          </p>
        </div>

        {/* Zone Selector Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {estateZones.map((zone) => {
            const isSel = selectedZone === zone.id;
            return (
              <button
                key={zone.id}
                onClick={() => setSelectedZone(zone.id)}
                className={`text-left p-4 border transition-all cursor-pointer ${
                  isSel
                    ? 'border-[#E8C36B] bg-[#E8C36B]/10 text-[#F4EFE5] shadow-lg'
                    : 'border-[#232328] bg-[#121215]/70 text-[#F4EFE5]/65 hover:border-[#E8C36B]/50 hover:text-[#F4EFE5]'
                }`}
              >
                <div className="font-mono text-[10px] text-[#E8C36B] font-semibold">{zone.code}</div>
                <div className="font-serif text-base mt-1 line-clamp-1">{zone.name}</div>
                <div className="text-[11px] text-[#F4EFE5]/45 font-sans mt-0.5">{zone.elevation}</div>
              </button>
            );
          })}
        </div>

        {/* Active Zone Detail Showcase */}
        {(() => {
          const zone = estateZones[selectedZone];
          return (
            <div className="border border-[#232328] bg-[#121215] p-8 md:p-12 shadow-2xl">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                <div className="lg:col-span-6 space-y-6">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-[#E8C36B] font-semibold">{zone.code}</span>
                    <span className="text-[#F4EFE5]/30">·</span>
                    <span className="text-xs text-[#F4EFE5]/65 font-sans">{zone.elevation}</span>
                  </div>
                  <h3 className="font-serif text-3xl md:text-4xl text-[#F4EFE5] font-light">
                    {zone.name}
                  </h3>
                  <p className="text-sm text-[#F4EFE5]/80 font-sans leading-relaxed">
                    {zone.desc}
                  </p>
                  <div className="space-y-2 pt-2">
                    <span className="text-xs uppercase tracking-wider text-[#E8C36B] font-sans font-semibold">
                      Highlights & Access
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#F4EFE5]/75 font-sans">
                      {zone.features.map((f, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-[#E8C36B]" />
                          <span>{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-6">
                  <div className="border border-[#232328] overflow-hidden aspect-[16/10] shadow-xl">
                    <ResilientImage
                      src={zone.image}
                      alt={zone.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })()}
      </section>

      {/* Sustainable Engineering */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-24 border-b border-[#232328]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-4">
            <span className="text-xs uppercase tracking-[0.25em] text-[#E8C36B] font-sans font-semibold">
              Passive Engineering
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-[#F4EFE5] font-light leading-snug">
              Powered by Earth and Tide
            </h2>
            <p className="text-sm text-[#F4EFE5]/75 font-sans leading-relaxed">
              Aurelia Noir operates using clean geothermal heating and cooling circuits. Earth warmth heats all private horizon pools and thermal baths with zero emissions.
            </p>
            <p className="text-sm text-[#F4EFE5]/75 font-sans leading-relaxed">
              Outdoor lighting is amber-calibrated to preserve dark-sky conditions for celestial stargazing and protected marine life.
            </p>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="border border-[#232328] bg-[#121215] p-6 space-y-3">
              <Waves className="w-6 h-6 text-[#E8C36B]" />
              <h3 className="font-serif text-xl text-[#F4EFE5]">Natural Desalination</h3>
              <p className="text-xs text-[#F4EFE5]/70 font-sans leading-relaxed">
                Drinking water purified on site and infused with natural minerals.
              </p>
            </div>

            <div className="border border-[#232328] bg-[#121215] p-6 space-y-3">
              <Sun className="w-6 h-6 text-[#E8C36B]" />
              <h3 className="font-serif text-xl text-[#F4EFE5]">Solar Roof Integration</h3>
              <p className="text-xs text-[#F4EFE5]/70 font-sans leading-relaxed">
                Photovoltaic rooftop tiles that power evening pavilion illumination.
              </p>
            </div>

            <div className="border border-[#232328] bg-[#121215] p-6 space-y-3">
              <ShieldCheck className="w-6 h-6 text-[#E8C36B]" />
              <h3 className="font-serif text-xl text-[#F4EFE5]">Dark Sky Certified</h3>
              <p className="text-xs text-[#F4EFE5]/70 font-sans leading-relaxed">
                Zero upward light spill keeps the Milky Way visible from every private terrace.
              </p>
            </div>

            <div className="border border-[#232328] bg-[#121215] p-6 space-y-3">
              <Compass className="w-6 h-6 text-[#E8C36B]" />
              <h3 className="font-serif text-xl text-[#F4EFE5]">Acoustic Stone Buffers</h3>
              <p className="text-xs text-[#F4EFE5]/70 font-sans leading-relaxed">
                Stone topography designed to buffer wind while carrying the peaceful rhythm of waves.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Direct Accommodation CTA */}
      <section className="max-w-4xl mx-auto px-6 text-center pt-24 space-y-6">
        <span className="text-xs uppercase tracking-[0.25em] text-[#E8C36B] font-sans font-semibold">
          Private Residences
        </span>
        <h2 className="font-serif text-3xl md:text-5xl text-[#F4EFE5] font-light">
          Choose Your Perspective on the Horizon.
        </h2>
        <div className="pt-2">
          <button
            onClick={() => onNavigate('suites')}
            className="px-8 py-4 text-xs uppercase tracking-[0.18em] btn-gold cursor-pointer"
          >
            Explore Suites & Villas
          </button>
        </div>
      </section>
    </div>
  );
};
