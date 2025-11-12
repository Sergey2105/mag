import { Locale } from "@/i18n/config";

export interface LanguageOption {
    value: Locale;
    label: string;
}

export interface ModeOption {
    value: string;
    label: string;
}

export interface IWrapper {
    children: React.ReactNode;
    props?: React.HTMLAttributes<HTMLDivElement>;
    className?: string;
    onClick?: () => void;
}
