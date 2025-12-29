//для minddleware
export const ADMIN_PAGES = {
    HOME: "/admin",
    MANAGER: "/manager",
};

export const DASHBOARD_PAGES = {
    HOME: "/dashboard",
    PROFILE: `/dashboard/profile`,
};

export const PREMIUM_PAGES = {
    HOME: "/premium",
};

export const PUBLIC_PAGES = {
    HOME: "/",
    CATALOG: {
        ROOT: "/catalog",
        BY_SLUG: (slug: string | number) => `/catalog/${slug}`,
        PRODUCT: (slug: string | number, id: string | number) => `/catalog/${slug}/${id}`,
    },
    ABOUT: "/about",
    CONTACTS: "/contacts",
    FAVORITES: "/favorites",
    CART: "/cart",
    LOGIN: `/login`,
    REGISTER: `/register`,
    PLANS: "/plans",
};
