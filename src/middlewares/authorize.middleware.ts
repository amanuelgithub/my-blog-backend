import { Response, Request, NextFunction } from "express";
import { UserRoleEnum } from "../entities/user.entity";
import { forbiddenAccessRes } from "../util/custom-response";

const IsAdmin = (req: Request, res: Response, next: NextFunction) => {
  // @ts-ignore
  const requestingUser = req.user;
  if (requestingUser.role === UserRoleEnum.ADMIN) {
    next();
    return;
  }

  res.send(forbiddenAccessRes());
};

const IsGuest = (req: Request, res: Response, next: NextFunction) => {
  // @ts-ignore
  const requestingUser = req.user;
  if (requestingUser.role === UserRoleEnum.GUEST) {
    next();
    return;
  }

  res.send(forbiddenAccessRes());
};

export { IsAdmin, IsGuest };
