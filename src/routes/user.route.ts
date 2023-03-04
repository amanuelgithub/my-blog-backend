import * as UserController from "../controllers/user.controller";
import { Request, Response } from "express";
import { Router } from "express";
import ValidationMiddleware from "../middlewares/validation.middleware";
import { CreateUserDto } from "../dtos/create-user.dto";

const router = Router();

router.get("/", (req: Request, res: Response) =>
  UserController.findAllUsers(req, res)
);
router.post(
  "/",
  ValidationMiddleware(CreateUserDto),
  (req: Request, res: Response) => UserController.createUser(req, res)
);

export default router;
