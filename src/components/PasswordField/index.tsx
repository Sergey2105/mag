import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";

export default function PasswordField({ field }: { field: any }) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="relative">
            <Input type={showPassword ? "text" : "password"} placeholder="••••••••" {...field} />
            <Button type="button" variant="ghost" size="icon" onClick={() => setShowPassword(!showPassword)} className="size-7 absolute right-2 top-1/2 -translate-y-1/2 p-0">
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </Button>
        </div>
    );
}
