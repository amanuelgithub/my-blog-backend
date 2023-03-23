import { Request, Response } from "express";
import { Router } from "express";
import ValidationMiddleware from "../middlewares/validation.middleware";
import { CreateUserDto } from "../dtos/create-user.dto";
import * as UserService from "../services/user.service";
import AuthenticationMiddleware from "../middlewares/authentication.middleware";
import { IsAdmin } from "../middlewares/authorize.middleware";

const router = Router();

router.get(
  "/",
  AuthenticationMiddleware,
  IsAdmin,
  (req: Request, res: Response) => UserService.findUsers(req, res)
);
router.post(
  "/",
  ValidationMiddleware(CreateUserDto),
  (req: Request, res: Response) => UserService.createUser(req, res)
);

export default router;
