import DashboardSidebar from "@/components/DashboardSidebar";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Search, Bell } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute allowedRoles={["client", "agent", "admin"]}>
      <div className="min-h-screen bg-slate-950 text-slate-50">
        <DashboardSidebar />
        
        <div className="pl-64">
          {/* Dashboard Header */}
          <header className="sticky top-0 z-30 h-20 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md px-8 flex items-center justify-between">
            <div className="flex-1 max-w-xl">
              <div className="relative group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-emerald-500 transition-colors" />
                <input 
                  type="text" 
                  placeholder="Search listings, agents, or messages..." 
                  className="w-full bg-slate-900/50 border border-slate-800 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-emerald-500/50 transition-all"
                />
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <button className="relative p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-all">
                <Bell size={20} />
                <span className="absolute top-2 right-2 w-2 h-2 bg-emerald-500 rounded-full border-2 border-slate-950" />
              </button>
              <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-100 font-bold">
                D
              </div>
            </div>
          </header>

          <main className="p-8 max-w-[1600px] mx-auto">
            {children}
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
