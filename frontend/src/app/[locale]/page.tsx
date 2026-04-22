import Link from "next/link";
import { Search, Home, Shield, TrendingUp, ChevronRight } from "lucide-react";
import { getI18n } from "@/locales/server";

import PropertyCard from "./properties/_components/PropertyCard";

export default async function LandingPage() {
  const t = await getI18n();



  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 relative selection:bg-emerald-500/30">
      
      {/* Dynamic Background Effects */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-emerald-600/10 blur-[120px] animate-pulse-slow" />
        <div className="absolute top-[40%] right-[-10%] w-[30%] h-[30%] rounded-full bg-blue-600/10 blur-[100px] animate-pulse-slow" style={{ animationDelay: '2s' }} />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-panel border-x-0 border-t-0 rounded-none bg-slate-900/40 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center">
             <Home size={20} className="text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight">Propnest</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <Link href="#" className="hover:text-white transition-colors">{t("Nav.listings")}</Link>
          <Link href="#" className="hover:text-white transition-colors">{t("Nav.agents")}</Link>
          <Link href="#" className="hover:text-white transition-colors">{t("Nav.about")}</Link>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-sm font-medium hover:text-white transition-colors hidden sm:block">{t("Nav.signIn")}</Link>
          <Link href="/register" className="bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium px-5 py-2 rounded-full transition-all hover:shadow-[0_0_20px_rgba(16,185,129,0.4)]">
            {t("Nav.getStarted")}
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 pt-32 pb-20 px-6 sm:px-12 max-w-7xl mx-auto flex flex-col items-center text-center animate-fade-in-up">
        
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-medium mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          {t("Hero.badge")}
        </div>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter max-w-4xl mb-6">
          {t("Hero.headline1")} <br className="hidden md:block" />
          <span className="text-gradient">{t("Hero.headline2")}</span>
        </h1>
        
        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mb-12">
          {t("Hero.description")}
        </p>

        {/* Search Bar Widget */}
        <div className="w-full max-w-3xl glass-panel p-2 flex flex-col sm:flex-row gap-2 relative z-20">
          <div className="flex-1 flex items-center bg-slate-900/50 rounded-lg px-4 py-3 border border-white/5">
            <Search className="w-5 h-5 text-slate-400 mr-3" />
            <input 
              type="text" 
              placeholder={t("Hero.searchPlaceholder")}
              className="bg-transparent border-none outline-none w-full text-white placeholder:text-slate-500"
            />
          </div>
          <button className="bg-white text-slate-950 px-8 py-3 rounded-lg font-medium hover:bg-slate-200 transition-colors flex items-center justify-center gap-2">
            {t("Hero.searchButton")}
          </button>
        </div>
      </main>

      {/* Featured Properties Grid */}
      <section className="relative z-10 py-24 px-6 sm:px-12 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-bold tracking-tight mb-2">{t("FeaturedListings.title")}</h2>
            <p className="text-slate-400">{t("FeaturedListings.subtitle")}</p>
          </div>
          <Link href="#" className="hidden sm:flex text-emerald-400 hover:text-emerald-300 font-medium items-center gap-1 transition-colors">
            {t("FeaturedListings.viewAll")} <ChevronRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          <PropertyCard
            imageUrl="/images/lux_apartment_1773592390896.png"
            title="Skyline Penthouse Oasis"
            price="$3,250,000"
            location="124 Financial District, Downtown"
            beds={3}
            baths={3.5}
            sqft="2,400"
            badge="FOR SALE"
            badgeColor="black"
          />

          <PropertyCard
            imageUrl="/images/modern_villa_1773592528516.png"
            title="Azure Infinity Villa"
            price="$8,900,000"
            location="88 Coastal Highway, Palisades"
            beds={5}
            baths={7}
            sqft="8,200"
            badge="NEW LISTING"
            badgeColor="white"
          />

          <PropertyCard
            imageUrl="/images/cozy_home_1773592545705.png"
            title="Heritage Oak Retreat"
            price="$1,450,000"
            location="412 Maple Street, Suburbs"
            beds={4}
            baths={3}
            sqft="3,100"
            className="md:col-span-2 lg:col-span-1"
          />

        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-24 bg-slate-900/30 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 sm:px-12">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold tracking-tight mb-4">{t("WhyUs.title")}</h2>
            <p className="text-slate-400">{t("WhyUs.subtitle")}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-panel p-8 text-center bg-slate-900/50">
              <div className="w-14 h-14 bg-emerald-500/10 text-emerald-400 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Shield className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{t("WhyUs.verified")}</h3>
              <p className="text-slate-400 text-sm">{t("WhyUs.verifiedDesc")}</p>
            </div>
            <div className="glass-panel p-8 text-center bg-slate-900/50 transform md:-translate-y-4">
              <div className="w-14 h-14 bg-blue-500/10 text-blue-400 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Search className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{t("WhyUs.smart")}</h3>
              <p className="text-slate-400 text-sm">{t("WhyUs.smartDesc")}</p>
            </div>
            <div className="glass-panel p-8 text-center bg-slate-900/50">
              <div className="w-14 h-14 bg-purple-500/10 text-purple-400 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{t("WhyUs.insights")}</h3>
              <p className="text-slate-400 text-sm">{t("WhyUs.insightsDesc")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <footer className="relative z-10 py-24 px-6 sm:px-12 max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-6">{t("CTA.title")}</h2>
        <p className="text-lg text-slate-400 mb-10">{t("CTA.subtitle")}</p>
        <Link href="/register" className="bg-white text-slate-950 px-8 py-4 rounded-full font-bold text-lg hover:bg-slate-200 transition-all hover:scale-105 inline-flex items-center gap-2">
          {t("CTA.button")} <ChevronRight size={20} />
        </Link>
      </footer>

    </div>
  );
}
