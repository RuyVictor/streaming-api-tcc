export interface RevokeTokenDTO {
  accessToken: string;
  refreshToken?: string;
}

export interface RevokeTokenOutputDTO {
  message: string;
}
