import { PAGES } from "@/constants/routes";

export interface IMenuItem {
    href: string;
    name: string;
}

export const MENU = [
    {
        href: PAGES.HOME.ROOT,
        name: "Home",
    },
    { href: PAGES.FORM, name: "Form" },
    {
        href: PAGES.SETTINGS,
        name: "Settings",
    },
];
