import { TCartProduct } from "@/types/product.interface";

export interface ICart {
    id: string;
    createdAt: string;
    updatedAt: string;

    items: ICartItem[];
}

export interface ICartItem extends ISimpleCartItem {
    createdAt: string;
    updatedAt: string;
}

export interface ISimpleCartItem {
    id: string;
    product: TCartProduct;
    quantity: number;
    asSecondItem?: boolean;
}
