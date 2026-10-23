import React, { useState, useMemo } from 'react';
import { PageId } from '../types';
import { SUITES_DATA } from '../data/resortData';
import { ResilientImage } from '../components/ResilientImage';
import { Search, SlidersHorizontal, ArrowRight, RotateCcw, Bed, Users, Maximize, Waves } from 'lucide-react';

interface SuitesPageProps {
  onNavigate: (page: PageId, suiteId?: string) => void;
}

export const SuitesPage: React.FC<SuitesPageProps> = ({ onNavigate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [guestFilter, setGuestFilter] = useState<number>(0);
  const [sortBy, setSortBy] = useState<string>('featured');

  const filteredSuites = useMemo(() => {
    return SUITES_DATA.filter((suite) => {
      const matchesSearch =
        searchTerm === '' ||
        suite.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        suite.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        suite.specs.view.toLowerCase().includes(searchTerm.toLowerCase()) ||
        suite.features.some((f) => f.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesCategory =
        selectedCategory === 'all' || suite.category === selectedCategory;

      const matchesGuests =
        guestFilter === 0 || suite.specs.maxGuests >= guestFilter;

      return matchesSearch && matchesCategory && matchesGuests;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.pricePerNight - b.pricePerNight;
      if (sortBy === 'price-desc') return b.pricePerNight - a.pricePerNight;
      if (sortBy === 'size-desc') return b.specs.indoorSqFt - a.specs.indoorSqFt;
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [searchTerm, selectedCategory, guestFilter, sortBy]);

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setGuestFilter(0);
    setSortBy('featured');
  };

  const categories = [
    { id: 'all', label: 'All Residences' },
    { id: 'penthouse-sanctuary', label: 'Penthouse Sanctuaries' },
    { id: 'cliff-villa', label: 'Cliff Edge Villas' },
    { id: 'master-pavilion', label: 'Master Pavilions' },
  ];

  return (
    <div className="bg-[#0B0B0D] text-[#F4EFE5] pt-32 pb-24">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-12">
        <span className="text-xs uppercase tracking-[0.25em] text-[#E8C36B] font-sans font-semibold">
          Private Accommodations
        </span>
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light text-[#F4EFE5] mt-2 mb-4">
          Suites & Villas Collection
        </h1>
        <p className="font-sans text-sm md:text-base text-[#F4EFE5]/75 max-w-2xl leading-relaxed">
          Eighteen bespoke residences built into the volcanic cliffs. Each features a private heated pool, floor-to-ceiling ocean views, and dedicated personal butler service.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-12">
        <div className="bg-[#121215] border border-[#232328] p-6 space-y-6 shadow-xl">
          {/* Top row: search & sort */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-7 relative">
              <Search className="w-4 h-4 text-[#F4EFE5]/40 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by residence name, pool, views, or features..."
                className="w-full bg-[#17171B] border border-[#232328] pl-11 pr-4 py-3 text-xs text-[#F4EFE5] placeholder-[#F4EFE5]/40 focus:outline-none focus:border-[#E8C36B] font-sans"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[#F4EFE5]/50 hover:text-[#F4EFE5]"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="md:col-span-3">
              <select
                value={guestFilter}
                onChange={(e) => setGuestFilter(Number(e.target.value))}
                className="w-full bg-[#17171B] border border-[#232328] px-4 py-3 text-xs text-[#F4EFE5] focus:outline-none focus:border-[#E8C36B] font-sans cursor-pointer"
              >
                <option value={0}>Guest Capacity: Any</option>
                <option value={2}>2+ Guests</option>
                <option value={4}>4+ Guests</option>
                <option value={6}>6 Guests (Presidential)</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full bg-[#17171B] border border-[#232328] px-4 py-3 text-xs text-[#F4EFE5] focus:outline-none focus:border-[#E8C36B] font-sans cursor-pointer"
              >
                <option value="featured">Sort: Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="size-desc">Largest Space</option>
              </select>
            </div>
          </div>

          {/* Bottom row: category tabs */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#232328]">
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-4 py-2 text-xs font-sans uppercase tracking-wider transition-all cursor-pointer ${
                      isActive
                        ? 'bg-gradient-to-r from-[#D6AD55] to-[#E8C36B] text-[#0B0B0D] font-bold shadow-md'
                        : 'bg-[#17171B] text-[#F4EFE5]/70 hover:text-[#F4EFE5] hover:bg-[#1E1E24]'
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-4 text-xs font-sans text-[#F4EFE5]/60">
              <span>
                Showing <strong className="text-[#F4EFE5] font-mono">{filteredSuites.length}</strong> of{' '}
                <span className="font-mono">{SUITES_DATA.length}</span> residences
              </span>
              {(searchTerm || selectedCategory !== 'all' || guestFilter !== 0 || sortBy !== 'featured') && (
                <button
                  onClick={handleResetFilters}
                  className="text-[#E8C36B] hover:underline flex items-center gap-1 cursor-pointer font-medium"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset filters</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Suites Grid */}
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {filteredSuites.length === 0 ? (
          <div className="border border-[#232328] p-16 text-center bg-[#121215] space-y-4">
            <SlidersHorizontal className="w-8 h-8 text-[#E8C36B] mx-auto" />
            <h3 className="font-serif text-2xl text-[#F4EFE5]">No Residences Matched Your Criteria</h3>
            <p className="text-xs text-[#F4EFE5]/60 max-w-md mx-auto">
              Please adjust your filters or search terms to browse our full collection of residences.
            </p>
            <button
              onClick={handleResetFilters}
              className="px-6 py-2.5 text-xs uppercase tracking-wider btn-gold cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {filteredSuites.map((suite) => (
              <div
                key={suite.id}
                className="border border-[#232328] bg-[#121215] overflow-hidden flex flex-col justify-between group transition-all duration-300 hover:border-[#E8C36B]/60 shadow-xl"
              >
                <div>
                  {/* Image container with distinct imagery for each */}
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <ResilientImage
                      src={suite.images.hero}
                      alt={suite.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4 bg-[#0B0B0D]/90 px-3 py-1 border border-[#232328] text-[10px] uppercase tracking-widest text-[#E8C36B] font-sans font-semibold">
                      {suite.categoryLabel}
                    </div>
                    {suite.featured && (
                      <div className="absolute top-4 right-4 bg-gradient-to-r from-[#D6AD55] to-[#E8C36B] text-[#0B0B0D] px-2.5 py-1 text-[10px] uppercase font-bold tracking-widest font-sans shadow-md">
                        Featured
                      </div>
                    )}
                  </div>

                  {/* Body details */}
                  <div className="p-8 space-y-4">
                    {/* Clean unboxed metadata with bullet separators */}
                    <div className="flex flex-wrap items-center gap-2 text-xs text-[#F4EFE5]/60 font-sans">
                      <span className="flex items-center gap-1">
                        <Maximize className="w-3.5 h-3.5 text-[#E8C36B]" />
                        <span>{suite.specs.indoorSqFt} SQ FT</span>
                      </span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <Bed className="w-3.5 h-3.5 text-[#E8C36B]" />
                        <span>{suite.specs.bedrooms} {suite.specs.bedrooms === 1 ? 'BED' : 'BEDS'}</span>
                      </span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5 text-[#E8C36B]" />
                        <span>UP TO {suite.specs.maxGuests}</span>
                      </span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <Waves className="w-3.5 h-3.5 text-[#E8C36B]" />
                        <span>{suite.specs.poolLengthMeters}M POOL</span>
                      </span>
                    </div>

                    <h2 className="font-serif text-2xl md:text-3xl text-[#F4EFE5] font-light group-hover:text-[#E8C36B] transition-colors">
                      {suite.name}
                    </h2>
                    <p className="text-xs md:text-sm text-[#F4EFE5]/75 font-sans leading-relaxed line-clamp-3">
                      {suite.description}
                    </p>

                    <div className="pt-2">
                      <span className="text-[11px] font-sans uppercase tracking-wider text-[#E8C36B] font-semibold">
                        Signature Feature:
                      </span>
                      <p className="text-xs text-[#F4EFE5]/85 font-sans mt-0.5">
                        {suite.features[0]}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Footer rate and action */}
                <div className="p-8 pt-0 border-t border-[#232328] mt-6 flex items-center justify-between">
                  <div className="pt-6">
                    <span className="text-[10px] text-[#F4EFE5]/50 uppercase tracking-widest font-sans">
                      Illustrative Rate
                    </span>
                    <div className="font-serif text-2xl text-[#F4EFE5]">
                      ${suite.pricePerNight.toLocaleString()}{' '}
                      <span className="text-xs text-[#F4EFE5]/50 font-sans">/ night</span>
                    </div>
                  </div>

                  <div className="pt-6 flex items-center gap-3">
                    <button
                      onClick={() => onNavigate('suite-details', suite.id)}
                      className="px-5 py-2.5 text-xs uppercase tracking-wider border border-[#232328] hover:border-[#E8C36B] text-[#F4EFE5] hover:text-[#E8C36B] transition-colors cursor-pointer"
                    >
                      View Suite
                    </button>
                    <button
                      onClick={() => onNavigate('reservations', suite.id)}
                      className="px-5 py-2.5 text-xs uppercase tracking-wider btn-gold cursor-pointer"
                    >
                      Enquire
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
