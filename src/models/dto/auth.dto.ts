export interface ISignInDTO {
    email: string;
    password: string;
}

export interface ISignUpDTO {
    name: string;
    email: string;
    password: string;
}

export interface IRefreshTokenDTO {
    userId?: string;
    accessToken: string
    refreshToken: string;
}