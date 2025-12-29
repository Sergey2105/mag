import { UserRole } from "@/services/auth/auth.types";
import { IFavorite } from "@/types/favorites.types";

export interface IUser {
    id: number;

    email: string;
    phone?: string;

    name?: string;
    password?: string;
    avatarPath?: string;

    telegramId?: string;

    otpCode?: string;
    otpExpiresAt?: Date;

    verificationToken?: string;

    rights: UserRole[];

    createdAt: Date;
    updatedAt: Date;

    // transactions: Transaction[];
    // carts: Cart[];
    // orders: Order[];
    // favorites: IFavorite[];
}
