import * as React from "react";
import { Input, InputProps } from "./Input";

export interface FormInputProps extends InputProps {
  label: string;
}

const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, id, ...props }, ref) => {
    return (
      <div className="space-y-2">
        <label htmlFor={id} className="block text-sm font-medium leading-6 text-slate-300">
          {label}
        </label>
        <Input id={id} ref={ref} {...props} />
      </div>
    );
  }
);
FormInput.displayName = "FormInput";

export { FormInput };
