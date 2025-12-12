export interface IAuthForm {
    email: string;
    password: string;
}

export interface IAuthResponse {
    accessToken: string;
    user: IUser;
}

export interface IUser {
    id: number;
    email: string;
    name?: string;
}
