import { ICategory } from "@/types/category.interface";
import { IFavorite } from "@/types/favorites.types";

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
    isHasSecondDiscount: boolean;

    createdAt: Date;
    updatedAt: Date;

    category: ICategory;

    // cartItems: ICartItem[];
    // favorites: IFavorite[];
}

export type TCartProduct = Pick<IProduct, "id" | "name" | "images" | "price" | "discountPrice" | "isHasSecondDiscount">;

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
