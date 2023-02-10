import * as UserController from "../controllers/user.controller";
import { Request, Response } from "express";
import { Router } from "express";

const router = Router();

router.get("/", (req: Request, res: Response) =>
  UserController.findAllUsers(req, res)
);

export default router;
