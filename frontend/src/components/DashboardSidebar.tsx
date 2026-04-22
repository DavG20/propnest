"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { 
  LayoutDashboard, 
  Home, 
  Search, 
  Heart, 
  MessageSquare, 
  Settings, 
  LogOut,
  User
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function DashboardSidebar() {
  const t = useTranslations("Dashboard.Sidebar");
  const pathname = usePathname();
  const { logout, user } = useAuth();

  const sidebarLinks = [
    { name: t("overview"), href: "/client", icon: LayoutDashboard },
    { name: t("search"), href: "/properties", icon: Search },
    { name: t("saved"), href: "/client/saved", icon: Heart },
    { name: t("messages"), href: "/client/messages", icon: MessageSquare },
    { name: t("settings"), href: "/client/settings", icon: Settings },
  ];

  return (
    <aside className="w-64 h-screen fixed left-0 top-0 z-40 flex flex-col bg-slate-900 border-r border-slate-800">
      <div className="p-6 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
          <Home size={24} className="text-white" />
        </div>
        <span className="text-xl font-bold tracking-tight text-white">Propnest</span>
      </div>

      <nav className="flex-1 px-4 py-8 space-y-2">
        {sidebarLinks.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;
          
          return (
            <Link
              key={link.href}
              href={link.href as any}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                isActive 
                  ? "bg-emerald-500/10 text-emerald-400 font-semibold shadow-sm" 
                  : "text-slate-400 hover:bg-slate-800 hover:text-slate-100"
              }`}
            >
              <Icon size={20} className={isActive ? "text-emerald-400" : "group-hover:text-slate-100"} />
              <span>{link.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 mt-auto">
        <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700/50 mb-4">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-slate-300">
              <User size={16} />
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-medium text-white truncate">{user?.name || "Client User"}</p>
              <p className="text-xs text-slate-500 truncate capitalize">{user?.role || "Client"}</p>
            </div>
          </div>
        </div>
        
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-red-400 hover:bg-red-400/5 rounded-xl transition-all duration-200"
        >
          <LogOut size={20} />
          <span className="font-medium">{t("signOut")}</span>
        </button>
      </div>
    </aside>
  );
}
