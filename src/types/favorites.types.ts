import { IProduct } from "@/types/product.interface";
import { IUser } from "@/types/user.types";

export interface IFavorite {
    id: string;

    userId: string;
    productId: string;

    createdAt: Date;

    user: IUser;
    product: IProduct;
}
