export const PAGES = {
    HOME: {
        ROOT: "/",
        BY_ID: (id: string | number) => `/${id}`,
    },
    FORM: "/form",
    SETTINGS: "/settings",
    POSTS: {
        ROOT: "/posts",
        BY_ID: (id: string | number) => `/posts/${id}`,
    },
    ABOUT: "/about",
    CONTACTS: "/contacts",
    BLOG: "/blog",

    CATALOG: {
        ROOT: "/catalog",
        BY_ID: (categories: string | number) => `/catalog/${categories}`,
    },
};
