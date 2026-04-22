import { notFound } from "next/navigation";
import { I18nProviderClient } from "@/locales/client";
import { Inter } from "next/font/google";
import "../globals.css";
import { AuthProvider } from "@/context/AuthContext";

const inter = Inter({ subsets: ["latin"] });

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  // Validate that locale is supported
  const locales = ['en', 'am'];
  if (!locales.includes(locale as any)) {
    notFound();
  }

  return (
    <html lang={locale}>
      <head>
        <link rel="icon" href="/images/logo.png" />
      </head>
      <body className={inter.className}>
        <I18nProviderClient locale={locale}>
          <AuthProvider>
            {children}
          </AuthProvider>
        </I18nProviderClient>
      </body>
    </html>
  );
}

