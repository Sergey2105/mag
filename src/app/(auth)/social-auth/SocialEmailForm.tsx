"use client";

import { useState, type FormEvent } from "react";

import { useEmailForm } from "./useEmailForm";
import { LoaderCircleIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export default function SocialEmailForm() {
    const [email, setEmail] = useState("");
    const { updateEmail, isLoading } = useEmailForm();

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        updateEmail(email);
    };

    return (
        <div className="wrapper">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-600">Email</label>
                    <input type="email" value={email} placeholder="Enter email:" onChange={(e) => setEmail(e.target.value)} required />
                </div>

                <div>
                    <button type="submit" className={cn("bg-primary", isLoading && "opacity-75 cursor-not-allowed")} disabled={isLoading}>
                        {isLoading ? <LoaderCircleIcon className="animate-spin" /> : "Submit"}
                    </button>
                </div>
            </form>
        </div>
    );
}
