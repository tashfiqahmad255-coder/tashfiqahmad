import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Sparkles, MessageSquare, Globe, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Navbar() {
  const { language, setLanguage, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Track scroll position for header glassmorphism & active section
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Check section scroll positions
      const sections = ['home', 'about', 'portfolio', 'contact'];
      const scrollPosition = window.scrollY + 180;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll handler
  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    setActiveSection(id);

    const element = document.getElementById(id);
    if (element) {
      const yOffset = -90; // offset for fixed header
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const navItems = [
    { id: 'home', label: t.navHome },
    { id: 'about', label: t.navAbout },
    { id: 'portfolio', label: t.navPortfolio },
    { id: 'contact', label: t.navContact },
  ];

  return (
    <header
      id="main-luxury-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#070B14]/90 backdrop-blur-xl border-b border-slate-800/80 shadow-2xl shadow-cyan-950/20 py-3'
          : 'bg-transparent border-b border-slate-900/40 py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* LEFT: BRAND & SUBTITLE */}
        <div 
          onClick={() => scrollToSection('home')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          {/* Logo Badge with Clean Cyan Glow Accent */}
          <div className="relative">
            <span className="absolute -inset-1 bg-cyan-500/50 rounded-lg blur-sm opacity-80 group-hover:opacity-100 transition duration-300" />
            <div className="relative bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1 text-sm font-display font-black tracking-tight flex items-center gap-1.5 shadow-inner">
              <span className="text-cyan-400 font-mono text-xs">✦</span>
              <span className="text-cyan-300 font-black">
                TAT
              </span>
            </div>
          </div>

          <div className="flex flex-col min-w-0">
            <span className="text-xs sm:text-sm font-extrabold font-display tracking-tight text-white group-hover:text-cyan-300 transition-all uppercase truncate max-w-[130px] xs:max-w-[170px] sm:max-w-none">
              {t.ownerName}
            </span>
            <span className="text-[9px] sm:text-[10px] font-mono text-cyan-400 font-semibold uppercase tracking-widest flex items-center gap-1.5 truncate">
              <span className="truncate">{t.subtitle}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 inline-block animate-pulse shrink-0" />
            </span>
          </div>
        </div>

        {/* CENTER: DESKTOP NAVIGATION MENU */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-950/80 border border-slate-800/90 p-1.5 rounded-full backdrop-blur-md shadow-inner">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative px-4 py-1.5 rounded-full text-xs font-mono font-bold tracking-wide transition-all duration-200 group ${
                  isActive
                    ? 'text-cyan-300 font-black'
                    : 'text-slate-400 hover:text-slate-100'
                }`}
              >
                {/* Active Pill Background with Single Solid Color */}
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute inset-0 bg-cyan-500/20 border border-cyan-400/60 rounded-full shadow-[0_0_15px_rgba(0,229,255,0.25)]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}

                <span className="relative z-10">{item.label}</span>

                {/* Hover Underline Effect */}
                <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-250 rounded-full" />
              </button>
            );
          })}
        </nav>

        {/* RIGHT: LANGUAGE SWITCHER & LET'S TALK BUTTON */}
        <div className="hidden lg:flex items-center gap-4">
          
          {/* Language Switcher Pill - Single Color Active Bars */}
          <div className="flex items-center gap-1 bg-slate-950 border border-cyan-500/30 p-1 rounded-full text-xs font-mono font-bold shadow-inner">
            <button
              onClick={() => setLanguage('EN')}
              className={`px-3 py-1 rounded-full transition-all duration-200 ${
                language === 'EN'
                  ? 'bg-cyan-400 text-slate-950 shadow-md font-black'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              English (EN)
            </button>
            <button
              onClick={() => setLanguage('BN')}
              className={`px-3 py-1 rounded-full transition-all duration-200 ${
                language === 'BN'
                  ? 'bg-cyan-400 text-slate-950 shadow-md font-black'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              বাংলা (BN)
            </button>
          </div>

          {/* Premium "Let's Talk" Button - Single Color CTA */}
          <button
            onClick={() => scrollToSection('contact')}
            className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-mono font-black text-slate-950 overflow-hidden shadow-lg shadow-cyan-950/40 transition-transform duration-200 active:scale-95 bg-cyan-400 hover:bg-cyan-300"
          >
            <span className="relative z-10 tracking-wider font-extrabold flex items-center gap-1.5 uppercase">
              <Sparkles size={13} className="text-slate-950 animate-pulse" />
              <span>{t.letsTalk}</span>
            </span>
          </button>
        </div>

        {/* MOBILE RIGHT CONTROLS: LANG TOGGLE + HAMBURGER BUTTON */}
        <div className="flex lg:hidden items-center gap-2">
          {/* Mobile Language Pill */}
          <button
            onClick={() => setLanguage(language === 'EN' ? 'BN' : 'EN')}
            className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-950 border border-cyan-500/40 text-[11px] font-mono text-cyan-300 font-bold"
          >
            <Globe size={11} className="text-cyan-400" />
            <span>{language === 'EN' ? 'BN' : 'EN'}</span>
          </button>

          {/* Hamburger Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 hover:text-cyan-400 transition"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

      </div>

      {/* MOBILE SLIDE-DOWN DRAWER MENU */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="lg:hidden bg-[#070B14]/95 backdrop-blur-2xl border-b border-slate-800 px-4 pt-4 pb-6 mt-3 space-y-4 shadow-2xl overflow-hidden"
          >
            {/* Mobile Nav Links */}
            <div className="flex flex-col space-y-1">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`flex items-center justify-between p-3 rounded-xl text-sm font-mono font-bold transition-all ${
                      isActive
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/50'
                        : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
                    }`}
                  >
                    <span>{item.label}</span>
                    <span className="text-xs font-mono text-cyan-400">✦</span>
                  </button>
                );
              })}
            </div>

            {/* Mobile Language Switcher */}
            <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
              <span className="text-xs font-mono text-slate-400">Language / ভাষা</span>
              <div className="flex gap-1 bg-slate-950 border border-cyan-500/30 p-1 rounded-lg text-xs font-mono">
                <button
                  onClick={() => setLanguage('EN')}
                  className={`px-3 py-1 rounded transition ${
                    language === 'EN' ? 'bg-cyan-400 text-slate-950 font-black' : 'text-slate-400'
                  }`}
                >
                  English
                </button>
                <button
                  onClick={() => setLanguage('BN')}
                  className={`px-3 py-1 rounded transition ${
                    language === 'BN' ? 'bg-cyan-400 text-slate-950 font-black' : 'text-slate-400'
                  }`}
                >
                  বাংলা
                </button>
              </div>
            </div>

            {/* Mobile "Let's Talk" CTA */}
            <button
              onClick={() => scrollToSection('contact')}
              className="w-full flex items-center justify-center gap-2 py-3 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-mono font-black text-xs uppercase rounded-xl shadow-lg shadow-cyan-950/50"
            >
              <Sparkles size={14} className="animate-pulse" />
              <span>{t.letsTalk}</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </header>
  );
}
