import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Phone, Mail, MapPin, Clock, ArrowRight, ChevronDown, Star, 
  ShieldCheck, Trash2, Wrench, Sparkles, Layers, Hammer, Menu, 
  X, ChevronUp, Grid, Award, Check, Calendar, ArrowUpRight, HelpCircle
} from "lucide-react";

import { SERVICES, PROJECTS, TESTIMONIALS, FAQS, SERVICE_AREAS } from "./data";
import { Service, Project } from "./types";

import FloorVisualizer3D from "./components/FloorVisualizer3D";
import Chatbot from "./components/Chatbot";
import LeadForm from "./components/LeadForm";

export default function App() {
  const [activeTab, setActiveTab] = useState<string>("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);
  const [showLeadModal, setShowLeadModal] = useState<boolean>(false);
  
  // Gallery state
  const [galleryCategory, setGalleryCategory] = useState<string>("All");
  const [activeProjectComparison, setActiveProjectComparison] = useState<Project | null>(null);
  const [comparisonSliderPos, setComparisonSliderPos] = useState<number>(50); // percentage 0-100
  const [selectedLightboxImage, setSelectedLightboxImage] = useState<string | null>(null);

  // FAQ accordion state
  const [expandedFaqId, setExpandedFaqId] = useState<string | null>("f1");

  // Track scrolling to show Scroll-to-Top and sticky navbar accents
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to top of window helper
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Filter gallery projects
  const filteredProjects = galleryCategory === "All" 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category.toLowerCase() === galleryCategory.toLowerCase());

  // Navigation tabs helper
  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const openEstimateModal = () => {
    setShowLeadModal(true);
  };

  return (
    <div className="min-h-screen bg-wood-charcoal text-gray-200 font-sans relative flex flex-col justify-between selection:bg-luxury-gold selection:text-wood-dark">
      
      {/* BACKGROUND LUXURY GRID PATTERNS & EFFECTS */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-luxury-gold/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-luxury-gold/5 blur-[120px]" />
        <div className="absolute top-[30%] right-[-10%] w-[40%] h-[40%] rounded-full bg-gold-600/3 blur-[140px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(194,159,91,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(194,159,91,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      {/* TOP HEADER UTILITY INFOBAR */}
      <div className="bg-wood-charcoal border-b border-luxury-gold/10 text-[11px] py-2 px-4 md:px-8 relative z-40 hidden sm:flex justify-between items-center text-gray-400 font-mono">
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-1.5 hover:text-luxury-gold transition-colors">
            <MapPin className="w-3.5 h-3.5 text-luxury-gold" />
            Hamilton, ON & Surrounding Areas
          </span>
          <span className="flex items-center gap-1.5 hover:text-luxury-gold transition-colors">
            <Clock className="w-3.5 h-3.5 text-luxury-gold" />
            Mon-Sat: 8:00 AM - 6:00 PM
          </span>
        </div>
        <div className="flex items-center gap-6">
          <a href="mailto:estimating@sophria.ca" className="flex items-center gap-1.5 hover:text-luxury-gold transition-colors">
            <Mail className="w-3.5 h-3.5 text-luxury-gold" />
            estimating@sophria.ca
          </a>
          <a href="tel:4376054750" className="flex items-center gap-1.5 text-luxury-gold hover:text-gold-400 transition-colors font-bold">
            <Phone className="w-3.5 h-3.5 animate-pulse" />
            (437) 605-4750
          </a>
        </div>
      </div>

      {/* MAIN STICKY HEADER */}
      <header className="sticky top-0 z-40 bg-wood-dark/80 backdrop-blur-md border-b border-luxury-gold/10 px-4 md:px-8 py-4 flex items-center justify-between transition-all">
        {/* LOGO */}
        <button 
          onClick={() => handleTabChange("home")}
          className="flex items-center gap-2.5 group cursor-pointer focus:outline-none"
        >
          <div className="w-10 h-10 rounded-xl bg-luxury-gold/10 border border-luxury-gold/30 flex items-center justify-center transition-all duration-300 group-hover:bg-luxury-gold group-hover:text-wood-dark">
            <span className="text-xl font-bold font-display text-luxury-gold group-hover:text-wood-dark transition-colors">
              S
            </span>
          </div>
          <div className="text-left">
            <h1 className="text-xl font-bold text-white tracking-widest font-display leading-tight flex items-center gap-1">
              SOPHRIA <span className="text-luxury-gold text-xs block font-light font-sans tracking-wide">FLOORING</span>
            </h1>
            <p className="text-[9px] text-gray-400 font-mono tracking-widest leading-none">PREMIUM CRAFTSMANSHIP</p>
          </div>
        </button>

        {/* DESKTOP NAV NAVIGATION */}
        <nav className="hidden lg:flex items-center gap-8 text-xs uppercase tracking-wider font-semibold font-display">
          {[
            { id: "home", label: "Home" },
            { id: "about", label: "About" },
            { id: "services", label: "Services" },
            { id: "gallery", label: "Gallery" },
            { id: "testimonials", label: "Testimonials" },
            { id: "service-areas", label: "Service Areas" },
            { id: "contact", label: "Contact" }
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`relative py-1.5 cursor-pointer transition-colors focus:outline-none ${
                  isActive ? "text-luxury-gold font-bold" : "text-gray-300 hover:text-white"
                }`}
              >
                {tab.label}
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-luxury-gold"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* HEADER CTA ACTION BUTTONS */}
        <div className="hidden sm:flex items-center gap-4">
          <button
            onClick={openEstimateModal}
            className="px-5 py-2.5 rounded-xl bg-luxury-gold hover:bg-gold-400 text-wood-dark font-bold text-xs uppercase tracking-wider shadow-lg shadow-luxury-gold/15 transition-all duration-300 hover:scale-[1.02] cursor-pointer"
          >
            Get Free Estimate
          </button>
        </div>

        {/* MOBILE NAVIGATION TRIGGER BUTTON */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-xl border border-luxury-gold/15 bg-wood-dark/50 text-gray-300 hover:text-white focus:outline-none cursor-pointer"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </header>

      {/* MOBILE FULL-SCREEN HEADER NAV OVERLAY */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed top-[73px] left-0 right-0 z-30 bg-wood-dark border-b border-luxury-gold/15 lg:hidden overflow-hidden shadow-2xl"
          >
            <div className="p-6 flex flex-col gap-4 font-display font-semibold text-sm uppercase tracking-wider text-center">
              {[
                { id: "home", label: "Home" },
                { id: "about", label: "About" },
                { id: "services", label: "Services" },
                { id: "gallery", label: "Gallery" },
                { id: "testimonials", label: "Testimonials" },
                { id: "service-areas", label: "Service Areas" },
                { id: "contact", label: "Contact" }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`py-3 rounded-xl transition-all cursor-pointer ${
                    activeTab === tab.id 
                      ? "bg-luxury-gold/10 text-luxury-gold border border-luxury-gold/20" 
                      : "text-gray-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
              <div className="pt-4 border-t border-luxury-gold/10 flex flex-col gap-3">
                <a
                  href="tel:4376054750"
                  className="w-full py-3 bg-wood-charcoal border border-luxury-gold/20 rounded-xl text-luxury-gold font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  Call (437) 605-4750
                </a>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openEstimateModal();
                  }}
                  className="w-full py-3.5 bg-luxury-gold text-wood-dark font-bold text-xs uppercase tracking-widest rounded-xl shadow-lg cursor-pointer"
                >
                  Get A Free Estimate
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CORE CONTENT PAGES ROUTER PANES */}
      <main className="flex-1 relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35 }}
            className="w-full"
          >
            
            {/* TAB: HOME PAGE */}
            {activeTab === "home" && (
              <div className="space-y-20 pb-20">
                
                {/* HERO BANNER SECTION */}
                <section className="relative min-h-[92vh] md:min-h-[85vh] flex items-center justify-center px-4 md:px-8 py-16 overflow-hidden">
                  <div className="absolute inset-0 z-0">
                    <video
                      autoPlay
                      muted
                      loop
                      playsInline
                      poster="https://pbwbswkk2pcfhrwv.public.blob.vercel-storage.com/Sophria.mp4"
                      className="w-full h-full object-cover object-center opacity-30"
                    >
                      <source 
                        src="https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c054ba2740c210ca3302ab20e2e50cf9&profile_id=139&oauth2_token_id=57447761" 
                        type="video/mp4" 
                      />
                      {/* Image fallback if browser prevents auto-play video */}
                      <img 
                        src="https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?auto=format&fit=crop&w=1600&q=80" 
                        alt="Premium White Oak Herringbone Hardwood Floor Installed by Sophria" 
                        className="w-full h-full object-cover object-center"
                        referrerPolicy="no-referrer"
                      />
                    </video>
                    <div className="absolute inset-0 bg-gradient-to-t from-wood-charcoal via-wood-charcoal/80 to-wood-charcoal/40" />
                  </div>

                  <div className="max-w-4xl text-center relative z-10 space-y-8 px-4">
                    <motion.div
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.1, duration: 0.5 }}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-luxury-gold/10 border border-luxury-gold/30 text-xs text-luxury-gold uppercase font-mono tracking-widest"
                    >
                      <Sparkles className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '6s' }} />
                      <span>Hamilton's #1 Premium Flooring Contractor</span>
                    </motion.div>

                    <div className="space-y-4">
                      <h2 className="text-5xl sm:text-7xl md:text-8xl font-serif text-white tracking-tight leading-[1.1] text-shadow-md">
                        Beautiful Floors <br />
                        <span className="gold-text-gradient italic font-light">Built to Last.</span>
                      </h2>
                      <p className="text-sm sm:text-base md:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed font-sans font-light">
                        Sophria delivers master-tier residential and commercial flooring installations across Hamilton, Burlington, and surrounding regions. We combine elite-grade craftsmanship, transparent pricing, and robust local warranties.
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                      <button
                        onClick={openEstimateModal}
                        className="w-full sm:w-auto px-8 py-4 rounded-xl bg-luxury-gold hover:bg-gold-400 text-wood-dark font-bold text-xs uppercase tracking-widest shadow-xl shadow-luxury-gold/20 hover:shadow-luxury-gold/35 transition-all duration-300 hover:scale-[1.03] cursor-pointer"
                      >
                        Get a Free Estimate
                      </button>
                      <a
                        href="tel:4376054750"
                        className="w-full sm:w-auto px-8 py-4 rounded-xl bg-wood-dark/80 hover:bg-wood-dark border border-luxury-gold/25 hover:border-luxury-gold text-white font-bold text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:scale-[1.03]"
                      >
                        <Phone className="w-4 h-4 text-luxury-gold" />
                        Call (437) 605-4750
                      </a>
                    </div>

                    {/* Quality Badges */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto pt-10 border-t border-luxury-gold/10">
                      {[
                        { title: "3-Year Warranty", subtitle: "On All Crafts" },
                        { title: "Dustless Removal", subtitle: "Clean Air Systems" },
                        { title: "Fully Bonded", subtitle: "WSIB & Liability" },
                        { title: "Sourcing Experts", subtitle: "Mill-Direct Pricing" }
                      ].map((item, i) => (
                        <div key={i} className="text-center bg-wood-charcoal/50 p-3 rounded-xl border border-luxury-gold/5">
                          <h5 className="text-xs font-bold text-luxury-gold font-mono">{item.title}</h5>
                          <p className="text-[10px] text-gray-400 mt-0.5">{item.subtitle}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>

                {/* METRICS & STATISTICS COUNTERS SECTION */}
                <section className="max-w-7xl mx-auto px-4 md:px-8">
                  <div className="bg-wood-dark/65 backdrop-blur-sm border border-luxury-gold/15 p-8 md:p-12 rounded-3xl grid grid-cols-2 lg:grid-cols-4 gap-8 text-center relative overflow-hidden shadow-xl">
                    <div className="absolute top-0 left-0 w-24 h-24 bg-luxury-gold/5 rounded-full blur-2xl" />
                    {[
                      { number: "15+", label: "Years Experience", desc: "Red-Seal Carpenters" },
                      { number: "850+", label: "Floors Completed", desc: "Residential & Commercial" },
                      { number: "100%", label: "Satisfaction Rate", desc: "Flawless local reputation" },
                      { number: "3 Year", label: "Local Warranty", desc: "Full structural coverage" }
                    ].map((stat, idx) => (
                      <div key={idx} className="space-y-1 relative z-10 group">
                        <span className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-luxury-gold tracking-tight font-display block group-hover:scale-105 transition-transform duration-300">
                          {stat.number}
                        </span>
                        <h4 className="text-xs sm:text-sm font-bold text-white tracking-wide font-sans">{stat.label}</h4>
                        <p className="text-[10px] text-gray-500 font-mono uppercase">{stat.desc}</p>
                      </div>
                    ))}
                  </div>
                </section>

                {/* BRIEF ABOUT SECTION */}
                <section className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  <div className="lg:col-span-6 space-y-6">
                    <div className="flex items-center gap-2 text-luxury-gold">
                      <Award className="w-4 h-4" />
                      <span className="text-xs font-mono uppercase tracking-widest font-semibold">Our Identity</span>
                    </div>
                    <h3 className="text-3xl sm:text-4xl font-serif font-medium text-white tracking-tight leading-tight">
                      Bespoke Residential & Commercial Flooring Solutions
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-400 leading-relaxed font-sans font-light">
                      Based in Mississauga and proudly serving Hamilton, Burlington, and beyond, Sophria has built an uncompromising reputation for precision flooring installations. Led by experienced estimators and master mechanics, we approach every floor as a unique canvas.
                    </p>
                    <p className="text-xs sm:text-sm text-gray-400 leading-relaxed font-sans font-light">
                      Whether you require authentic solid white oak in a herringbone pattern, waterproof luxury vinyl plank (LVP) for a basement renovation, or heavy-traffic carpet tiles in a commercial workspace, our team coordinates clean, dust-controlled executions.
                    </p>
                    <div className="pt-2 flex flex-wrap gap-4 text-xs font-mono">
                      <span className="flex items-center gap-1 text-gray-300"><Check className="w-4 h-4 text-luxury-gold" /> Dustless Prep</span>
                      <span className="flex items-center gap-1 text-gray-300"><Check className="w-4 h-4 text-luxury-gold" /> Mill-Direct Sourcing</span>
                      <span className="flex items-center gap-1 text-gray-300"><Check className="w-4 h-4 text-luxury-gold" /> Local Owner Support</span>
                    </div>
                    <button
                      onClick={() => handleTabChange("about")}
                      className="group inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-luxury-gold hover:text-gold-400 transition-colors pt-2 cursor-pointer focus:outline-none"
                    >
                      <span>Read Our Story</span>
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </button>
                  </div>
                  <div className="lg:col-span-6 relative">
                    <div className="absolute inset-0 bg-luxury-gold/5 rounded-3xl blur-2xl pointer-events-none" />
                    <div className="relative rounded-3xl overflow-hidden border border-luxury-gold/15 shadow-2xl bg-wood-charcoal max-h-[380px]">
                      <img 
                        src="https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=800&q=80" 
                        alt="Sophria master installers aligning white oak hardwood planks" 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  </div>
                </section>

                {/* BRAND SHOWCASE & GALLERY PICTURE SECTION */}
                <section className="bg-wood-dark/40 border-y border-luxury-gold/10 py-20 overflow-hidden relative">
                  {/* Subtle golden background glow */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-luxury-gold/5 rounded-full blur-[120px] pointer-events-none" />

                  <div className="max-w-7xl mx-auto px-4 md:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                      
                      {/* Left: Beautiful Typography & Details */}
                      <div className="lg:col-span-5 space-y-6 text-left">
                        <div className="inline-flex items-center gap-2 text-luxury-gold">
                          <Award className="w-4 h-4 text-luxury-gold" />
                          <span className="text-xs font-mono uppercase tracking-widest font-semibold">Artisan Excellence</span>
                        </div>
                        
                        <h3 className="text-3xl sm:text-4xl font-serif font-medium text-white tracking-tight leading-[1.15]">
                          The Sophria <br />
                          <span className="gold-text-gradient italic font-light">Hardwood Masterpiece</span>
                        </h3>
                        
                        <p className="text-sm text-gray-300 font-light leading-relaxed">
                          Our signature collections feature premium-grade European White Oak and American Walnut, crafted into precision Herringbone, Chevron, and wide-plank profiles that elevate any interior.
                        </p>

                        <div className="space-y-4 pt-2">
                          <div className="flex items-start gap-3">
                            <div className="w-5 h-5 rounded-full bg-luxury-gold/10 flex items-center justify-center border border-luxury-gold/25 mt-0.5 shrink-0">
                              <Check className="w-3 h-3 text-luxury-gold" />
                            </div>
                            <div>
                              <h4 className="text-sm font-semibold text-white">Sustainably Harvested Timber</h4>
                              <p className="text-xs text-gray-400">100% FSC-certified slow-grown oak from managed temperate forests.</p>
                            </div>
                          </div>

                          <div className="flex items-start gap-3">
                            <div className="w-5 h-5 rounded-full bg-luxury-gold/10 flex items-center justify-center border border-luxury-gold/25 mt-0.5 shrink-0">
                              <Check className="w-3 h-3 text-luxury-gold" />
                            </div>
                            <div>
                              <h4 className="text-sm font-semibold text-white">Millimeter-Perfect Joinery</h4>
                              <p className="text-xs text-gray-400">Pre-tensioned click locks and tongue-and-groove alignments.</p>
                            </div>
                          </div>

                          <div className="flex items-start gap-3">
                            <div className="w-5 h-5 rounded-full bg-luxury-gold/10 flex items-center justify-center border border-luxury-gold/25 mt-0.5 shrink-0">
                              <Check className="w-3 h-3 text-luxury-gold" />
                            </div>
                            <div>
                              <h4 className="text-sm font-semibold text-white">8-Layer UV Protective Finish</h4>
                              <p className="text-xs text-gray-400">Invisible shields against scratches, fading, and everyday spills.</p>
                            </div>
                          </div>
                        </div>

                        <div className="pt-4">
                          <button
                            onClick={() => {
                              const el = document.getElementById("lead-form-section");
                              if (el) el.scrollIntoView({ behavior: "smooth" });
                            }}
                            className="bg-gradient-to-r from-gold-500 to-luxury-gold hover:from-gold-600 hover:to-gold-500 text-wood-dark px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-lg hover:shadow-luxury-gold/15 flex items-center gap-2 cursor-pointer focus:outline-none"
                          >
                            <span>Request Material Samples</span>
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Right: Picture that matches the luxury business model perfectly */}
                      <div className="lg:col-span-7 relative group">
                        {/* Interactive glow effect around picture */}
                        <div className="absolute inset-0 bg-luxury-gold/10 rounded-[32px] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                        
                        <div className="relative rounded-[32px] overflow-hidden border border-luxury-gold/20 shadow-2xl bg-wood-charcoal aspect-[4/3] sm:aspect-[16/10] md:aspect-[16/11] lg:aspect-[4/3]">
                          <img 
                            src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=90" 
                            alt="Luxury modern residence featuring Sophria chevron white oak flooring installation" 
                            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                            referrerPolicy="no-referrer"
                          />
                          
                          {/* Radial golden vignette overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-wood-charcoal/90 via-transparent to-black/30 pointer-events-none" />
                          
                          {/* Classy border framing inside the image */}
                          <div className="absolute inset-4 border border-luxury-gold/20 rounded-2xl pointer-events-none" />
                          
                          {/* Live Overlay Info Badge */}
                          <div className="absolute top-6 left-6 bg-wood-dark/90 backdrop-blur-md px-4 py-2 rounded-2xl border border-luxury-gold/20 text-[10px] text-gold-100 flex items-center gap-2 font-mono">
                            <span className="w-2 h-2 rounded-full bg-luxury-gold animate-pulse" />
                            <span>SIGNATURE RESIDENCE PROJECT</span>
                          </div>

                          {/* Detail Card Overlay */}
                          <div className="absolute bottom-6 left-6 right-6 bg-wood-dark/90 backdrop-blur-md p-5 rounded-2xl border border-luxury-gold/15 max-w-sm">
                            <span className="text-[9px] uppercase tracking-widest text-luxury-gold block font-semibold mb-1">
                              Featured Timber Layout
                            </span>
                            <h4 className="text-base font-semibold text-white mb-1 font-display">
                              Select European White Oak
                            </h4>
                            <p className="text-xs text-gray-400 font-light leading-relaxed">
                              Arranged in precision Chevron layout with extra matte anti-scratch UV finish.
                            </p>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                </section>

                {/* FEATURED SERVICES LIST */}
                <section className="max-w-7xl mx-auto px-4 md:px-8 space-y-12">
                  <div className="text-center space-y-4">
                    <div className="inline-flex items-center gap-2 text-luxury-gold">
                      <Wrench className="w-4 h-4" />
                      <span className="text-xs font-mono uppercase tracking-widest font-semibold">Bespoke Offerings</span>
                    </div>
                    <h3 className="text-3xl sm:text-4xl font-serif font-medium text-white tracking-tight">
                      Our Specialty Services
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-400 max-w-2xl mx-auto font-light leading-relaxed">
                      We engineer complete, high-performance floors. Explore our foundational installations.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {SERVICES.slice(0, 3).map((serv) => (
                      <div 
                        key={serv.id} 
                        className="group bg-wood-dark/70 rounded-3xl border border-luxury-gold/10 p-6 flex flex-col justify-between hover:border-luxury-gold/30 hover:bg-wood-dark/95 transition-all duration-300 relative overflow-hidden shadow-md"
                      >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-luxury-gold/3 rounded-full blur-2xl group-hover:bg-luxury-gold/8 transition-all" />
                        <div className="space-y-4">
                          <div className="rounded-2xl overflow-hidden h-44 border border-luxury-gold/5 bg-wood-charcoal relative">
                            <img 
                              src={serv.imageUrl} 
                              alt={serv.title} 
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                          <h4 className="text-lg font-bold text-white font-display flex items-center justify-between group-hover:text-luxury-gold transition-colors">
                            {serv.title}
                            <ArrowUpRight className="w-4 h-4 text-luxury-gold opacity-0 group-hover:opacity-100 transition-opacity" />
                          </h4>
                          <p className="text-xs text-gray-400 leading-relaxed font-light line-clamp-3">
                            {serv.shortDescription}
                          </p>
                        </div>
                        <button
                          onClick={() => handleTabChange("services")}
                          className="mt-6 w-full py-2.5 rounded-xl border border-luxury-gold/20 hover:border-luxury-gold text-gray-300 hover:text-wood-dark hover:bg-luxury-gold text-[10px] font-bold uppercase tracking-widest transition-all duration-300 cursor-pointer"
                        >
                          Explore Benefits & Process
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="text-center">
                    <button
                      onClick={() => handleTabChange("services")}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-luxury-gold/20 hover:border-luxury-gold text-xs font-semibold uppercase tracking-widest text-white hover:bg-luxury-gold hover:text-wood-dark transition-all duration-300 cursor-pointer focus:outline-none"
                    >
                      <span>View All 11 Specialty Services</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </section>

                {/* ACCORDION FAQ SECTION */}
                <section className="max-w-4xl mx-auto px-4 md:px-8 space-y-10">
                  <div className="text-center space-y-4">
                    <div className="inline-flex items-center gap-2 text-luxury-gold">
                      <HelpCircle className="w-4 h-4" />
                      <span className="text-xs font-mono uppercase tracking-widest font-semibold">Client Inquiries</span>
                    </div>
                    <h3 className="text-3xl sm:text-4xl font-serif font-medium text-white tracking-tight">
                      Frequently Asked Questions
                    </h3>
                  </div>

                  <div className="space-y-4 bg-wood-dark/30 p-6 sm:p-8 rounded-3xl border border-luxury-gold/10">
                    {FAQS.map((faq) => {
                      const isExpanded = expandedFaqId === faq.id;
                      return (
                        <div 
                          key={faq.id} 
                          className="border-b border-luxury-gold/10 last:border-b-0 pb-4 last:pb-0 pt-4 first:pt-0"
                        >
                          <button
                            onClick={() => setExpandedFaqId(isExpanded ? null : faq.id)}
                            className="w-full flex items-center justify-between text-left py-2 font-display text-sm font-semibold text-white hover:text-luxury-gold transition-colors focus:outline-none cursor-pointer"
                          >
                            <span>{faq.question}</span>
                            <ChevronDown className={`w-4 h-4 text-luxury-gold transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`} />
                          </button>
                          <AnimatePresence initial={false}>
                            {isExpanded && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.25 }}
                                className="overflow-hidden"
                              >
                                <p className="text-xs text-gray-400 leading-relaxed font-sans font-light pt-2.5">
                                  {faq.answer}
                                </p>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>
                </section>

                {/* HIGH-CONVERSION ESTIMATE CALL-TO-ACTION BLOCK */}
                <section className="max-w-7xl mx-auto px-4 md:px-8">
                  <div className="bg-gradient-to-r from-gold-900/60 to-wood-dark border border-luxury-gold/20 p-8 md:p-16 rounded-3xl flex flex-col lg:flex-row items-center justify-between gap-8 relative overflow-hidden shadow-2xl">
                    <div className="absolute top-[-50%] right-[-10%] w-72 h-72 bg-luxury-gold/10 rounded-full blur-3xl" />
                    <div className="space-y-4 max-w-xl text-center lg:text-left">
                      <span className="text-[10px] font-mono tracking-widest text-luxury-gold uppercase font-bold block">
                        Get Started Today
                      </span>
                      <h3 className="text-2xl sm:text-4xl font-serif font-medium text-white tracking-tight">
                        Ready for Your Free In-Home Flooring Estimate?
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-light">
                        Our expert estimators will bring physical hardwood, vinyl, and tile samples directly to your home's actual lighting conditions. Complete transparent layouts with zero surprise fees.
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 shrink-0 w-full lg:w-auto">
                      <button
                        onClick={openEstimateModal}
                        className="w-full sm:w-auto px-8 py-4 bg-luxury-gold hover:bg-gold-400 text-wood-dark font-bold text-xs uppercase tracking-widest rounded-xl shadow-lg transition-transform hover:scale-[1.02] cursor-pointer"
                      >
                        Book Estimate Online
                      </button>
                      <a
                        href="tel:4376054750"
                        className="w-full sm:w-auto px-6 py-4 border border-luxury-gold/20 hover:border-luxury-gold text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2"
                      >
                        <Phone className="w-4 h-4 text-luxury-gold" />
                        (437) 605-4750
                      </a>
                    </div>
                  </div>
                </section>

              </div>
            )}

            {/* TAB: ABOUT PAGE */}
            {activeTab === "about" && (
              <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 space-y-16">
                
                {/* Header Title */}
                <div className="text-center max-w-2xl mx-auto space-y-4">
                  <span className="text-xs font-mono uppercase tracking-widest text-luxury-gold font-bold block">
                    Our Heritage & Philosophy
                  </span>
                  <h2 className="text-3xl sm:text-5xl font-serif font-medium text-white tracking-tight">
                    About <span className="gold-text-gradient italic font-light">Sophria Flooring</span>
                  </h2>
                  <div className="h-0.5 w-16 bg-luxury-gold mx-auto" />
                  <p className="text-xs sm:text-sm text-gray-400 font-light">
                    How an obsession with fine joinery and clean, dust-controlled installations established Sophria as Southern Ontario's premier flooring team.
                  </p>
                </div>

                {/* Story grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div className="rounded-3xl overflow-hidden border border-luxury-gold/10 shadow-2xl relative">
                    <img 
                      src="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80" 
                      alt="Luxurious finished living area with Sophria hardwood" 
                      className="w-full h-[400px] object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute bottom-4 left-4 z-10 bg-wood-dark/90 border border-luxury-gold/15 p-4 rounded-xl max-w-xs">
                      <span className="text-[10px] uppercase font-mono tracking-widest text-luxury-gold block">Headquarters</span>
                      <span className="text-xs font-bold text-white">Serving Hamilton, Burlington, Oakville & Mississauga</span>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-white font-display">Our Mission</h3>
                    <p className="text-xs sm:text-sm text-gray-400 leading-relaxed font-light">
                      At Sophria, our mission is simple: to build high-performance floors that offer organic warmth, lifetime durability, and elevated residential value. We do not believe in cut corners, subfloor rushing, or surprise invoicing. 
                    </p>
                    <p className="text-xs sm:text-sm text-gray-400 leading-relaxed font-light">
                      Founded by wood mechanics who recognized that flooring installations often lacked proper leveling preparation and dust controls, we invested heavily in HEPA-integrated subfloor sanders and dustless vacuum systems. Every layout undergoes meticulous laser testing to achieve absolute flatness.
                    </p>
                    <h4 className="text-sm font-bold text-white uppercase font-mono tracking-wider flex items-center gap-2">
                      <ShieldCheck className="w-5 h-5 text-luxury-gold" />
                      The Sophria Standard of Care:
                    </h4>
                    <ul className="space-y-2 text-xs text-gray-300 font-light">
                      <li className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-luxury-gold mt-1.5 shrink-0" />
                        <span><strong>Moisture Analysis:</strong> We strictly test concrete relative humidity (RH) prior to LVP or hardwood acclimation to eliminate warp risk.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-luxury-gold mt-1.5 shrink-0" />
                        <span><strong>Squeak Remediation:</strong> We screw down existing joists and loose subfloor points before new floor nailing.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-luxury-gold mt-1.5 shrink-0" />
                        <span><strong>Mill-Direct Sourcing:</strong> We bypass middle-man retail showrooms to source high-end white oak, maple, and composite materials at direct-to-mechanic pricing.</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Values sections */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-6 border-t border-luxury-gold/10">
                  {[
                    { title: "Precision Craftsmanship", desc: "Our carpenters are trained in strict architectural standards, executing razor-sharp transition moldings, flush vents, and complex 45-degree herringbone geometries." },
                    { title: "Transparency", desc: "No hidden cleanup, dumping, or adhesive fees. Our written bids outline every specific linear foot of shoe molding and pound of self-leveling mortar." },
                    { title: "Customer-First Approach", desc: "We treat your home with total respect. Daily dust sweepings, HEPA air filtration during sandings, and full furniture protective wraps come standard." }
                  ].map((val, idx) => (
                    <div key={idx} className="bg-wood-dark/50 border border-luxury-gold/10 p-6 rounded-2xl space-y-3">
                      <span className="text-2xl font-bold text-luxury-gold font-display font-mono">0{idx + 1}</span>
                      <h4 className="text-base font-bold text-white font-display">{val.title}</h4>
                      <p className="text-xs text-gray-400 leading-relaxed font-light">{val.desc}</p>
                    </div>
                  ))}
                </div>

                {/* Experience Banner */}
                <div className="bg-wood-dark/70 border border-luxury-gold/15 p-8 rounded-3xl text-center max-w-4xl mx-auto relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-36 h-36 bg-luxury-gold/3 rounded-full blur-2xl" />
                  <h4 className="text-xl font-bold text-white mb-2 font-display">Let's Connect Directly</h4>
                  <p className="text-xs text-gray-400 max-w-xl mx-auto leading-relaxed mb-6 font-light">
                    Have questions about wood moisture thresholds, stair caps, or carpet removal logistics? Get answers from our managing partner, Mansoor, or request an evaluation of your architectural blueprints.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center text-xs font-mono">
                    <a href="tel:4376054750" className="flex items-center gap-1.5 text-luxury-gold hover:underline">
                      <Phone className="w-4 h-4" /> (437) 605-4750
                    </a>
                    <span className="hidden sm:inline text-gray-600">|</span>
                    <a href="mailto:mansoor@sophria.ca" className="flex items-center gap-1.5 text-gray-300 hover:text-white transition-colors">
                      <Mail className="w-4 h-4 text-luxury-gold" /> mansoor@sophria.ca
                    </a>
                  </div>
                </div>

              </div>
            )}

            {/* TAB: SERVICES PAGE */}
            {activeTab === "services" && (
              <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 space-y-16">
                
                {/* Header */}
                <div className="text-center max-w-2xl mx-auto space-y-4">
                  <span className="text-xs font-mono uppercase tracking-widest text-luxury-gold font-bold block">
                    Bespoke Flooring Portfolio
                  </span>
                  <h2 className="text-3xl sm:text-5xl font-serif font-medium text-white tracking-tight">
                    Our Flooring <span className="gold-text-gradient italic font-light">Specialties</span>
                  </h2>
                  <div className="h-0.5 w-16 bg-luxury-gold mx-auto" />
                  <p className="text-xs sm:text-sm text-gray-400 font-light">
                    Every material has unique strengths. Explore our complete grid of high-performance architectural installations.
                  </p>
                </div>

                {/* Bento Grid layout of services */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {SERVICES.map((serv) => (
                    <div 
                      key={serv.id}
                      className="bg-wood-dark/70 rounded-3xl border border-luxury-gold/10 p-6 flex flex-col justify-between hover:border-luxury-gold/30 hover:bg-wood-dark/95 transition-all duration-300 relative group overflow-hidden shadow-md"
                    >
                      <div className="absolute top-0 right-0 w-32 h-32 bg-luxury-gold/3 rounded-full blur-3xl group-hover:bg-luxury-gold/8 transition-all" />
                      
                      <div className="space-y-4">
                        <div className="rounded-2xl overflow-hidden h-48 border border-luxury-gold/5 bg-wood-charcoal relative">
                          <img 
                            src={serv.imageUrl} 
                            alt={serv.title} 
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute top-3 right-3 bg-wood-dark/90 border border-luxury-gold/20 px-2.5 py-1 rounded-xl text-[9px] text-luxury-gold uppercase font-mono font-bold tracking-widest">
                            {serv.category}
                          </div>
                        </div>

                        <h3 className="text-lg font-bold text-white font-display group-hover:text-luxury-gold transition-colors">
                          {serv.title}
                        </h3>

                        <p className="text-xs text-gray-400 leading-relaxed font-light line-clamp-4">
                          {serv.fullDescription}
                        </p>

                        {/* Expandable Benefits Checklist */}
                        <div className="space-y-1.5 pt-3 border-t border-luxury-gold/5">
                          <span className="text-[10px] uppercase font-mono tracking-wider text-luxury-gold block font-semibold">
                            Primary Benefits:
                          </span>
                          <div className="space-y-1 text-xs text-gray-300 font-light">
                            {serv.benefits.slice(0, 3).map((ben, bIdx) => (
                              <div key={bIdx} className="flex items-start gap-1.5">
                                <Check className="w-3.5 h-3.5 text-luxury-gold shrink-0 mt-0.5" />
                                <span>{ben}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Ideal Applications */}
                        {serv.idealApplications && serv.idealApplications.length > 0 && (
                          <div className="space-y-1 pt-3 border-t border-luxury-gold/5">
                            <span className="text-[10px] uppercase font-mono tracking-wider text-luxury-gold block font-semibold">
                              Ideal Applications:
                            </span>
                            <div className="flex flex-wrap gap-1.5">
                              {serv.idealApplications.map((app, aIdx) => (
                                <span key={aIdx} className="text-[10px] bg-wood-charcoal text-gray-400 border border-luxury-gold/5 px-2.5 py-0.5 rounded-full font-sans">
                                  {app}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="mt-6 pt-4 border-t border-luxury-gold/10">
                        <button
                          onClick={openEstimateModal}
                          className="w-full py-2.5 rounded-xl bg-luxury-gold/15 group-hover:bg-luxury-gold border border-luxury-gold/20 group-hover:border-luxury-gold text-luxury-gold group-hover:text-wood-dark text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer"
                        >
                          Request Custom Quote
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            )}

            {/* TAB: GALLERY PAGE */}
            {activeTab === "gallery" && (
              <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 space-y-16">
                
                {/* Header */}
                <div className="text-center max-w-2xl mx-auto space-y-4">
                  <span className="text-xs font-mono uppercase tracking-widest text-luxury-gold font-bold block">
                    Portfolio Showroom
                  </span>
                  <h2 className="text-3xl sm:text-5xl font-serif font-medium text-white tracking-tight">
                    Recent <span className="gold-text-gradient italic font-light">Installations</span>
                  </h2>
                  <div className="h-0.5 w-16 bg-luxury-gold mx-auto" />
                  <p className="text-xs sm:text-sm text-gray-400 font-light">
                    Compare our stunning flooring upgrades. Click "Interactive Compare" to drag white sliders and reveal dramatic Before & After transformations.
                  </p>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap justify-center gap-2 max-w-2xl mx-auto">
                  {["All", "Hardwood", "LVP", "Laminate", "Tile", "Stairs", "Commercial"].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setGalleryCategory(cat)}
                      className={`px-4.5 py-2 text-xs font-semibold rounded-full border transition-all duration-300 font-display cursor-pointer focus:outline-none ${
                        galleryCategory === cat
                          ? "bg-luxury-gold text-wood-dark border-luxury-gold shadow-lg"
                          : "bg-wood-dark/50 border-luxury-gold/10 text-gray-400 hover:text-white hover:border-luxury-gold/30"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* Masonry-Style Portfolio Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredProjects.map((proj) => (
                    <div 
                      key={proj.id} 
                      className="group bg-wood-dark/70 rounded-3xl border border-luxury-gold/10 overflow-hidden hover:border-luxury-gold/30 hover:bg-wood-dark/95 transition-all duration-300 flex flex-col justify-between shadow-lg"
                    >
                      <div className="relative h-60 bg-wood-charcoal overflow-hidden border-b border-luxury-gold/5">
                        <img 
                          src={proj.afterUrl} 
                          alt={proj.title} 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103 cursor-pointer"
                          onClick={() => setSelectedLightboxImage(proj.afterUrl)}
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute top-3 right-3 bg-wood-dark/90 border border-luxury-gold/20 px-2.5 py-1 rounded-xl text-[9px] text-luxury-gold uppercase font-mono font-bold tracking-widest">
                          {proj.category}
                        </div>
                        <div className="absolute bottom-3 left-3 bg-wood-dark/85 backdrop-blur-sm px-2.5 py-1 rounded-xl text-[10px] text-gray-300 font-mono flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-luxury-gold" />
                          <span>{proj.location}</span>
                        </div>
                      </div>

                      <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                        <div className="space-y-2">
                          <h3 className="text-base font-bold text-white font-display">
                            {proj.title}
                          </h3>
                          <p className="text-xs text-gray-400 leading-relaxed font-light">
                            {proj.description}
                          </p>
                        </div>

                        <div className="pt-4 flex gap-2 border-t border-luxury-gold/5 mt-4">
                          <button
                            onClick={() => {
                              setActiveProjectComparison(proj);
                              setComparisonSliderPos(50);
                            }}
                            className="flex-1 py-2 rounded-xl bg-luxury-gold/10 hover:bg-luxury-gold/20 text-luxury-gold hover:text-white border border-luxury-gold/20 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
                          >
                            Interactive Compare
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* BEFORE / AFTER SLIDER DRAWER OVERLAY */}
                <AnimatePresence>
                  {activeProjectComparison && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-wood-charcoal/90 backdrop-blur-md">
                      <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.95, opacity: 0 }}
                        className="bg-wood-dark border border-luxury-gold/25 max-w-4xl w-full rounded-3xl overflow-hidden shadow-2xl p-6 relative"
                      >
                        <button
                          onClick={() => setActiveProjectComparison(null)}
                          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-wood-dark/90 border border-luxury-gold/20 text-gray-400 hover:text-white transition-colors cursor-pointer"
                        >
                          <X className="w-5 h-5" />
                        </button>

                        <div className="space-y-2 mb-4">
                          <span className="text-[10px] font-mono tracking-widest text-luxury-gold uppercase font-bold block">
                            Comparison Showroom — {activeProjectComparison.location}
                          </span>
                          <h4 className="text-xl font-bold text-white font-display">
                            {activeProjectComparison.title}
                          </h4>
                          <p className="text-xs text-gray-400">
                            Hover or click and drag the gold white slider to reveal the dramatic difference.
                          </p>
                        </div>

                        {/* Interactive Slider Area */}
                        <div 
                          className="relative h-[400px] md:h-[480px] bg-wood-charcoal rounded-2xl overflow-hidden select-none border border-luxury-gold/10"
                          onMouseMove={(e) => {
                            const rect = e.currentTarget.getBoundingClientRect();
                            const x = e.clientX - rect.left;
                            const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
                            setComparisonSliderPos(percentage);
                          }}
                          onTouchMove={(e) => {
                            if (e.touches.length === 0) return;
                            const rect = e.currentTarget.getBoundingClientRect();
                            const x = e.touches[0].clientX - rect.left;
                            const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
                            setComparisonSliderPos(percentage);
                          }}
                        >
                          {/* After image - Background */}
                          <img 
                            src={activeProjectComparison.afterUrl} 
                            alt="After Sophria Flooring Installation" 
                            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute bottom-4 right-4 z-10 bg-luxury-gold text-wood-dark text-[10px] font-bold font-mono tracking-widest uppercase px-2.5 py-1 rounded-md shadow-md">
                            AFTER SOPHRIA
                          </div>

                          {/* Before image - Foreground clipped */}
                          <div 
                            className="absolute inset-y-0 left-0 overflow-hidden"
                            style={{ width: `${comparisonSliderPos}%` }}
                          >
                            <img 
                              src={activeProjectComparison.beforeUrl} 
                              alt="Before outdated flooring" 
                              className="absolute inset-y-0 left-0 h-full w-[90vw] max-w-4xl object-cover pointer-events-none"
                              style={{ width: "888px", minWidth: "888px" }}
                              referrerPolicy="no-referrer"
                            />
                            <div className="absolute bottom-4 left-4 z-10 bg-red-600 text-white text-[10px] font-bold font-mono tracking-widest uppercase px-2.5 py-1 rounded-md shadow-md">
                              BEFORE INSTALL
                            </div>
                          </div>

                          {/* Divider Line */}
                          <div 
                            className="absolute inset-y-0 w-1 bg-white cursor-ew-resize z-10"
                            style={{ left: `${comparisonSliderPos}%` }}
                          >
                            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 bg-luxury-gold rounded-full border-4 border-white flex items-center justify-center shadow-lg">
                              <span className="text-wood-dark text-[10px] font-bold">↔</span>
                            </div>
                          </div>
                        </div>

                        <div className="mt-4 flex justify-between items-center text-xs text-gray-400">
                          <span>{activeProjectComparison.description}</span>
                          <button
                            onClick={() => setActiveProjectComparison(null)}
                            className="px-4 py-2 bg-wood-charcoal border border-luxury-gold/15 rounded-xl hover:text-white transition-all text-xs font-semibold uppercase cursor-pointer"
                          >
                            Close Showroom
                          </button>
                        </div>
                      </motion.div>
                    </div>
                  )}
                </AnimatePresence>

                {/* LIGHTBOX FOR IMAGES */}
                <AnimatePresence>
                  {selectedLightboxImage && (
                    <div 
                      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-wood-charcoal/95"
                      onClick={() => setSelectedLightboxImage(null)}
                    >
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="max-w-5xl max-h-[85vh] relative"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          onClick={() => setSelectedLightboxImage(null)}
                          className="absolute -top-12 right-0 p-2 rounded-full bg-wood-dark/80 border border-luxury-gold/20 text-gray-400 hover:text-white transition-colors cursor-pointer"
                        >
                          <X className="w-5 h-5" />
                        </button>
                        <img 
                          src={selectedLightboxImage} 
                          alt="Lightbox high-res project showcase" 
                          className="w-full h-full max-h-[80vh] object-contain rounded-2xl border border-luxury-gold/20 shadow-2xl"
                          referrerPolicy="no-referrer"
                        />
                      </motion.div>
                    </div>
                  )}
                </AnimatePresence>

              </div>
            )}

            {/* TAB: TESTIMONIALS PAGE */}
            {activeTab === "testimonials" && (
              <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 space-y-16">
                
                {/* Header */}
                <div className="text-center max-w-2xl mx-auto space-y-4">
                  <span className="text-xs font-mono uppercase tracking-widest text-luxury-gold font-bold block">
                    Verified Customer Reviews
                  </span>
                  <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-display">
                    Customer <span className="gold-text-gradient">Testimonials</span>
                  </h2>
                  <div className="h-0.5 w-16 bg-luxury-gold mx-auto" />
                  <p className="text-xs sm:text-sm text-gray-400 font-light">
                    Read realistic, honest feedback from homeowners and commercial partners who experienced the Sophria standard of excellence.
                  </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {TESTIMONIALS.map((test) => (
                    <div 
                      key={test.id}
                      className="bg-wood-dark/70 rounded-3xl border border-luxury-gold/10 p-8 flex flex-col justify-between hover:border-luxury-gold/20 transition-all duration-300 relative shadow-lg"
                    >
                      <div className="absolute top-4 right-4 w-12 h-12 bg-luxury-gold/3 rounded-full flex items-center justify-center border border-luxury-gold/5">
                        <span className="text-3xl font-serif text-luxury-gold/30">“</span>
                      </div>
                      
                      <div className="space-y-4">
                        {/* Rating Star layout */}
                        <div className="flex items-center gap-1">
                          {Array.from({ length: test.rating }).map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-luxury-gold text-luxury-gold" />
                          ))}
                        </div>

                        <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-sans italic font-light">
                          "{test.review}"
                        </p>
                      </div>

                      <div className="pt-6 border-t border-luxury-gold/5 mt-6 flex items-center gap-4 justify-between">
                        <div>
                          <h4 className="text-sm font-bold text-white font-display">{test.name}</h4>
                          <span className="text-[10px] text-gray-500 font-mono uppercase block">{test.location}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] bg-wood-charcoal text-luxury-gold px-2.5 py-1 rounded-full font-sans border border-luxury-gold/10">
                            {test.projectType}
                          </span>
                          <span className="text-[9px] text-gray-500 font-mono block mt-1">{test.date}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Call Estimate form from Testimonials */}
                <div className="bg-wood-dark/70 border border-luxury-gold/15 p-8 rounded-3xl text-center max-w-3xl mx-auto space-y-4">
                  <h4 className="text-lg font-bold text-white font-display">Join Our Portfolio of Delighted Clients</h4>
                  <p className="text-xs text-gray-400 max-w-lg mx-auto">
                    We've designed, measured, and laid over 850 floors across Hamilton. Request your on-site estimate to secure your date.
                  </p>
                  <button
                    onClick={openEstimateModal}
                    className="px-6 py-3 bg-luxury-gold hover:bg-gold-400 text-wood-dark text-xs font-bold uppercase tracking-widest rounded-xl transition-all shadow-md cursor-pointer focus:outline-none"
                  >
                    Start Your Estimate Proposal
                  </button>
                </div>

              </div>
            )}

            {/* TAB: SERVICE AREAS PAGE */}
            {activeTab === "service-areas" && (
              <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 space-y-16">
                
                {/* Header */}
                <div className="text-center max-w-2xl mx-auto space-y-4">
                  <span className="text-xs font-mono uppercase tracking-widest text-luxury-gold font-bold block">
                    Our Operational Footprint
                  </span>
                  <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-display">
                    Service <span className="gold-text-gradient">Areas</span>
                  </h2>
                  <div className="h-0.5 w-16 bg-luxury-gold mx-auto" />
                  <p className="text-xs sm:text-sm text-gray-400 font-light">
                    Our professional crews provide dustless floor preparation and installation across Hamilton, Mississauga, and neighboring communities.
                  </p>
                </div>

                {/* Grid listing */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  <div className="lg:col-span-5 space-y-6">
                    <h3 className="text-2xl font-bold text-white font-display">Southern Ontario Coverage</h3>
                    <p className="text-xs sm:text-sm text-gray-400 leading-relaxed font-light">
                      We operate multiple highly flexible mobile installation crews equipped with premium subfloor leveling machinery and heavy vacuums. This allows us to serve clients across a wide geographic footprint.
                    </p>
                    <p className="text-xs sm:text-sm text-gray-400 leading-relaxed font-light">
                      If your neighborhood or municipality isn't explicitly highlighted in the list below, but you lie in the nearby surrounding corridor, contact Mansoor at (437) 605-4750. We routinely accommodate major commercial or whole-home residential projects outside standard boundaries.
                    </p>

                    {/* Badge layout of municipalities */}
                    <div className="grid grid-cols-2 gap-3 pt-2">
                      {SERVICE_AREAS.map((area, idx) => (
                        <div 
                          key={idx}
                          className="flex items-center gap-2 p-3 rounded-xl bg-wood-dark border border-luxury-gold/5 hover:border-luxury-gold/20 transition-all font-display text-xs text-white"
                        >
                          <div className="w-2.5 h-2.5 rounded-full bg-luxury-gold" />
                          <span>{area}, ON</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Interactive Google Map Placeholder styled beautifully */}
                  <div className="lg:col-span-7">
                    <div className="rounded-3xl overflow-hidden border border-luxury-gold/15 shadow-2xl relative h-[420px] bg-wood-dark flex items-center justify-center p-6 text-center">
                      {/* Stylized vector representation map */}
                      <div className="absolute inset-0 z-0 opacity-10 bg-[radial-gradient(#c29f5b_1px,transparent_1px)] bg-[size:24px_24px]" />
                      
                      <div className="relative z-10 space-y-6 max-w-sm">
                        <div className="w-16 h-16 bg-luxury-gold/10 rounded-full border border-luxury-gold/30 flex items-center justify-center mx-auto">
                          <MapPin className="w-8 h-8 text-luxury-gold animate-bounce" />
                        </div>
                        <div className="space-y-2">
                          <span className="text-[10px] font-mono uppercase tracking-widest text-luxury-gold font-bold block">
                            Interactive Location Map
                          </span>
                          <h4 className="text-lg font-bold text-white font-display">Mississauga Head Office</h4>
                          <p className="text-xs text-gray-400 leading-relaxed font-light">
                            <strong>Headquarters:</strong> 226-6465 Millcreek Dr. Mississauga, ON L5N 5R3. Mobile crews dispatched daily across Burlington, Oakville, Hamilton, Grimsby, and Niagara.
                          </p>
                        </div>
                        <div className="p-4 bg-wood-charcoal/80 rounded-2xl border border-luxury-gold/10 text-left space-y-1 text-[11px] text-gray-400 font-mono">
                          <div><span className="text-luxury-gold">Hamilton Dispatches:</span> Daily (Ancaster, Dundas, Stoney Creek)</div>
                          <div><span className="text-luxury-gold">Halton Dispatches:</span> Daily (Oakville, Burlington, Milton)</div>
                          <div><span className="text-luxury-gold">Niagara Corridor:</span> Bi-Weekly (Grimsby, Niagara Falls)</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            )}

            {/* TAB: CONTACT PAGE */}
            {activeTab === "contact" && (
              <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 space-y-16">
                
                {/* Header */}
                <div className="text-center max-w-2xl mx-auto space-y-4">
                  <span className="text-xs font-mono uppercase tracking-widest text-luxury-gold font-bold block">
                    Get in Touch
                  </span>
                  <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-display">
                    Contact <span className="gold-text-gradient">Our Estimators</span>
                  </h2>
                  <div className="h-0.5 w-16 bg-luxury-gold mx-auto" />
                  <p className="text-xs sm:text-sm text-gray-400 font-light">
                    Have any questions or ready to coordinate an on-site sample consultation? Reach out directly.
                  </p>
                </div>

                {/* Form + details grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
                  
                  {/* Lead form column */}
                  <div className="lg:col-span-7">
                    <LeadForm inline={true} />
                  </div>

                  {/* Information column */}
                  <div className="lg:col-span-5 flex flex-col justify-between bg-wood-dark/70 p-6 md:p-8 rounded-3xl border border-luxury-gold/10 shadow-lg relative overflow-hidden">
                    <div className="absolute top-[-50%] right-[-10%] w-48 h-48 bg-luxury-gold/3 rounded-full blur-2xl" />
                    
                    <div className="space-y-6">
                      <h3 className="text-xl font-bold text-white font-display">Direct Coordinates</h3>
                      <div className="h-0.5 w-8 bg-luxury-gold" />
                      
                      <div className="space-y-4 text-xs font-sans text-gray-300">
                        {/* Phone */}
                        <div className="flex items-start gap-4">
                          <div className="w-9 h-9 rounded-xl bg-luxury-gold/10 border border-luxury-gold/20 flex items-center justify-center shrink-0">
                            <Phone className="w-4 h-4 text-luxury-gold" />
                          </div>
                          <div>
                            <span className="text-[10px] text-gray-500 font-mono uppercase block">Calling Center</span>
                            <a href="tel:4376054750" className="text-sm font-bold text-white hover:text-luxury-gold transition-colors">
                              (437) 605-4750
                            </a>
                            <p className="text-[10px] text-gray-400 mt-0.5">Toll-free or Local. Estimates booking.</p>
                          </div>
                        </div>

                        {/* Emails */}
                        <div className="flex items-start gap-4">
                          <div className="w-9 h-9 rounded-xl bg-luxury-gold/10 border border-luxury-gold/20 flex items-center justify-center shrink-0">
                            <Mail className="w-4 h-4 text-luxury-gold" />
                          </div>
                          <div className="space-y-1">
                            <span className="text-[10px] text-gray-500 font-mono uppercase block">Project Estimations</span>
                            <a href="mailto:estimating@sophria.ca" className="text-xs font-bold text-white hover:text-luxury-gold transition-colors block">
                              estimating@sophria.ca
                            </a>
                            <span className="text-[10px] text-gray-500 font-mono uppercase block pt-1.5">Direct Management</span>
                            <a href="mailto:mansoor@sophria.ca" className="text-xs font-bold text-white hover:text-luxury-gold transition-colors block">
                              mansoor@sophria.ca
                            </a>
                          </div>
                        </div>

                        {/* Business Address */}
                        <div className="flex items-start gap-4">
                          <div className="w-9 h-9 rounded-xl bg-luxury-gold/10 border border-luxury-gold/20 flex items-center justify-center shrink-0">
                            <MapPin className="w-4 h-4 text-luxury-gold" />
                          </div>
                          <div>
                            <span className="text-[10px] text-gray-500 font-mono uppercase block">Headquarters</span>
                            <p className="text-xs font-bold text-white leading-relaxed">
                              226-6465 Millcreek Dr. <br />
                              Mississauga, Ontario <br />
                              Canada L5N 5R3
                            </p>
                          </div>
                        </div>

                        {/* Business Hours */}
                        <div className="flex items-start gap-4">
                          <div className="w-9 h-9 rounded-xl bg-luxury-gold/10 border border-luxury-gold/20 flex items-center justify-center shrink-0">
                            <Clock className="w-4 h-4 text-luxury-gold" />
                          </div>
                          <div>
                            <span className="text-[10px] text-gray-500 font-mono uppercase block">Business Hours</span>
                            <p className="text-xs font-bold text-white">
                              Monday – Saturday: 8:00 AM – 6:00 PM <br />
                              Sunday: Closed
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-luxury-gold/10 mt-6 text-[11px] text-gray-400 italic">
                      "At Sophria, you communicate directly with senior project planners, never robotic phone operators. We guarantee responsive, honest support."
                    </div>

                  </div>
                </div>

              </div>
            )}

          </motion.div>
        </AnimatePresence>
      </main>

      {/* FOOTER BLOCK (MATCHING PRECISE TEXT REQUIREMENTS) */}
      <footer className="bg-wood-charcoal border-t border-luxury-gold/15 py-12 relative z-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Column 1 - Brand description */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-luxury-gold/10 border border-luxury-gold/20 flex items-center justify-center">
                  <span className="text-sm font-bold text-luxury-gold font-display">S</span>
                </div>
                <h3 className="text-base font-bold text-white tracking-wider font-display">SOPHRIA FLOORING</h3>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed font-light">
                Canadian residential and commercial flooring installers specializing in solid hardwood, LVP, tile, and stair refinishing. Serving Hamilton and the Greater Golden Horseshoe with lifetime durability.
              </p>
            </div>

            {/* Column 2 - Quick Links */}
            <div className="space-y-3 font-display">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Quick Navigation</h4>
              <ul className="space-y-1.5 text-xs text-gray-400 font-medium">
                <li><button onClick={() => handleTabChange("home")} className="hover:text-luxury-gold transition-colors focus:outline-none cursor-pointer">Home Page</button></li>
                <li><button onClick={() => handleTabChange("about")} className="hover:text-luxury-gold transition-colors focus:outline-none cursor-pointer">About Story</button></li>
                <li><button onClick={() => handleTabChange("services")} className="hover:text-luxury-gold transition-colors focus:outline-none cursor-pointer">Services Grid</button></li>
                <li><button onClick={() => handleTabChange("gallery")} className="hover:text-luxury-gold transition-colors focus:outline-none cursor-pointer">Before & After Gallery</button></li>
                <li><button onClick={() => handleTabChange("testimonials")} className="hover:text-luxury-gold transition-colors focus:outline-none cursor-pointer">Customer Testimonials</button></li>
                <li><button onClick={() => handleTabChange("service-areas")} className="hover:text-luxury-gold transition-colors focus:outline-none cursor-pointer">Service Areas</button></li>
              </ul>
            </div>

            {/* Column 3 - Services list shortcuts */}
            <div className="space-y-3 font-display">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Services Highlights</h4>
              <ul className="space-y-1.5 text-xs text-gray-400 font-medium">
                <li><button onClick={() => handleTabChange("services")} className="hover:text-luxury-gold transition-colors focus:outline-none cursor-pointer">Solid Hardwood</button></li>
                <li><button onClick={() => handleTabChange("services")} className="hover:text-luxury-gold transition-colors focus:outline-none cursor-pointer">Luxury Vinyl Plank (LVP)</button></li>
                <li><button onClick={() => handleTabChange("services")} className="hover:text-luxury-gold transition-colors focus:outline-none cursor-pointer">Engineered Hardwood</button></li>
                <li><button onClick={() => handleTabChange("services")} className="hover:text-luxury-gold transition-colors focus:outline-none cursor-pointer">Tile Installation</button></li>
                <li><button onClick={() => handleTabChange("services")} className="hover:text-luxury-gold transition-colors focus:outline-none cursor-pointer">Stair Refinishing</button></li>
                <li><button onClick={() => handleTabChange("services")} className="hover:text-luxury-gold transition-colors focus:outline-none cursor-pointer">Commercial Workspaces</button></li>
              </ul>
            </div>

            {/* Column 4 - Direct coordinates */}
            <div className="space-y-3 font-display text-xs text-gray-400">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Contact Coordinates</h4>
              <div>
                <span className="text-[10px] text-gray-500 font-mono block">Direct Estimations</span>
                <a href="tel:4376054750" className="text-white hover:text-luxury-gold font-bold font-mono transition-colors block mt-0.5">(437) 605-4750</a>
                <a href="mailto:estimating@sophria.ca" className="hover:text-luxury-gold font-mono transition-colors block mt-0.5">estimating@sophria.ca</a>
              </div>
              <div className="pt-2">
                <span className="text-[10px] text-gray-500 font-mono block">Head Office Address</span>
                <p className="font-sans leading-relaxed">
                  226-6465 Millcreek Dr. <br />
                  Mississauga, Ontario L5N 5R3
                </p>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-luxury-gold/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
            <div>
              &copy; {new Date().getFullYear()} Sophria Premium Flooring. All Rights Reserved. &nbsp;|&nbsp; 
              <button className="hover:text-luxury-gold ml-1 focus:outline-none">Privacy Policy</button> &nbsp;|&nbsp; 
              <button className="hover:text-luxury-gold ml-1 focus:outline-none">Terms of Service</button>
            </div>
            
            {/* REQUIRED FOOTER CREDIT ATTRIBUTION (DO NOT REMOVE OR CHANGE) */}
            <div className="text-center md:text-right">
              Developed by <a href="https://iwebnext.com" target="_blank" className="text-luxury-gold hover:text-gold-400 font-bold transition-colors">iWebNext</a>
            </div>
          </div>

        </div>
      </footer>

      {/* FLOAT CONVERSION BUTTON WIDGETS FIXED FOOTER BAR */}
      <div className="fixed bottom-0 left-0 right-0 z-30 bg-wood-dark/95 border-t border-luxury-gold/20 p-3 flex sm:hidden justify-between items-center gap-3 backdrop-blur-md shadow-2xl">
        <a 
          href="tel:4376054750"
          className="flex-1 py-2.5 bg-wood-charcoal border border-luxury-gold/30 rounded-xl text-luxury-gold hover:text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <Phone className="w-3.5 h-3.5" />
          <span>Call Estimator</span>
        </a>
        <button
          onClick={openEstimateModal}
          className="flex-1 py-2.5 bg-luxury-gold text-wood-dark text-xs font-bold uppercase tracking-wider rounded-xl flex items-center justify-center gap-1.5 shadow-lg shadow-luxury-gold/10 cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Free Estimate</span>
        </button>
      </div>

      {/* ESTIMATE MODAL POPUP LAYER */}
      <AnimatePresence>
        {showLeadModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-wood-charcoal/85 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="max-w-xl w-full"
            >
              <LeadForm closeModal={() => setShowLeadModal(false)} />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* FLOAT SCROLL TO TOP UTILITY TRIGGER */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            className="fixed bottom-24 right-6 sm:bottom-6 sm:right-24 z-40 w-11 h-11 rounded-full bg-wood-dark/90 border border-luxury-gold/25 hover:border-luxury-gold text-luxury-gold hover:text-white flex items-center justify-center shadow-xl cursor-pointer hover:-translate-y-0.5 active:translate-y-0 transition-all focus:outline-none"
            aria-label="Scroll to Top"
            title="Scroll to Top"
          >
            <ChevronUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* FLOAT DYNAMIC AI CHATBOT SYSTEM */}
      <Chatbot />

    </div>
  );
}
