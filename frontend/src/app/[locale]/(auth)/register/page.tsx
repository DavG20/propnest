"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { FormInput } from "@/components/ui/FormInput";
import { useScopedI18n } from "@/locales/client";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { authService } from "@/services/authService";
import { useAuth } from "@/context/AuthContext";
import { AlertCircle, User, Layout, Briefcase } from "lucide-react";
import { Role } from "@/types/auth";

export default function RegisterPage() {
  const t = useScopedI18n("Auth.Register");
  const params = useParams();
  const locale = params?.locale as string;
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState<Role>("buyer");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      await authService.register({ name, email, password, role });
      router.push(`/${locale}/login?registered=true`);
    } catch (err: any) {
      setError(err.message || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  const roleOptions = [
    { id: "buyer" as Role, label: t("roles.buyer"), icon: User },
    { id: "seller" as Role, label: t("roles.seller"), icon: Layout },
    { id: "realtor" as Role, label: t("roles.realtor"), icon: Briefcase },
  ];

  return (
    <>
      <div>
        <h2 className="mt-8 text-3xl font-bold tracking-tight text-white">
          {t("title")}
        </h2>
        <p className="mt-2 text-sm text-slate-400">
          {t("subtitle")}{" "}
          <Link href={`/${locale}/login`} className="font-medium text-emerald-400 hover:text-emerald-300 transition-colors">
            {t("hasAccount")}
          </Link>
        </p>
      </div>
      <div className="mt-8">
        <div className="grid grid-cols-3 gap-3 mb-8">
          {roleOptions.map((option) => {
            const Icon = option.icon;
            const isSelected = role === option.id;
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => setRole(option.id)}
                className={`flex flex-col items-center justify-center gap-2 p-3 rounded-xl border transition-all duration-200 ${isSelected
                  ? "bg-emerald-500/10 border-emerald-500 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.1)]"
                  : "bg-slate-900/50 border-slate-800 text-slate-500 hover:border-slate-700 hover:text-slate-300"
                  }`}
              >
                <Icon size={20} />
                <span className="text-[10px] font-bold uppercase tracking-wider">{option.label}</span>
              </button>
            );
          })}
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="flex items-center gap-2 rounded-md bg-red-500/10 p-3 text-sm text-red-400">
              <AlertCircle className="h-4 w-4" />
              <span>{error}</span>
            </div>
          )}
          
          <FormInput
            label={t("name")}
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <FormInput
            label={t("email")}
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <FormInput
            label={t("password")}
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            required
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <FormInput
            label={t("confirmPassword")}
            id="confirm-password"
            name="confirm-password"
            type="password"
            autoComplete="new-password"
            required
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <div>
            <Button type="submit" className="w-full" isLoading={isLoading}>
              {t("submit")}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
