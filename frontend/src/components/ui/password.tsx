import { FormInput } from "@/components/ui/FormInput";
import { Eye, EyeOff } from "lucide-react";
import { useScopedI18n } from "@/locales/client";



export interface PasswordProps {
    showPassword: boolean;
    setShowPassword: (showPassword: boolean) => void;
    password: string;
    setPassword: (password: string) => void;
    label?: string;
    id?: string;
    autoComplete?: string;
}

export default function PasswordInput({ showPassword, setShowPassword, password, setPassword, label, id = "password", autoComplete = "current-password" }: PasswordProps) {
    const t = useScopedI18n("Auth.Login");
    return (
        <FormInput
            label={label ?? t("password")}
            id={id}
            name={id}
            type={showPassword ? "text" : "password"}
            autoComplete={autoComplete}
            required
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            rightElement={
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                >
                    {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                    ) : (
                        <Eye className="h-5 w-5" />
                    )}
                </button>
            }
        />
    )
}