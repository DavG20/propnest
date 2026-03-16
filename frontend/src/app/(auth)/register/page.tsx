import Link from "next/link"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"

export default function RegisterPage() {
  return (
    <>
      <div>
        <h2 className="mt-8 text-3xl font-bold tracking-tight text-white">
          Create an account
        </h2>
        <p className="mt-2 text-sm text-slate-400">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-emerald-400 hover:text-emerald-300 transition-colors">
            Sign in
          </Link>
        </p>
      </div>

      <div className="mt-8">
        <form action="#" method="POST" className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium leading-6 text-slate-300">
              Full Name
            </label>
            <div className="mt-2">
              <Input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                placeholder="John Doe"
              />
            </div>
          </div>

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
                autoComplete="new-password"
                required
                placeholder="••••••••"
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="confirm-password" className="block text-sm font-medium leading-6 text-slate-300">
              Confirm Password
            </label>
            <div className="mt-2">
              <Input
                id="confirm-password"
                name="confirm-password"
                type="password"
                autoComplete="new-password"
                required
                placeholder="••••••••"
              />
            </div>
          </div>

          <div>
            <Button type="submit" className="w-full">
              Create Account
            </Button>
          </div>
        </form>
      </div>
    </>
  )
}
