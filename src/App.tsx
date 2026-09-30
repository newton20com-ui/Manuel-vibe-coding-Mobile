import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { MDNSidebar, PAGES_CATALOG } from './components/MDNSidebar';
import { MDNPagePagination } from './components/MDNPagePagination';
import { OverviewPage } from './components/OverviewPage';
import { ParcoursSelector } from './components/ParcoursSelector';
import { PhoneSimulator } from './components/PhoneSimulator';
import { UniversalWorkflow } from './components/UniversalWorkflow';
import { CompatibilityMatrix } from './components/CompatibilityMatrix';
import { AIBasedBlueprintGenerator } from './components/AIBasedBlueprintGenerator';
import { ToolsDirectory } from './components/ToolsDirectory';
import { MobileErgonomicsGuide } from './components/MobileErgonomicsGuide';
import { PromptLibrary } from './components/PromptLibrary';
import { ProjectChecklist } from './components/ProjectChecklist';
import { Footer } from './components/Footer';
import { MobileBottomNav } from './components/MobileBottomNav';
import { Home } from 'lucide-react';

interface ParsedRoute {
  pageId: string;
  subParam?: string;
}

const parseRouteFromHash = (): ParsedRoute => {
  const clean = window.location.hash.replace(/^#\/?/, '');
  if (!clean) return { pageId: 'overview' };

  const [page, ...rest] = clean.split('/');
  const sub = rest.join('/');
  const match = PAGES_CATALOG.find((p) => p.id === page);

  if (!match) {
    // Check if hash matches an old alias or sub-path
    if (page === 'lab') return { pageId: 'playground' };
    if (page === 'astuces') return { pageId: 'ergonomie' };
    if (page === 'ai-generator') return { pageId: 'ai-architect' };
    return { pageId: 'overview' };
  }

  return {
    pageId: match.id,
    subParam: sub || undefined,
  };
};

export default function App() {
  const initialRoute = parseRouteFromHash();
  const [currentPageId, setCurrentPageId] = useState<string>(initialRoute.pageId);
  const [currentSubParam, setCurrentSubParam] = useState<string | undefined>(initialRoute.subParam);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Sync hash routing on popstate and hashchange
  useEffect(() => {
    const handleHashChange = () => {
      const route = parseRouteFromHash();
      setCurrentPageId(route.pageId);
      setCurrentSubParam(route.subParam);
      window.scrollTo({ top: 0, behavior: 'instant' });
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Update document title for current page
  useEffect(() => {
    const page = PAGES_CATALOG.find((p) => p.id === currentPageId);
    if (page) {
      document.title = `${page.title} — PocketStack Mobile Docs`;
    }
  }, [currentPageId]);

  const handleNavigate = (pageId: string, subParam?: string) => {
    setCurrentPageId(pageId);
    setCurrentSubParam(subParam);
    window.location.hash = subParam ? `#/${pageId}/${subParam}` : `#/${pageId}`;
    window.scrollTo({ top: 0, behavior: 'instant' });
    setIsMobileMenuOpen(false);
  };

  const activePageDef = PAGES_CATALOG.find((p) => p.id === currentPageId);

  const renderActivePage = () => {
    switch (currentPageId) {
      case 'overview':
        return <OverviewPage onNavigate={handleNavigate} />;
      case 'parcours':
        return (
          <ParcoursSelector
            initialTrackId={currentSubParam}
            onSelectTrack={(trackId) => {
              setCurrentSubParam(trackId);
              window.location.hash = `#/parcours/${trackId}`;
            }}
            onNavigateToPrompts={() => handleNavigate('prompts')}
          />
        );
      case 'workflow':
        return <UniversalWorkflow onOpenAIGenerator={() => handleNavigate('ai-architect')} />;
      case 'playground':
        return <PhoneSimulator />;
      case 'compatibilite':
        return <CompatibilityMatrix />;
      case 'outils':
        return <ToolsDirectory initialSearch={currentSubParam} />;
      case 'ergonomie':
        return <MobileErgonomicsGuide />;
      case 'prompts':
        return <PromptLibrary initialCategory={currentSubParam} />;
      case 'ai-architect':
        return <AIBasedBlueprintGenerator />;
      case 'checklist':
        return <ProjectChecklist />;
      default:
        return <OverviewPage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#15141a] text-slate-100 flex flex-col font-sans selection:bg-cyan-500/20 selection:text-cyan-200">
      {/* Top Bar Header with Search & Docs Quick Switcher */}
      <Navbar
        currentPageId={currentPageId}
        onNavigate={handleNavigate}
        onToggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        isMobileMenuOpen={isMobileMenuOpen}
      />

      {/* MDN 2-Column Documentation Container */}
      <div className="flex-1 flex max-w-7xl mx-auto w-full">
        {/* Left Sidebar: Sticky on Desktop, Drawer on Mobile */}
        <MDNSidebar
          currentPageId={currentPageId}
          onSelectPage={(pageId) => handleNavigate(pageId)}
          isOpenMobile={isMobileMenuOpen}
          onCloseMobile={() => setIsMobileMenuOpen(false)}
        />

        {/* Right Content Column: Displays ONLY the active page */}
        <main className="flex-1 min-w-0 px-3 sm:px-6 lg:px-10 py-6 sm:py-8 pb-24 lg:pb-16 max-w-5xl">
          {/* MDN Breadcrumbs for subpages */}
          {currentPageId !== 'overview' && activePageDef && (
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#2e2d38]">
              <nav aria-label="Fil d'ariane" className="flex items-center gap-1.5 text-xs font-mono text-slate-400 truncate">
                <button
                  onClick={() => handleNavigate('overview')}
                  className="hover:text-cyan-400 transition-colors flex items-center gap-1"
                >
                  <Home className="w-3.5 h-3.5" />
                  <span>Docs</span>
                </button>
                <span>/</span>
                <span className="text-slate-400 truncate">{activePageDef.category}</span>
                <span>/</span>
                <span className="text-cyan-400 font-semibold truncate">{activePageDef.shortTitle}</span>
              </nav>

              <div className="hidden sm:inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-800/40">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Baseline 2026</span>
              </div>
            </div>
          )}

          {/* Active Page View */}
          <div className="animate-fadeIn">
            {renderActivePage()}
          </div>

          {/* MDN Page Pagination (Previous Article / Next Article) */}
          <MDNPagePagination currentPageId={currentPageId} onNavigate={handleNavigate} />
        </main>
      </div>

      {/* Quiet MDN Footer with synchronized navigation */}
      <Footer onNavigate={handleNavigate} />

      {/* Mobile-First Bottom Nav Bar for quick thumb navigation */}
      <MobileBottomNav
        currentPageId={currentPageId}
        onNavigate={(pageId) => handleNavigate(pageId)}
      />
    </div>
  );
}
