import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "../errors/AppError";
import { IRefreshTokenDTO } from "../models/dto/auth.dto";

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError("JWT token is missing", 401);
  }

  const [, token] = authHeader.split(" ");

  try {
    const decoded = verify(token, process.env.JWT_SECRET);

    const { sub } = decoded as ITokenPayload;

    req.body.user_id = sub;

    return next();
  } catch (e) {
    console.log(e)
    throw new AppError("Invalid JWT token", 401);
  }
}
