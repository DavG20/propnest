"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { authService } from "@/services/authService";
import { AlertCircle, CheckCircle2, ArrowLeft, KeyRound } from "lucide-react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useScopedI18n } from "@/locales/client";
import PasswordInput from "@/components/ui/password";

export default function ResetPasswordPage() {
  const t = useScopedI18n("Auth.ResetPassword");
  const params = useParams();
  const locale = params?.locale as string;
  const searchParams = useSearchParams();
  const router = useRouter();

  const token = searchParams.get("token") ?? "";

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // If no token present, show invalid-token state immediately
  if (!token) {
    return (
      <>
        <div className="flex flex-col items-center text-center mt-8">
          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-500/10 ring-1 ring-red-500/30">
            <AlertCircle className="h-8 w-8 text-red-400" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-white">
            {t("invalidToken")}
          </h2>
        </div>
        <div className="mt-8 text-center">
          <Link
            href={`/${locale}/forgot-password`}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Request a new link
          </Link>
        </div>
      </>
    );
  }

  if (success) {
    return (
      <>
        <div className="flex flex-col items-center text-center mt-8">
          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 ring-1 ring-emerald-500/30">
            <CheckCircle2 className="h-8 w-8 text-emerald-400" />
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-white">
            {t("successTitle")}
          </h2>
          <p className="mt-3 text-sm text-slate-400 max-w-xs">
            {t("successMessage")}
          </p>
        </div>
        <div className="mt-8 text-center">
          <Link
            href={`/${locale}/login`}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            {t("backToLogin")}
          </Link>
        </div>
      </>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError(t("mismatch"));
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      await authService.resetPassword({ token, password, confirm_password: confirmPassword });
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || t("invalidToken"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div>
        <div className="mt-8 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/10 ring-1 ring-emerald-500/30">
            <KeyRound className="h-5 w-5 text-emerald-400" />
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-white">
            {t("title")}
          </h2>
        </div>
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

          <PasswordInput
            label={t("password")}
            id="new-password"
            autoComplete="new-password"
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            password={password}
            setPassword={setPassword}
          />

          <PasswordInput
            label={t("confirmPassword")}
            id="confirm-password"
            autoComplete="new-password"
            showPassword={showConfirmPassword}
            setShowPassword={setShowConfirmPassword}
            password={confirmPassword}
            setPassword={setConfirmPassword}
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
