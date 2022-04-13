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
    user_id: string;
    token: string;
}