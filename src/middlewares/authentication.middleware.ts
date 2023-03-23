import { Request, Response, NextFunction } from "express";
import jwt, { Secret } from "jsonwebtoken";
import AppDataSource from "../config/app-data-source";
import { User } from "../entities/user.entity";
import { badRequestRes, unauthorizedRes } from "../util/custom-response";

const UserRepository = AppDataSource.getRepository(User);

const AuthenticationMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token = req.headers.authorization;
  if (!token) {
    return res.send(unauthorizedRes());
  }

  try {
    // remove `Bearer` from the token string
    token = token.split(" ")[1];

    if (token == null || !token) {
      return res.send(unauthorizedRes());
    }

    // @ts-ignore
    const jwtSecret: Secret = process.env.JWT_SECRET_KEY;
    const verifiedJWTPayload: any = jwt.verify(token, jwtSecret);

    const { sub } = verifiedJWTPayload;
    // checks if the token is available in the database
    const user = await UserRepository.findOne({
      where: { id: sub },
    });
    // check if the token is available in the database
    if (!user?.token) {
      return res.send(badRequestRes("Invalid Token"));
    }

    // @ts-ignore
    req.user = verifiedJWTPayload;
    next();
  } catch (error: any) {
    res.send(badRequestRes("Invalid Token"));
  }
};

export default AuthenticationMiddleware;
