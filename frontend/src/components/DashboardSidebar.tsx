"use client";

import { useScopedI18n } from "@/locales/client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Home,
  Search,
  Heart,
  MessageSquare,
  Settings,
} from "lucide-react";
import { authService } from "@/services/authService";
import { useAuth } from "@/context/AuthContext";
import Logo from "./Logo";

export default function DashboardSidebar() {
  const t = useScopedI18n("Dashboard.Sidebar");
  const pathname = usePathname();
  const { logout, user } = useAuth();

  const sidebarLinks = [
    { name: t("overview"), href: "/buyer", icon: LayoutDashboard },
    { name: t("search"), href: "/properties", icon: Search },
    { name: t("saved"), href: "/buyer/saved", icon: Heart },
    { name: t("messages"), href: "/buyer/messages", icon: MessageSquare },
    { name: t("settings"), href: "/buyer/settings", icon: Settings },
  ];

  const handleLogout = async () => {
    try {
      const response = await authService.logout();

      if (response.status) {
        logout(); // clear local state
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <aside className="w-64 h-screen fixed left-0 top-0 z-40 flex flex-col bg-slate-900 border-r border-slate-800">
      <div className="p-6">
        <Logo width={42} height={42} />
      </div>

      <nav className="flex-1 px-4 py-8 space-y-2">
        {sidebarLinks.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;

          return (
            <Link
              key={link.href}
              href={link.href as any}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${isActive
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
            <div className="w-8 h-8 overflow-hidden rounded-full">
              <Logo iconOnly noLink width={32} height={32} />
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-medium text-white truncate">{user?.name || "Buyer User"}</p>
              <p className="text-xs text-slate-500 truncate capitalize">{user?.role || "Buyer"}</p>
            </div>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-red-400 hover:bg-red-400/5 rounded-xl transition-all duration-200"
        >
          <Logo iconOnly noLink width={20} height={20} />
          <span className="font-medium">{t("signOut")}</span>
        </button>
      </div>
    </aside>
  );
}
