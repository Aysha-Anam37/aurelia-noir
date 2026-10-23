/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { PageId } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

// Pages
import { HomePage } from './pages/HomePage';
import { OurWorldPage } from './pages/OurWorldPage';
import { TheRetreatPage } from './pages/TheRetreatPage';
import { SuitesPage } from './pages/SuitesPage';
import { SuiteDetailPage } from './pages/SuiteDetailPage';
import { ExperiencesPage } from './pages/ExperiencesPage';
import { DiningPage } from './pages/DiningPage';
import { GalleryPage } from './pages/GalleryPage';
import { ReservationsPage } from './pages/ReservationsPage';
import { ContactPage } from './pages/ContactPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [selectedSuiteId, setSelectedSuiteId] = useState<string | undefined>(
    'the-obsidian-presidential-sanctuary'
  );

  // Sync hash with route
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').trim();
      if (!hash) {
        setCurrentPage('home');
        return;
      }

      if (hash.startsWith('suite/')) {
        const id = hash.replace('suite/', '');
        setSelectedSuiteId(id);
        setCurrentPage('suite-details');
        return;
      }

      const validPages: PageId[] = [
        'home',
        'our-world',
        'the-retreat',
        'suites',
        'suite-details',
        'experiences',
        'dining',
        'gallery',
        'reservations',
        'contact',
      ];

      if (validPages.includes(hash as PageId)) {
        setCurrentPage(hash as PageId);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (page: PageId, suiteId?: string) => {
    if (suiteId) {
      setSelectedSuiteId(suiteId);
      window.location.hash = `suite/${suiteId}`;
    } else {
      window.location.hash = page === 'home' ? '' : page;
    }
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#0D0D0F] text-[#EDE8DC] flex flex-col font-sans selection:bg-[#B8893A]/30 selection:text-white">
      {/* 3-Zone Top Navigation Bar */}
      <Navbar currentPage={currentPage} onNavigate={handleNavigate} />

      {/* Main Dynamic View Area */}
      <main className="flex-1 w-full">
        {currentPage === 'home' && <HomePage onNavigate={handleNavigate} />}
        {currentPage === 'our-world' && <OurWorldPage onNavigate={handleNavigate} />}
        {currentPage === 'the-retreat' && <TheRetreatPage onNavigate={handleNavigate} />}
        {currentPage === 'suites' && <SuitesPage onNavigate={handleNavigate} />}
        {currentPage === 'suite-details' && (
          <SuiteDetailPage
            suiteId={selectedSuiteId}
            onNavigate={handleNavigate}
            onSelectForReservation={(suiteId) => {
              setSelectedSuiteId(suiteId);
            }}
          />
        )}
        {currentPage === 'experiences' && <ExperiencesPage onNavigate={handleNavigate} />}
        {currentPage === 'dining' && <DiningPage onNavigate={handleNavigate} />}
        {currentPage === 'gallery' && <GalleryPage onNavigate={handleNavigate} />}
        {currentPage === 'reservations' && (
          <ReservationsPage
            initialSuiteId={selectedSuiteId}
            onNavigate={handleNavigate}
          />
        )}
        {currentPage === 'contact' && <ContactPage onNavigate={handleNavigate} />}
      </main>

      {/* Editorial Footer with 10-page directory & concept notice */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
