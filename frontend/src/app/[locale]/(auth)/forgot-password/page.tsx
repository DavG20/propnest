"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { FormInput } from "@/components/ui/FormInput";
import { authService } from "@/services/authService";
import { AlertCircle, CheckCircle2, Mail, ArrowLeft } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useScopedI18n } from "@/locales/client";

export default function ForgotPasswordPage() {
  const t = useScopedI18n("Auth.ForgotPassword");
  const params = useParams();
  const locale = params?.locale as string;

  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await authService.forgotPassword({ email });
      setSubmitted(true);
    } catch (err: any) {
      // Always show success to avoid email enumeration
      setSubmitted(true);
    } finally {
      setIsLoading(false);
    }
  };

  if (submitted) {
    return (
      <>
        <div className="flex flex-col items-center text-center">
          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 ring-1 ring-emerald-500/30">
            <Mail className="h-8 w-8 text-emerald-400" />
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-white">
            {t("successTitle")}
          </h2>
          <p className="mt-3 text-sm text-slate-400 max-w-xs">
            {t("successMessage")}
          </p>
        </div>

        <div className="mt-8">
          <Link
            href={`/${locale}/login`}
            className="flex items-center justify-center gap-2 text-sm font-medium text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            {t("backToLogin")}
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <div>
        <h2 className="mt-8 text-3xl font-bold tracking-tight text-white">
          {t("title")}
        </h2>
        <p className="mt-2 text-sm text-slate-400">{t("subtitle")}</p>
      </div>

      <div className="mt-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="flex items-center gap-2 rounded-md bg-red-500/10 p-3 text-sm text-red-400">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <FormInput
            label={t("email")}
            id="forgot-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Button type="submit" className="w-full" isLoading={isLoading}>
            {t("submit")}
          </Button>

          <div className="text-center">
            <Link
              href={`/${locale}/login`}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-400 hover:text-emerald-300 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              {t("backToLogin")}
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}
