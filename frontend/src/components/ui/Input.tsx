import * as React from "react"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={`flex h-11 w-full rounded-lg border border-slate-800 bg-slate-900/50 px-3 py-2 text-sm text-slate-50 ring-offset-slate-950 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:border-transparent disabled:cursor-not-allowed disabled:opacity-50 transition-colors ${className}`}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
