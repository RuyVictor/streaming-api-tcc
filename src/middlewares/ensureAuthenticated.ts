import { Request, Response, NextFunction } from "express";
import { JwtPayload, verify } from "jsonwebtoken";
import { AppDataSource } from "../database";
import { AppError } from "../errors/AppError";
import { Token } from "../models/Token";

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

    const [, accessToken] = authHeader.split(" ");

    const tokenRepository = AppDataSource.getRepository(Token);
    const accessTokenIsBlackListed = await tokenRepository.findOneBy({
      hash: accessToken,
    });
    if (accessTokenIsBlackListed) {
      throw new AppError("Invalid JWT token", 401);
    }

    const { sub } = verify(accessToken, process.env.JWT_SECRET) as JwtPayload;

    req.body.userId = sub;
    req.body.accessToken = accessToken;

    return next();
  } catch (e) {
    console.log(e);
    res.status(401).json({
      message: "Invalid JWT token",
    });
  }
}
