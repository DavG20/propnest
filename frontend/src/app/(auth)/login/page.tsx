import Link from "next/link"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"

export default function LoginPage() {
  return (
    <>
      <div>
        <h2 className="mt-8 text-3xl font-bold tracking-tight text-white">
          Sign in to your account
        </h2>
        <p className="mt-2 text-sm text-slate-400">
          Or{" "}
          <Link href="/register" className="font-medium text-emerald-400 hover:text-emerald-300 transition-colors">
            start your 14-day free trial
          </Link>
        </p>
      </div>

      <div className="mt-8">
        <form action="#" method="POST" className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-slate-300">
              Email address
            </label>
            <div className="mt-2">
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-slate-300">
              Password
            </label>
            <div className="mt-2">
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                placeholder="••••••••"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-slate-700 bg-slate-900/50 text-emerald-500 focus:ring-emerald-500 focus:ring-offset-slate-950"
              />
              <label htmlFor="remember-me" className="ml-3 block text-sm leading-6 text-slate-400">
                Remember me
              </label>
            </div>

            <div className="text-sm leading-6">
              <a href="#" className="font-medium text-emerald-400 hover:text-emerald-300 transition-colors">
                Forgot password?
              </a>
            </div>
          </div>

          <div>
            <Button type="submit" className="w-full">
              Sign in
            </Button>
          </div>
        </form>

        <div className="mt-10">
          <div className="relative">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-slate-800" />
            </div>
            <div className="relative flex justify-center text-sm font-medium leading-6">
              <span className="bg-slate-950 px-6 text-slate-500">Or continue with</span>
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
  )
}
