import { PUBLIC_PAGES } from "@/constants/routes";

export interface IMenuItem {
    href: string;
    name: string;
}

export const MENU = [
    {
        href: PUBLIC_PAGES.HOME,
        name: "Home",
    },
    {
        href: PUBLIC_PAGES.CATALOG.ROOT,
        name: "Catalog",
    },
    {
        href: PUBLIC_PAGES.ABOUT,
        name: "About",
    },
    {
        href: PUBLIC_PAGES.CONTACTS,
        name: "Contacts",
    },
];
