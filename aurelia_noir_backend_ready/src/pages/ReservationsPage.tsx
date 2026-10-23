import React, { useState, useEffect } from 'react';
import { PageId, ReservationFormData } from '../types';
import { SUITES_DATA } from '../data/resortData';
import { submitToAppsScript } from '../lib/appsScriptApi';
import { Compass, CheckCircle2, AlertCircle, ShieldCheck, Printer, Sparkles } from 'lucide-react';

interface ReservationsPageProps {
  initialSuiteId?: string;
  onNavigate: (page: PageId, suiteId?: string) => void;
}

export const ReservationsPage: React.FC<ReservationsPageProps> = ({
  initialSuiteId,
  onNavigate,
}) => {
  const today = new Date();
  const minArrival = new Date(today.getTime() + 2 * 86400000).toISOString().split('T')[0];
  const defaultDeparture = new Date(today.getTime() + 6 * 86400000).toISOString().split('T')[0];

  const [formData, setFormData] = useState<ReservationFormData>({
    arrivalDate: minArrival,
    departureDate: defaultDeparture,
    adults: 2,
    children: 0,
    suiteId: initialSuiteId || SUITES_DATA[0].id,
    fullName: '',
    email: '',
    phone: '',
    country: '',
    transferPreference: 'helicopter',
    specialRequests: '',
    dietaryNotes: '',
    butlerServiceRequested: true,
  });

  const [validationError, setValidationError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedBookingCode, setSubmittedBookingCode] = useState<string | null>(null);

  useEffect(() => {
    if (initialSuiteId) {
      setFormData((prev) => ({ ...prev, suiteId: initialSuiteId }));
    }
  }, [initialSuiteId]);

  const selectedSuite =
    SUITES_DATA.find((s) => s.id === formData.suiteId) || SUITES_DATA[0];

  const calculateNights = () => {
    const arr = new Date(formData.arrivalDate);
    const dep = new Date(formData.departureDate);
    const diff = Math.ceil((dep.getTime() - arr.getTime()) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 0;
  };

  const nights = calculateNights();
  const baseRate = selectedSuite.pricePerNight * (nights > 0 ? nights : 1);
  const resortTaxAndService = Math.round(baseRate * 0.12);
  const estimatedTotal = baseRate + resortTaxAndService;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setValidationError(null);

    const arr = new Date(formData.arrivalDate);
    const dep = new Date(formData.departureDate);
    if (dep <= arr) {
      setValidationError('Departure date must be at least one day after arrival date.');
      return;
    }

    if (nights < 2) {
      setValidationError('Aurelia Noir maintains a two-night minimum stay policy.');
      return;
    }

    if (!formData.fullName.trim()) {
      setValidationError('Please provide your full legal name for the reservation enquiry.');
      return;
    }

    if (!formData.email.trim() || !formData.email.includes('@')) {
      setValidationError('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await submitToAppsScript({
        type: 'reservation',
        ...formData,
        suiteName: selectedSuite.name,
        nights,
        estimatedSubtotal: baseRate,
        serviceCharge: resortTaxAndService,
        estimatedTotal,
        source: 'reservations-page',
        pageUrl: window.location.href,
      });
      setSubmittedBookingCode(result.referenceId);
    } catch (error) {
      setValidationError(error instanceof Error ? error.message : 'The enquiry could not be submitted. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleNewEnquiry = () => {
    setSubmittedBookingCode(null);
    setValidationError(null);
  };

  return (
    <div className="bg-[#0B0B0D] text-[#F4EFE5] pt-32 pb-24">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-12">
        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#E8C36B] font-sans font-semibold mb-3">
          <Compass className="w-3.5 h-3.5" />
          <span>Private Concierge Desk</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light text-[#F4EFE5]">
          Reservation Enquiry
        </h1>
        <p className="font-sans text-sm md:text-base text-[#F4EFE5]/75 max-w-2xl mt-4 leading-relaxed">
          With only eighteen private cliffside residences, every stay is tailored to your preferences. Submitting this enquiry places a priority hold while our private desk prepares your itinerary.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {submittedBookingCode ? (
          /* Confirmation Success Dossier */
          <div className="max-w-3xl mx-auto bg-[#121215] border border-[#E8C36B]/60 p-8 md:p-14 space-y-8 animate-fade-in shadow-2xl">
            <div className="text-center space-y-3">
              <div className="w-12 h-12 border border-[#E8C36B] rotate-45 flex items-center justify-center mx-auto text-[#E8C36B] shadow-[0_0_15px_rgba(232,195,107,0.3)]">
                <CheckCircle2 className="w-6 h-6 -rotate-45" />
              </div>
              <span className="text-xs uppercase tracking-[0.25em] text-[#E8C36B] font-sans font-semibold">
                Enquiry Received by Private Office
              </span>
              <h2 className="font-serif text-3xl md:text-4xl text-[#F4EFE5]">
                Thank You, {formData.fullName}.
              </h2>
              <p className="text-xs md:text-sm text-[#F4EFE5]/75 font-sans max-w-lg mx-auto leading-relaxed">
                Your reservation enquiry for <strong className="text-[#F4EFE5]">{selectedSuite.name}</strong> has been saved to the demonstration database. This is a fictional resort website, so this is not a confirmed booking and no real reservation will be created.
              </p>
            </div>

            {/* Dossier Summary Box */}
            <div className="p-6 bg-[#17171B] border border-[#232328] space-y-4 font-sans text-xs">
              <div className="flex items-center justify-between pb-3 border-b border-[#232328]">
                <span className="text-[#F4EFE5]/50 uppercase tracking-widest text-[10px]">Reference Number</span>
                <span className="font-mono text-base text-[#E8C36B] font-bold tracking-wider">
                  {submittedBookingCode}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-[#F4EFE5]/50 block">Dates of Stay</span>
                  <span className="text-[#F4EFE5] font-medium">
                    {formData.arrivalDate} to {formData.departureDate} ({nights} nights)
                  </span>
                </div>
                <div>
                  <span className="text-[#F4EFE5]/50 block">Residence</span>
                  <span className="text-[#F4EFE5] font-medium">{selectedSuite.name}</span>
                </div>
                <div>
                  <span className="text-[#F4EFE5]/50 block">Party</span>
                  <span className="text-[#F4EFE5] font-medium">
                    {formData.adults} Adults {formData.children > 0 ? `, ${formData.children} Children` : ''}
                  </span>
                </div>
                <div>
                  <span className="text-[#F4EFE5]/50 block">Arrival Mode</span>
                  <span className="text-[#F4EFE5] font-medium capitalize">{formData.transferPreference} Transfer</span>
                </div>
              </div>

              <div className="pt-3 border-t border-[#232328] flex justify-between items-baseline">
                <span className="text-[#F4EFE5]/60">Estimated Stay Value</span>
                <span className="font-serif text-xl text-[#E8C36B] font-medium">
                  ${estimatedTotal.toLocaleString()} USD
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <button
                onClick={handlePrint}
                className="w-full sm:w-auto px-6 py-3 text-xs uppercase tracking-wider border border-[#232328] hover:border-[#E8C36B] text-[#F4EFE5] flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Printer className="w-4 h-4 text-[#E8C36B]" />
                <span>Print Dossier Summary</span>
              </button>
              <button
                onClick={handleNewEnquiry}
                className="w-full sm:w-auto px-6 py-3 text-xs uppercase tracking-wider btn-gold cursor-pointer"
              >
                Submit Another Enquiry
              </button>
            </div>
          </div>
        ) : (
          /* Main Reservation Form Layout */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Form Section (7 cols) */}
            <form onSubmit={handleSubmit} className="lg:col-span-7 bg-[#121215] border border-[#232328] p-8 md:p-10 space-y-8 shadow-xl">
              {validationError && (
                <div className="p-4 bg-red-950/40 border border-red-800/80 text-xs text-red-200 flex items-start gap-3 font-sans">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <span>{validationError}</span>
                </div>
              )}

              {/* Step 1: Stay Dates & Residence */}
              <div className="space-y-4">
                <h3 className="font-serif text-xl text-[#F4EFE5] flex items-center gap-2">
                  <span className="font-mono text-xs text-[#E8C36B] font-semibold">01.</span>
                  <span>Residence & Stay Dates</span>
                </h3>

                <div className="space-y-4 font-sans text-xs">
                  <div>
                    <label className="block text-[#F4EFE5]/70 mb-1">Select Residence</label>
                    <select
                      value={formData.suiteId}
                      onChange={(e) => setFormData({ ...formData, suiteId: e.target.value })}
                      className="w-full bg-[#17171B] border border-[#232328] p-3 text-[#F4EFE5] focus:outline-none focus:border-[#E8C36B] cursor-pointer"
                    >
                      {SUITES_DATA.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.name} — ${s.pricePerNight.toLocaleString()}/night ({s.specs.view})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[#F4EFE5]/70 mb-1">Arrival Date</label>
                      <input
                        type="date"
                        required
                        value={formData.arrivalDate}
                        onChange={(e) => setFormData({ ...formData, arrivalDate: e.target.value })}
                        className="w-full bg-[#17171B] border border-[#232328] p-3 text-[#F4EFE5] focus:outline-none focus:border-[#E8C36B]"
                      />
                    </div>
                    <div>
                      <label className="block text-[#F4EFE5]/70 mb-1">Departure Date</label>
                      <input
                        type="date"
                        required
                        value={formData.departureDate}
                        onChange={(e) => setFormData({ ...formData, departureDate: e.target.value })}
                        className="w-full bg-[#17171B] border border-[#232328] p-3 text-[#F4EFE5] focus:outline-none focus:border-[#E8C36B]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[#F4EFE5]/70 mb-1">Adults (Age 14+)</label>
                      <select
                        value={formData.adults}
                        onChange={(e) => setFormData({ ...formData, adults: Number(e.target.value) })}
                        className="w-full bg-[#17171B] border border-[#232328] p-3 text-[#F4EFE5] focus:outline-none focus:border-[#E8C36B] cursor-pointer"
                      >
                        {Array.from({ length: selectedSuite.specs.maxGuests }, (_, i) => i + 1).map((n) => (
                          <option key={n} value={n}>
                            {n} {n === 1 ? 'Adult' : 'Adults'}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[#F4EFE5]/70 mb-1">Children (Under 14)</label>
                      <select
                        value={formData.children}
                        onChange={(e) => setFormData({ ...formData, children: Number(e.target.value) })}
                        className="w-full bg-[#17171B] border border-[#232328] p-3 text-[#F4EFE5] focus:outline-none focus:border-[#E8C36B] cursor-pointer"
                      >
                        <option value={0}>None</option>
                        <option value={1}>1 Child</option>
                        <option value={2}>2 Children</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 2: Arrival Preferences */}
              <div className="space-y-4 pt-4 border-t border-[#232328]">
                <h3 className="font-serif text-xl text-[#F4EFE5] flex items-center gap-2">
                  <span className="font-mono text-xs text-[#E8C36B] font-semibold">02.</span>
                  <span>Arrival & Service Preferences</span>
                </h3>

                <div className="space-y-4 font-sans text-xs">
                  <div>
                    <label className="block text-[#F4EFE5]/70 mb-1">Preferred Arrival Transfer</label>
                    <select
                      value={formData.transferPreference}
                      onChange={(e) => setFormData({ ...formData, transferPreference: e.target.value as any })}
                      className="w-full bg-[#17171B] border border-[#232328] p-3 text-[#F4EFE5] focus:outline-none focus:border-[#E8C36B] cursor-pointer"
                    >
                      <option value="helicopter">Helicopter Transfer to Pad AN-PAD 01 (18 mins)</option>
                      <option value="maybach">Chauffeured Luxury Car from Airport (45 mins)</option>
                      <option value="yacht">Private Yacht Tender to Berth 4A</option>
                      <option value="independent">Independent Arrival / Rental</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-3 p-3.5 bg-[#17171B] border border-[#232328]">
                    <input
                      type="checkbox"
                      id="butlerReq"
                      checked={formData.butlerServiceRequested}
                      onChange={(e) => setFormData({ ...formData, butlerServiceRequested: e.target.checked })}
                      className="w-4 h-4 accent-[#E8C36B] cursor-pointer"
                    />
                    <label htmlFor="butlerReq" className="text-xs text-[#F4EFE5]/85 cursor-pointer">
                      Include dedicated residential butler service (Complimentary for all suites)
                    </label>
                  </div>
                </div>
              </div>

              {/* Step 3: Guest Profile */}
              <div className="space-y-4 pt-4 border-t border-[#232328]">
                <h3 className="font-serif text-xl text-[#F4EFE5] flex items-center gap-2">
                  <span className="font-mono text-xs text-[#E8C36B] font-semibold">03.</span>
                  <span>Guest Details</span>
                </h3>

                <div className="space-y-4 font-sans text-xs">
                  <div>
                    <label className="block text-[#F4EFE5]/70 mb-1">Full Legal Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. Harrison Vance"
                      className="w-full bg-[#17171B] border border-[#232328] p-3 text-[#F4EFE5] placeholder-[#F4EFE5]/30 focus:outline-none focus:border-[#E8C36B]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[#F4EFE5]/70 mb-1">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="harrison@example.com"
                        className="w-full bg-[#17171B] border border-[#232328] p-3 text-[#F4EFE5] placeholder-[#F4EFE5]/30 focus:outline-none focus:border-[#E8C36B]"
                      />
                    </div>
                    <div>
                      <label className="block text-[#F4EFE5]/70 mb-1">Telephone / Mobile</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+44 20 7946 0912"
                        className="w-full bg-[#17171B] border border-[#232328] p-3 text-[#F4EFE5] placeholder-[#F4EFE5]/30 focus:outline-none focus:border-[#E8C36B]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[#F4EFE5]/70 mb-1">Country of Residence</label>
                    <input
                      type="text"
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      placeholder="United Kingdom, United States, Switzerland, etc."
                      className="w-full bg-[#17171B] border border-[#232328] p-3 text-[#F4EFE5] placeholder-[#F4EFE5]/30 focus:outline-none focus:border-[#E8C36B]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#F4EFE5]/70 mb-1">Special Requests or Dietary Notes</label>
                    <textarea
                      rows={3}
                      value={formData.specialRequests}
                      onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                      placeholder="Anniversary celebration, dietary preferences, or arrival details..."
                      className="w-full bg-[#17171B] border border-[#232328] p-3 text-[#F4EFE5] placeholder-[#F4EFE5]/30 focus:outline-none focus:border-[#E8C36B]"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 text-xs uppercase tracking-[0.18em] btn-gold cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? 'Submitting Enquiry...' : 'Submit Reservation Enquiry'}
              </button>
            </form>

            {/* Live Stay Summary Sidebar (5 cols) */}
            <div className="lg:col-span-5 bg-[#121215] border border-[#232328] p-8 space-y-6 sticky top-28 shadow-2xl">
              <div className="flex items-center justify-between pb-4 border-b border-[#232328]">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#E8C36B] font-sans font-semibold">Residence Profile</span>
                  <h4 className="font-serif text-2xl text-[#F4EFE5] mt-1">{selectedSuite.name}</h4>
                </div>
              </div>

              <div className="aspect-[16/10] overflow-hidden border border-[#232328]">
                <img
                  src={selectedSuite.images.hero}
                  alt={selectedSuite.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-3 font-sans text-xs">
                <div className="flex justify-between text-[#F4EFE5]/70">
                  <span>Duration</span>
                  <span className="font-mono text-[#F4EFE5] font-medium">{nights} Nights</span>
                </div>
                <div className="flex justify-between text-[#F4EFE5]/70">
                  <span>Nightly Rate</span>
                  <span className="font-mono text-[#F4EFE5] font-medium">${selectedSuite.pricePerNight.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[#F4EFE5]/70">
                  <span>Subtotal</span>
                  <span className="font-mono text-[#F4EFE5] font-medium">${baseRate.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[#F4EFE5]/70">
                  <span>Environmental & Service (12%)</span>
                  <span className="font-mono text-[#F4EFE5] font-medium">${resortTaxAndService.toLocaleString()}</span>
                </div>

                <div className="pt-3 border-t border-[#232328] flex justify-between font-serif text-xl text-[#F4EFE5]">
                  <span>Estimated Total</span>
                  <span className="text-[#E8C36B] font-medium">${estimatedTotal.toLocaleString()}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-[#232328] space-y-2 text-[11px] font-sans text-[#F4EFE5]/60">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#E8C36B]" />
                  <span>Confidential and discreet handling of every enquiry.</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#E8C36B]" />
                  <span>Includes daily champagne breakfast and thermal spa passes.</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
