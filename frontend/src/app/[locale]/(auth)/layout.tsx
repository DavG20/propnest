import Image from "next/image"
import Logo from "@/components/Logo"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-50 selection:bg-emerald-500/30">

      {/* Left side: Form content */}
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">

        {/* Navigation back to home */}
        <div className="absolute top-8 left-8">
          <Logo />
        </div>

        <div className="mx-auto w-full max-w-sm lg:w-96 animate-fade-in-up">
          {children}
        </div>
      </div>

      {/* Right side: Image Panel */}
      <div className="relative hidden w-0 flex-1 lg:block">
        <Image
          className="absolute inset-0 h-full w-full object-cover"
          src="/images/auth-bg.png"
          alt="Luxury living room"
          fill
          priority
        />
        <div className="absolute inset-0 bg-slate-950/40 mix-blend-multiply" />

        {/* Glass panel overlay message */}
        <div className="absolute inset-0 flex items-center justify-center p-12">
          <div className="glass-panel p-10 max-w-md text-center bg-slate-900/60 backdrop-blur-xl border-white/10 shadow-2xl">
            <h2 className="text-3xl font-bold mb-4 text-white">Unlock Premium Access</h2>
            <p className="text-slate-300 text-lg leading-relaxed">
              Join thousands of vetted members discovering off-market listings and smart matching technology.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
