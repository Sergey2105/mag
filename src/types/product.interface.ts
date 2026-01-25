import { ICategory } from "@/types/category.interface";

export interface IProduct {
    id: string;

    name: string;
    slug: string;

    images: string[];

    price: number;
    discountPrice: number;

    description: string;
    categoryID: string;

    isActive: boolean;
    isAvailable:boolean

    createdAt: Date;
    updatedAt: Date;

    category: ICategory;

    stock: number;

    // cartItems: ICartItem[];
    // favorites: IFavorite[];
}

export type TCartProduct = Pick<IProduct, "id" | "name" | "images" | "price" | "discountPrice" | "stock" | "isAvailable">;
export type TFavoriteProduct = Pick<IProduct, "id" | "name" | "images" | "price">;

export interface IPagination {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

export interface IProductsPagination {
    products: IProduct[];
    pagination: IPagination;
    category: ICategory;
}
