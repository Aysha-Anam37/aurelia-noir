import React, { useState, useEffect } from 'react';
import { PageId } from '../types';
import { ArrowRight, Check } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: PageId, suiteId?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [timeString, setTimeString] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
        timeZone: 'Atlantic/Canary',
      };
      setTimeString(now.toLocaleTimeString('en-GB', options));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && email.includes('@')) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail('');
        setSubscribed(false);
      }, 5000);
    }
  };

  const handleLink = (page: PageId, suiteId?: string) => {
    onNavigate(page, suiteId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#08080A] border-t border-[#232328] text-[#F4EFE5] pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Top Invitation Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-[#232328]">
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 border border-[#E8C36B] rotate-45 flex items-center justify-center shadow-[0_0_10px_rgba(232,195,107,0.3)]">
                <div className="w-1.5 h-1.5 bg-[#E8C36B]" />
              </div>
              <span className="font-cinzel text-xl tracking-[0.25em] text-[#F4EFE5] uppercase">
                Aurelia Noir
              </span>
            </div>
            <p className="font-serif text-3xl md:text-4xl text-[#F4EFE5] font-light max-w-lg leading-tight">
              Escape the ordinary. A private coastal retreat above the Atlantic.
            </p>
            <p className="text-sm text-[#F4EFE5]/70 max-w-md font-sans leading-relaxed">
              Eighteen private cliffside residences overlooking dramatic volcanic waters. Designed for quiet privacy and unforgettable hospitality.
            </p>
          </div>

          <div className="lg:col-span-6 flex flex-col justify-end">
            <span className="text-xs uppercase tracking-[0.2em] text-[#E8C36B] font-sans font-semibold mb-3">
              Private Newsletter & Updates
            </span>
            <p className="text-xs text-[#F4EFE5]/65 mb-4 max-w-md">
              Receive seasonal residence notices and culinary events directly from our private office.
            </p>
            <form onSubmit={handleSubscribe} className="flex max-w-md">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="bg-[#141418] border border-[#232328] px-4 py-3 text-xs text-[#F4EFE5] placeholder-[#F4EFE5]/40 focus:outline-none focus:border-[#E8C36B] flex-1 font-sans"
              />
              <button
                type="submit"
                className="btn-gold px-6 py-3 text-xs uppercase font-bold transition-all flex items-center justify-center cursor-pointer shadow-lg"
              >
                {subscribed ? <Check className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              </button>
            </form>
            {subscribed && (
              <p className="text-xs text-[#E8C36B] mt-2 font-sans font-medium">
                Thank you. Your address has been added to our private dispatch.
              </p>
            )}
          </div>
        </div>

        {/* 10-Page Nav Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-16 border-b border-[#232328] text-xs">
          <div>
            <h4 className="text-[11px] font-sans uppercase tracking-[0.2em] text-[#E8C36B] font-semibold mb-4">
              The Sanctuary
            </h4>
            <ul className="space-y-3 font-sans text-[#F4EFE5]/75">
              <li>
                <button onClick={() => handleLink('home')} className="hover:text-[#E8C36B] transition-colors cursor-pointer text-left">
                  01. Home
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('our-world')} className="hover:text-[#E8C36B] transition-colors cursor-pointer text-left">
                  02. Our World & Philosophy
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('the-retreat')} className="hover:text-[#E8C36B] transition-colors cursor-pointer text-left">
                  03. The Retreat & Grounds
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('gallery')} className="hover:text-[#E8C36B] transition-colors cursor-pointer text-left">
                  08. Visual Gallery
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] font-sans uppercase tracking-[0.2em] text-[#E8C36B] font-semibold mb-4">
              Accommodations
            </h4>
            <ul className="space-y-3 font-sans text-[#F4EFE5]/75">
              <li>
                <button onClick={() => handleLink('suites')} className="hover:text-[#E8C36B] transition-colors cursor-pointer text-left">
                  04. Suites & Villas Collection
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink('suite-details', 'the-obsidian-presidential-sanctuary')}
                  className="hover:text-[#E8C36B] transition-colors cursor-pointer text-left"
                >
                  05. Presidential Sanctuary
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink('suite-details', 'cliff-edge-infinity-villa')}
                  className="hover:text-[#E8C36B] transition-colors cursor-pointer text-left"
                >
                  Cliff Edge Infinity Villa
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink('suite-details', 'azure-master-pavilion')}
                  className="hover:text-[#E8C36B] transition-colors cursor-pointer text-left"
                >
                  Azure Master Pavilion
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] font-sans uppercase tracking-[0.2em] text-[#E8C36B] font-semibold mb-4">
              Pursuits & Flavors
            </h4>
            <ul className="space-y-3 font-sans text-[#F4EFE5]/75">
              <li>
                <button onClick={() => handleLink('experiences')} className="hover:text-[#E8C36B] transition-colors cursor-pointer text-left">
                  06. Discover Experiences
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('dining')} className="hover:text-[#E8C36B] transition-colors cursor-pointer text-left">
                  07. Noir & Mare Dining
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('experiences')} className="hover:text-[#E8C36B] transition-colors cursor-pointer text-left">
                  Thermal Cave Spa
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('dining')} className="hover:text-[#E8C36B] transition-colors cursor-pointer text-left">
                  The Wine Cellar Vault
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] font-sans uppercase tracking-[0.2em] text-[#E8C36B] font-semibold mb-4">
              Inquiries & Access
            </h4>
            <ul className="space-y-3 font-sans text-[#F4EFE5]/75">
              <li>
                <button onClick={() => handleLink('reservations')} className="text-[#E8C36B] hover:underline transition-all cursor-pointer font-bold text-left">
                  09. Reserve Your Stay
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('contact')} className="hover:text-[#E8C36B] transition-colors cursor-pointer text-left">
                  10. Contact & Coordinates
                </button>
              </li>
              <li className="pt-2 text-[#F4EFE5]/50 font-mono text-[11px]">
                Helipad: AN-PAD 01
              </li>
              <li className="text-[#F4EFE5]/50 font-mono text-[11px]">
                Marine: Berth 4A (VHF 16)
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Details, Time & Concept Disclaimer */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-[11px] text-[#F4EFE5]/40 font-sans">
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-center md:text-left">
            <span>© {new Date().getFullYear()} AURELIA NOIR. All rights reserved.</span>
            <span>·</span>
            <span className="text-[#F4EFE5]/75 font-medium">Concept & Design by Aysha Anam</span>
            <span>·</span>
            <span className="italic text-[#F4EFE5]/50">
              Demonstration concept project for an ultra-luxury coastal resort.
            </span>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="text-[#E8C36B] font-semibold">COAST TIME:</span>
              <span className="font-mono text-[#F4EFE5] tabular-nums tracking-widest">{timeString || '21:42:00'}</span>
            </div>
            <span>·</span>
            <span className="font-mono">28°34&apos;12&quot;N 16°19&apos;45&quot;W</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
