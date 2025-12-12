import { ICategory } from "@/types/category.interface";

export interface IProduct {
    id: string;
    name: string;
    slug: string;
    images: string[];
    price: number;
    description: string;
    categoryID: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    category: ICategory;
}

export interface IPagination {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

export interface IProductsSlugResponse {
    products: IProduct[];
    pagination: IPagination;
}
