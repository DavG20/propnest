"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { FormInput } from "@/components/ui/FormInput";
import { authService } from "@/services/authService";
import { AlertCircle, Eye, EyeOff } from "lucide-react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useScopedI18n } from "@/locales/client";
import PasswordInput from "@/components/ui/password";

export default function LoginPage() {
  const t = useScopedI18n("Auth.Login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = useParams();
  const locale = params?.locale as string;

  const callbackUrl = searchParams.get("callbackUrl") || "";

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedEmail = localStorage.getItem("rememberedEmail");
      if (savedEmail) {
        setEmail(savedEmail);
        setRememberMe(true);
      }
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (rememberMe) {
      localStorage.setItem("rememberedEmail", email);
    } else {
      localStorage.removeItem("rememberedEmail");
    }

    try {
      const data = await authService.login({ email, password, rememberMe });
      login(data.token, data.user, rememberMe);

      // Redirect based on role
      const roleRedirects: Record<string, string> = {
        buyer: "/buyer",
        realtor: "/realtor",
        seller: "/seller",
        admin: "/admin",
      };

      let targetPath = `/${locale}${roleRedirects[data.user.role] || ""}`;

      if (!roleRedirects[data.user.role] && callbackUrl) {
        targetPath = `/${locale}${callbackUrl.startsWith('/') ? callbackUrl : '/' + callbackUrl}`;
      }

      router.push(targetPath);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div>
        <h2 className="mt-8 text-3xl font-bold tracking-tight text-white">
          {t("title")}
        </h2>
        <p className="mt-2 text-sm text-slate-400">
          {t("subtitle")}{" "}
          <Link href={`/${locale}/register`} className="font-medium text-emerald-400 hover:text-emerald-300 transition-colors">
            {t("noAccount")}
          </Link>
        </p>
      </div>

      <div className="mt-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {searchParams.get("registered") === "true" && (
            <div className="flex items-center gap-2 rounded-md bg-emerald-500/10 p-3 text-sm text-emerald-400">
              <AlertCircle className="h-4 w-4" />
              <span>{t("registeredSuccess")}</span>
            </div>
          )}
          {error && (
            <div className="flex items-center gap-2 rounded-md bg-red-500/10 p-3 text-sm text-red-400">
              <AlertCircle className="h-4 w-4" />
              <span>{error}</span>
            </div>
          )}

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
          <PasswordInput showPassword={showPassword} setShowPassword={setShowPassword} password={password} setPassword={setPassword} />

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 rounded border-slate-700 bg-slate-900/50 text-emerald-500 focus:ring-emerald-500 focus:ring-offset-slate-950"
              />
              <label htmlFor="remember-me" className="ml-3 block text-sm leading-6 text-slate-400">
                {t("remember")}
              </label>
            </div>

            <div className="text-sm leading-6">
              <Link href={`/${locale}/forgot-password`} className="font-medium text-emerald-400 hover:text-emerald-300 transition-colors">
                {t("forgot")}
              </Link>
            </div>
          </div>

          <div>
            <Button type="submit" className="w-full" isLoading={isLoading}>
              {t("submit")}
            </Button>
          </div>
        </form>

        <div className="mt-10">
          <div className="relative">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-slate-800" />
            </div>
            <div className="relative flex justify-center text-sm font-medium leading-6">
              <span className="bg-slate-950 px-6 text-slate-500">{t("continueWith")}</span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <Button variant="outline" className="w-full">
              Google
            </Button>
            <Button variant="outline" className="w-full">
              Apple
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
