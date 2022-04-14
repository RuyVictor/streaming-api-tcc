import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { AppDataSource } from "../database";
import { AppError } from "../errors/AppError";
import { Token } from "../models/Token";

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default async function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new AppError("JWT token is missing", 401);
    }

    const [, token] = authHeader.split(" ");

    const tokenRepository = AppDataSource.getRepository(Token);
    const isBlackListed = await tokenRepository.findOneBy({ hash: token });
    if (isBlackListed) {
      throw new AppError("Invalid JWT token", 401);
    }

    const decoded = verify(token, process.env.JWT_SECRET);
    const { sub } = decoded as ITokenPayload;
    
    req.body = { user_id: sub, token: token };

    return next();
  } catch (e) {
    console.log(e);
    res.status(401).json({
      message: "Invalid JWT token",
    });
  }
}
