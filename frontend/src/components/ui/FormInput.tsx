import * as React from "react";
import { Input, InputProps } from "./Input";

export interface FormInputProps extends InputProps {
  label: string;
  rightElement?: React.ReactNode;
}

const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, id, rightElement, ...props }, ref) => {
    return (
      <div className="space-y-2">
        <label
          htmlFor={id}
          className="block text-sm font-medium leading-6 text-slate-300"
        >
          {label}
        </label>

        <div className="relative">
          <Input
            id={id}
            ref={ref}
            {...props}
            className="pr-10"
          />

          {rightElement && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
              {rightElement}
            </div>
          )}
        </div>
      </div>
    );
  }
);
FormInput.displayName = "FormInput";

export { FormInput };
