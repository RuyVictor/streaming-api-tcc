import { sign } from 'jsonwebtoken';

export function generateTokens(user_id: string) {
  const accessToken = sign({}, process.env.JWT_SECRET, {
    subject: user_id,
    expiresIn: parseInt(process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME),
  });

  const refreshToken = sign({}, process.env.JWT_SECRET, {
    subject: user_id,
    expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME,
  });

  return { accessToken, refreshToken };
}
