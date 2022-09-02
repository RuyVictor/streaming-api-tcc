export interface RefreshTokenDTO {
  accessToken: string;
  refreshToken: string;
}

export interface RefreshTokenOutputDTO {
  newAccessToken: string;
}
