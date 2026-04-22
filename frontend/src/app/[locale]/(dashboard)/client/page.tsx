"use client";

import { useTranslations } from "next-intl";
import { useAuth } from "@/context/AuthContext";
import { 
  Eye, 
  Heart, 
  MessageCircle, 
  ChevronRight,
  Sparkles
} from "lucide-react";
import PropertyCard from "@/app/[locale]/properties/_components/PropertyCard";

export default function ClientDashboard() {
  const t = useTranslations("Dashboard.Client");
  const { user } = useAuth();

  const stats = [
    { label: t("stats.viewed"), value: "24", icon: Eye, color: "text-blue-400", bg: "bg-blue-400/10" },
    { label: t("stats.saved"), value: "12", icon: Heart, color: "text-rose-400", bg: "bg-rose-400/10" },
    { label: t("stats.inquiries"), value: "3", icon: MessageCircle, color: "text-emerald-400", bg: "bg-emerald-400/10" },
  ];

  return (
    <div className="space-y-10 animate-fade-in">
      {/* Welcome Header */}
      <section>
        <h1 className="text-4xl font-bold tracking-tight mb-2">
          {t("welcome")} <span className="text-emerald-400">{user?.name || "Dave"}</span>
        </h1>
        <p className="text-slate-400 text-lg">{t("subtitle")}</p>
      </section>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="glass-panel p-6 bg-slate-900/40 relative overflow-hidden group hover:bg-slate-900/60 transition-all duration-300">
              <div className={`absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 rounded-full ${stat.bg} blur-3xl group-hover:scale-150 transition-transform duration-700`} />
              <div className="relative flex items-center gap-4">
                <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                  <Icon size={24} />
                </div>
                <div>
                  <p className="text-slate-400 text-sm font-medium">{stat.label}</p>
                  <p className="text-3xl font-bold text-white mt-1">{stat.value}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
        {/* Recently Viewed */}
        <section className="xl:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white">{t("recent.title")}</h2>
              <p className="text-sm text-slate-500">{t("recent.subtitle")}</p>
            </div>
            <button className="text-emerald-400 hover:text-emerald-300 text-sm font-medium flex items-center gap-1 transition-colors">
              See all history <ChevronRight size={16} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <PropertyCard
              imageUrl="/images/lux_apartment_1773592390896.png"
              title="Skyline Penthouse Oasis"
              price="$3,250,000"
              location="124 Financial District, Downtown"
              beds={3}
              baths={3.5}
              sqft="2,400"
              badge="FOR SALE"
            />
            <PropertyCard
              imageUrl="/images/modern_villa_1773592528516.png"
              title="Azure Infinity Villa"
              price="$8,900,000"
              location="88 Coastal Highway, Palisades"
              beds={5}
              baths={7}
              sqft="8,200"
              badge="NEW"
              badgeColor="white"
            />
          </div>
        </section>

        {/* AI Recommendations Side Panel */}
        <section className="space-y-6">
          <div className="flex items-center gap-2">
            <Sparkles className="text-emerald-400 w-5 h-5" />
            <div>
              <h2 className="text-xl font-bold text-white">{t("ai.title")}</h2>
              <p className="text-xs text-slate-500 uppercase tracking-wider mt-1">{t("ai.subtitle")}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/10 hover:bg-emerald-500/10 transition-colors cursor-pointer group">
              <div className="flex justify-between items-start mb-2">
                <span className="text-[10px] font-bold bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full uppercase">98% Match</span>
                <span className="text-slate-500 text-xs font-mono">$2,450,000</span>
              </div>
              <h4 className="font-semibold text-white group-hover:text-emerald-400 transition-colors">Coastal Cliffside Modern</h4>
              <p className="text-slate-500 text-xs mt-1">Similar to your saved villa in Palisades</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800 hover:border-slate-700 transition-colors cursor-pointer group">
              <div className="flex justify-between items-start mb-2">
                <span className="text-[10px] font-bold bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full uppercase">92% Match</span>
                <span className="text-slate-500 text-xs font-mono">$1,850,000</span>
              </div>
              <h4 className="font-semibold text-white group-hover:text-emerald-400 transition-colors">Urban Loft Residency</h4>
              <p className="text-slate-500 text-xs mt-1">Fits your criteria for "city views"</p>
            </div>
          </div>
          
          <button className="w-full py-3 rounded-xl border border-slate-800 text-slate-400 text-sm font-medium hover:bg-slate-900 hover:text-white transition-all">
            Recalibrate Recommendations
          </button>
        </section>
      </div>
    </div>
  );
}
