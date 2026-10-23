import React, { useState, useEffect } from 'react';
import { PageId } from '../types';
import { Menu, X, Compass, ChevronRight } from 'lucide-react';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId, suiteId?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [directoryOpen, setDirectoryOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (page: PageId) => {
    setMobileMenuOpen(false);
    setDirectoryOpen(false);
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks: { label: string; page: PageId }[] = [
    { label: 'The Retreat', page: 'the-retreat' },
    { label: 'Suites & Villas', page: 'suites' },
    { label: 'Experiences', page: 'experiences' },
    { label: 'Dining', page: 'dining' },
  ];

  const allPagesList: { id: PageId; number: string; title: string; desc: string }[] = [
    { id: 'home', number: '01', title: 'Home', desc: 'Cinematic opening, resort story, and highlights' },
    { id: 'our-world', number: '02', title: 'Our World', desc: 'Philosophy, architecture, and craftsmanship' },
    { id: 'the-retreat', number: '03', title: 'The Retreat', desc: 'Coastal setting, estate grounds, and amenities' },
    { id: 'suites', number: '04', title: 'Suites & Villas', desc: 'Filterable collection of 18 private residences' },
    { id: 'suite-details', number: '05', title: 'Suite Details', desc: 'In-depth residence showcase, floorplans, and quote estimator' },
    { id: 'experiences', number: '06', title: 'Experiences', desc: 'Thermal spa, private yacht, and night astronomy' },
    { id: 'dining', number: '07', title: 'Dining', desc: 'Noir & Mare oceanfront dining and wine cellar' },
    { id: 'gallery', number: '08', title: 'Visual Gallery', desc: 'High-resolution photographic archive with lightbox' },
    { id: 'reservations', number: '09', title: 'Reservations', desc: 'Personalised booking enquiry with live quote preview' },
    { id: 'contact', number: '10', title: 'Contact & Access', desc: 'Concierge office, arrival coordinates, and FAQs' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-[#0B0B0D]/95 backdrop-blur-md border-b border-[#232328] py-4 shadow-2xl'
            : 'bg-gradient-to-b from-[#0B0B0D]/85 via-[#0B0B0D]/30 to-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between gap-8">
          {/* Zone 1: Brand Wordmark */}
          <button
            onClick={() => handleLinkClick('home')}
            className="flex items-center gap-3 text-left group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8C36B] cursor-pointer shrink-0"
            aria-label="Aurelia Noir homepage"
          >
            <div className="w-5 h-5 border border-[#E8C36B] rotate-45 flex items-center justify-center transition-transform duration-500 group-hover:rotate-90 group-hover:scale-110 shadow-[0_0_12px_rgba(232,195,107,0.3)]">
              <div className="w-1.5 h-1.5 bg-[#E8C36B]" />
            </div>
            <span className="font-cinzel text-base md:text-lg font-medium tracking-[0.24em] text-[#F4EFE5] whitespace-nowrap uppercase">
              Aurelia Noir
            </span>
          </button>

          {/* Zone 2: Simplified 4-Link Primary Navigation */}
          <nav className="hidden lg:flex items-center gap-10 text-[13px] tracking-[0.15em] uppercase font-sans font-medium text-[#F4EFE5]/75">
            {navLinks.map((item) => {
              const isActive = currentPage === item.page;
              return (
                <button
                  key={item.page}
                  onClick={() => handleLinkClick(item.page)}
                  className={`relative py-1 transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                    isActive ? 'text-[#E8C36B] font-semibold' : 'hover:text-[#F4EFE5]'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-[#D6AD55] to-[#E8C36B] rounded-full shadow-[0_0_8px_rgba(232,195,107,0.6)]" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Single Prominent Reserve Button + Mobile Toggle */}
          <div className="flex items-center gap-4 shrink-0">
            <button
              onClick={() => handleLinkClick('reservations')}
              className="hidden sm:inline-flex items-center justify-center px-6 py-2.5 text-xs font-semibold tracking-[0.14em] uppercase rounded-none whitespace-nowrap shrink-0 cursor-pointer btn-gold"
            >
              Reserve Your Stay
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#F4EFE5] hover:text-[#E8C36B] transition-colors focus-visible:outline-none cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-[#E8C36B]" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Full 10-Page Directory Modal (Desktop & Tablet) */}
      {directoryOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
          <div className="bg-[#121215] border border-[#232328] w-full max-w-3xl p-8 relative max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between pb-6 border-b border-[#232328]">
              <div>
                <span className="text-[11px] tracking-[0.25em] text-[#E8C36B] uppercase font-sans font-semibold">
                  Complete Directory
                </span>
                <h3 className="font-serif text-2xl md:text-3xl text-[#F4EFE5] mt-1">
                  Explore All 10 Pages
                </h3>
              </div>
              <button
                onClick={() => setDirectoryOpen(false)}
                className="p-2 text-[#F4EFE5]/60 hover:text-[#F4EFE5] hover:bg-[#1C1C22] transition-colors cursor-pointer"
                aria-label="Close directory"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-6">
              {allPagesList.map((page) => {
                const isActive = currentPage === page.id;
                return (
                  <button
                    key={page.id}
                    onClick={() => handleLinkClick(page.id)}
                    className={`text-left p-4 border transition-all cursor-pointer flex items-start gap-4 group ${
                      isActive
                        ? 'border-[#E8C36B] bg-[#E8C36B]/10 shadow-[0_0_15px_rgba(232,195,107,0.15)]'
                        : 'border-[#232328] bg-[#17171B]/60 hover:border-[#E8C36B]/60 hover:bg-[#1A1A20]'
                    }`}
                  >
                    <span className="font-mono text-xs text-[#E8C36B] font-semibold mt-0.5">{page.number}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="font-serif text-lg text-[#F4EFE5] group-hover:text-[#E8C36B] transition-colors">
                          {page.title}
                        </h4>
                        <ChevronRight className="w-4 h-4 text-[#F4EFE5]/30 group-hover:text-[#E8C36B] transition-transform group-hover:translate-x-1" />
                      </div>
                      <p className="text-xs text-[#F4EFE5]/60 mt-1 line-clamp-1">{page.desc}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Mobile Slide-Over Overlay Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden bg-[#0B0B0D]/98 backdrop-blur-xl flex flex-col pt-24 pb-8 px-6 overflow-y-auto">
          <div className="text-[11px] uppercase tracking-[0.25em] text-[#E8C36B] font-semibold pb-3 border-b border-[#232328]">
            Aurelia Noir Portfolio Index
          </div>
          <div className="flex flex-col gap-2 mt-4 flex-1">
            {allPagesList.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleLinkClick(item.id)}
                  className={`flex items-center justify-between py-3 px-3 text-left border-b border-[#232328]/50 transition-colors cursor-pointer ${
                    isActive ? 'text-[#E8C36B] bg-[#E8C36B]/10 font-medium' : 'text-[#F4EFE5] hover:text-[#E8C36B]'
                  }`}
                >
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-xs text-[#E8C36B]">{item.number}</span>
                    <span className="font-serif text-xl tracking-wide">{item.title}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[#F4EFE5]/40" />
                </button>
              );
            })}
          </div>

          <div className="pt-6 border-t border-[#232328] mt-6">
            <button
              onClick={() => handleLinkClick('reservations')}
              className="w-full py-4 text-center text-xs font-bold uppercase tracking-[0.2em] btn-gold cursor-pointer"
            >
              Reserve Your Stay
            </button>
            <p className="text-center text-xs text-[#F4EFE5]/40 mt-4 font-sans">
              Obsidian Coastline · 28°34&apos;N 16°19&apos;W
            </p>
          </div>
        </div>
      )}
    </>
  );
};
