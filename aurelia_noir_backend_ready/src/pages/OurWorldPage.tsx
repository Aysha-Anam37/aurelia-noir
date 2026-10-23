import React from 'react';
import { PageId } from '../types';
import { RESORT_IMAGES } from '../data/resortData';
import { ResilientImage } from '../components/ResilientImage';
import { ArrowRight, Compass, Shield, Eye, Flame } from 'lucide-react';

interface OurWorldPageProps {
  onNavigate: (page: PageId) => void;
}

export const OurWorldPage: React.FC<OurWorldPageProps> = ({ onNavigate }) => {
  return (
    <div className="bg-[#0B0B0D] text-[#F4EFE5] pt-32 pb-24">
      {/* Header Banner */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-20">
        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#E8C36B] font-sans font-semibold mb-4">
          <Compass className="w-3.5 h-3.5" />
          <span>Brand Manifesto & Philosophy</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light text-[#F4EFE5] max-w-4xl leading-[1.05]">
          Silence, Stone & Sea: The Philosophy of Aurelia Noir.
        </h1>
        <div className="h-[2px] w-20 bg-gradient-to-r from-[#D6AD55] to-[#E8C36B] my-6" />
        <p className="font-sans text-base md:text-lg text-[#F4EFE5]/75 max-w-2xl leading-relaxed">
          True luxury is not excessive ornamentation, but the radical purification of space, noise, and hurry.
        </p>
      </div>

      {/* Heroic Landscape */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-28">
        <div className="border border-[#232328] shadow-2xl overflow-hidden relative">
          <ResilientImage
            src={RESORT_IMAGES.heroOcean}
            alt="The Obsidian Coastline at twilight"
            className="w-full aspect-[21/9] object-cover"
          />
          <div className="absolute bottom-4 left-4 right-4 bg-[#0B0B0D]/85 backdrop-blur-md p-4 text-xs font-sans text-[#F4EFE5]/85 flex justify-between">
            <span>The Obsidian Promontory, Atlantic Ocean</span>
            <span className="text-[#E8C36B] font-mono">28°34&apos;12&quot;N 16°19&apos;45&quot;W</span>
          </div>
        </div>
      </div>

      {/* Chapter 01: The Origin Story with Light Stone Contrast Box */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-16 border-b border-[#232328]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-4">
            <span className="font-mono text-xs text-[#E8C36B] font-semibold">01. ORIGIN</span>
            <h2 className="font-serif text-3xl md:text-4xl text-[#F4EFE5] font-light">
              An Untamed Coastline
            </h2>
            <p className="text-sm text-[#F4EFE5]/75 font-sans leading-relaxed">
              Discovered along a remote Atlantic headland, this forty-two acre volcanic cliff was chosen for its rare quietude and dramatic ocean views.
            </p>
            <p className="text-sm text-[#F4EFE5]/75 font-sans leading-relaxed">
              Rather than reshaping the cliff, we preserved its natural geology. Every residence is anchored into solid bedrock using hand-finished stone and local timber.
            </p>
          </div>

          <div className="lg:col-span-7">
            <div className="border border-[#232328] p-8 md:p-10 bg-[#121215] shadow-xl">
              <blockquote className="font-serif text-2xl md:text-3xl text-[#F4EFE5] font-light italic leading-snug">
                &ldquo;Architecture should not fight the rock or the sea; it should listen to the tide until it learns how to be quiet.&rdquo;
              </blockquote>
              <div className="mt-6 flex items-center gap-4 text-xs text-[#F4EFE5]/60 font-sans">
                <span className="text-[#E8C36B] font-semibold uppercase tracking-wider">Kengo Vane</span>
                <span>·</span>
                <span>Principal Architect</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Chapter 02: Design Principles */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-24 border-b border-[#232328]">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="font-mono text-xs text-[#E8C36B] font-semibold">02. DESIGN PRINCIPLES</span>
          <h2 className="font-serif text-3xl md:text-5xl text-[#F4EFE5] font-light">
            Three Guiding Tenets
          </h2>
          <p className="text-sm text-[#F4EFE5]/65 font-sans">
            How our spaces are designed to inspire complete relaxation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="border border-[#232328] bg-[#121215] p-8 space-y-4 shadow-xl">
            <div className="w-10 h-10 border border-[#E8C36B]/60 flex items-center justify-center text-[#E8C36B]">
              <Eye className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-2xl text-[#F4EFE5]">Visual Quiet</h3>
            <p className="text-xs md:text-sm text-[#F4EFE5]/70 font-sans leading-relaxed">
              Clean architectural lines and uncluttered sightlines that keep your gaze focused on the sea and evening sky.
            </p>
          </div>

          <div className="border border-[#232328] bg-[#121215] p-8 space-y-4 shadow-xl">
            <div className="w-10 h-10 border border-[#E8C36B]/60 flex items-center justify-center text-[#E8C36B]">
              <Shield className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-2xl text-[#F4EFE5]">Acoustic Seclusion</h3>
            <p className="text-xs md:text-sm text-[#F4EFE5]/70 font-sans leading-relaxed">
              Triple-glazed acoustic glass and thick stone walls ensure that the only audible sound is the gentle rhythm of the ocean.
            </p>
          </div>

          <div className="border border-[#232328] bg-[#121215] p-8 space-y-4 shadow-xl">
            <div className="w-10 h-10 border border-[#E8C36B]/60 flex items-center justify-center text-[#E8C36B]">
              <Flame className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-2xl text-[#F4EFE5]">Tactile Warmth</h3>
            <p className="text-xs md:text-sm text-[#F4EFE5]/70 font-sans leading-relaxed">
              Natural walnut woodwork, warm bronze fixtures, organic Italian linen, and polished dark marble underfoot.
            </p>
          </div>
        </div>
      </section>

      {/* Chapter 03: Hospitality Approach */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-24 border-b border-[#232328]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6">
            <div className="border border-[#232328] overflow-hidden shadow-2xl">
              <ResilientImage
                src={RESORT_IMAGES.heroPresidentialSuite}
                alt="Presidential suite interior craftsmanship"
                className="w-full aspect-[4/3] object-cover"
              />
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <span className="font-mono text-xs text-[#E8C36B] font-semibold">03. SERVICE PHILOSOPHY</span>
            <h2 className="font-serif text-3xl md:text-4xl text-[#F4EFE5] font-light">
              Attentive, Discreet, Unrushed
            </h2>
            <p className="text-sm text-[#F4EFE5]/75 font-sans leading-relaxed">
              With a four-to-one staff-to-guest ratio, our team operates with quiet, thoughtful precision. We anticipate your wishes while respecting your complete personal privacy.
            </p>
            <div className="space-y-3 font-sans text-xs text-[#F4EFE5]/85">
              <div className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 bg-[#E8C36B]" />
                <span>Dedicated personal host available for dining, travel, and wellness</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 bg-[#E8C36B]" />
                <span>Seamless check-in directly within your private residence</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 bg-[#E8C36B]" />
                <span>Discreet communication directly via private concierge channel</span>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={() => onNavigate('the-retreat')}
                className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-[#E8C36B] hover:text-[#F4EFE5] font-semibold transition-colors cursor-pointer"
              >
                <span>Tour The Retreat Grounds</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto px-6 text-center pt-24 space-y-6">
        <h2 className="font-serif text-3xl md:text-5xl text-[#F4EFE5] font-light">
          Experience Aurelia Noir Firsthand.
        </h2>
        <p className="text-sm text-[#F4EFE5]/65 font-sans max-w-lg mx-auto">
          Explore our accommodations or inquire with our concierge regarding seasonal availability.
        </p>
        <div className="flex items-center justify-center gap-4 pt-2">
          <button
            onClick={() => onNavigate('suites')}
            className="px-6 py-3.5 text-xs uppercase tracking-wider btn-gold cursor-pointer"
          >
            Explore Accommodations
          </button>
          <button
            onClick={() => onNavigate('reservations')}
            className="px-6 py-3.5 text-xs uppercase tracking-wider btn-outline-ivory cursor-pointer"
          >
            Make an Enquiry
          </button>
        </div>
      </section>
    </div>
  );
};
