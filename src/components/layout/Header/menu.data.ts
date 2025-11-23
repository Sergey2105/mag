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
    {
        href: PAGES.CATALOG.ROOT,
        name: "Catalog",
    },
    {
        href: PAGES.ABOUT,
        name: "About",
    },
    {
        href: PAGES.CONTACTS,
        name: "Contacts",
    },
];
